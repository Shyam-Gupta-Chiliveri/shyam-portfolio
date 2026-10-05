"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/profile";
import { FRAME_HEIGHT as H, FRAME_WIDTH as W, FRAME_VERSION, frameSrc, type FrameCounts } from "@/lib/frames";

const FRAME_MS = 1000 / 24;

const cache = new Map<string, HTMLImageElement>();
const pending = new Map<string, Promise<void>>();

function load(url: string) {
  let p = pending.get(url);
  if (!p) {
    p = new Promise<void>((resolve) => {
      const img = new Image();
      img.decoding = "async";
      img.onload = () => {
        cache.set(url, img);
        resolve();
      };
      img.onerror = () => resolve();
      img.src = url;
    });
    pending.set(url, p);
  }
  return p;
}

async function loadAll(urls: string[], concurrency = 6) {
  for (let i = 0; i < urls.length; i += concurrency) {
    await Promise.all(urls.slice(i, i + concurrency).map(load));
  }
}

class FrameEngine {
  readonly strip: string[];
  readonly greeting: string[];
  readonly centre: number;
  pos: number;
  target: number;

  private ctx: CanvasRenderingContext2D | null;
  private raf = 0;
  private last = 0;
  private acc = 0;
  private busy = false;
  private dead = false;
  private painted = "";

  constructor(canvas: HTMLCanvasElement, counts: FrameCounts) {
    this.ctx = canvas.getContext("2d", { alpha: false });
    this.strip = Array.from({ length: counts.strip }, (_, i) => frameSrc(i + 1));
    this.greeting = Array.from({ length: counts.greeting }, (_, i) => frameSrc(i + 1, "greeting"));
    this.centre = Math.floor((counts.strip - 1) / 2);
    this.pos = this.target = this.centre;
  }

  get idle() {
    return this.strip[this.centre];
  }

  paint(url: string, from?: string, t = 1) {
    const img = cache.get(url);
    if (!img || !this.ctx) return false;
    const prev = from ? cache.get(from) : undefined;
    if (prev && t < 1) {
      this.ctx.globalAlpha = 1;
      this.ctx.drawImage(prev, 0, 0, W, H);
      this.ctx.globalAlpha = t;
      this.ctx.drawImage(img, 0, 0, W, H);
      this.ctx.globalAlpha = 1;
    } else {
      this.ctx.drawImage(img, 0, 0, W, H);
    }
    this.painted = url;
    return true;
  }

  async showIdle() {
    await load(this.idle);
    if (!this.dead) this.paint(this.idle);
  }

  async preload() {
    await loadAll(this.strip);
  }

  setTarget(i: number) {
    const t = Math.max(0, Math.min(this.strip.length - 1, Math.round(i)));
    if (t === this.target) return;
    this.target = t;
    this.kick();
  }

  kick() {
    if (this.raf || this.dead || this.busy || this.pos === this.target) return;
    this.last = performance.now();
    this.acc = FRAME_MS;
    this.raf = requestAnimationFrame(this.tick);
  }

  private tick = (now: number) => {
    this.raf = 0;
    if (this.dead || this.busy) return;
    this.acc = Math.min(this.acc + (now - this.last), 250);
    this.last = now;

    let blocked = false;
    while (this.acc >= FRAME_MS && this.pos !== this.target) {
      const dist = Math.abs(this.target - this.pos);
      const step = Math.sign(this.target - this.pos) * Math.max(1, Math.floor(dist / 6));
      const next = this.pos + step;
      const url = this.strip[next];
      if (!cache.has(url)) {
        blocked = true;
        load(url).then(() => this.kick());
        break;
      }
      const from = this.strip[this.pos];
      this.pos = next;
      this.acc -= FRAME_MS;
      this.paint(url, from !== url ? from : undefined, from !== url ? 0.55 : 1);
    }

    if (this.pos !== this.target && !blocked) this.raf = requestAnimationFrame(this.tick);
    else this.acc = 0;
  };

  async playGreeting() {
    if (this.busy || this.dead) return;
    this.busy = true;
    cancelAnimationFrame(this.raf);
    this.raf = 0;

    const k = Math.min(this.centre, this.strip.length - 1 - this.centre);
    const idx: number[] = [];
    for (let i = 1; i <= k; i++) idx.push(this.centre + i);
    for (let i = k; i >= -k; i--) idx.push(this.centre + i);
    for (let i = -k; i <= 0; i++) idx.push(this.centre + i);
    const steps = idx.map((i) => this.strip[i]);
    await loadAll([...new Set(steps)]);
    if (this.dead) return;
    await this.playSteps(steps, FRAME_MS * 1.4, 400);
    if (this.dead) return;
    this.pos = this.centre;
    this.paint(this.idle);
    this.busy = false;
    this.kick();
  }

  private playSteps(urls: string[], ms: number, holdMs: number) {
    return new Promise<void>((resolve) => {
      let painted = -1;
      const start = performance.now();
      const frame = (now: number) => {
        this.raf = 0;
        if (this.dead) return resolve();
        const idx = Math.min(urls.length - 1, Math.floor((now - start) / ms));
        if (idx !== painted) {
          painted = idx;
          this.paint(urls[idx], painted > 0 ? urls[painted - 1] : undefined, 0.7);
        }
        if (idx >= urls.length - 1 && now - start >= urls.length * ms + holdMs) return resolve();
        this.raf = requestAnimationFrame(frame);
      };
      this.raf = requestAnimationFrame(frame);
    });
  }

  stop() {
    this.dead = true;
    cancelAnimationFrame(this.raf);
    this.raf = 0;
  }
}

type Mood = "left" | "right" | "greeting" | null;

const captions: Record<Exclude<Mood, null>, string[]> = {
  left: ["Looking around?"],
  right: ["Found something interesting?"],
  greeting: ["Hey!", "Nice to meet you."],
};

export default function Hero({ counts }: { counts: FrameCounts }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<FrameEngine | null>(null);
  const hoverRef = useRef(false);

  const [ready, setReady] = useState(false);
  const [mood, setMood] = useState<Mood>(null);
  const [reduced, setReduced] = useState(false);

  const hasFrames = counts.strip > 0;
  const animate = hasFrames && !reduced;
  const stripCount = counts.strip;
  const greetingCount = counts.greeting;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!animate || !canvas) return;

    const eng = new FrameEngine(canvas, { strip: stripCount, greeting: greetingCount });
    engineRef.current = eng;
    let alive = true;

    eng.showIdle().then(() => {
      if (alive) setReady(true);
      return eng.preload();
    });

    return () => {
      alive = false;
      eng.stop();
      engineRef.current = null;
    };
  }, [animate, stripCount, greetingCount]);

  useEffect(() => {
    if (mood !== "left" && mood !== "right") return;
    const t = window.setTimeout(() => setMood(null), 2600);
    return () => window.clearTimeout(t);
  }, [mood]);

  const ratioOf = (clientX: number) => {
    const r = stageRef.current?.getBoundingClientRect();
    return r ? (clientX - r.left) / r.width : 0.5;
  };

  const steer = (clientX: number) => {
    const eng = engineRef.current;
    if (!eng) return;
    const x = ratioOf(clientX);
    hoverRef.current = true;
    const t = Math.max(0, Math.min(1, (x - 0.08) / 0.84));
    eng.setTarget(t * (eng.strip.length - 1));
    const zone: Mood = x < 0.34 ? "left" : x > 0.66 ? "right" : null;
    setMood((prev) => (prev === "greeting" ? prev : zone));
  };

  const release = () => {
    hoverRef.current = false;
    const eng = engineRef.current;
    if (eng) eng.setTarget(eng.centre);
  };

  const greet = () => {
    const eng = engineRef.current;
    if (!eng) return;
    setMood("greeting");
    eng.playGreeting().then(() => setMood((m) => (m === "greeting" ? null : m)));
  };

  const stop = (e: React.SyntheticEvent) => e.stopPropagation();

  return (
    <section id="top" aria-label="Introduction">
      <div
        ref={wrapRef}
        className="relative"
      >
        <div
          ref={stageRef}
          role="img"
          aria-label={`${profile.name} at his desk. He turns to follow your cursor; click him to say hi.`}
          className="relative h-dvh min-h-dvh w-full overflow-hidden bg-neutral-950 select-none"
          onPointerMove={(e) => animate && e.pointerType === "mouse" && steer(e.clientX)}
          onPointerLeave={(e) => animate && e.pointerType === "mouse" && release()}
          onClick={(e) => {
            if (!animate) return;
            if (ratioOf(e.clientX) >= 0.3 && ratioOf(e.clientX) <= 0.7) greet();
          }}
        >
          {hasFrames ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={`/hero-poster.webp?v=${FRAME_VERSION}`}
              alt=""
              width={W}
              height={H}
              fetchPriority="high"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: "70% 28%" }}
            />
          ) : (
            <div aria-hidden className="absolute inset-0 bg-neutral-900" />
          )}
          {animate && (
            <canvas
              ref={canvasRef}
              width={W}
              height={H}
              aria-hidden
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${ready ? "opacity-100" : "opacity-0"}`}
              style={{ objectPosition: "70% 28%" }}
            />
          )}

          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

          <div className="relative z-10 flex h-full w-full items-end">
            <div className="mx-auto w-full max-w-[1500px] px-6 pb-14 pt-24 lg:px-14 lg:pb-20">
              <div className="hero-enter max-w-lg">
                <p className="text-lg text-neutral-200">Hi, I&apos;m</p>
                <h1 className="mt-1 text-[clamp(2.6rem,5vw,4.4rem)] font-semibold leading-[1.02] tracking-tight text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.35)]">
                  Shyam Sunder Chiliveri
                </h1>
                <p className="mt-5 text-xl font-medium text-neutral-100">
                  Data Scientist
                  <br />
                  AI Engineer
                </p>
                <p className="mt-4 max-w-md text-base leading-relaxed text-neutral-300">{profile.intro}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={`mailto:${profile.email}`}
                    onClick={stop}
                    className="rounded-full bg-white px-6 py-3 text-sm font-medium text-neutral-950 shadow-lg shadow-black/20 transition hover:bg-wine hover:text-white"
                  >
                    Talk to Me
                  </a>
                  <a
                    href={profile.resume}
                    download
                    onClick={stop}
                    className="glass rounded-full px-6 py-3 text-sm font-medium text-white transition hover:bg-white/20"
                  >
                    Download Resume
                  </a>
                </div>
                {animate && (
                  <p className="mt-6 hidden text-xs uppercase tracking-[0.2em] text-neutral-300 lg:block">
                    Move your cursor to say hello.
                  </p>
                )}
              </div>
            </div>
          </div>

          <div aria-live="polite" className="pointer-events-none absolute right-4 top-20 z-10 sm:right-8 sm:top-24">
            {mood && animate && (
              <div key={mood} className="caption-enter glass rounded-2xl px-5 py-3 text-sm font-medium text-white">
                {captions[mood].map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

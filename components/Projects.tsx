"use client";

import { useEffect, useMemo, useRef, useState, type DragEvent } from "react";
import { categories, projects, type Category, type Project } from "@/data/projects";
import Reveal from "./Reveal";
import Section from "./Section";

type Filter = "All" | Category;
type PinOverrides = Record<string, boolean>;
type DropHint = "before" | "after" | null;

const PIN_STORAGE_KEY = "portfolio-project-pins";
const ORDER_STORAGE_KEY = "portfolio-project-order";

function readPinOverrides(): PinOverrides {
  try {
    const raw = localStorage.getItem(PIN_STORAGE_KEY);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return {};
    const overrides: PinOverrides = {};
    for (const [slug, value] of Object.entries(parsed)) {
      if (typeof value === "boolean") overrides[slug] = value;
    }
    return overrides;
  } catch {
    return {};
  }
}

function writePinOverrides(overrides: PinOverrides) {
  try {
    localStorage.setItem(PIN_STORAGE_KEY, JSON.stringify(overrides));
  } catch {
    // A blocked storage write should still update the page for this visit.
  }
}

function readOrder(): string[] | null {
  try {
    const raw = localStorage.getItem(ORDER_STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.some((slug) => typeof slug !== "string")) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeOrder(order: string[]) {
  try {
    localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(order));
  } catch {
    // A blocked storage write should still update the page for this visit.
  }
}

function isPinned(project: Project, overrides: PinOverrides) {
  if (Object.prototype.hasOwnProperty.call(overrides, project.slug)) return overrides[project.slug];
  return project.pinned === true;
}

/** Published order: pinned projects first, then the current file order inside each group. */
function publishedOrder(list: Project[], overrides: PinOverrides) {
  const pinned: Project[] = [];
  const rest: Project[] = [];
  for (const project of list) {
    if (isPinned(project, overrides)) pinned.push(project);
    else rest.push(project);
  }
  return [...pinned, ...rest.filter((project) => project.caseStudy), ...rest.filter((project) => !project.caseStudy)];
}

function knownOrder(order: string[] | null, overrides: PinOverrides) {
  const slugs = new Set(projects.map((project) => project.slug));
  const base = (order ?? publishedOrder(projects, overrides).map((project) => project.slug)).filter((slug) => slugs.has(slug));
  const seen = new Set(base);
  for (const project of projects) {
    if (!seen.has(project.slug)) base.push(project.slug);
  }
  return base;
}

function orderedVisible(filter: Filter, overrides: PinOverrides, order: string[] | null) {
  const pool = filter === "All" ? projects : projects.filter((project) => project.category === filter);
  if (!order) return publishedOrder(pool, overrides);
  const rank = new Map(knownOrder(order, overrides).map((slug, index) => [slug, index]));
  return [...pool].sort((a, b) => (rank.get(a.slug) ?? 1e9) - (rank.get(b.slug) ?? 1e9));
}

function reorderSlugs(slugs: string[], from: string, to: string, after: boolean) {
  if (from === to) return slugs;
  const next = slugs.filter((slug) => slug !== from);
  let index = next.indexOf(to);
  if (index < 0) return slugs;
  if (after) index += 1;
  next.splice(index, 0, from);
  return next;
}

function stitchOrder(full: string[], visible: string[], nextVisible: string[]) {
  const visibleSet = new Set(visible);
  let index = 0;
  return full.map((slug) => (visibleSet.has(slug) ? nextVisible[index++] : slug));
}

function dropSide(event: DragEvent<HTMLElement>): boolean {
  const rect = event.currentTarget.getBoundingClientRect();
  const relX = rect.width ? (event.clientX - rect.left) / rect.width : 0.5;
  const relY = rect.height ? (event.clientY - rect.top) / rect.height : 0.5;
  return Math.abs(relY - 0.5) >= Math.abs(relX - 0.5) ? relY > 0.5 : relX > 0.5;
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 17v5" />
      <path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z" />
    </svg>
  );
}

function GripIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5" fill="currentColor">
      <circle cx="9" cy="6.5" r="1.15" />
      <circle cx="15" cy="6.5" r="1.15" />
      <circle cx="9" cy="12" r="1.15" />
      <circle cx="15" cy="12" r="1.15" />
      <circle cx="9" cy="17.5" r="1.15" />
      <circle cx="15" cy="17.5" r="1.15" />
    </svg>
  );
}

function DragHandle({ title, onDragStart, onDragEnd }: { title: string; onDragStart: (event: DragEvent<HTMLElement>) => void; onDragEnd: () => void }) {
  return (
    <span
      role="button"
      tabIndex={-1}
      draggable
      aria-label={`Drag to reorder ${title}`}
      title="Drag to reorder"
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      className="inline-flex shrink-0 cursor-grab items-center justify-center rounded-full border border-line bg-white px-2 py-1 text-muted select-none hover:border-wine/30 hover:text-wine active:cursor-grabbing"
    >
      <GripIcon />
    </span>
  );
}

function PinButton({ pinned, title, onToggle }: { pinned: boolean; title: string; onToggle: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={pinned}
      aria-label={pinned ? `Unpin ${title}` : `Pin ${title}`}
      onClick={onToggle}
      className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wine ${
        pinned ? "bg-wine-soft text-wine" : "border border-line bg-white text-muted hover:border-wine/30 hover:text-wine"
      }`}
    >
      <PinIcon />
      {pinned ? "Pinned" : "Pin"}
    </button>
  );
}

function Links({ p }: { p: Project }) {
  return (
    <div className="mt-auto flex flex-wrap gap-3 pt-5">
      {p.demo && (
        <a href={p.demo} target="_blank" rel="noopener noreferrer" className="text-[13px] font-medium text-wine hover:underline">
          Live demo →
        </a>
      )}
      {p.extraLinks?.map((l) => (
        <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="text-[13px] font-medium text-wine hover:underline">
          {l.label} →
        </a>
      ))}
      {p.github && (
        <a href={p.github} target="_blank" rel="noopener noreferrer" className="text-[13px] font-medium text-wine hover:underline">
          GitHub →
        </a>
      )}
    </div>
  );
}

type MoveProps = {
  source: boolean;
  hint: DropHint;
  onHandleDragStart: (event: DragEvent<HTMLElement>) => void;
  onHandleDragEnd: () => void;
  onCardDragOver: (event: DragEvent<HTMLElement>) => void;
  onCardDrop: (event: DragEvent<HTMLElement>) => void;
};

function cardClass(source: boolean, hint: DropHint) {
  return `${source ? "opacity-60" : ""} ${hint ? "outline outline-2 outline-wine/40" : ""}`;
}

function CaseStudy({ p, index, pinned, onToggle, drag }: { p: Project; index: number; pinned: boolean; onToggle: () => void; drag: MoveProps }) {
  const cs = p.caseStudy!;
  return (
    <Reveal
      as="article"
      data-slug={p.slug}
      delay={(index % 3) * 70}
      onDragOver={drag.onCardDragOver}
      onDrop={drag.onCardDrop}
      className={`card flex h-full flex-col p-7 ${cardClass(drag.source, drag.hint)}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-wine">{p.category}</p>
          <h3 className="mt-1.5 text-[1.35rem] font-semibold tracking-tight text-ink">{p.title}</h3>
          <p className="mt-1 text-[14px] text-wine">{p.subtitle}</p>
        </div>
        <div className="flex shrink-0 flex-wrap items-center justify-end gap-1.5">
          <DragHandle title={p.title} onDragStart={drag.onHandleDragStart} onDragEnd={drag.onHandleDragEnd} />
          <PinButton pinned={pinned} title={p.title} onToggle={onToggle} />
          {p.badge === "Live" && (
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-wine-soft px-2.5 py-1 text-[11px] font-medium text-wine">
              <span className="h-1.5 w-1.5 rounded-full bg-wine" /> Live
            </span>
          )}
        </div>
      </div>
      <dl className="mt-6 space-y-4">
        {(
          [
            ["Problem", cs.problem],
            ["Approach", cs.approach],
            ["Result", cs.result],
          ] as const
        ).map(([k, v]) => (
          <div key={k}>
            <dt className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted">{k}</dt>
            <dd className="mt-1.5 text-[14.5px] leading-relaxed text-body">{v}</dd>
          </div>
        ))}
      </dl>
      {p.metrics[0] && (
        <p className="mt-5 inline-flex self-start rounded-full border border-line px-3 py-1 text-[12px] text-muted">{p.metrics[0]}</p>
      )}
      <Links p={p} />
    </Reveal>
  );
}

function Card({ p, index, pinned, onToggle, drag }: { p: Project; index: number; pinned: boolean; onToggle: () => void; drag: MoveProps }) {
  return (
    <Reveal
      as="article"
      data-slug={p.slug}
      delay={(index % 3) * 60}
      onDragOver={drag.onCardDragOver}
      onDrop={drag.onCardDrop}
      className={`card flex h-full flex-col p-6 ${cardClass(drag.source, drag.hint)}`}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-[12px] font-medium text-wine">{p.category}</p>
        <div className="flex shrink-0 items-center gap-1.5">
          <DragHandle title={p.title} onDragStart={drag.onHandleDragStart} onDragEnd={drag.onHandleDragEnd} />
          <PinButton pinned={pinned} title={p.title} onToggle={onToggle} />
        </div>
      </div>
      <h3 className="mt-2 text-[17px] font-semibold leading-snug text-ink">{p.title}</h3>
      <p className="mt-1 text-[13px] text-muted">{p.subtitle}</p>
      <p className="mt-3 flex-1 text-[14px] leading-relaxed text-body">{p.summary}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {p.metrics.slice(0, 3).map((m) => (
          <span key={m} className="pill">
            {m}
          </span>
        ))}
      </div>
      <Links p={p} />
    </Reveal>
  );
}

function ProjectBlock({ p, index, pinned, onToggle, drag }: { p: Project; index: number; pinned: boolean; onToggle: () => void; drag: MoveProps }) {
  return p.caseStudy ? (
    <CaseStudy p={p} index={index} pinned={pinned} onToggle={onToggle} drag={drag} />
  ) : (
    <Card p={p} index={index} pinned={pinned} onToggle={onToggle} drag={drag} />
  );
}

export default function Projects() {
  const [filter, setFilter] = useState<Filter>("All");
  const [overrides, setOverrides] = useState<PinOverrides>({});
  const [order, setOrder] = useState<string[] | null>(null);
  const [dragging, setDragging] = useState<string | null>(null);
  const [dropTarget, setDropTarget] = useState<{ slug: string; after: boolean } | null>(null);
  const draggingRef = useRef<string | null>(null);

  useEffect(() => {
    setOverrides(readPinOverrides());
    setOrder(readOrder());
  }, []);

  useEffect(() => {
    if (!dragging) return;
    const previous = document.body.style.cursor;
    document.body.style.cursor = "grabbing";
    return () => {
      document.body.style.cursor = previous;
    };
  }, [dragging]);

  function togglePin(slug: string) {
    setOverrides((prev) => {
      const project = projects.find((item) => item.slug === slug);
      if (!project) return prev;
      const nextValue = !isPinned(project, prev);
      const next = { ...prev };
      if (nextValue === (project.pinned === true)) delete next[slug];
      else next[slug] = nextValue;
      writePinOverrides(next);
      return next;
    });
  }

  function clearDrag() {
    draggingRef.current = null;
    setDragging(null);
    setDropTarget(null);
  }

  function onHandleDragStart(event: DragEvent<HTMLElement>, slug: string) {
    event.dataTransfer.setData("text/plain", slug);
    event.dataTransfer.effectAllowed = "move";
    const card = event.currentTarget.closest("article");
    if (card) event.dataTransfer.setDragImage(card, 28, 28);
    draggingRef.current = slug;
    setDragging(slug);
  }

  function onCardDragOver(event: DragEvent<HTMLElement>, slug: string) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    const after = dropSide(event);
    setDropTarget((current) => (current?.slug === slug && current.after === after ? current : { slug, after }));
  }

  function onCardDrop(event: DragEvent<HTMLElement>, slug: string) {
    event.preventDefault();
    const from = event.dataTransfer.getData("text/plain") || draggingRef.current;
    const after = dropSide(event);
    clearDrag();
    if (!from || from === slug) return;
    setOrder((prev) => {
      const base = knownOrder(prev, overrides);
      const visible = orderedVisible(filter, overrides, prev).map((project) => project.slug);
      const nextVisible = reorderSlugs(visible, from, slug, after);
      const next = stitchOrder(base, visible, nextVisible);
      writeOrder(next);
      return next;
    });
  }

  const { items, counts } = useMemo(() => {
    const counts = Object.fromEntries(categories.map((c) => [c, projects.filter((p) => p.category === c).length])) as Record<
      Category,
      number
    >;
    return { items: orderedVisible(filter, overrides, order), counts };
  }, [filter, overrides, order]);

  const runs = useMemo(() => {
    const grouped: { kind: "study" | "card"; items: Project[] }[] = [];
    for (const project of items) {
      const kind = project.caseStudy ? "study" : "card";
      const last = grouped[grouped.length - 1];
      if (last?.kind === kind) last.items.push(project);
      else grouped.push({ kind, items: [project] });
    }
    return grouped;
  }, [items]);

  let seenStudy = false;
  let showedMore = false;

  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Case studies."
      sub="Agentic AI, GenAI, deep learning, ML and analytics. Complete end-to-end work."
    >
      <Reveal className="mb-10 flex flex-wrap gap-2" role="tablist" aria-label="Filter projects by category">
        {(["All", ...categories] as Filter[]).map((c) => {
          const active = filter === c;
          return (
            <button
              key={c}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(c)}
              className={`rounded-full border px-4 py-1.5 text-[13px] transition ${
                active ? "border-ink bg-ink text-white" : "border-line bg-white text-body hover:border-ink/30 hover:text-ink"
              }`}
            >
              {c}
              <span className="ml-1.5 text-[11px] opacity-60">{c === "All" ? projects.length : counts[c]}</span>
            </button>
          );
        })}
      </Reveal>

      {runs.map((run, runIndex) => {
        const showMore = run.kind === "card" && seenStudy && !showedMore;
        if (run.kind === "study") seenStudy = true;
        if (showMore) showedMore = true;
        const leadingCards = run.kind === "card" && runIndex === 0 && runs.some((item) => item.kind === "study");
        return (
          <div key={`${run.kind}-${run.items[0]?.slug ?? runIndex}`} className={showMore ? "mt-14" : runIndex === 0 ? "" : "mt-5"}>
            {showMore && <p className="eyebrow mb-5">More projects</p>}
            <div className={run.kind === "study" || leadingCards ? "grid gap-5 lg:grid-cols-2" : "grid gap-4 sm:grid-cols-2 lg:grid-cols-3"}>
              {run.items.map((project, index) => (
                <ProjectBlock
                  key={project.slug}
                  p={project}
                  index={index}
                  pinned={isPinned(project, overrides)}
                  onToggle={() => togglePin(project.slug)}
                  drag={{
                    source: dragging === project.slug,
                    hint: dropTarget?.slug === project.slug && dragging && dragging !== project.slug ? (dropTarget.after ? "after" : "before") : null,
                    onHandleDragStart: (event) => onHandleDragStart(event, project.slug),
                    onHandleDragEnd: clearDrag,
                    onCardDragOver: (event) => onCardDragOver(event, project.slug),
                    onCardDrop: (event) => onCardDrop(event, project.slug),
                  }}
                />
              ))}
            </div>
          </div>
        );
      })}
    </Section>
  );
}

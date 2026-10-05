import { education } from "@/data/education";
import { profile } from "@/data/profile";
import Reveal from "./Reveal";
import Section from "./Section";

export default function About() {
  return (
    <Section id="about" eyebrow="About" title={profile.tagline}>
      <div className="grid items-start gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <Reveal className="space-y-5">
          {profile.about.map((p) => (
            <p key={p} className="text-[16.5px] leading-[1.75] text-body">
              {p}
            </p>
          ))}
          <div className="flex flex-wrap gap-2 pt-2">
            {profile.languages.map((l) => (
              <span key={l.name} className="rounded-full border border-line bg-white px-3 py-1.5 text-[12px] text-body">
                {l.name} <span className="font-medium text-ink">{l.level}</span>
                <span className="text-muted"> · {l.note}</span>
              </span>
            ))}
          </div>
        </Reveal>

        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-3 gap-3">
            {profile.stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 70} className="card px-3 py-4 text-center">
                <div className="text-[1.65rem] font-semibold leading-none tracking-tight text-wine">{s.value}</div>
                <div className="mt-2 text-[11px] leading-snug text-muted">{s.label}</div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={160} className="card p-6">
            <p className="eyebrow">Education</p>
            <ol className="mt-4 space-y-4">
              {education.map((e) => (
                <li key={e.degree}>
                  <h3 className="text-[14.5px] font-semibold leading-snug text-ink">{e.degree}</h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-muted">
                    {e.school} · {e.period}
                  </p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

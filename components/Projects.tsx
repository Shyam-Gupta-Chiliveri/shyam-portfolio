"use client";

import { useMemo, useState } from "react";
import { categories, projects, type Category, type Project } from "@/data/projects";
import Reveal from "./Reveal";
import Section from "./Section";

type Filter = "All" | Category;

function Links({ p }: { p: Project }) {
  return (
    <div className="mt-auto flex flex-wrap gap-3 pt-5">
      {p.demo && (
        <a href={p.demo} target="_blank" rel="noopener noreferrer" className="text-[13px] font-medium text-wine hover:underline">
          Live demo →
        </a>
      )}
      {p.github && (
        <a href={p.github} target="_blank" rel="noopener noreferrer" className="text-[13px] font-medium text-wine hover:underline">
          GitHub →
        </a>
      )}
    </div>
  );
}

function CaseStudy({ p, index }: { p: Project; index: number }) {
  const cs = p.caseStudy!;
  return (
    <Reveal as="article" delay={(index % 3) * 70} className="card flex h-full flex-col p-7">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-wine">{p.category}</p>
          <h3 className="mt-1.5 text-[1.35rem] font-semibold tracking-tight text-ink">{p.title}</h3>
          <p className="mt-1 text-[14px] text-wine">{p.subtitle}</p>
        </div>
        {p.badge === "Live" && (
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-wine-soft px-2.5 py-1 text-[11px] font-medium text-wine">
            <span className="h-1.5 w-1.5 rounded-full bg-wine" /> Live
          </span>
        )}
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

function Card({ p, index }: { p: Project; index: number }) {
  return (
    <Reveal as="article" delay={(index % 3) * 60} className="card flex h-full flex-col p-6">
      <p className="text-[12px] font-medium text-wine">{p.category}</p>
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

export default function Projects() {
  const [filter, setFilter] = useState<Filter>("All");

  const { studies, others, counts } = useMemo(() => {
    const visible = filter === "All" ? projects : projects.filter((p) => p.category === filter);
    const counts = Object.fromEntries(categories.map((c) => [c, projects.filter((p) => p.category === c).length])) as Record<
      Category,
      number
    >;
    return { studies: visible.filter((p) => p.caseStudy), others: visible.filter((p) => !p.caseStudy), counts };
  }, [filter]);

  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Case studies."
      sub="Agentic AI, GenAI, deep learning, ML and analytics — complete end-to-end work."
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

      {studies.length > 0 && (
        <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-2">
          {studies.map((p, i) => (
            <CaseStudy key={p.slug} p={p} index={i} />
          ))}
        </div>
      )}

      {others.length > 0 && (
        <div className={studies.length ? "mt-14" : ""}>
          <p className="eyebrow mb-5">More projects</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((p, i) => (
              <Card key={p.slug} p={p} index={i} />
            ))}
          </div>
        </div>
      )}
    </Section>
  );
}

import { experience } from "@/data/experience";
import Reveal from "./Reveal";
import Section from "./Section";

export default function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="The story so far."
      sub="Four companies, one thread: from production ML to semantic digital twins."
    >
      <ol className="timeline space-y-14">
        {experience.map((company, i) => (
          <Reveal as="li" key={company.name} delay={i * 50} className="relative pl-8">
            <span className="timeline-dot" aria-hidden />
            <div className="mb-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="text-[1.35rem] font-semibold tracking-tight text-ink">{company.name}</h3>
              <p className="text-[14px] text-muted">
                {company.location} · {company.period}
              </p>
            </div>
            <div className="space-y-3">
              {company.roles.map((role) => (
                <article key={role.title + role.period} className="card p-6 sm:p-7">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h4 className="text-[17px] font-semibold text-ink">{role.title}</h4>
                      {role.subtitle && <p className="mt-1 text-[13.5px] leading-snug text-wine">{role.subtitle}</p>}
                    </div>
                    <p className="shrink-0 text-[13px] font-medium text-wine">{role.period}</p>
                  </div>
                  <ul className="mt-4 space-y-2">
                    {role.bullets.map((b) => (
                      <li key={b} className="text-[14.5px] leading-relaxed text-body">
                        {b}
                      </li>
                    ))}
                  </ul>
                  {role.links && (
                    <div className="mt-4 flex flex-wrap gap-3">
                      {role.links.map((l) => (
                        <a
                          key={l.href}
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[13px] font-medium text-wine hover:underline"
                        >
                          {l.label} →
                        </a>
                      ))}
                    </div>
                  )}
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {role.tags.map((t) => (
                      <span key={t} className="pill">
                        {t}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

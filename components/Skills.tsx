import { skills } from "@/data/skills";
import Reveal from "./Reveal";
import Section from "./Section";

export default function Skills() {
  return (
    <Section id="skills" eyebrow="Skills" title="What I bring to a team.">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((g, i) => (
          <Reveal key={g.title} delay={(i % 3) * 50} className="card p-6">
            <h3 className="text-[16px] font-semibold text-ink">{g.title}</h3>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {g.items.map((s) => (
                <li key={s} className="pill">
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

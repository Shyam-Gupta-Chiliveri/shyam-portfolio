import { certifications, type Certification } from "@/data/certifications";
import Reveal from "./Reveal";
import Section from "./Section";

function CertCard({ c, index }: { c: Certification; index: number }) {
  const letter = (c.short[0] ?? "C").toUpperCase();
  const body = (
    <>
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-wine text-[17px] font-semibold text-white" aria-hidden>
        {letter}
      </span>
      <h3 className="mt-5 text-[17px] font-semibold text-ink">{c.short}</h3>
      <p className="mt-1 text-[14px] leading-snug text-body">{c.name}</p>
      <p className="mt-3 text-[13px] text-muted">{c.org}</p>
      {c.inProgress ? (
        <p className="mt-5 text-[13px] font-medium text-wine">In progress</p>
      ) : (
        c.url && <p className="mt-5 text-[13px] font-medium text-wine">{c.verifyLabel ?? "Verify"} →</p>
      )}
    </>
  );

  const cls = "card flex h-full flex-col p-6 transition-transform duration-200 hover:-translate-y-0.5";
  return (
    <Reveal delay={(index % 3) * 60} className="h-full">
      {c.url ? (
        <a href={c.url} target="_blank" rel="noopener noreferrer" aria-label={`${c.verifyLabel ?? "Verify"}: ${c.name}`} className={cls}>
          {body}
        </a>
      ) : (
        <div className={cls}>{body}</div>
      )}
    </Reveal>
  );
}

export default function Certifications() {
  return (
    <Section id="certifications" eyebrow="Certifications" title="Credentials, verified.">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((c, i) => (
          <CertCard key={c.name} c={c} index={i} />
        ))}
      </div>
    </Section>
  );
}

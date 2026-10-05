import { profile } from "@/data/profile";
import Reveal from "./Reveal";

const items = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { label: "Phone", value: profile.phone, href: profile.phoneHref },
  { label: "LinkedIn", value: profile.linkedinHandle, href: profile.linkedin, external: true },
];

export default function Contact() {
  return (
    <section id="contact" className="glow scroll-mt-24 px-6 py-20 sm:px-10 sm:py-24 lg:px-16">
      <div className="mx-auto w-full max-w-[1120px]">
        <Reveal>
          <p className="eyebrow">Contact</p>
          <h2 className="mt-3 text-[clamp(2rem,4.4vw,3.35rem)] font-semibold leading-[1.08] tracking-tight text-ink">
            {profile.contact.title}
          </h2>
          <p className="mt-4 text-[17px] text-body">{profile.contact.sub}</p>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {items.map((it, i) => (
            <Reveal key={it.label} delay={i * 70}>
              <a
                href={it.href}
                {...(it.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="card block p-6 transition hover:-translate-y-0.5"
              >
                <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted">{it.label}</span>
                <span className="mt-3 block text-[16px] font-medium text-ink">{it.value}</span>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8" delay={200}>
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex rounded-full bg-ink px-6 py-3 text-sm font-medium text-white transition hover:bg-wine"
          >
            Talk to Me
          </a>
        </Reveal>
      </div>
    </section>
  );
}

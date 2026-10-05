import type { ReactNode } from "react";
import Reveal from "./Reveal";

type Props = {
  id: string;
  eyebrow: string;
  title: string;
  sub?: string;
  children: ReactNode;
  className?: string;
};

export default function Section({ id, eyebrow, title, sub, children, className = "" }: Props) {
  return (
    <section id={id} className={`scroll-mt-24 px-6 py-20 sm:px-10 sm:py-24 lg:px-16 ${className}`}>
      <div className="mx-auto w-full max-w-[1120px]">
        <Reveal className="mb-12 max-w-2xl">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="mt-3 text-[clamp(2rem,4.4vw,3.35rem)] font-semibold leading-[1.08] tracking-tight text-ink">{title}</h2>
          {sub && <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-body">{sub}</p>}
        </Reveal>
        {children}
      </div>
    </section>
  );
}

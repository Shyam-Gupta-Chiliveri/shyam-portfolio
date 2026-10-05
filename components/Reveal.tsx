"use client";

import { useEffect, useRef, type CSSProperties, type ElementType, type HTMLAttributes, type ReactNode } from "react";

type Props = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  /** Stagger delay in ms. */
  delay?: number;
  as?: ElementType;
};

/** Fades/slides children in the first time they enter the viewport. */
export default function Reveal({ children, className = "", delay = 0, as: Tag = "div", style, ...rest }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            el.classList.add("is-in");
            io.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`reveal ${className}`} style={{ "--reveal-delay": `${delay}ms`, ...style } as CSSProperties} {...rest}>
      {children}
    </Tag>
  );
}

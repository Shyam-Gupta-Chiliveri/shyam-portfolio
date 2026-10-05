"use client";

import { useEffect, useState } from "react";
import { profile } from "@/data/profile";

const links = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#certifications", label: "Certifications" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.72);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const light = !scrolled && !open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        light ? "bg-transparent" : "border-b border-line bg-white/85 backdrop-blur-xl"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-ink focus:px-3 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>
      <nav aria-label="Primary" className="mx-auto flex h-[4.25rem] w-full max-w-[1400px] items-center justify-between px-6 sm:px-10 lg:px-14">
        <a
          href="#top"
          className={`text-[12px] font-medium tracking-[0.28em] ${light ? "text-white" : "text-ink"}`}
          title="Back to top"
        >
          SHYAM
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className={`text-[14px] transition ${light ? "text-white/85 hover:text-white" : "text-body hover:text-ink"}`}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className={`relative flex h-10 w-10 items-center justify-center rounded-full lg:hidden ${light ? "text-white" : "text-ink"}`}
        >
          <span className={`absolute h-px w-5 bg-current transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-1.5"}`} />
          <span className={`absolute h-px w-5 bg-current transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
          <span className={`absolute h-px w-5 bg-current transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-1.5"}`} />
        </button>
      </nav>

      <div id="mobile-menu" className={`lg:hidden ${open ? "block" : "hidden"} border-t border-line bg-white`}>
        <ul className="flex flex-col px-6 py-4">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)} className="block border-b border-line py-3.5 text-base text-ink">
                {l.label}
              </a>
            </li>
          ))}
          <li className="flex gap-3 pt-5">
            <a href={`mailto:${profile.email}`} className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white">
              Talk to Me
            </a>
            <a href={profile.resume} download className="rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink">
              Download Resume
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}

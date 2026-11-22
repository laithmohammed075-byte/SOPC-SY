"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { images, company } from "@/content/site";

export function Reveal({
  children,
  delay = 0,
  className,
  y = 24,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`tracking-eyebrow inline-flex items-center gap-3 text-xs font-bold uppercase text-brand ${className}`}>
      <span aria-hidden className="h-px w-8 bg-gold" />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "center",
  id,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  align?: "center" | "start";
  id?: string;
}) {
  const center = align === "center";
  return (
    <Reveal className={center ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}>
      <Eyebrow className={center ? "justify-center" : ""}>{eyebrow}</Eyebrow>
      <h2 id={id} className="font-display mt-4 text-3xl leading-tight text-ink sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      <div aria-hidden className={`mt-5 flex items-center gap-2 ${center ? "justify-center" : ""}`}>
        <span className="h-[2px] w-10 rounded-full bg-brand" />
        <span className="h-[2px] w-4 rounded-full bg-gold" />
      </div>
      {intro && <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">{intro}</p>}
    </Reveal>
  );
}

export function Logo({ size = 72, priority = false }: { size?: number; priority?: boolean }) {
  return (
    <Image
      src={images.logo}
      alt={`${company.shortName} — ${company.nameEn}`}
      width={size}
      height={size}
      priority={priority}
      className="h-auto select-none"
      style={{ width: size, height: size }}
    />
  );
}

/** Smoothly scroll to an in-page anchor and move focus for keyboard / screen-reader users. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) {
    // Not on the home page (e.g. a service page): navigate home to that section.
    window.location.hash = id;
    return;
  }
  el.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
}

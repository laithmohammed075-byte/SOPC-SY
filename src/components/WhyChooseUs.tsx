"use client";

import { Layers, Handshake, ShieldCheck, Wrench } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { Reveal, SectionHeading } from "./ui";

const icons = [Wrench, ShieldCheck, Layers, Handshake];

export function WhyChooseUs() {
  const { t } = useLanguage();
  return (
    <section id="why" aria-labelledby="why-title" className="relative overflow-hidden bg-mint py-20 sm:py-24 lg:py-28">
      <div aria-hidden className="absolute -start-24 -top-24 h-80 w-80 rounded-full bg-surface/70 blur-3xl" />
      <div aria-hidden className="absolute -bottom-24 -end-24 h-80 w-80 rounded-full bg-gold-soft/50 blur-3xl dark:opacity-10" />
      <svg aria-hidden className="absolute end-10 top-16 hidden h-40 w-40 text-brand/10 lg:block" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M50 10 L84 30 L84 70 L50 90 L16 70 L16 30 Z" />
        <path d="M50 30 L67 40 L67 60 L50 70 L33 60 L33 40 Z" />
      </svg>

      <div className="relative mx-auto max-w-[1240px] px-5 sm:px-8">
        <SectionHeading id="why-title" eyebrow={t.why.eyebrow} title={t.why.title} />
        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.why.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <li key={item.title}>
                <Reveal delay={0.08 * i} className="h-full">
                  <div className="glass group relative h-full overflow-hidden rounded-3xl p-7 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift">
                    <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-linear-to-r from-brand to-gold transition-transform duration-500 group-hover:scale-x-100 rtl:origin-right" />
                    <span className="font-display absolute end-6 top-5 text-4xl text-brand/10" aria-hidden>
                      0{i + 1}
                    </span>
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-surface text-brand shadow-sm ring-1 ring-gold/40">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <h3 className="mt-6 text-lg font-bold text-ink">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

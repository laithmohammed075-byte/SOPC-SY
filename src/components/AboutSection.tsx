"use client";

import { ArrowRight, Award, Cog, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { IndustrialIllustration } from "./IndustrialIllustration";
import { Eyebrow, Reveal } from "./ui";

const icons = [Cog, ShieldCheck, Award];

export function AboutSection() {
  const { t } = useLanguage();
  return (
    <section id="about" aria-labelledby="about-title" className="relative overflow-hidden bg-offwhite pb-20 pt-10 sm:pb-24 sm:pt-12 lg:pb-28 lg:pt-14">
      <div aria-hidden className="absolute -end-40 top-10 h-96 w-96 rounded-full bg-mint blur-3xl" />
      <div aria-hidden className="absolute -start-32 bottom-0 h-72 w-72 rounded-full bg-gold-soft/40 blur-3xl" />

      <div className="relative mx-auto grid max-w-[1240px] items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        <Reveal className="relative order-2 lg:order-none">
          <div className="relative mx-auto max-w-[560px]">
            <div aria-hidden className="absolute -inset-4 rounded-[2.5rem] border border-dashed border-brand/20" />
            <div className="rounded-[2rem] bg-white p-3 shadow-lift sm:p-4">
              <IndustrialIllustration label={t.about.illustration} />
            </div>
            <div className="glass absolute -bottom-6 end-4 flex items-center gap-3 rounded-2xl px-5 py-3 shadow-soft sm:end-8">
              <span className="font-display text-2xl text-brand">SOPC</span>
              <span className="h-8 w-px bg-gold" />
              <span className="max-w-36 text-xs leading-snug text-muted">{t.about.subtitle}</span>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <Eyebrow>{t.about.eyebrow}</Eyebrow>
            <h2 id="about-title" className="font-display mt-4 text-4xl leading-tight text-ink sm:text-5xl">
              {t.about.title}
            </h2>
            <p className="mt-3 text-lg font-semibold text-brand">{t.about.subtitle}</p>
            <div aria-hidden className="mt-5 flex items-center gap-2">
              <span className="h-[2px] w-10 rounded-full bg-brand" />
              <span className="h-[2px] w-4 rounded-full bg-gold" />
            </div>
            <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">{t.about.body}</p>
          </Reveal>

          <ul className="mt-9 grid gap-4 sm:grid-cols-3">
            {t.about.features.map((f, i) => {
              const Icon = icons[i];
              return (
                <li key={f.title}>
                <Reveal delay={0.08 * i} className="h-full">
                  <div className="group h-full rounded-2xl border border-line bg-white/80 p-5 shadow-soft backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-lift">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-mint text-brand ring-1 ring-gold/40 transition-colors group-hover:bg-brand group-hover:text-white">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <h3 className="mt-4 text-[0.95rem] font-bold text-ink">{f.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{f.text}</p>
                  </div>
                </Reveal>
                </li>
              );
            })}
          </ul>

          <Reveal delay={0.2}>
            <a
              href="#why"
              className="group mt-9 inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-bold text-white shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-2 hover:shadow-lift"
            >
              {t.about.cta}
              <ArrowRight className="rtl-flip h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

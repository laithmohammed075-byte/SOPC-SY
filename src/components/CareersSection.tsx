"use client";

import { ArrowRight, Briefcase } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { SELECT_SERVICE_EVENT } from "./ServicesSection";
import { Eyebrow, Reveal, scrollToId } from "./ui";

export function CareersSection() {
  const { t } = useLanguage();
  return (
    <section id="careers" aria-labelledby="careers-title" className="bg-white pb-20 sm:pb-24">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-line bg-linear-to-br from-white via-offwhite to-mint px-6 py-10 sm:px-12 sm:py-12">
            <span aria-hidden className="gold-rule absolute inset-x-12 top-0" />
            <div aria-hidden className="absolute -end-24 -top-28 h-56 w-56 rounded-full border border-dashed border-brand/20" />
            <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div className="flex gap-5">
                <span className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-brand shadow-soft ring-1 ring-gold/40 sm:inline-flex">
                  <Briefcase className="h-6 w-6" aria-hidden />
                </span>
                <div className="max-w-2xl">
                  <Eyebrow>{t.careers.eyebrow}</Eyebrow>
                  <h2 id="careers-title" className="font-display mt-3 text-3xl text-ink sm:text-4xl">
                    {t.careers.title}
                  </h2>
                  <p className="mt-3 leading-relaxed text-muted">{t.careers.text}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  window.dispatchEvent(new CustomEvent(SELECT_SERVICE_EVENT, { detail: "careers" }));
                  scrollToId("contact");
                }}
                className="group inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-full border-[1.5px] border-brand px-7 py-3.5 text-sm font-bold text-brand transition-all duration-300 hover:bg-brand hover:text-white md:self-center"
              >
                {t.careers.cta}
                <ArrowRight className="rtl-flip h-4 w-4" aria-hidden />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

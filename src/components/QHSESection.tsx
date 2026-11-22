"use client";

import { BadgeCheck, HardHat, Leaf } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { images } from "@/content/site";
import { useLanguage } from "@/lib/i18n";
import { Reveal } from "./ui";

const icons = [BadgeCheck, HardHat, Leaf];

export function QHSESection() {
  const { t } = useLanguage();
  const [failed, setFailed] = useState(false);

  return (
    <section id="qhse" aria-labelledby="qhse-title" className="relative bg-linear-to-b from-mint/70 via-offwhite to-white pb-20 pt-28 sm:pb-24 lg:pb-28 lg:pt-32">
      {/* curved top edge */}
      <svg aria-hidden viewBox="0 0 1440 60" preserveAspectRatio="none" className="absolute inset-x-0 top-0 h-10 w-full sm:h-14">
        <path d="M0,0 H1440 V18 C1080,58 360,58 0,18 Z" fill="#FFFFFF" />
        <path d="M0,18 C360,58 1080,58 1440,18" fill="none" stroke="#D6AD43" strokeOpacity="0.6" strokeWidth="1.25" vectorEffect="non-scaling-stroke" />
      </svg>

      {/* Overlapping circular QHSE title element */}
      <div className="absolute inset-x-0 -top-16 z-10 flex justify-center sm:-top-[4.5rem]">
        <Reveal y={12}>
          <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-brand shadow-lift sm:h-36 sm:w-36">
            <span aria-hidden className="absolute -inset-2 rounded-full border border-gold/70" />
            <span aria-hidden className="absolute -inset-4 rounded-full border border-dashed border-brand/30" />
            <span aria-hidden className="absolute inset-2 rounded-full border border-white/25" />
            <div className="text-center text-white">
              <p className="font-display text-3xl font-semibold tracking-wide sm:text-[2.1rem]" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                {t.qhse.badge}
              </p>
              <span aria-hidden className="mx-auto mt-1 block h-px w-10 bg-gold" />
            </div>
          </div>
        </Reveal>
      </div>

      <div className="mx-auto grid max-w-[1240px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div className="relative">
            <div aria-hidden className="absolute -bottom-5 -start-5 h-2/3 w-2/3 rounded-[2rem] bg-mint" />
            <div aria-hidden className="absolute -end-4 -top-4 h-24 w-24 rounded-full border-2 border-dashed border-gold/50" />
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-lift ring-1 ring-white">
              {failed ? (
                <div className="h-full w-full bg-linear-to-br from-mint to-gold-soft" aria-hidden />
              ) : (
                <Image
                  src={images.qhse.src}
                  alt={t.qhse.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 600px, 100vw"
                  quality={80}
                  className="object-cover object-[center_80%]"
                  onError={() => setFailed(true)}
                />
              )}
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="tracking-eyebrow inline-flex items-center gap-3 text-xs font-bold uppercase text-brand">
              <span aria-hidden className="h-px w-8 bg-gold" />
              {t.qhse.badge}
            </p>
            <h2 id="qhse-title" className="font-display mt-4 text-3xl leading-tight text-ink sm:text-4xl lg:text-[2.6rem]">
              {t.qhse.title}
            </h2>
            <div aria-hidden className="mt-5 flex items-center gap-2">
              <span className="h-[2px] w-10 rounded-full bg-brand" />
              <span className="h-[2px] w-4 rounded-full bg-gold" />
            </div>
            <p className="mt-6 text-lg leading-relaxed text-ink/90">{t.qhse.body}</p>
            <p className="mt-4 leading-relaxed text-muted">{t.qhse.body2}</p>
          </Reveal>

          <ul className="mt-9 grid gap-4 sm:grid-cols-3">
            {t.qhse.features.map((f, i) => {
              const Icon = icons[i];
              return (
                <li key={f.title}>
                  <Reveal delay={0.08 * i} className="h-full">
                    <div className="group h-full rounded-2xl border border-line bg-white p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand/30">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-mint text-brand ring-1 ring-gold/50 transition-colors group-hover:bg-brand group-hover:text-white">
                        <Icon className="h-5 w-5" aria-hidden />
                      </span>
                      <h3 className="mt-3 font-bold text-ink">{f.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{f.text}</p>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

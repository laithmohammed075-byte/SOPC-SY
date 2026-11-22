"use client";

import { ArrowUpRight, Info } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { images } from "@/content/site";
import { useLanguage } from "@/lib/i18n";
import { Reveal, SectionHeading } from "./ui";

function ProjectImage({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <div className="absolute inset-0 bg-linear-to-br from-mint via-white to-gold-soft" aria-hidden />;
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
      quality={75}
      className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]"
      onError={() => setFailed(true)}
    />
  );
}

export function ProjectsSection() {
  const { t } = useLanguage();
  return (
    <section id="projects" aria-labelledby="projects-title" className="bg-white pb-28 pt-8 sm:pb-32 sm:pt-10 lg:pb-36 lg:pt-12">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <SectionHeading id="projects-title" eyebrow={t.projects.eyebrow} title={t.projects.title} intro={t.projects.intro} />

        <ul className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {t.projects.items.map((p, i) => (
            <li key={p.title} className={i === 2 ? "sm:col-span-2 lg:col-span-1" : ""}>
              <Reveal delay={0.1 * i} className="h-full">
                <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift">
                  <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[16/11]">
                    <ProjectImage src={images.projects[i].src} alt={p.alt} />
                    <span className="glass absolute start-4 top-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.7rem] font-bold uppercase tracking-wider text-brand">
                      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-gold" />
                      {t.projects.illustrative}
                    </span>
                  </div>
                  <div className="relative flex flex-1 flex-col p-6 sm:p-7">
                    <span aria-hidden className="absolute inset-x-7 top-0 h-px bg-linear-to-r from-gold/70 to-transparent rtl:bg-linear-to-l" />
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold-deep">{p.category}</p>
                    <h3 className="font-display mt-2 text-2xl text-ink">{p.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{p.text}</p>
                    <span
                      aria-hidden
                      className="mt-6 inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand/40 text-brand transition-all duration-300 group-hover:border-brand group-hover:bg-brand group-hover:text-white"
                    >
                      <ArrowUpRight className="rtl-flip h-5 w-5" />
                    </span>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal>
          <p className="mx-auto mt-10 flex max-w-2xl items-start justify-center gap-2 text-center text-sm text-muted">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" aria-hidden />
            {t.projects.note}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

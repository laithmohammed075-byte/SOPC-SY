"use client";

import { ArrowLeft, ArrowRight, ChevronRight, Info } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { images, serviceIds, type ServiceId } from "@/content/site";
import { useLanguage } from "@/lib/i18n";
import { selectService, servicePath } from "@/lib/route";
import { serviceIcons } from "./ServicesSection";
import { WaveDivider } from "./WaveDivider";
import { Eyebrow, Reveal } from "./ui";

/** Full page for one service, shown at #/services/<id>. */
export function ServicePage({ id }: { id: ServiceId }) {
  const { t, dir } = useLanguage();
  const item = t.services.items[id];
  const Icon = serviceIcons[id];
  const others = serviceIds.filter((s) => s !== id);
  const [imgFailed, setImgFailed] = useState(false);
  const BackIcon = dir === "rtl" ? ArrowRight : ArrowLeft;

  // A new page starts at the top, with its title as the document title.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    const previous = document.title;
    document.title = `${item.title} | SOPC`;
    return () => {
      document.title = previous;
    };
  }, [id, item.title]);

  const discuss = () => {
    selectService(id);
    window.location.hash = "contact";
  };

  return (
    <article aria-labelledby="service-title">
      {/* Banner */}
      <header className="relative isolate overflow-hidden bg-mint pb-28 pt-14 sm:pb-36 sm:pt-20 lg:pb-44 lg:pt-24">
        <div aria-hidden className="absolute inset-0 -z-10">
          {!imgFailed && (
            <Image
              src={images.services.src}
              alt=""
              fill
              priority
              sizes="100vw"
              quality={70}
              className="object-cover"
              onError={() => setImgFailed(true)}
            />
          )}
          <div className="absolute inset-0 bg-white/70" />
          <div className="absolute inset-0 bg-linear-to-r from-white via-white/80 to-white/20 rtl:bg-linear-to-l" />
        </div>

        <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
              <li>
                <a href="#home" className="hover:text-brand">
                  {t.nav.home}
                </a>
              </li>
              <li aria-hidden>
                <ChevronRight className="rtl-flip h-3.5 w-3.5" />
              </li>
              <li>
                <a href="#services" className="hover:text-brand">
                  {t.nav.services}
                </a>
              </li>
              <li aria-hidden>
                <ChevronRight className="rtl-flip h-3.5 w-3.5" />
              </li>
              <li aria-current="page" className="font-semibold text-brand">
                {item.title}
              </li>
            </ol>
          </nav>

          <Reveal className="mt-8 max-w-3xl">
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white text-brand shadow-soft ring-1 ring-gold/60">
              <Icon className="h-7 w-7" aria-hidden />
            </span>
            <Eyebrow className="mt-6 flex">{t.services.eyebrow}</Eyebrow>
            <h1 id="service-title" className="font-display mt-3 text-4xl leading-tight text-ink sm:text-5xl lg:text-6xl">
              {item.title}
            </h1>
            <p className="mt-5 text-lg font-semibold text-brand sm:text-xl">{item.short}</p>
          </Reveal>
        </div>
        <WaveDivider fill="#FFFFFF" />
      </header>

      {/* Body */}
      <section className="bg-white pb-20 pt-6 sm:pb-24">
        <div className="mx-auto grid max-w-[1240px] gap-10 px-5 sm:px-8 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <Reveal>
            <p className="text-lg leading-relaxed text-ink/90">{item.body}</p>
            <p className="mt-6 flex items-start gap-2 rounded-2xl bg-gold-soft/50 p-4 text-sm font-medium text-[#6d5517]">
              <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
              {t.services.draftNote}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={discuss}
                className="group inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-bold text-white shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-2 hover:shadow-lift"
              >
                {t.services.discuss}
                <ArrowRight className="rtl-flip h-4 w-4" aria-hidden />
              </button>
              <a
                href="#services"
                className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-brand px-7 py-3.5 text-sm font-bold text-brand transition-colors hover:bg-brand hover:text-white"
              >
                <BackIcon className="h-4 w-4" aria-hidden />
                {t.services.backToServices}
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <aside className="rounded-3xl border border-line bg-offwhite p-6 sm:p-7">
              <h2 className="font-display text-xl text-ink">{t.services.otherServices}</h2>
              <span aria-hidden className="mt-3 block h-px w-8 bg-gold" />
              <ul className="mt-5 space-y-2">
                {others.map((o) => {
                  const OIcon = serviceIcons[o];
                  return (
                    <li key={o}>
                      <a
                        href={servicePath(o)}
                        className="group flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-ink shadow-sm ring-1 ring-line transition-all hover:-translate-y-0.5 hover:text-brand hover:ring-brand/30"
                      >
                        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-mint text-brand ring-1 ring-gold/50">
                          <OIcon className="h-4 w-4" aria-hidden />
                        </span>
                        <span className="flex-1">{t.services.items[o].title}</span>
                        <ArrowRight className="rtl-flip h-4 w-4 text-brand/60 transition-transform group-hover:translate-x-0.5" aria-hidden />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </aside>
          </Reveal>
        </div>
      </section>
    </article>
  );
}

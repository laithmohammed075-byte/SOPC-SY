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
      <header className="relative isolate overflow-hidden bg-white pb-28 pt-14 sm:pb-36 sm:pt-20 lg:pb-44 lg:pt-24">
        {/* The service's own photo, large and softly faded behind the text */}
        <div aria-hidden className="absolute inset-0 -z-10">
          {!imgFailed && (
            <Image
              key={id}
              src={images.serviceImages[id].src}
              alt=""
              fill
              priority
              sizes="100vw"
              quality={75}
              className="object-cover opacity-45"
              onError={() => setImgFailed(true)}
            />
          )}
          <div className="absolute inset-0 bg-linear-to-r from-white/95 via-white/70 to-white/10 rtl:bg-linear-to-l" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-white/80 to-transparent" />
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
            <span className="relative block h-28 w-28 sm:h-32 sm:w-32">
              <span className="absolute inset-0 overflow-hidden rounded-full border-[3px] border-white shadow-lift ring-[1.5px] ring-brand/70">
                <Image src={images.serviceImages[id].src} alt="" fill sizes="128px" style={{ objectPosition: images.serviceImages[id].focus }} className="object-cover" />
              </span>
              <span className="absolute -bottom-1 -end-1 inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-brand text-white ring-1 ring-gold/70">
                <Icon className="h-[1.1rem] w-[1.1rem]" aria-hidden />
              </span>
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
                  return (
                    <li key={o}>
                      <a
                        href={servicePath(o)}
                        className="group flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-ink shadow-sm ring-1 ring-line transition-all hover:-translate-y-0.5 hover:text-brand hover:ring-brand/30"
                      >
                        <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-1 ring-brand/40">
                          <Image src={images.serviceImages[o].src} alt="" fill sizes="40px" style={{ objectPosition: images.serviceImages[o].focus }} className="object-cover" />
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

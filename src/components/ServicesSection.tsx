"use client";

import { ArrowRight, Container, Droplets, Gauge, Presentation, Wrench, type LucideIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { images, serviceIds, type ServiceId } from "@/content/site";
import { useLanguage } from "@/lib/i18n";
import { servicePath } from "@/lib/route";
import { Reveal, SectionHeading } from "./ui";

export const serviceIcons: Record<ServiceId, LucideIcon> = {
  "crude-oil": Droplets,
  "well-maintenance": Wrench,
  "pumping-stations": Gauge,
  "import-export": Container,
  training: Presentation,
};

export function ServicesSection() {
  const { t } = useLanguage();
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <section id="services" aria-labelledby="services-title" className="relative isolate overflow-hidden py-20 sm:py-24 lg:py-32">
      {/* Bright industrial backdrop with a light veil (no heavy dark filter) */}
      <div aria-hidden className="absolute inset-0 -z-10">
        {!imgFailed && (
          <Image
            src={images.services.src}
            alt=""
            fill
            sizes="100vw"
            quality={70}
            className="object-cover"
            onError={() => setImgFailed(true)}
          />
        )}
        <div className="absolute inset-0 bg-white/55" />
        <div className="absolute inset-0 bg-linear-to-b from-offwhite via-transparent via-30% to-white" />
        <div className="absolute inset-x-0 top-0 h-[55%] bg-[radial-gradient(ellipse_60%_70%_at_50%_45%,rgba(255,255,255,0.9),transparent_75%)]" />
      </div>

      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <SectionHeading id="services-title" eyebrow={t.services.eyebrow} title={t.services.title} intro={t.services.intro} />

        <ul className="mt-14 flex flex-wrap justify-center gap-x-4 gap-y-8 sm:gap-x-8 sm:gap-y-10 lg:mt-20 lg:flex-nowrap lg:gap-x-6 xl:gap-x-8">
          {serviceIds.map((id, i) => {
            const Icon = serviceIcons[id];
            const item = t.services.items[id];
            return (
              <li key={id} className={`w-[calc(50%-0.5rem)] sm:w-56 lg:w-auto lg:flex-1 ${i % 2 === 1 ? "lg:translate-y-12" : ""}`}>
                <Reveal delay={0.08 * i} className="flex justify-center">
                  {/* Each circle opens its own service page (#/services/<id>) */}
                  <a href={servicePath(id)} className="group flex w-full flex-col items-center text-center">
                    <span className="relative block aspect-square w-[8.75rem] min-[400px]:w-36 sm:w-44 lg:w-[11rem] xl:w-[12rem]">
                      {/* dashed outer ring */}
                      <span
                        aria-hidden
                        className="absolute -inset-2.5 rounded-full border border-dashed border-brand/40 transition-all duration-700 group-hover:rotate-45 group-hover:border-gold sm:-inset-3"
                      />
                      {/* photo */}
                      <span className="absolute inset-0 overflow-hidden rounded-full border-[3px] border-white bg-mint shadow-soft ring-[1.5px] ring-brand/70 transition-all duration-500 group-hover:shadow-lift group-hover:ring-brand">
                        <Image
                          src={images.serviceImages[id]}
                          alt=""
                          fill
                          sizes="(min-width: 1280px) 192px, (min-width: 640px) 176px, 144px"
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.08]"
                        />
                      </span>
                      {/* icon badge */}
                      <span className="absolute -bottom-3 left-1/2 inline-flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full border-2 border-white bg-brand text-white shadow-soft ring-1 ring-gold/70 transition-colors duration-500 group-hover:bg-gold sm:h-12 sm:w-12">
                        <Icon className="h-5 w-5" aria-hidden />
                      </span>
                    </span>
                    <span className="mt-6 max-w-[11rem] text-[0.85rem] font-bold leading-snug text-ink transition-colors group-hover:text-brand sm:max-w-[12rem] sm:text-[0.98rem]">
                      {item.title}
                    </span>
                    <span className="mt-1.5 inline-flex items-center gap-1 text-[0.68rem] font-semibold uppercase tracking-wider text-brand opacity-70 transition-opacity group-hover:opacity-100 sm:text-[0.7rem]">
                      {t.services.learnMore}
                      <ArrowRight className="rtl-flip h-3 w-3" aria-hidden />
                    </span>
                  </a>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

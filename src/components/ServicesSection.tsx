"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, DraftingCompass, Droplets, Factory, FlaskConical, Handshake, X, type LucideIcon } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { images, serviceIds, type ServiceId } from "@/content/site";
import { useLanguage } from "@/lib/i18n";
import { Reveal, SectionHeading, scrollToId } from "./ui";

export const serviceIcons: Record<ServiceId, LucideIcon> = {
  "oil-gas": Droplets,
  petrochemical: FlaskConical,
  engineering: DraftingCompass,
  fabrication: Factory,
  "technical-commercial": Handshake,
};

/** Event used to pre-select a service in the contact form. */
export const SELECT_SERVICE_EVENT = "sopc:select-service";

function ServiceDialog({ id, onClose }: { id: ServiceId; onClose: () => void }) {
  const { t } = useLanguage();
  const closeRef = useRef<HTMLButtonElement>(null);
  const item = t.services.items[id];
  const Icon = serviceIcons[id];

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      prev?.focus?.();
    };
  }, [onClose]);

  const discuss = () => {
    window.dispatchEvent(new CustomEvent(SELECT_SERVICE_EVENT, { detail: id }));
    onClose();
    window.setTimeout(() => scrollToId("contact"), 50);
  };

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button aria-label={t.services.close} tabIndex={-1} onClick={onClose} className="absolute inset-0 bg-ink/25 backdrop-blur-sm" />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="service-dialog-title"
        initial={{ y: 40, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 30, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-lg rounded-t-3xl border border-line bg-white p-7 shadow-lift sm:rounded-3xl sm:p-9"
      >
        <span aria-hidden className="gold-rule absolute inset-x-10 top-0" />
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={t.services.close}
          className="absolute end-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full text-muted transition-colors hover:bg-mint hover:text-brand"
        >
          <X className="h-5 w-5" />
        </button>
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-mint text-brand ring-1 ring-gold/50">
          <Icon className="h-6 w-6" aria-hidden />
        </span>
        <h3 id="service-dialog-title" className="font-display mt-5 text-2xl text-ink sm:text-3xl">
          {item.title}
        </h3>
        <p className="mt-2 font-semibold text-brand">{item.short}</p>
        <p className="mt-4 leading-relaxed text-muted">{item.body}</p>
        <p className="mt-5 rounded-xl bg-gold-soft/50 px-4 py-3 text-xs font-medium text-[#6d5517]">{t.services.draftNote}</p>
        <button
          type="button"
          onClick={discuss}
          className="group mt-7 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-2"
        >
          {t.services.discuss}
          <ArrowRight className="rtl-flip h-4 w-4" aria-hidden />
        </button>
      </motion.div>
    </motion.div>
  );
}

export function ServicesSection() {
  const { t } = useLanguage();
  const [open, setOpen] = useState<ServiceId | null>(null);
  const [imgFailed, setImgFailed] = useState(false);

  // Deep links: #service-<id> opens the matching service details.
  useEffect(() => {
    const sync = () => {
      const m = window.location.hash.match(/^#service-(.+)$/);
      if (m && (serviceIds as readonly string[]).includes(m[1])) setOpen(m[1] as ServiceId);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const close = useCallback(() => {
    setOpen(null);
    if (window.location.hash.startsWith("#service-")) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  }, []);

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
              <li key={id} className={`w-[calc(50%-0.5rem)] sm:w-auto ${i % 2 === 1 ? "lg:translate-y-12" : ""}`}>
                <Reveal delay={0.08 * i} className="flex justify-center">
                  <a
                    id={`service-${id}`}
                    href={`#service-${id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      history.replaceState(null, "", `#service-${id}`);
                      setOpen(id);
                    }}
                    aria-haspopup="dialog"
                    className="group relative flex aspect-square w-[9.25rem] scroll-mt-40 flex-col items-center justify-center rounded-full text-center min-[400px]:w-40 sm:w-52 lg:w-[12.5rem] xl:w-[13.5rem]"
                  >
                    {/* dashed outer ring */}
                    <span
                      aria-hidden
                      className="absolute -inset-2.5 rounded-full border border-dashed border-brand/35 transition-all duration-700 group-hover:rotate-45 group-hover:border-gold sm:-inset-3"
                    />
                    {/* circle body */}
                    <span
                      aria-hidden
                      className="absolute inset-0 rounded-full border-[1.5px] border-brand/70 bg-white/85 shadow-soft backdrop-blur-md transition-all duration-500 group-hover:scale-[1.04] group-hover:border-brand group-hover:shadow-lift"
                    />
                    {/* gold accent dot */}
                    <span aria-hidden className="absolute top-[7%] h-2 w-2 rounded-full bg-gold shadow-[0_0_0_4px_rgba(214,173,67,0.18)]" />

                    <span className="relative flex flex-col items-center px-4 transition-transform duration-500 group-hover:-translate-y-1 sm:px-6">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-mint text-brand ring-1 ring-gold/60 transition-colors duration-500 group-hover:bg-brand group-hover:text-white sm:h-14 sm:w-14">
                        <Icon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden />
                      </span>
                      <span className="mt-2.5 text-[0.8rem] font-bold leading-snug text-ink sm:mt-3.5 sm:text-[0.95rem]">{item.title}</span>
                      <span className="mt-1.5 hidden items-center gap-1 text-[0.7rem] font-semibold uppercase tracking-wider text-brand opacity-70 transition-opacity group-hover:opacity-100 sm:inline-flex">
                        {t.services.learnMore}
                        <ArrowRight className="rtl-flip h-3 w-3" aria-hidden />
                      </span>
                    </span>
                  </a>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>

      <AnimatePresence>{open && <ServiceDialog key={open} id={open} onClose={close} />}</AnimatePresence>
    </section>
  );
}

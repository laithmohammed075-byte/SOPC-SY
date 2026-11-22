"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Mail, MessageCircle, Phone, X } from "lucide-react";
import { company } from "@/content/site";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { scrollToId } from "./ui";

export function FloatingContactButton() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  return (
    <div ref={wrapRef} className="fixed bottom-5 end-5 z-[60] flex flex-col items-end gap-3 sm:bottom-7 sm:end-7">
      <AnimatePresence>
        {open && (
          <motion.div
            id="floating-contact-panel"
            role="dialog"
            aria-label={t.floating.title}
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="glass w-[min(20rem,calc(100vw-2.5rem))] origin-bottom-right rounded-3xl p-6 shadow-lift rtl:origin-bottom-left"
          >
            <span aria-hidden className="gold-rule mb-4 block" />
            <p className="font-display text-xl text-ink">{t.floating.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">{t.floating.text}</p>
            {(company.contact.phone || company.contact.email) && (
              <ul className="mt-4 space-y-2 text-sm">
                {company.contact.phone && (
                  <li>
                    <a
                      href={`tel:${company.contact.phone.replace(/\s/g, "")}`}
                      className="flex items-center gap-3 rounded-xl bg-white/80 px-3 py-2.5 font-semibold text-ink ring-1 ring-line transition-colors hover:text-brand"
                    >
                      <Phone className="h-4 w-4 text-brand" aria-hidden />
                      <span className="sr-only">{t.contact.phone}: </span>
                      <span dir="ltr">{company.contact.phone}</span>
                    </a>
                  </li>
                )}
                {company.contact.email && (
                  <li>
                    <a
                      href={`mailto:${company.contact.email}`}
                      className="flex items-center gap-3 rounded-xl bg-white/80 px-3 py-2.5 font-semibold text-ink ring-1 ring-line transition-colors hover:text-brand"
                    >
                      <Mail className="h-4 w-4 text-brand" aria-hidden />
                      <span className="sr-only">{t.contact.email}: </span>
                      <span dir="ltr">{company.contact.email}</span>
                    </a>
                  </li>
                )}
              </ul>
            )}
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                scrollToId("contact");
              }}
              className="group mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-2"
            >
              {t.floating.cta}
              <ArrowRight className="rtl-flip h-4 w-4" aria-hidden />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        whileHover={{ y: -3 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="floating-contact-panel"
        aria-label={open ? t.floating.close : t.floating.open}
        className="relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white shadow-[0_14px_34px_-10px_rgba(8,120,76,0.65)] ring-4 ring-white transition-colors hover:bg-brand-2 sm:h-16 sm:w-16"
      >
        {!open && <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-brand/30 [animation-duration:2.8s]" />}
        <span aria-hidden className="absolute -end-0.5 -top-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-gold" />
        {open ? <X className="relative h-6 w-6" /> : <MessageCircle className="relative h-6 w-6" />}
      </motion.button>
    </div>
  );
}

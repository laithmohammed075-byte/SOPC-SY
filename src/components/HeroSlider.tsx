"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { images } from "@/content/site";
import { useLanguage } from "@/lib/i18n";
import { WaveDivider } from "./WaveDivider";

const AUTOPLAY_MS = 7000;

export function HeroSlider() {
  const { t, dir } = useLanguage();
  const reduce = useReducedMotionSafe();
  const slides = images.hero;
  const [index, setIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [failed, setFailed] = useState<Record<number, boolean>>({});

  const playing = !reduce && !userPaused && !hovering;

  const go = useCallback((delta: number) => setIndex((i) => (i + delta + slides.length) % slides.length), [slides.length]);

  useEffect(() => {
    if (!playing) return;
    const id = window.setTimeout(() => go(1), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [playing, index, go]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const forward = dir === "rtl" ? "ArrowLeft" : "ArrowRight";
    const back = dir === "rtl" ? "ArrowRight" : "ArrowLeft";
    if (e.key === forward) {
      e.preventDefault();
      go(1);
    } else if (e.key === back) {
      e.preventDefault();
      go(-1);
    }
  };

  // Visual "previous" sits on the inline-start side; icons mirror in RTL.
  const PrevIcon = dir === "rtl" ? ChevronRight : ChevronLeft;
  const NextIcon = dir === "rtl" ? ChevronLeft : ChevronRight;

  return (
    <section
      id="home"
      aria-roledescription="carousel"
      aria-label={t.hero.carousel}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className="relative isolate h-[calc(100svh-76px)] min-h-[600px] max-h-[880px] overflow-hidden bg-mint lg:h-[calc(100svh-88px)]"
    >
      {/* Slides */}
      <div aria-live={playing ? "off" : "polite"} className="absolute inset-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={index}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} / ${slides.length}: ${t.hero.slides[index]}`}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
          >
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.08 }}
              animate={{ scale: 1 }}
              transition={{ duration: AUTOPLAY_MS / 1000 + 1.5, ease: "linear" }}
            >
              {failed[index] ? (
                <div className="h-full w-full bg-linear-to-br from-brand-2 via-brand to-brand-deep" />
              ) : (
                <Image
                  src={slides[index].src}
                  alt={t.hero.slides[index]}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  quality={80}
                  className="object-cover"
                  onError={() => setFailed((f) => ({ ...f, [index]: true }))}
                />
              )}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Restrained, localized gradient for text legibility only */}
      <div
        aria-hidden
        className="absolute inset-y-0 start-0 w-full bg-linear-to-r from-[#0d2c21]/70 via-[#0d2c21]/35 to-transparent md:w-[75%] rtl:bg-linear-to-l"
      />
      <div aria-hidden className="absolute inset-x-0 top-0 h-24 bg-linear-to-b from-black/10 to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-[1320px] items-center px-5 pb-24 sm:px-8 lg:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[52rem] text-white"
        >
          <p className="tracking-eyebrow inline-flex items-center gap-3 text-xs font-bold uppercase text-gold-soft sm:text-sm">
            <span aria-hidden className="h-px w-10 bg-gold" />
            {t.hero.eyebrow}
          </p>
          <h1 className="font-display mt-5 text-[2.35rem] leading-[1.08] drop-shadow-[0_2px_18px_rgba(0,0,0,0.25)] sm:text-6xl lg:text-[4.1rem]">
            <span className="block">{t.hero.titleA}</span>
            <span className="block text-gold-soft">{t.hero.titleB}</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">{t.hero.description}</p>
          <div className="mt-9 flex flex-wrap gap-3 sm:gap-4">
            <a
              href="#services"
              className="group inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-bold text-white shadow-lift transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-2 sm:px-7"
            >
              {t.hero.primary}
              <ArrowRight className="rtl-flip h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#about"
              className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-brand sm:px-7"
            >
              {t.hero.secondary}
            </a>
          </div>
        </motion.div>
      </div>

      {/* Controls */}
      <div className="absolute inset-x-0 bottom-[92px] z-30 sm:bottom-[128px] lg:bottom-[170px]">
        <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-4 px-5 sm:px-8">
          <div className="flex items-center gap-2" role="group" aria-label={t.hero.carousel}>
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`${t.hero.goTo} ${i + 1}`}
                aria-current={i === index ? "true" : undefined}
                onClick={() => setIndex(i)}
                className="group flex h-6 items-center"
              >
                <span
                  className={`block h-[3px] rounded-full transition-all duration-500 ${
                    i === index ? "w-10 bg-gold" : "w-5 bg-white/60 group-hover:bg-white"
                  }`}
                />
              </button>
            ))}
            {!reduce && (
              <button
                type="button"
                onClick={() => setUserPaused((p) => !p)}
                aria-label={userPaused ? t.hero.play : t.hero.pause}
                className="ms-2 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/50 text-white/90 transition-colors hover:bg-white hover:text-brand"
              >
                {userPaused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label={t.hero.prev}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/60 bg-white/15 text-white backdrop-blur-md transition-all hover:bg-white hover:text-brand sm:h-12 sm:w-12"
            >
              <PrevIcon className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label={t.hero.next}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/60 bg-white/15 text-white backdrop-blur-md transition-all hover:bg-white hover:text-brand sm:h-12 sm:w-12"
            >
              <NextIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <WaveDivider fill="#F5FAF7" />
    </section>
  );
}

"use client";

import { MotionConfig } from "framer-motion";
import { useEffect, useRef } from "react";
import { serviceFromHash, useHash } from "@/lib/route";
import { ServicePage } from "./ServicePage";
import { LanguageProvider, useLanguage } from "@/lib/i18n";
import { Header } from "./Header";
import { HeroSlider } from "./HeroSlider";
import { AboutSection } from "./AboutSection";
import { ServicesSection } from "./ServicesSection";
import { QHSESection } from "./QHSESection";
import { CareersSection } from "./CareersSection";
import { WhyChooseUs } from "./WhyChooseUs";
import { ContactSection } from "./ContactSection";
import { Footer } from "./Footer";
import { FloatingContactButton } from "./FloatingContactButton";

function Page() {
  const { t } = useLanguage();
  const hash = useHash();
  const service = serviceFromHash(hash);

  // Coming back from a service page to a home section (e.g. #contact): the section
  // only exists once the home page has rendered, so scroll to it then. Normal in-page
  // anchors on the home page are left to the browser (smooth scrolling).
  const previousService = useRef(service);
  useEffect(() => {
    const cameFromService = previousService.current !== null;
    previousService.current = service;
    if (service || !cameFromService) return;
    const id = hash.startsWith("#") && !hash.startsWith("#/") ? decodeURIComponent(hash.slice(1)) : "";
    const timer = window.setTimeout(() => {
      // No specific section (e.g. the browser Back button): return to the services circles.
      const el = document.getElementById(id || "services");
      el?.scrollIntoView({ behavior: "auto" });
    }, 30);
    return () => window.clearTimeout(timer);
  }, [service, hash]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:text-brand focus:shadow-soft"
      >
        {t.meta.skip}
      </a>
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        {service ? (
          <ServicePage id={service} />
        ) : (
          <>
            <HeroSlider />
            <AboutSection />
            <ServicesSection />
            <QHSESection />
            <WhyChooseUs />
            <ContactSection />
            <CareersSection />
          </>
        )}
      </main>
      <Footer />
      <FloatingContactButton />
    </>
  );
}

export function SiteShell() {
  return (
    <LanguageProvider>
      <MotionConfig reducedMotion="user">
        <Page />
      </MotionConfig>
    </LanguageProvider>
  );
}

"use client";

import { MotionConfig } from "framer-motion";
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
        <HeroSlider />
        <AboutSection />
        <ServicesSection />
        <QHSESection />
        <WhyChooseUs />
        <ContactSection />
        <CareersSection />
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

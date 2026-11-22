"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { serviceIds } from "@/content/site";
import { useLanguage } from "@/lib/i18n";
import { selectService, serviceFromHash, servicePath, useHash } from "@/lib/route";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Logo } from "./ui";

/** `onSelect` runs before navigating (e.g. Careers pre-selects "Careers" in the contact form). */
type NavChild = { href: string; label: string; onSelect?: () => void };
type NavItem = { id: string; href: string; label: string; children?: NavChild[] };

const sectionIds = ["home", "about", "services", "qhse", "why", "contact"];

function useActiveSection(view: string) {
  const [active, setActive] = useState("home");
  useEffect(() => {
    const els = sectionIds.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [view]);
  return active;
}

function Dropdown({ item, active }: { item: NavItem; active: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);
  const menuId = `menu-${item.id}`;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  return (
    <li
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <div className="flex items-center">
        <NavLink href={item.href} label={item.label} active={active} />
        <button
          type="button"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={item.label}
          onClick={() => setOpen((v) => !v)}
          className="-ms-1 rounded-md p-1 text-muted transition-colors hover:text-brand"
        >
          <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.ul
            id={menuId}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute start-0 top-full z-50 mt-2 min-w-64 overflow-hidden rounded-2xl border border-line bg-white/95 p-2 shadow-lift backdrop-blur-xl"
          >
            <span aria-hidden className="gold-rule absolute inset-x-6 top-0" />
            {item.children!.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  onClick={() => {
                    c.onSelect?.();
                    setOpen(false);
                  }}
                  className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm text-ink transition-colors hover:bg-mint hover:text-brand"
                >
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-gold" />
                  {c.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
}

function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <a
      href={href}
      aria-current={active ? "location" : undefined}
      className={`group relative px-3 py-2 text-[0.9rem] font-semibold transition-colors duration-300 ${
        active ? "text-brand" : "text-ink hover:text-brand"
      }`}
    >
      {label}
      <span
        aria-hidden
        className={`absolute inset-x-3 -bottom-0.5 h-[2px] origin-center rounded-full transition-transform duration-300 ${
          active ? "scale-x-100 bg-brand" : "scale-x-0 bg-gold group-hover:scale-x-100"
        }`}
      />
    </a>
  );
}

export function Header() {
  const { t } = useLanguage();
  const hash = useHash();
  const serviceView = serviceFromHash(hash);
  const active = useActiveSection(serviceView ?? "home");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const items: NavItem[] = [
    { id: "home", href: "#home", label: t.nav.home },
    {
      id: "about",
      href: "#about",
      label: t.nav.about,
      children: [
        { href: "#about", label: t.nav.whoWeAre },
        { href: "#why", label: t.nav.whySopc },
        { href: "#qhse", label: t.qhse.title },
      ],
    },
    {
      id: "services",
      href: "#services",
      label: t.nav.services,
      children: [
        ...serviceIds.map((id) => ({ href: servicePath(id), label: t.services.items[id].title })),
        { href: "#services", label: t.nav.allServices },
      ],
    },
    { id: "qhse", href: "#qhse", label: t.nav.qhse },
    {
      id: "contact",
      href: "#contact",
      label: t.nav.contact,
      children: [
        { href: "#contact", label: t.nav.sendMessage },
        // Careers enquiries go through the contact form with "Careers" pre-selected.
        { href: "#contact", label: t.nav.careers, onSelect: () => selectService("careers") },
      ],
    },
  ];

  const isActive = (id: string) =>
    serviceView
      ? id === "services"
      : active === id || (id === "about" && active === "why");

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-500 ${
        scrolled
          ? "border-line/80 bg-white/85 shadow-[0_8px_30px_-18px_rgba(8,60,40,0.35)] backdrop-blur-xl"
          : "border-line/50 bg-white/95 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-[76px] max-w-[1320px] items-center justify-between gap-4 px-4 sm:px-6 lg:h-[88px] lg:px-8">
        <a href="#home" className="flex shrink-0 items-center gap-3" aria-label="SOPC — Home">
          <span className="hidden sm:block">
            <Logo size={72} priority />
          </span>
          <span className="sm:hidden">
            <Logo size={60} priority />
          </span>
          <span className="hidden flex-col leading-tight xl:flex">
            <span className="text-[1.35rem] font-extrabold uppercase leading-none tracking-[0.14em] text-brand">SOPC</span>
            <span className="mt-1 max-w-44 text-[0.72rem] leading-snug text-muted">{t.about.subtitle}</span>
          </span>
        </a>

        <nav aria-label={t.nav.primary} className="hidden lg:block">
          <ul className="flex items-center gap-0.5 xl:gap-1">
            {items.map((item) =>
              item.children ? (
                <Dropdown key={item.id} item={item} active={isActive(item.id)} />
              ) : (
                <li key={item.id}>
                  <NavLink href={item.href} label={item.label} active={isActive(item.id)} />
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher className="hidden sm:inline-flex" />
          <a
            href="#contact"
            className="hidden rounded-full border-[1.5px] border-brand px-5 py-2.5 text-sm font-bold text-brand transition-all duration-300 hover:bg-brand hover:text-white hover:shadow-soft md:inline-flex"
          >
            {t.nav.getInTouch}
          </a>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-brand hover:text-brand lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? t.nav.close : t.nav.menu}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-line bg-white lg:hidden"
          >
            <nav aria-label={t.nav.primary} className="max-h-[calc(100dvh-76px)] overflow-y-auto px-4 pb-8 pt-3 sm:px-6">
              <ul className="divide-y divide-line/70">
                {items.map((item) => (
                  <li key={item.id}>
                    <div className="flex items-center justify-between">
                      <a
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={`flex-1 py-3.5 text-base font-semibold ${isActive(item.id) ? "text-brand" : "text-ink"}`}
                      >
                        {item.label}
                      </a>
                      {item.children && (
                        <button
                          type="button"
                          aria-expanded={expanded === item.id}
                          aria-controls={`m-${item.id}`}
                          aria-label={item.label}
                          onClick={() => setExpanded((v) => (v === item.id ? null : item.id))}
                          className="rounded-full p-2 text-muted"
                        >
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${expanded === item.id ? "rotate-180" : ""}`}
                          />
                        </button>
                      )}
                    </div>
                    {item.children && expanded === item.id && (
                      <ul id={`m-${item.id}`} className="mb-3 space-y-1 rounded-2xl bg-offwhite p-2">
                        {item.children.map((c) => (
                          <li key={c.label}>
                            <a
                              href={c.href}
                              onClick={() => {
                                c.onSelect?.();
                                setMobileOpen(false);
                              }}
                              className="block rounded-xl px-3 py-2.5 text-sm text-ink hover:bg-mint hover:text-brand"
                            >
                              {c.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <LanguageSwitcher />
                <a
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 rounded-full border-[1.5px] border-brand px-5 py-2.5 text-center text-sm font-bold text-brand"
                >
                  {t.nav.getInTouch}
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

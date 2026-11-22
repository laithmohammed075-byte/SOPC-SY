"use client";

import { ArrowUp, Mail, MapPin, Phone } from "lucide-react";
import { company, serviceIds } from "@/content/site";
import { useLanguage } from "@/lib/i18n";
import { Logo } from "./ui";

export function Footer() {
  const { t, lang } = useLanguage();
  const year = new Date().getFullYear();

  const quick = [
    { href: "#home", label: t.nav.home },
    { href: "#about", label: t.nav.about },
    { href: "#services", label: t.nav.services },
    { href: "#qhse", label: t.nav.qhse },
    { href: "#careers", label: t.nav.careers },
    { href: "#contact", label: t.nav.contact },
  ];

  const contacts = [
    { icon: Mail, value: company.contact.email, label: t.contact.email },
    { icon: Phone, value: company.contact.phone, label: t.contact.phone },
    { icon: MapPin, value: company.contact.address[lang], label: t.contact.address },
  ];

  return (
    <footer className="relative bg-offwhite pt-16 text-ink">
      <div className="gold-rule absolute inset-x-0 top-0" />
      <div className="mx-auto grid max-w-[1240px] gap-12 px-5 sm:px-8 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1.2fr]">
        <div>
          <a href="#home" aria-label="SOPC — Home" className="inline-block rounded-2xl bg-white p-2 shadow-soft">
            <Logo size={104} />
          </a>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">{t.footer.about}</p>
          {company.social.length > 0 && (
            <ul className="mt-5 flex gap-3">
              {company.social.map((s) => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold capitalize text-brand hover:underline">
                    {s.network}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <nav aria-labelledby="footer-quick">
          <h2 id="footer-quick" className="text-sm font-bold uppercase tracking-[0.14em] text-brand">
            {t.footer.quickLinks}
          </h2>
          <span aria-hidden className="mt-3 block h-px w-8 bg-gold" />
          <ul className="mt-5 space-y-2.5">
            {quick.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-sm text-muted transition-colors hover:text-brand">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-services">
          <h2 id="footer-services" className="text-sm font-bold uppercase tracking-[0.14em] text-brand">
            {t.footer.services}
          </h2>
          <span aria-hidden className="mt-3 block h-px w-8 bg-gold" />
          <ul className="mt-5 space-y-2.5">
            {serviceIds.map((id) => (
              <li key={id}>
                <a href={`#service-${id}`} className="text-sm text-muted transition-colors hover:text-brand">
                  {t.services.items[id].title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-brand">{t.footer.contact}</h2>
          <span aria-hidden className="mt-3 block h-px w-8 bg-gold" />
          <ul className="mt-5 space-y-4">
            {contacts.map(({ icon: Icon, value, label }) => (
              <li key={label} className="flex items-start gap-3 text-sm">
                <Icon className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
                <span>
                  <span className="sr-only">{label}: </span>
                  {value ? <span className="text-ink">{value}</span> : <span className="italic text-muted">{t.meta.tbc}</span>}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-[1240px] px-5 sm:px-8">
        <div className="gold-rule" />
        <div className="flex flex-col items-center justify-between gap-4 py-7 text-xs text-muted sm:flex-row">
          <p>
            © {year} {lang === "ar" ? company.nameAr : company.nameEn} (SOPC). {t.footer.rights}
          </p>
          <a href="#home" className="inline-flex items-center gap-1.5 font-semibold text-brand hover:text-brand-2">
            {t.footer.backToTop}
            <ArrowUp className="h-3.5 w-3.5" aria-hidden />
          </a>
        </div>
      </div>
    </footer>
  );
}

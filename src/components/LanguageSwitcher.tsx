"use client";

import { useLanguage } from "@/lib/i18n";
import type { Lang } from "@/content/site";

const options: { value: Lang; label: string; full: string }[] = [
  { value: "en", label: "EN", full: "English" },
  { value: "ar", label: "AR", full: "العربية" },
];

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { lang, setLang, t } = useLanguage();
  return (
    <div
      role="group"
      aria-label={t.nav.language}
      className={`relative inline-flex items-center rounded-full border border-line bg-white/70 p-1 text-xs font-bold ${className}`}
    >
      {options.map((o) => {
        const active = o.value === lang;
        return (
          <button
            key={o.value}
            type="button"
            lang={o.value}
            aria-pressed={active}
            aria-label={o.full}
            onClick={() => setLang(o.value)}
            className={`relative min-w-10 rounded-full px-3 py-1.5 transition-colors duration-300 ${
              active ? "bg-brand text-white shadow-sm" : "text-muted hover:text-brand"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/i18n";

const STORAGE_KEY = "sopc-theme";

/**
 * Light / dark switch. Light is the default brand look; the choice is remembered.
 * The initial class is applied before paint by the inline script in layout.tsx.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const { t } = useLanguage();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
    } catch {
      /* storage unavailable */
    }
  };

  const label = dark ? t.nav.lightMode : t.nav.darkMode;
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      aria-pressed={dark}
      className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-surface/70 text-ink transition-colors hover:border-brand hover:text-brand ${className}`}
    >
      {dark ? <Sun className="h-[1.1rem] w-[1.1rem] text-gold" aria-hidden /> : <Moon className="h-[1.1rem] w-[1.1rem]" aria-hidden />}
    </button>
  );
}

"use client";

import { useLocale } from "@/i18n/LocaleProvider";
import type { Locale } from "@/i18n/translations";

export function Header() {
  const { locale, setLocale, t } = useLocale();

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a href="#top" className="font-display text-sm tracking-wide text-text sm:text-base">
          {t.header.eventName}
        </a>

        <div className="flex items-center gap-3">
          <LanguageToggle locale={locale} onChange={setLocale} />
          <a
            href="#reserva"
            className="rounded-full bg-accent px-4 py-2 text-xs font-semibold text-white shadow-[0_0_20px_rgba(139,92,246,0.45)] transition hover:bg-accent-strong sm:text-sm"
          >
            {t.header.bookCta}
          </a>
        </div>
      </div>
    </header>
  );
}

function LanguageToggle({
  locale,
  onChange,
}: {
  locale: Locale;
  onChange: (l: Locale) => void;
}) {
  return (
    <div
      role="group"
      aria-label="Idioma / Llengua"
      className="flex overflow-hidden rounded-full border border-border text-xs font-semibold sm:text-sm"
    >
      {(["ca", "es"] as Locale[]).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => onChange(l)}
          aria-pressed={locale === l}
          className={`px-3 py-1.5 uppercase transition ${
            locale === l
              ? "bg-accent text-white"
              : "bg-transparent text-text-muted hover:text-text"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

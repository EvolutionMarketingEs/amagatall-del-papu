"use client";

import { useLocale } from "@/i18n/LocaleProvider";
import { TRAILER_YOUTUBE_ID } from "@/config/schedule";

export function Hero() {
  const { t } = useLocale();

  return (
    <section id="top" className="relative overflow-hidden px-4 pb-16 pt-14 sm:px-6 sm:pt-20">
      <div className="mx-auto max-w-4xl text-center reveal">
        <p className="flicker text-xs font-semibold uppercase tracking-[0.2em] text-accent-strong sm:text-sm">
          {t.hero.eyebrow}
        </p>
        <h1 className="mt-4 font-display text-4xl leading-tight text-text sm:text-6xl">
          {t.hero.title}
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-balance text-base text-text-muted sm:text-lg">
          {t.hero.tagline}
        </p>

        <div className="mt-8 flex justify-center">
          <a
            href="#reserva"
            className="rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white shadow-[0_0_30px_rgba(139,92,246,0.5)] transition hover:scale-[1.03] hover:bg-accent-strong sm:text-base"
          >
            {t.hero.ctaPrimary}
          </a>
        </div>
      </div>

      <div className="reveal mx-auto mt-12 max-w-3xl [animation-delay:150ms]">
        <div className="overflow-hidden rounded-2xl border border-border shadow-[0_0_60px_rgba(139,92,246,0.2)]">
          <div className="aspect-video w-full bg-bg-card">
            <iframe
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${TRAILER_YOUTUBE_ID}`}
              title={t.hero.title}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useLocale } from "@/i18n/LocaleProvider";
import { VENUE } from "@/config/schedule";

export function PracticalInfo() {
  const { t } = useLocale();

  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    VENUE.mapsQuery
  )}`;

  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <h2 className="font-display text-2xl text-text sm:text-3xl">{t.practicalInfo.heading}</h2>

        <dl className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-bg-card p-5">
            <dt className="text-xs font-semibold uppercase tracking-wide text-accent-strong">
              {t.practicalInfo.datesLabel}
            </dt>
            <dd className="mt-2 text-base text-text sm:text-lg">{t.practicalInfo.datesValue}</dd>
            <dd className="mt-1 text-sm text-text-muted">{t.practicalInfo.sundayNote}</dd>
          </div>

          <div className="rounded-xl border border-border bg-bg-card p-5">
            <dt className="text-xs font-semibold uppercase tracking-wide text-accent-strong">
              {t.practicalInfo.hoursLabel}
            </dt>
            <dd className="mt-2 text-base text-text sm:text-lg">{t.practicalInfo.morningLabel}</dd>
            <dd className="text-base text-text sm:text-lg">{t.practicalInfo.afternoonLabel}</dd>
          </div>

          <a
            href={mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-border bg-bg-card p-5 transition hover:border-accent/60 sm:col-span-2"
          >
            <dt className="text-xs font-semibold uppercase tracking-wide text-accent-strong">
              📍
            </dt>
            <dd className="mt-2 text-base text-text underline decoration-accent/50 underline-offset-4 sm:text-lg">
              {t.practicalInfo.venueLabel}
            </dd>
          </a>
        </dl>

        <p className="mt-6 text-sm text-text-muted">{t.practicalInfo.capacityNote}</p>

        <div className="mt-8">
          <a
            href="#reserva"
            className="inline-block rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white shadow-[0_0_30px_rgba(139,92,246,0.5)] transition hover:scale-[1.03] hover:bg-accent-strong sm:text-base"
          >
            {t.practicalInfo.ctaSecondary}
          </a>
        </div>
      </div>
    </section>
  );
}

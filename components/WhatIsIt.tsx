"use client";

import { useLocale } from "@/i18n/LocaleProvider";

export function WhatIsIt() {
  const { t } = useLocale();

  return (
    <section className="border-y border-border bg-bg-elevated px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="max-w-2xl">
          <h2 className="font-display text-2xl text-text sm:text-3xl">{t.whatIsIt.heading}</h2>
          <p className="mt-3 text-base text-text-muted sm:text-lg">{t.whatIsIt.subheading}</p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {t.whatIsIt.items.map((item, i) => (
            <div
              key={i}
              className="rounded-xl border border-border bg-bg-card p-5 transition hover:border-accent/60"
            >
              <h3 className="font-display text-lg text-accent-strong">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted sm:text-base">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

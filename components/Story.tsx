"use client";

import { useLocale } from "@/i18n/LocaleProvider";

export function Story() {
  const { t } = useLocale();

  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-2xl">
        <h2 className="font-display text-2xl text-text sm:text-3xl">{t.story.heading}</h2>
        <div className="mt-6 space-y-4 border-l-2 border-accent/50 pl-5">
          {t.story.paragraphs.map((p, i) => (
            <p key={i} className="text-base leading-relaxed text-text-muted sm:text-lg">
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

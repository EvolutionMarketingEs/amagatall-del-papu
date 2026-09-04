"use client";

import { useLocale } from "@/i18n/LocaleProvider";
import { VENUE } from "@/config/schedule";

export function Footer() {
  const { t } = useLocale();

  return (
    <footer className="border-t border-border bg-bg-elevated px-4 py-10 sm:px-6">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 text-sm text-text-muted sm:flex-row sm:justify-between">
        <div>
          <p className="font-display text-text">{t.header.eventName}</p>
          <p className="mt-2">{t.footer.venueHeading}</p>
          <p>{VENUE.name}</p>
          <p>{VENUE.address}</p>
        </div>

        <div>
          <p>{t.footer.contactHeading}</p>
          <p>
            {t.footer.contactEmail}:{" "}
            <a
              href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@example.com"}`}
              className="text-accent-strong hover:underline"
            >
              {process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@example.com"}
            </a>
          </p>
        </div>

        <div className="max-w-sm text-xs leading-relaxed">
          <p>{t.footer.credits}</p>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { useLocale } from "@/i18n/LocaleProvider";

interface Props {
  date: string;
  startTime: string;
  partySize: number;
  bookingId: string;
  onReset: () => void;
}

export function ConfirmationStep({ date, startTime, partySize, bookingId, onReset }: Props) {
  const { locale, t } = useLocale();
  const intlLocale = locale === "ca" ? "ca-ES" : "es-ES";
  const formattedDate = new Intl.DateTimeFormat(intlLocale, {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date(`${date}T12:00:00`));

  return (
    <div className="text-center reveal">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-accent bg-accent/20 text-2xl text-accent-strong shadow-[0_0_30px_rgba(139,92,246,0.4)]">
        ✓
      </div>
      <h3 className="mt-4 font-display text-2xl text-text sm:text-3xl">
        {t.booking.confirmation.heading}
      </h3>
      <p className="mt-2 text-sm text-text-muted sm:text-base">
        {t.booking.confirmation.subheading}
      </p>

      <dl className="mx-auto mt-6 max-w-sm space-y-2 rounded-xl border border-border bg-bg-card p-5 text-left">
        <Row label={t.booking.confirmation.dateLabel} value={formattedDate} />
        <Row label={t.booking.confirmation.timeLabel} value={startTime} />
        <Row label={t.booking.confirmation.peopleLabel} value={String(partySize)} />
        <Row label={t.booking.confirmation.codeLabel} value={bookingId.slice(0, 8).toUpperCase()} />
      </dl>

      <button
        type="button"
        onClick={onReset}
        className="mt-8 rounded-full border border-border px-6 py-2.5 text-sm font-medium text-text transition hover:border-accent"
      >
        {t.booking.confirmation.newBooking}
      </button>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border/60 pb-2 text-sm last:border-0 last:pb-0">
      <dt className="text-text-muted">{label}</dt>
      <dd className="font-medium capitalize text-text">{value}</dd>
    </div>
  );
}

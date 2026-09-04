"use client";

import { useLocale } from "@/i18n/LocaleProvider";
import { getEventDates } from "@/lib/slots";

interface Props {
  selectedDate: string | null;
  onSelect: (date: string) => void;
}

export function DateStep({ selectedDate, onSelect }: Props) {
  const { locale, t } = useLocale();
  const dates = getEventDates();
  const intlLocale = locale === "ca" ? "ca-ES" : "es-ES";

  return (
    <div>
      <h3 className="font-display text-xl text-text sm:text-2xl">{t.booking.date.heading}</h3>
      <p className="mt-1 text-sm text-text-muted">{t.booking.date.helper}</p>

      <div className="mt-6 grid grid-cols-3 gap-2.5 sm:grid-cols-4 md:grid-cols-6">
        {dates.map((date) => {
          const d = new Date(`${date}T12:00:00`);
          const weekday = new Intl.DateTimeFormat(intlLocale, { weekday: "short" }).format(d);
          const day = new Intl.DateTimeFormat(intlLocale, { day: "numeric" }).format(d);
          const month = new Intl.DateTimeFormat(intlLocale, { month: "short" }).format(d);
          const isSelected = date === selectedDate;

          return (
            <button
              key={date}
              type="button"
              onClick={() => onSelect(date)}
              aria-pressed={isSelected}
              className={`flex flex-col items-center rounded-xl border px-2 py-3 transition ${
                isSelected
                  ? "border-accent bg-accent/20 text-text shadow-[0_0_20px_rgba(139,92,246,0.35)]"
                  : "border-border bg-bg-card text-text-muted hover:border-accent/50 hover:text-text"
              }`}
            >
              <span className="text-[11px] uppercase tracking-wide">{weekday}</span>
              <span className="mt-1 font-display text-xl text-text">{day}</span>
              <span className="text-[11px] uppercase tracking-wide">{month}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

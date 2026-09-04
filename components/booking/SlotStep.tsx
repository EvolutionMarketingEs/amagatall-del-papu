"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/i18n/LocaleProvider";
import type { AvailabilityResponse, SlotAvailability } from "@/lib/types";

interface Props {
  date: string;
  selectedStartTime: string | null;
  onSelect: (slot: SlotAvailability) => void;
}

export function SlotStep({ date, selectedStartTime, onSelect }: Props) {
  const { t } = useLocale();
  const [slots, setSlots] = useState<SlotAvailability[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    // Reinicia el estado de carga cada vez que cambia `date`: es el patrón
    // estándar de "effect que sincroniza con un sistema externo" (fetch por
    // prop) que React recomienda en https://react.dev/learn/you-might-not-need-an-effect.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    setError(false);
    setSlots(null);

    fetch(`/api/availability?date=${encodeURIComponent(date)}`)
      .then((res) => {
        if (!res.ok) throw new Error("bad_response");
        return res.json() as Promise<AvailabilityResponse>;
      })
      .then((data) => {
        if (!cancelled) setSlots(data.slots);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [date]);

  const morning = slots?.filter((s) => s.session === "morning") ?? [];
  const afternoon = slots?.filter((s) => s.session === "afternoon") ?? [];

  return (
    <div>
      <h3 className="font-display text-xl text-text sm:text-2xl">{t.booking.slot.heading}</h3>
      <p className="mt-1 text-sm text-text-muted">{t.booking.slot.helper}</p>

      {loading && (
        <p className="mt-8 text-sm text-text-muted">{t.booking.slot.loading}</p>
      )}

      {error && (
        <p className="mt-8 text-sm text-danger">{t.booking.errors.network_error}</p>
      )}

      {!loading && !error && slots && slots.length === 0 && (
        <p className="mt-8 text-sm text-text-muted">{t.booking.slot.empty}</p>
      )}

      {!loading && !error && morning.length > 0 && (
        <SlotGroup
          title={t.booking.slot.morning}
          slots={morning}
          selectedStartTime={selectedStartTime}
          onSelect={onSelect}
          fullLabel={t.booking.slot.full}
          seatLeftLabel={t.booking.slot.seatLeft}
          seatsLeftLabel={t.booking.slot.seatsLeft}
        />
      )}

      {!loading && !error && afternoon.length > 0 && (
        <SlotGroup
          title={t.booking.slot.afternoon}
          slots={afternoon}
          selectedStartTime={selectedStartTime}
          onSelect={onSelect}
          fullLabel={t.booking.slot.full}
          seatLeftLabel={t.booking.slot.seatLeft}
          seatsLeftLabel={t.booking.slot.seatsLeft}
        />
      )}
    </div>
  );
}

function SlotGroup({
  title,
  slots,
  selectedStartTime,
  onSelect,
  fullLabel,
  seatLeftLabel,
  seatsLeftLabel,
}: {
  title: string;
  slots: SlotAvailability[];
  selectedStartTime: string | null;
  onSelect: (slot: SlotAvailability) => void;
  fullLabel: string;
  seatLeftLabel: string;
  seatsLeftLabel: string;
}) {
  return (
    <div className="mt-6">
      <h4 className="sticky top-14 z-10 -mx-1 bg-bg/90 px-1 py-1 text-xs font-semibold uppercase tracking-wide text-accent-strong backdrop-blur">
        {title}
      </h4>
      <div className="mt-2 grid max-h-64 grid-cols-3 gap-2 overflow-y-auto pr-1 sm:grid-cols-4 md:grid-cols-5">
        {slots.map((slot) => {
          const isSelected = slot.startTime === selectedStartTime;
          return (
            <button
              key={slot.startTime}
              type="button"
              disabled={slot.full}
              onClick={() => onSelect(slot)}
              aria-pressed={isSelected}
              className={`flex flex-col items-center rounded-lg border px-2 py-2.5 text-sm transition ${
                slot.full
                  ? "cursor-not-allowed border-border/60 bg-bg-card/40 text-text-muted/50 line-through"
                  : isSelected
                    ? "border-accent bg-accent/20 text-text shadow-[0_0_16px_rgba(139,92,246,0.35)]"
                    : "border-border bg-bg-card text-text-muted hover:border-accent/50 hover:text-text"
              }`}
            >
              <span className="font-medium">{slot.startTime}</span>
              <span className="mt-0.5 text-[10px] uppercase tracking-wide">
                {slot.full
                  ? fullLabel
                  : `${slot.remaining} ${slot.remaining === 1 ? seatLeftLabel : seatsLeftLabel}`}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

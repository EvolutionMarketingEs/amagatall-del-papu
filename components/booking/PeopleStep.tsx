"use client";

import type { Dispatch, SetStateAction } from "react";
import { useLocale } from "@/i18n/LocaleProvider";

interface Props {
  max: number;
  value: number;
  onChange: Dispatch<SetStateAction<number>>;
}

export function PeopleStep({ max, value, onChange }: Props) {
  const { t } = useLocale();

  // Actualización funcional: si dos clics llegan antes de que React repinte
  // (doble clic rápido en el "+"), cada uno parte del valor más reciente en
  // vez de un `value` de clausura desactualizado, así no se pierde ningún
  // incremento.
  const dec = () => onChange((prev) => Math.max(1, prev - 1));
  const inc = () => onChange((prev) => Math.min(max, prev + 1));

  return (
    <div>
      <h3 className="font-display text-xl text-text sm:text-2xl">{t.booking.people.heading}</h3>
      <p className="mt-1 text-sm text-text-muted">{t.booking.people.helper(max)}</p>

      <div className="mt-8 flex items-center justify-center gap-6">
        <button
          type="button"
          onClick={dec}
          disabled={value <= 1}
          aria-label={t.booking.people.decrease}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-border text-2xl text-text transition hover:border-accent disabled:cursor-not-allowed disabled:opacity-30"
        >
          −
        </button>

        <div className="flex min-w-[6rem] flex-col items-center">
          <span className="font-display text-5xl text-text">{value}</span>
          <span className="text-sm text-text-muted">
            {value === 1 ? t.booking.people.person : t.booking.people.people}
          </span>
        </div>

        <button
          type="button"
          onClick={inc}
          disabled={value >= max}
          aria-label={t.booking.people.increase}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-border text-2xl text-text transition hover:border-accent disabled:cursor-not-allowed disabled:opacity-30"
        >
          +
        </button>
      </div>
    </div>
  );
}

"use client";

import type { Locale } from "@/i18n/translations";

const CONFIRM_TEXT: Record<Locale, string> = {
  ca: "Segur que vols cancel·lar aquesta reserva? Aquesta acció no es pot desfer.",
  es: "¿Seguro que quieres cancelar esta reserva? Esta acción no se puede deshacer.",
};

const BUTTON_TEXT: Record<Locale, string> = {
  ca: "Cancel·lar la reserva",
  es: "Cancelar la reserva",
};

export function CancelBookingButton({ id, locale }: { id: string; locale: Locale }) {
  return (
    <form
      action="/api/cancel"
      method="POST"
      onSubmit={(e) => {
        if (!confirm(CONFIRM_TEXT[locale])) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="w-full rounded-full border border-danger/60 bg-danger/10 px-6 py-3 text-sm font-semibold text-red-300 transition hover:bg-danger/20"
      >
        {BUTTON_TEXT[locale]}
      </button>
    </form>
  );
}

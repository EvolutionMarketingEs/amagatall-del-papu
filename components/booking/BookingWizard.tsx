"use client";

import { useState } from "react";
import { useLocale } from "@/i18n/LocaleProvider";
import { bookingSchema } from "@/lib/validation";
import type { SlotAvailability } from "@/lib/types";
import { StepIndicator } from "./StepIndicator";
import { DateStep } from "./DateStep";
import { SlotStep } from "./SlotStep";
import { PeopleStep } from "./PeopleStep";
import { ContactStep } from "./ContactStep";
import { ConfirmationStep } from "./ConfirmationStep";

export interface ContactForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  acceptPrivacy: boolean;
}

export type FieldErrors = Partial<Record<keyof ContactForm, string>>;

const EMPTY_CONTACT: ContactForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  acceptPrivacy: false,
};

export function BookingWizard() {
  const { locale, t } = useLocale();

  const [step, setStep] = useState(1);
  const [date, setDate] = useState<string | null>(null);
  const [slot, setSlot] = useState<SlotAvailability | null>(null);
  const [partySize, setPartySize] = useState(1);
  const [contact, setContact] = useState<ContactForm>(EMPTY_CONTACT);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [bookingId, setBookingId] = useState<string | null>(null);

  function reset() {
    setStep(1);
    setDate(null);
    setSlot(null);
    setPartySize(1);
    setContact(EMPTY_CONTACT);
    setErrors({});
    setGeneralError(null);
    setBookingId(null);
  }

  function goToDate(d: string) {
    setDate(d);
    setSlot(null);
    setGeneralError(null);
    setStep(2);
  }

  function goToSlot(s: SlotAvailability) {
    setSlot(s);
    setPartySize(1);
    setGeneralError(null);
    setStep(3);
  }

  async function submit() {
    if (!date || !slot) return;
    setGeneralError(null);

    const payload = {
      date,
      startTime: slot.startTime,
      partySize,
      firstName: contact.firstName,
      lastName: contact.lastName,
      email: contact.email,
      phone: contact.phone,
      locale,
      acceptPrivacy: contact.acceptPrivacy,
    };

    const parsed = bookingSchema.safeParse(payload);
    if (!parsed.success) {
      const fieldErrors: FieldErrors = {};
      let hasUnmapped = false;
      for (const issue of parsed.error.issues) {
        const key = issue.path[0];
        if (typeof key === "string" && key in EMPTY_CONTACT) {
          fieldErrors[key as keyof ContactForm] = issue.message;
        } else {
          hasUnmapped = true;
        }
      }
      setErrors(fieldErrors);
      if (hasUnmapped) setGeneralError(t.booking.errors.server_error);
      return;
    }

    setErrors({});
    setSubmitting(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (res.status === 201) {
        const data = (await res.json()) as { id: string };
        setBookingId(data.id);
        setStep(5);
        return;
      }

      if (res.status === 409) {
        setGeneralError(t.booking.errors.slot_full);
        setSlot(null);
        setStep(2);
        return;
      }

      const data = await res.json().catch(() => null);
      if (data?.error === "invalid_slot") {
        setGeneralError(t.booking.errors.invalid_slot);
        setSlot(null);
        setStep(2);
        return;
      }

      setGeneralError(t.booking.errors.server_error);
    } catch {
      setGeneralError(t.booking.errors.network_error);
    } finally {
      setSubmitting(false);
    }
  }

  const maxPeople = slot ? Math.min(slot.remaining, 7) : 7;

  return (
    <section id="reserva" className="border-t border-border px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <h2 className="font-display text-2xl text-text sm:text-3xl">{t.booking.heading}</h2>
          <p className="mt-2 text-sm text-text-muted sm:text-base">{t.booking.subheading}</p>
        </div>

        <div className="mt-8 rounded-2xl border border-border bg-bg-card/60 p-4 shadow-[0_0_40px_rgba(0,0,0,0.3)] sm:p-8">
          {step <= 4 && <StepIndicator labels={t.booking.stepLabels} current={step} />}

          {generalError && step !== 5 && (
            <p className="mt-6 rounded-lg border border-danger/50 bg-danger/10 px-4 py-3 text-sm text-danger">
              {generalError}
            </p>
          )}

          <div className="mt-8">
            {step === 1 && <DateStep selectedDate={date} onSelect={goToDate} />}

            {step === 2 && date && (
              <SlotStep date={date} selectedStartTime={slot?.startTime ?? null} onSelect={goToSlot} />
            )}

            {step === 3 && slot && (
              <PeopleStep max={maxPeople} value={partySize} onChange={setPartySize} />
            )}

            {step === 4 && <ContactStep form={contact} errors={errors} onChange={setContact} />}

            {step === 5 && date && slot && bookingId && (
              <ConfirmationStep
                date={date}
                startTime={slot.startTime}
                partySize={partySize}
                bookingId={bookingId}
                onReset={reset}
              />
            )}
          </div>

          {step > 1 && step < 5 && (
            <div className="mt-8 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-text-muted transition hover:border-accent hover:text-text"
              >
                {t.booking.slot.back}
              </button>

              {step === 3 && (
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-strong"
                >
                  {t.booking.people.next}
                </button>
              )}

              {step === 4 && (
                <button
                  type="button"
                  onClick={submit}
                  disabled={submitting}
                  className="rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-strong disabled:opacity-60"
                >
                  {submitting ? t.booking.contact.submitting : t.booking.contact.submit}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

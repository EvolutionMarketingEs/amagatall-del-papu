"use client";

import { useLocale } from "@/i18n/LocaleProvider";
import type { ContactForm, FieldErrors } from "./BookingWizard";

interface Props {
  form: ContactForm;
  errors: FieldErrors;
  onChange: (form: ContactForm) => void;
}

export function ContactStep({ form, errors, onChange }: Props) {
  const { t } = useLocale();
  const errorText = t.booking.errors;

  const field = (
    name: keyof ContactForm,
    label: string,
    type: string,
    autoComplete: string
  ) => (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-text">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        value={form[name] as string}
        onChange={(e) => onChange({ ...form, [name]: e.target.value })}
        aria-invalid={Boolean(errors[name])}
        className={`mt-1.5 w-full rounded-lg border bg-bg-card px-3.5 py-2.5 text-text outline-none transition placeholder:text-text-muted/60 focus:border-accent ${
          errors[name] ? "border-danger" : "border-border"
        }`}
      />
      {errors[name] && (
        <p className="mt-1 text-xs text-danger">{errorText[errors[name] as keyof typeof errorText]}</p>
      )}
    </div>
  );

  return (
    <div>
      <h3 className="font-display text-xl text-text sm:text-2xl">{t.booking.contact.heading}</h3>
      <p className="mt-1 text-sm text-text-muted">{t.booking.contact.helper}</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {field("firstName", t.booking.contact.firstName, "text", "given-name")}
        {field("lastName", t.booking.contact.lastName, "text", "family-name")}
        {field("email", t.booking.contact.email, "email", "email")}
        {field("phone", t.booking.contact.phone, "tel", "tel")}
      </div>

      <div className="mt-6 rounded-lg border border-border bg-bg-card p-4">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={form.acceptPrivacy}
            onChange={(e) => onChange({ ...form, acceptPrivacy: e.target.checked })}
            className="mt-1 h-4 w-4 shrink-0 accent-[var(--accent)]"
          />
          <span className="text-sm text-text">
            {t.booking.contact.privacyLabel}
            <span className="mt-1 block text-xs text-text-muted">{t.booking.contact.privacyText}</span>
          </span>
        </label>
        {errors.acceptPrivacy && (
          <p className="mt-2 text-xs text-danger">
            {errorText[errors.acceptPrivacy as keyof typeof errorText]}
          </p>
        )}
      </div>
    </div>
  );
}

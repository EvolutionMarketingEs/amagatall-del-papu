import { z } from "zod";
import { SCHEDULE_CONFIG } from "@/config/schedule";

// Compartido entre cliente (validación instantánea en el formulario) y
// servidor (validación autoritativa en /api/bookings) — una sola fuente de
// verdad para las reglas de cada campo.
export const bookingSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "invalid_date"),
  startTime: z.string().regex(/^\d{2}:\d{2}$/, "invalid_time"),
  partySize: z.coerce
    .number()
    .int()
    .min(1, "party_size_min")
    .max(SCHEDULE_CONFIG.capacityPerSlot, "party_size_max"),
  firstName: z.string().trim().min(1, "required").max(80, "too_long"),
  lastName: z.string().trim().min(1, "required").max(80, "too_long"),
  email: z.string().trim().min(1, "required").email("invalid_email").max(160, "too_long"),
  // Acepta prefijos internacionales, espacios, guiones y paréntesis; exige 9-15 dígitos.
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s()-]{9,20}$/, "invalid_phone")
    .refine((val) => val.replace(/\D/g, "").length >= 9, "invalid_phone"),
  locale: z.enum(["ca", "es"]),
  acceptPrivacy: z.literal(true, { error: "privacy_required" }),
});

export type BookingInput = z.infer<typeof bookingSchema>;

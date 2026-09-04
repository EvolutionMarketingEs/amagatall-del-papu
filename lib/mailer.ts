import { Resend } from "resend";
import type { BookingInput } from "./validation";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

/**
 * Envía el aviso de nueva reserva a NOTIFICATION_EMAIL. Si falta la API key o
 * la dirección de destino, no lanza error (la reserva ya está guardada en la
 * base de datos igualmente) — solo avisa por consola para que se detecte en
 * los logs del hosting.
 */
export async function sendBookingNotification(
  booking: BookingInput & { id: string }
): Promise<void> {
  const to = process.env.NOTIFICATION_EMAIL;

  if (!resend || !to) {
    console.warn(
      "[mailer] RESEND_API_KEY o NOTIFICATION_EMAIL no configurados: aviso por email NO enviado. " +
        "La reserva se ha guardado correctamente en la base de datos."
    );
    return;
  }

  const from = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

  const lines = [
    `Nova reserva / Nueva reserva — L'amagatall del Papu`,
    ``,
    `Codi de reserva / Código de reserva: ${booking.id}`,
    `Dia / Día: ${booking.date}`,
    `Pase (hora d'inici / hora de inicio): ${booking.startTime}`,
    `Nombre de persones / Número de personas: ${booking.partySize}`,
    ``,
    `Nom / Nombre: ${booking.firstName} ${booking.lastName}`,
    `Email: ${booking.email}`,
    `Telèfon / Teléfono: ${booking.phone}`,
    `Idioma del formulari / Idioma del formulario: ${booking.locale.toUpperCase()}`,
  ];

  try {
    await resend.emails.send({
      from: `L'amagatall del Papu <${from}>`,
      to,
      subject: `Nova reserva: ${booking.date} ${booking.startTime} · ${booking.partySize} persones`,
      text: lines.join("\n"),
    });
  } catch (error) {
    // No relanzamos el error: la reserva ya está confirmada y guardada:
    // un fallo de envío de email no debe romper la experiencia del usuario.
    console.error("[mailer] Error enviando el email de aviso:", error);
  }
}

const CONFIRMATION_COPY = {
  ca: {
    subject: (date: string, time: string) => `Reserva confirmada: ${date} ${time}`,
    greeting: "La teva reserva a L'amagatall del Papu està confirmada!",
    dateLabel: "Dia",
    timeLabel: "Pase",
    peopleLabel: "Persones",
    codeLabel: "Codi de reserva",
    manageIntro: "Si no pots venir, cancel·la la teva reserva des d'aquest enllaç perquè algú altre pugui ocupar la teva plaça:",
    manageCta: "Gestionar / cancel·lar la reserva",
    footer: "Festival Internacional de Cinema Fantàstic de Catalunya · Sitges 2026",
  },
  es: {
    subject: (date: string, time: string) => `Reserva confirmada: ${date} ${time}`,
    greeting: "¡Tu reserva en L'amagatall del Papu está confirmada!",
    dateLabel: "Día",
    timeLabel: "Pase",
    peopleLabel: "Personas",
    codeLabel: "Código de reserva",
    manageIntro: "Si no puedes venir, cancela tu reserva desde este enlace para que otra persona pueda ocupar tu plaza:",
    manageCta: "Gestionar / cancelar la reserva",
    footer: "Festival Internacional de Cine Fantástico de Cataluña · Sitges 2026",
  },
} as const;

/**
 * Envía la confirmación al propio cliente (no al buzón interno), con un
 * enlace para que pueda cancelar su reserva sin necesitar cuenta ni
 * contraseña: el propio id de la reserva (un UUID, imposible de adivinar)
 * hace de "llave". Igual que sendBookingNotification, nunca lanza error.
 */
export async function sendBookingConfirmation(
  booking: BookingInput & { id: string },
  manageUrl: string
): Promise<void> {
  if (!resend) {
    console.warn(
      "[mailer] RESEND_API_KEY no configurada: confirmación al cliente NO enviada."
    );
    return;
  }

  const from = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
  const copy = CONFIRMATION_COPY[booking.locale];

  const lines = [
    copy.greeting,
    "",
    `${copy.dateLabel}: ${booking.date}`,
    `${copy.timeLabel}: ${booking.startTime}`,
    `${copy.peopleLabel}: ${booking.partySize}`,
    `${copy.codeLabel}: ${booking.id.slice(0, 8).toUpperCase()}`,
    "",
    copy.manageIntro,
    manageUrl,
    "",
    copy.footer,
  ];

  try {
    await resend.emails.send({
      from: `L'amagatall del Papu <${from}>`,
      to: booking.email,
      subject: copy.subject(booking.date, booking.startTime),
      text: lines.join("\n"),
    });
  } catch (error) {
    console.error("[mailer] Error enviando la confirmación al cliente:", error);
  }
}

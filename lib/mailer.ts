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

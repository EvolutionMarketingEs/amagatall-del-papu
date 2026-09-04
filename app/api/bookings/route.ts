import { NextRequest, NextResponse } from "next/server";
import { bookingSchema } from "@/lib/validation";
import { createBooking, SlotFullError } from "@/lib/bookings";
import { sendBookingNotification, sendBookingConfirmation } from "@/lib/mailer";
import { getSlotsForDate } from "@/lib/slots";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "validation_error", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const input = parsed.data;

  // Revalidamos que el pase exista realmente para esa fecha (por si el
  // payload llega manipulado con una hora que no corresponde a ningún pase).
  const slotExists = getSlotsForDate(input.date).some((s) => s.startTime === input.startTime);
  if (!slotExists) {
    return NextResponse.json({ error: "invalid_slot" }, { status: 400 });
  }

  try {
    const id = createBooking(input);
    const manageUrl = new URL(`/reserva/${id}`, req.nextUrl.origin).toString();
    await Promise.all([
      sendBookingNotification({ ...input, id }),
      sendBookingConfirmation({ ...input, id }, manageUrl),
    ]);
    return NextResponse.json({ id }, { status: 201 });
  } catch (error) {
    if (error instanceof SlotFullError) {
      return NextResponse.json({ error: "slot_full" }, { status: 409 });
    }
    console.error("[api/bookings] Error creando reserva:", error);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}

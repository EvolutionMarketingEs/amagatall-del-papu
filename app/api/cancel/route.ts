import { NextRequest, NextResponse } from "next/server";
import { deleteBooking } from "@/lib/bookings";

// Público a propósito: el propio id de la reserva (un UUID) hace de llave.
// Es el enlace que recibe el cliente en el email de confirmación.
export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const id = formData.get("id");

  if (typeof id === "string" && id) {
    deleteBooking(id);
    return NextResponse.redirect(
      new URL(`/reserva/${id}?cancelled=1`, req.nextUrl.origin),
      { status: 303 }
    );
  }

  return NextResponse.redirect(new URL("/", req.nextUrl.origin), { status: 303 });
}

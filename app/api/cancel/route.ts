import { NextRequest, NextResponse } from "next/server";
import { deleteBooking } from "@/lib/bookings";
import { getSiteUrl } from "@/lib/site-url";

// Público a propósito: el propio id de la reserva (un UUID) hace de llave.
// Es el enlace que recibe el cliente en el email de confirmación.
export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const id = formData.get("id");
  const siteUrl = getSiteUrl(req);

  if (typeof id === "string" && id) {
    deleteBooking(id);
    return NextResponse.redirect(new URL(`/reserva/${id}?cancelled=1`, siteUrl), {
      status: 303,
    });
  }

  return NextResponse.redirect(new URL("/", siteUrl), { status: 303 });
}

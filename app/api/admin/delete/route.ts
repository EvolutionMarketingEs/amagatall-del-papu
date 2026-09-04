import { NextRequest, NextResponse } from "next/server";
import { deleteBooking } from "@/lib/bookings";
import { getSiteUrl } from "@/lib/site-url";

// Protegido por proxy.ts (Basic Auth, matcher "/api/admin/:path*").
export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const id = formData.get("id");

  if (typeof id === "string" && id) {
    deleteBooking(id);
  }

  return NextResponse.redirect(new URL("/admin", getSiteUrl(req)), { status: 303 });
}

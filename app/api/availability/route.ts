import { NextRequest, NextResponse } from "next/server";
import { getSlotsForDate, isEventDate } from "@/lib/slots";
import { getRemainingSeats } from "@/lib/bookings";
import { SCHEDULE_CONFIG } from "@/config/schedule";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get("date");

  if (!date || !isEventDate(date)) {
    return NextResponse.json({ error: "invalid_date" }, { status: 400 });
  }

  const slots = getSlotsForDate(date).map((slot) => {
    const remaining = getRemainingSeats(slot.date, slot.startTime);
    return {
      ...slot,
      capacity: SCHEDULE_CONFIG.capacityPerSlot,
      remaining,
      full: remaining === 0,
    };
  });

  return NextResponse.json({ date, slots });
}

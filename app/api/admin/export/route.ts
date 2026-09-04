import { NextResponse } from "next/server";
import { listAllBookings } from "@/lib/bookings";

export const dynamic = "force-dynamic";

function csvEscape(value: string | number): string {
  const str = String(value);
  if (/[",\n;]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export async function GET() {
  const bookings = listAllBookings();

  const header = [
    "date",
    "start_time",
    "party_size",
    "first_name",
    "last_name",
    "email",
    "phone",
    "locale",
    "created_at",
  ];

  const rows = bookings.map((b) =>
    [
      b.date,
      b.start_time,
      b.party_size,
      b.first_name,
      b.last_name,
      b.email,
      b.phone,
      b.locale,
      b.created_at,
    ]
      .map(csvEscape)
      .join(",")
  );

  const csv = [header.join(","), ...rows].join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="reservas-amagatall-del-papu.csv"`,
    },
  });
}

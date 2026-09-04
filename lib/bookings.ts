import { randomUUID } from "crypto";
import Database from "better-sqlite3";
import { getDb } from "./db";
import { SCHEDULE_CONFIG } from "@/config/schedule";
import type { BookingInput } from "./validation";

export class SlotFullError extends Error {}

/** Personas ya reservadas para un pase concreto (suma de party_size). */
export function getBookedCount(date: string, startTime: string): number {
  const row = getDb()
    .prepare(
      `SELECT COALESCE(SUM(party_size), 0) AS total FROM bookings WHERE date = ? AND start_time = ?`
    )
    .get(date, startTime) as { total: number };
  return row.total;
}

export function getRemainingSeats(date: string, startTime: string): number {
  const remaining = SCHEDULE_CONFIG.capacityPerSlot - getBookedCount(date, startTime);
  return Math.max(remaining, 0);
}

let bookingTransaction: Database.Transaction<(input: BookingInput) => string> | null = null;

/**
 * Comprueba el aforo disponible e inserta la reserva dentro de la MISMA
 * transacción SQLite. better-sqlite3 ejecuta las transacciones de forma
 * síncrona (sin ceder el hilo de Node entre medio), así que dos reservas
 * simultáneas sobre el mismo pase no pueden "leer" el mismo hueco libre a la
 * vez: esto es lo que evita superar las 7 plazas por condiciones de carrera.
 * Requiere que la app corra en un único proceso/instancia (ver README).
 *
 * La transacción se construye de forma perezosa (getDb() perezoso, ver
 * lib/db.ts) para no abrir la base de datos al importar este módulo.
 */
export function createBooking(input: BookingInput): string {
  if (!bookingTransaction) {
    const db = getDb();
    bookingTransaction = db.transaction((booking: BookingInput): string => {
      const remaining = getRemainingSeats(booking.date, booking.startTime);
      if (booking.partySize > remaining) {
        throw new SlotFullError("No queden prou places en aquest pase");
      }

      const id = randomUUID();
      db.prepare(
        `INSERT INTO bookings
          (id, date, start_time, party_size, first_name, last_name, email, phone, locale, created_at)
         VALUES
          (@id, @date, @startTime, @partySize, @firstName, @lastName, @email, @phone, @locale, @createdAt)`
      ).run({
        id,
        date: booking.date,
        startTime: booking.startTime,
        partySize: booking.partySize,
        firstName: booking.firstName,
        lastName: booking.lastName,
        email: booking.email,
        phone: booking.phone,
        locale: booking.locale,
        createdAt: new Date().toISOString(),
      });

      return id;
    });
  }

  return bookingTransaction(input);
}

export interface StoredBooking {
  id: string;
  date: string;
  start_time: string;
  party_size: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  locale: string;
  created_at: string;
}

/** Lista todas las reservas, ordenadas por día y hora (usado por /admin). */
export function listAllBookings(): StoredBooking[] {
  return getDb()
    .prepare(`SELECT * FROM bookings ORDER BY date ASC, start_time ASC`)
    .all() as StoredBooking[];
}

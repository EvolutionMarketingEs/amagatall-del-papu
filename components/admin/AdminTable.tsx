"use client";

import { useMemo, useState } from "react";
import { DeleteBookingButton } from "./DeleteBookingButton";
import type { StoredBooking } from "@/lib/bookings";

export function AdminTable({ bookings }: { bookings: StoredBooking[] }) {
  const [dateFilter, setDateFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("all");

  const dates = useMemo(
    () => Array.from(new Set(bookings.map((b) => b.date))).sort(),
    [bookings]
  );

  // Las horas disponibles en el desplegable dependen del día elegido, para
  // no mostrar pases que no existen en ese día.
  const timesForDate = useMemo(() => {
    const relevant =
      dateFilter === "all" ? bookings : bookings.filter((b) => b.date === dateFilter);
    return Array.from(new Set(relevant.map((b) => b.start_time))).sort();
  }, [bookings, dateFilter]);

  const filtered = useMemo(() => {
    return bookings.filter((b) => {
      if (dateFilter !== "all" && b.date !== dateFilter) return false;
      if (timeFilter !== "all" && b.start_time !== timeFilter) return false;
      return true;
    });
  }, [bookings, dateFilter, timeFilter]);

  const totalPeople = filtered.reduce((sum, b) => sum + b.party_size, 0);
  const hasFilters = dateFilter !== "all" || timeFilter !== "all";

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-2 text-sm">
          <span className="text-xs uppercase tracking-wide text-neutral-500">Data</span>
          <select
            value={dateFilter}
            onChange={(e) => {
              setDateFilter(e.target.value);
              setTimeFilter("all");
            }}
            className="rounded-md border border-neutral-700 bg-neutral-900 px-3 py-1.5 text-sm text-neutral-100"
          >
            <option value="all">Totes les dates</option>
            {dates.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </label>

        <label className="flex items-center gap-2 text-sm">
          <span className="text-xs uppercase tracking-wide text-neutral-500">Pase</span>
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="rounded-md border border-neutral-700 bg-neutral-900 px-3 py-1.5 text-sm text-neutral-100"
          >
            <option value="all">Tots els pases</option>
            {timesForDate.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>

        {hasFilters && (
          <button
            type="button"
            onClick={() => {
              setDateFilter("all");
              setTimeFilter("all");
            }}
            className="text-sm font-medium text-violet-400 hover:underline"
          >
            Treure filtres
          </button>
        )}

        <p className="ml-auto text-sm text-neutral-400">
          {filtered.length} reserves · {totalPeople} persones
          {hasFilters && bookings.length !== filtered.length && (
            <span className="text-neutral-600"> (de {bookings.length} en total)</span>
          )}
        </p>
      </div>

      <div className="overflow-x-auto rounded-lg border border-neutral-800">
        <table className="w-full min-w-[900px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-neutral-800 bg-neutral-900 text-left">
              <th className="px-3 py-2">Data</th>
              <th className="px-3 py-2">Pase</th>
              <th className="px-3 py-2">Persones</th>
              <th className="px-3 py-2">Nom</th>
              <th className="px-3 py-2">Cognoms</th>
              <th className="px-3 py-2">Email</th>
              <th className="px-3 py-2">Telèfon</th>
              <th className="px-3 py-2">Idioma</th>
              <th className="px-3 py-2">Creada</th>
              <th className="px-3 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((b) => (
              <tr key={b.id} className="border-b border-neutral-900 hover:bg-neutral-900/60">
                <td className="px-3 py-2">{b.date}</td>
                <td className="px-3 py-2">{b.start_time}</td>
                <td className="px-3 py-2">{b.party_size}</td>
                <td className="px-3 py-2">{b.first_name}</td>
                <td className="px-3 py-2">{b.last_name}</td>
                <td className="px-3 py-2">{b.email}</td>
                <td className="px-3 py-2">{b.phone}</td>
                <td className="px-3 py-2 uppercase">{b.locale}</td>
                <td className="px-3 py-2 text-neutral-400">
                  {new Date(b.created_at).toLocaleString("ca-ES")}
                </td>
                <td className="px-3 py-2">
                  <DeleteBookingButton id={b.id} />
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={10} className="px-3 py-6 text-center text-neutral-500">
                  {bookings.length === 0
                    ? "Encara no hi ha cap reserva."
                    : "Cap reserva coincideix amb el filtre."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

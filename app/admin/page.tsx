import { listAllBookings } from "@/lib/bookings";
import { DeleteBookingButton } from "@/components/admin/DeleteBookingButton";

export const dynamic = "force-dynamic";

export default function AdminPage() {
  const bookings = listAllBookings();
  const totalPeople = bookings.reduce((sum, b) => sum + b.party_size, 0);

  return (
    <main className="min-h-screen bg-neutral-950 p-6 text-neutral-100">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Reserves / Reservas — L&apos;amagatall del Papu</h1>
            <p className="text-sm text-neutral-400">
              {bookings.length} reserves · {totalPeople} persones en total
            </p>
          </div>
          <a
            href="/api/admin/export"
            className="rounded-md bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-500"
          >
            Descarregar CSV
          </a>
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
              {bookings.map((b) => (
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
              {bookings.length === 0 && (
                <tr>
                  <td colSpan={10} className="px-3 py-6 text-center text-neutral-500">
                    Encara no hi ha cap reserva.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

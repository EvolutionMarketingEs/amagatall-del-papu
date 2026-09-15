import { listAllBookings } from "@/lib/bookings";
import { AdminTable } from "@/components/admin/AdminTable";

export const dynamic = "force-dynamic";

export default function AdminPage() {
  const bookings = listAllBookings();

  return (
    <main className="min-h-screen bg-neutral-950 p-6 text-neutral-100">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-2xl font-semibold">Reserves / Reservas — L’amagatall del Papu</h1>
          <a
            href="/api/admin/export"
            className="rounded-md bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-500"
          >
            Descarregar CSV
          </a>
        </div>

        <AdminTable bookings={bookings} />
      </div>
    </main>
  );
}

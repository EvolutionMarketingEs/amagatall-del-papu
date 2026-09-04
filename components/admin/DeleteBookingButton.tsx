"use client";

export function DeleteBookingButton({ id }: { id: string }) {
  return (
    <form
      action="/api/admin/delete"
      method="POST"
      onSubmit={(e) => {
        if (!confirm("Eliminar aquesta reserva? Aquesta acció no es pot desfer.")) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="text-xs font-medium text-red-400 transition hover:text-red-300 hover:underline"
      >
        Eliminar
      </button>
    </form>
  );
}

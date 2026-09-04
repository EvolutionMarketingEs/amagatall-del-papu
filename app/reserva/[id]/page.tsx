import Link from "next/link";
import { getBookingById } from "@/lib/bookings";
import { CancelBookingButton } from "@/components/manage/CancelBookingButton";
import type { Locale } from "@/i18n/translations";

export const dynamic = "force-dynamic";

const COPY = {
  ca: {
    heading: "La teva reserva",
    dateLabel: "Dia",
    timeLabel: "Pase",
    peopleLabel: "Persones",
    codeLabel: "Codi de reserva",
    cancelHeading: "Vols cancel·lar?",
    cancelBody:
      "Si cancel·les, la teva plaça queda lliure perquè un altre grup la pugui reservar.",
    cancelledHeading: "Reserva cancel·lada",
    cancelledBody: "La teva plaça ja està lliure. Gràcies per avisar-nos!",
    notFoundHeading: "No trobem aquesta reserva",
    notFoundBody: "Pot ser que ja s'hagi cancel·lat, o que l'enllaç no sigui correcte.",
    backHome: "Tornar a l'inici",
  },
  es: {
    heading: "Tu reserva",
    dateLabel: "Día",
    timeLabel: "Pase",
    peopleLabel: "Personas",
    codeLabel: "Código de reserva",
    cancelHeading: "¿Quieres cancelar?",
    cancelBody: "Si cancelas, tu plaza queda libre para que otro grupo pueda reservarla.",
    cancelledHeading: "Reserva cancelada",
    cancelledBody: "Tu plaza ya está libre. ¡Gracias por avisarnos!",
    notFoundHeading: "No encontramos esta reserva",
    notFoundBody: "Puede que ya se haya cancelado, o que el enlace no sea correcto.",
    backHome: "Volver al inicio",
  },
} satisfies Record<Locale, Record<string, string>>;

export default async function ManageBookingPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ cancelled?: string }>;
}) {
  const { id } = await params;
  const { cancelled } = await searchParams;
  const booking = getBookingById(id);

  if (!booking) {
    if (cancelled === "1") {
      return (
        <StatusScreen
          heading={COPY.ca.cancelledHeading}
          headingEs={COPY.es.cancelledHeading}
          body={COPY.ca.cancelledBody}
          bodyEs={COPY.es.cancelledBody}
          icon="✓"
        />
      );
    }
    return (
      <StatusScreen
        heading={COPY.ca.notFoundHeading}
        headingEs={COPY.es.notFoundHeading}
        body={COPY.ca.notFoundBody}
        bodyEs={COPY.es.notFoundBody}
        icon="?"
      />
    );
  }

  const locale: Locale = booking.locale === "es" ? "es" : "ca";
  const t = COPY[locale];

  return (
    <main className="portal-bg flex min-h-screen items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <h1 className="text-center font-display text-2xl text-text sm:text-3xl">{t.heading}</h1>

        <dl className="mt-6 space-y-2 rounded-xl border border-border bg-bg-card p-5">
          <Row label={t.dateLabel} value={booking.date} />
          <Row label={t.timeLabel} value={booking.start_time} />
          <Row label={t.peopleLabel} value={String(booking.party_size)} />
          <Row label={t.codeLabel} value={booking.id.slice(0, 8).toUpperCase()} />
        </dl>

        <div className="mt-8 rounded-xl border border-border bg-bg-card p-5 text-center">
          <h2 className="font-display text-lg text-text">{t.cancelHeading}</h2>
          <p className="mt-2 text-sm text-text-muted">{t.cancelBody}</p>
          <div className="mt-4">
            <CancelBookingButton id={booking.id} locale={locale} />
          </div>
        </div>
      </div>
    </main>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border/60 pb-2 text-sm last:border-0 last:pb-0">
      <dt className="text-text-muted">{label}</dt>
      <dd className="font-medium text-text">{value}</dd>
    </div>
  );
}

function StatusScreen({
  heading,
  headingEs,
  body,
  bodyEs,
  icon,
}: {
  heading: string;
  headingEs: string;
  body: string;
  bodyEs: string;
  icon: string;
}) {
  return (
    <main className="portal-bg flex min-h-screen items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-xl border border-border bg-bg-card p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-accent bg-accent/20 text-2xl text-accent-strong">
          {icon}
        </div>
        <h1 className="mt-4 font-display text-xl text-text">{heading}</h1>
        <p className="mt-2 text-sm text-text-muted">{body}</p>
        <div className="mt-4 border-t border-border/60 pt-4">
          <h2 className="font-display text-xl text-text">{headingEs}</h2>
          <p className="mt-2 text-sm text-text-muted">{bodyEs}</p>
        </div>
        <Link
          href="/"
          className="mt-6 inline-block rounded-full border border-border px-6 py-2.5 text-sm font-medium text-text transition hover:border-accent"
        >
          Inici / Inicio
        </Link>
      </div>
    </main>
  );
}

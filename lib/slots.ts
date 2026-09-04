import {
  SCHEDULE_CONFIG,
  EVENT_DATES,
  SUNDAY_MORNING_ONLY_DATES,
} from "@/config/schedule";

export type Session = "morning" | "afternoon";

export interface SlotDefinition {
  date: string;
  session: Session;
  /** "HH:MM" */
  startTime: string;
  /** "HH:MM" */
  endTime: string;
}

function timeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function minutesToTime(minutes: number): string {
  const h = Math.floor(minutes / 60)
    .toString()
    .padStart(2, "0");
  const m = (minutes % 60).toString().padStart(2, "0");
  return `${h}:${m}`;
}

/**
 * Genera todos los pases posibles de una sesión (mañana/tarde) para un día,
 * a partir de la duración de pase y el buffer configurados. El último pase
 * siempre termina antes o justo a la hora de fin de la sesión.
 */
function generateSessionSlots(session: Session, date: string): SlotDefinition[] {
  const start =
    session === "morning" ? SCHEDULE_CONFIG.morningStart : SCHEDULE_CONFIG.afternoonStart;
  const end = session === "morning" ? SCHEDULE_CONFIG.morningEnd : SCHEDULE_CONFIG.afternoonEnd;

  const startMinutes = timeToMinutes(start);
  const endMinutes = timeToMinutes(end);
  const step = SCHEDULE_CONFIG.slotDurationMinutes + SCHEDULE_CONFIG.bufferMinutes;

  const slots: SlotDefinition[] = [];
  let cursor = startMinutes;

  while (cursor + SCHEDULE_CONFIG.slotDurationMinutes <= endMinutes) {
    slots.push({
      date,
      session,
      startTime: minutesToTime(cursor),
      endTime: minutesToTime(cursor + SCHEDULE_CONFIG.slotDurationMinutes),
    });
    cursor += step;
  }

  return slots;
}

/** Todos los días reservables del evento, en orden. */
export function getEventDates(): string[] {
  return [...EVENT_DATES];
}

export function isEventDate(date: string): boolean {
  return (EVENT_DATES as readonly string[]).includes(date);
}

/**
 * Devuelve todos los pases (mañana + tarde, salvo excepción) de un día concreto.
 * Si el día no pertenece al evento, devuelve un array vacío.
 */
export function getSlotsForDate(date: string): SlotDefinition[] {
  if (!isEventDate(date)) return [];

  const morning = generateSessionSlots("morning", date);

  if (SUNDAY_MORNING_ONLY_DATES.includes(date)) {
    return morning;
  }

  const afternoon = generateSessionSlots("afternoon", date);
  return [...morning, ...afternoon];
}

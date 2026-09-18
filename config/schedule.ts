/**
 * Configuración central de horarios, duración de pases y aforo.
 *
 * Todo el sistema de reservas (generación de pases, disponibilidad, formulario)
 * se recalcula automáticamente a partir de estos valores — no hay pases
 * "escritos a mano" en ningún sitio. Cambia aquí y toda la app se actualiza.
 */

export const SCHEDULE_CONFIG = {
  /** Hora de inicio/fin de la sesión de mañana, formato "HH:MM" (24h). */
  morningStart: "11:00",
  morningEnd: "14:30",

  /** Hora de inicio/fin de la sesión de tarde, formato "HH:MM" (24h). */
  afternoonStart: "16:00",
  afternoonEnd: "19:30",

  /** Duración de cada pase, en minutos. */
  slotDurationMinutes: 10,

  /**
   * Minutos de descanso entre el fin de un pase y el inicio del siguiente.
   * 0 = los pases van seguidos sin hueco.
   */
  bufferMinutes: 0,

  /** Número máximo de personas por pase. */
  capacityPerSlot: 7,
} as const;

/** Días reservables del evento (Festival de Sitges 2026), formato "YYYY-MM-DD". */
export const EVENT_DATES = [
  "2026-10-08",
  "2026-10-09",
  "2026-10-10",
  "2026-10-11",
  "2026-10-12",
  "2026-10-13",
  "2026-10-14",
  "2026-10-15",
  "2026-10-16",
  "2026-10-17",
  "2026-10-18",
] as const;

/**
 * Días en los que SOLO se genera la sesión de mañana (p. ej. el domingo de
 * clausura). El resto de días del array EVENT_DATES tienen mañana y tarde.
 */
export const SUNDAY_MORNING_ONLY_DATES: readonly string[] = ["2026-10-18"];

/**
 * Franjas horarias bloqueadas para días concretos. Los pases dentro de estas
 * franjas aparecen como "Complet" (igual que si ya estuvieran reservados),
 * pero sin ocupar plazas reales ni ensuciar la lista de reservas del admin.
 * "to" es exclusivo: { from: "11:00", to: "13:00" } bloquea 11:00-12:50 (con
 * pases de 10 min), pero deja libre el de las 13:00.
 * Añade o borra objetos de este array según haga falta.
 */
export const BLOCKED_WINDOWS: { date: string; from: string; to: string }[] = [
  { date: "2026-10-08", from: "11:00", to: "13:00" }, // Alumnes d'illa 80-90
  { date: "2026-10-09", from: "16:00", to: "16:30" }, // Consellera + acompanyants
  { date: "2026-10-11", from: "12:00", to: "12:30" }, // Grup 2 (visita escolar)
  { date: "2026-10-11", from: "12:40", to: "13:40" }, // Grup 1 (visita escolar)
];

export const VENUE = {
  name: "Espai Joan Tarrida",
  address: "C. Joan Tarrida, 10-12, 08870 Sitges",
  mapsQuery: "Espai Joan Tarrida, Carrer de Joan Tarrida 10-12, 08870 Sitges",
};

export const TRAILER_YOUTUBE_ID = "8OL78c0Nzbw";

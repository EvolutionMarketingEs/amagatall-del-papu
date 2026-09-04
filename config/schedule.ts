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
  slotDurationMinutes: 7,

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

export const VENUE = {
  name: "Espai Joan Tarrida",
  address: "C. Joan Tarrida, 10-12, 08870 Sitges",
  mapsQuery: "Espai Joan Tarrida, Carrer de Joan Tarrida 10-12, 08870 Sitges",
};

export const TRAILER_YOUTUBE_ID = "8OL78c0Nzbw";

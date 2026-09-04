import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

// DATA_DIR es configurable por si el hosting exige un volumen persistente en
// otra ruta (p. ej. Railway/Render montan el volumen en /data).
const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "reservas.db");

const globalForDb = globalThis as unknown as { __papuDb?: Database.Database };

function initDb(): Database.Database {
  if (!fs.existsSync(/* turbopackIgnore: true */ DATA_DIR)) {
    fs.mkdirSync(/* turbopackIgnore: true */ DATA_DIR, { recursive: true });
  }

  const instance = new Database(DB_PATH);

  // WAL mejora la concurrencia de lectura/escritura sin afectar a la
  // atomicidad de las transacciones que usamos para controlar el aforo
  // (ver lib/bookings.ts).
  instance.pragma("journal_mode = WAL");
  instance.pragma("foreign_keys = ON");

  instance.exec(`
    CREATE TABLE IF NOT EXISTS bookings (
      id TEXT PRIMARY KEY,
      date TEXT NOT NULL,
      start_time TEXT NOT NULL,
      party_size INTEGER NOT NULL,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      locale TEXT NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_bookings_slot ON bookings(date, start_time);
  `);

  return instance;
}

/**
 * Conexión perezosa: la base de datos solo se abre en la primera llamada real
 * (dentro de un request handler), nunca al importar el módulo. Esto evita que
 * el build de Next.js (que evalúa los módulos de las rutas en varios workers
 * en paralelo para recopilar metadatos) intente abrir/migrar el mismo fichero
 * SQLite a la vez desde varios procesos y lo deje bloqueado ("database is
 * locked").
 */
export function getDb(): Database.Database {
  if (!globalForDb.__papuDb) {
    globalForDb.__papuDb = initDb();
  }
  return globalForDb.__papuDb;
}

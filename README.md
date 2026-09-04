# L'amagatall del Papu — Landing + motor de reservas

Landing bilingüe (català / castellà) con motor de reservas para l'escape room
immersiu **"L'amagatall del Papu"**, al Festival Internacional de Cinema
Fantàstic de Catalunya (Sitges, 8–18 d'octubre de 2026).

**Stack:** Next.js 16 (App Router) + TypeScript + Tailwind CSS 4 · SQLite
(`better-sqlite3`) para persistencia · Resend para el email de aviso.

---

## 1. Arrancar en local

Necesitas Node.js 20 o superior.

```bash
npm install
cp .env.example .env.local   # rellena al menos ADMIN_USER / ADMIN_PASSWORD
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000). La base de datos SQLite
se crea sola en `./data/reservas.db` la primera vez que arranca el servidor.

Sin `RESEND_API_KEY` / `NOTIFICATION_EMAIL` configurados, las reservas se
siguen guardando con normalidad — solo se salta el envío del email (verás un
aviso en la consola del servidor).

### Panel de reservas recibidas

Ve a **`/admin`** (protegido con usuario/contraseña vía `ADMIN_USER` /
`ADMIN_PASSWORD`, HTTP Basic Auth). Desde ahí puedes ver la lista completa de
reservas y descargarlas en CSV con el botón "Descarregar CSV".

---

## 2. Cómo funciona el motor de reservas

### Los pases se generan solos

**No hay pases escritos a mano en ningún sitio.** Todo sale de
[`config/schedule.ts`](config/schedule.ts):

```ts
export const SCHEDULE_CONFIG = {
  morningStart: "11:00",
  morningEnd: "14:30",
  afternoonStart: "16:00",
  afternoonEnd: "19:30",
  slotDurationMinutes: 7,
  bufferMinutes: 0,       // minutos de descanso entre pase y pase
  capacityPerSlot: 7,     // personas máximas por pase
};

export const EVENT_DATES = ["2026-10-08", ..., "2026-10-18"];
export const SUNDAY_MORNING_ONLY_DATES = ["2026-10-18"];
```

`lib/slots.ts` recorre cada sesión (mañana/tarde) sumando
`slotDurationMinutes + bufferMinutes` desde la hora de inicio hasta que el
siguiente pase ya no cabría antes de la hora de fin. Cambia cualquiera de
estos valores y **toda la app se recalcula sola**: la disponibilidad, el
selector de horas del formulario y el email de aviso.

Para añadir o quitar días del evento, edita `EVENT_DATES`. Para que un día
solo tenga sesión de mañana (como el domingo de clausura), añádelo a
`SUNDAY_MORNING_ONLY_DATES`.

### Cómo se controla el aforo (7 personas / pase) sin condiciones de carrera

Cada reserva se guarda en SQLite dentro de una **transacción síncrona**
(`lib/bookings.ts`, función `createBooking`): primero suma las personas ya
reservadas para ese pase y, si caben, inserta la fila — todo dentro de la
misma transacción de `better-sqlite3`, que es **síncrona** (no cede el hilo
de Node a mitad de la operación). Esto significa que aunque lleguen dos
reservas al mismo tiempo para el último hueco de un pase, Node las procesa
una detrás de otra sin que puedan "verse" el hueco libre a la vez — así se
evita superar las 7 plazas.

**Importante:** esto solo funciona con un único proceso/instancia de Node
corriendo contra el mismo fichero SQLite. No despliegues esta app con varias
réplicas/instancias en paralelo (autoscaling horizontal) sin cambiar antes a
una base de datos con bloqueos a nivel de fila (Postgres, por ejemplo) — para
un evento de este tamaño, una sola instancia es más que suficiente.

### Validación

`lib/validation.ts` define un único esquema de Zod (`bookingSchema`) que se
usa **tanto en el cliente** (feedback instantáneo en el formulario) **como en
el servidor** (`/api/bookings`, que es la validación que realmente cuenta).
Valida formato de email, teléfono (9-20 dígitos, admite prefijo
internacional), aceptación obligatoria de la política de privacidad y que el
número de personas no supere el aforo restante del pase.

---

## 3. Cómo editar los textos (català / castellà)

Todo el copy vive en **un único fichero**: [`i18n/translations.ts`](i18n/translations.ts).
Contiene dos objetos, `ca` y `es`, con exactamente la misma forma (TypeScript
avisa en rojo si te dejas una clave). Edita los valores que quieras — no hace
falta tocar ningún componente.

El idioma por defecto es catalán (`i18n/LocaleProvider.tsx`, constante
`DEFAULT_LOCALE`). El selector CA/ES del header guarda la preferencia del
visitante en `localStorage` para que no tenga que volver a elegir en cada
visita.

---

## 4. Estructura de archivos

```
config/schedule.ts          → horarios, duración de pase, aforo, fechas del evento, lugar
i18n/translations.ts        → todos los textos en CA y ES
i18n/LocaleProvider.tsx     → contexto de idioma (selector CA/ES)
lib/slots.ts                → genera los pases a partir de schedule.ts
lib/db.ts                   → conexión SQLite + esquema de la tabla `bookings`
lib/bookings.ts             → lógica de aforo + creación de reservas (transacción atómica)
lib/validation.ts           → esquema Zod compartido cliente/servidor
lib/mailer.ts               → envío del email de aviso (Resend)
app/page.tsx                → ensambla la landing (Hero, Story, WhatIsIt, PracticalInfo, BookingWizard, Footer)
app/api/availability/route.ts → GET plazas restantes por pase, para una fecha
app/api/bookings/route.ts     → POST crea una reserva
app/admin/page.tsx            → tabla de reservas recibidas (protegida)
app/api/admin/export/route.ts → descarga CSV de reservas
proxy.ts                      → protege /admin con usuario/contraseña (Next.js 16 renombró "middleware" a "proxy")
components/                   → Header, Hero, Story, WhatIsIt, PracticalInfo, Footer
components/booking/           → el asistente de reserva paso a paso (BookingWizard + sub-pasos)
data/reservas.db              → base de datos SQLite (se crea sola, no se versiona)
```

---

## 5. Variables de entorno

Copia `.env.example` a `.env.local` (desarrollo) o configúralas en el panel
de tu hosting (producción). **Nunca las escribas directamente en el código.**

| Variable | Para qué sirve | Obligatoria |
|---|---|---|
| `RESEND_API_KEY` | Envío del email de aviso de cada reserva. Créala gratis en [resend.com](https://resend.com) (API Keys → Create). | No — sin ella, la reserva se guarda igual pero no se envía email. |
| `NOTIFICATION_EMAIL` | Dirección a la que llega el aviso de cada reserva nueva. | No, pero recomendable. |
| `RESEND_FROM_EMAIL` | Remitente del email. Con el dominio de pruebas de Resend puedes dejar `onboarding@resend.dev`; para producción, verifica vuestro propio dominio en Resend y pon algo como `reserves@vostredomini.cat`. | No (tiene valor por defecto). |
| `ADMIN_USER` / `ADMIN_PASSWORD` | Usuario/contraseña del panel `/admin`. | Sí, para poder entrar a `/admin` (si faltan, la ruta se bloquea por seguridad). |
| `DATA_DIR` | Carpeta donde se guarda `reservas.db`. Solo hace falta cambiarla si tu hosting exige un volumen persistente en otra ruta (ver despliegue en Railway más abajo). | No (por defecto `./data`). |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Email de contacto que se muestra en el footer público. | No. |

---

## 6. Desplegar en producción

**Importante:** esta app guarda las reservas en un fichero SQLite en disco.
**Vercel no sirve tal cual** porque su filesystem es efímero (perderías las
reservas en cada redeploy). Recomendado: **Railway** o **Render**, que
permiten un servidor Node.js normal con un volumen persistente.

### Railway (recomendado)

1. Sube este proyecto a un repositorio de GitHub.
2. En [railway.app](https://railway.app) → **New Project** → **Deploy from
   GitHub repo**. Railway detecta Next.js automáticamente (`npm run build`
   + `npm run start`).
3. En **Settings → Volumes**, añade un volumen y móntalo en `/data`.
4. En **Variables**, añade todas las de la tabla anterior, y pon
   `DATA_DIR=/data` para que la base de datos viva en el volumen persistente
   (si no, se perdería en cada deploy).
5. Railway te da un dominio `*.up.railway.app`; puedes añadir tu propio
   dominio en **Settings → Domains**.

### Render (alternativa)

Mismo planteamiento: **Web Service** desde el repo (build `npm run build`,
start `npm run start`), añade un **Persistent Disk** montado en `/data`, y
configura `DATA_DIR=/data` + el resto de variables.

### Si preferís Vercel

Es posible, pero hay que cambiar la base de datos por una alojada (porque
Vercel no tiene disco persistente): la opción más parecida a SQLite es
[Turso](https://turso.tech) (libSQL) — cambiarías `lib/db.ts` para usar el
cliente de Turso en vez de `better-sqlite3`, y ya no hace falta la lógica de
`DATA_DIR`. Avísame si queréis que lo prepare así.

---

## 7. Comprobaciones antes de abrir las reservas al público

- [ ] Configura `RESEND_API_KEY` y `NOTIFICATION_EMAIL` y haz una reserva de
      prueba real para confirmar que llega el email.
- [ ] Cambia `ADMIN_PASSWORD` por una contraseña fuerte (el valor de
      `.env.local` de este repo es solo para desarrollo local).
- [ ] Revisa el texto de la política de privacidad en
      `i18n/translations.ts` (`booking.contact.privacyText`, en `ca` y `es`)
      — el texto actual es un resumen genérico; sustitúyelo por el texto
      legal definitivo si vuestra asesoría os da uno.
- [ ] Verifica en un móvil real el flujo completo: elegir día → pase →
      personas → datos → confirmación.

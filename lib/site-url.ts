import type { NextRequest } from "next/server";

/**
 * Dirección pública real del sitio, para construir enlaces en emails.
 *
 * `req.nextUrl.origin` no sirve por sí solo detrás de un proxy como el de
 * Railway: el proceso de Next.js ve la petición reenviada internamente
 * (p. ej. "localhost:8080"), no el dominio público que ve el visitante. Por
 * eso primero miramos la cabecera `x-forwarded-host` (que el proxy sí rellena
 * con el dominio real), y solo si falta todo eso caemos en nextUrl.origin.
 *
 * Si algún día usáis un dominio propio y el proxy no lo refleja bien, podéis
 * fijarlo a mano con la variable de entorno SITE_URL (p. ej.
 * "https://vuestrodominio.cat").
 */
export function getSiteUrl(req: NextRequest): string {
  if (process.env.SITE_URL) return process.env.SITE_URL;

  const forwardedHost = req.headers.get("x-forwarded-host");
  const forwardedProto = req.headers.get("x-forwarded-proto") || "https";

  if (forwardedHost) {
    return `${forwardedProto}://${forwardedHost}`;
  }

  return req.nextUrl.origin;
}

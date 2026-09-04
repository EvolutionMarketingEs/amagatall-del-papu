import { NextRequest, NextResponse } from "next/server";

// Protege /admin con HTTP Basic Auth usando ADMIN_USER / ADMIN_PASSWORD (env).
// Si no se han configurado esas variables, /admin queda bloqueado por defecto
// (falla seguro) en vez de quedar abierto a cualquiera.
//
// Nota Next.js 16: este fichero se llama "proxy.ts" (antes "middleware.ts").
// La función puede llamarse `proxy` o ser el export por defecto.
export function proxy(req: NextRequest) {
  const adminUser = process.env.ADMIN_USER;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminUser || !adminPassword) {
    return new NextResponse("Admin no configurado (falta ADMIN_USER / ADMIN_PASSWORD).", {
      status: 503,
    });
  }

  const authHeader = req.headers.get("authorization");
  if (authHeader?.startsWith("Basic ")) {
    const decoded = atob(authHeader.slice(6));
    const separatorIndex = decoded.indexOf(":");
    const user = decoded.slice(0, separatorIndex);
    const pass = decoded.slice(separatorIndex + 1);
    if (user === adminUser && pass === adminPassword) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Autenticación requerida", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Admin"' },
  });
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};

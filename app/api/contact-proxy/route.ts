// app/api/contact-proxy/route.ts
import { NextResponse } from "next/server";

// Lee la URL de GAS solo en el servidor (no pública)
// En CodeSandbox/local: crea .env.local con GAS_ENDPOINT="https://script.google.com/macros/s/XXX/exec"
const GAS_ENDPOINT = process.env.GAS_ENDPOINT; // <- NO hardcodear

export async function GET() {
  return NextResponse.json({ ok: true, proxy: "contact-proxy up" });
}

export async function POST(req: Request) {
  try {
    if (!GAS_ENDPOINT) {
      return NextResponse.json(
        { ok: false, error: "GAS_ENDPOINT no configurado en el servidor" },
        { status: 500 }
      );
    }

    const formData = await req.formData();

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const gotcha = String(formData.get("_gotcha") ?? "");
    const consent = formData.get("consent");
    const site = String(formData.get("site") ?? "Oktoberfest Puyuhuapi 2025");
    const source = String(formData.get("source") ?? "contact-form-gas");

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: "Completa nombre, correo y mensaje." }, { status: 400 });
    }
    if (!consent) {
      return NextResponse.json({ ok: false, error: "Debes aceptar la política de datos." }, { status: 400 });
    }

    // Validación extra (opcional)
    if (email.length > 254 || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return NextResponse.json({ ok: false, error: "Correo inválido." }, { status: 400 });
    }
    if (message.length > 2000) {
      return NextResponse.json({ ok: false, error: "Mensaje demasiado largo (máx. 2000 caracteres)." }, { status: 400 });
    }

    // Reenvío a GAS como FormData (evita CORS y preflight)
    const fd = new FormData();
    fd.set("name", name);
    fd.set("email", email);
    fd.set("message", message);
    fd.set("gotcha", gotcha);
    fd.set("site", site);
    fd.set("source", source);

    const res = await fetch(GAS_ENDPOINT, { method: "POST", body: fd });

    const contentType = res.headers.get("content-type") || "";
    const raw = await res.text();

    if (!contentType.includes("application/json")) {
      return NextResponse.json(
        { ok: false, error: "Respuesta de GAS no es JSON" },
        { status: 502 }
      );
    }

    let data: any = {};
    try { data = JSON.parse(raw); } catch {
      return NextResponse.json({ ok: false, error: "JSON inválido desde GAS" }, { status: 502 });
    }

    if (!res.ok || !data?.ok) {
      return NextResponse.json(
        { ok: false, error: data?.error || `Error en GAS (${res.status})` },
        { status: res.status || 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Error del servidor en el proxy." }, { status: 500 });
  }
}

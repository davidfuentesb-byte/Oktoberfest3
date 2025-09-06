"use client";

import { useState } from "react";

type Props = {
  endpoint?: string; // por defecto usa /api/contact-proxy
};

export default function ContactFormGAS({ endpoint = "/api/contact-proxy" }: Props) {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    const fd = new FormData(form);
    fd.set("site", "Oktoberfest Puyuhuapi 2025");
    fd.set("source", "contact-form-gas");

    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const message = String(fd.get("message") || "").trim();
    const consent = fd.get("consent");
    if (!name || !email || !message) {
      setErrorMsg("Completa nombre, correo y mensaje.");
      setStatus("error");
      return;
    }
    if (!consent) {
      setErrorMsg("Debes aceptar la política de datos para continuar.");
      setStatus("error");
      return;
    }

    try {
      setStatus("sending");
      setErrorMsg("");

      const res = await fetch(endpoint, { method: "POST", body: fd });
      const text = await res.text();
      let data: any = {};
      try { data = JSON.parse(text); } catch {}

      if (!res.ok) {
        console.error("Proxy error:", res.status, text);
        setErrorMsg(data?.error || `Error del servidor (${res.status}).`);
        setStatus("error");
      } else if (!data?.ok) {
        console.error("GAS not ok:", text);
        setErrorMsg(data?.error || "No se pudo enviar. Inténtalo nuevamente.");
        setStatus("error");
      } else {
        setStatus("ok");
        form.reset();
      }
    } catch (err) {
      console.error("Network error:", err);
      setErrorMsg("Error de red. Revisa tu conexión e inténtalo otra vez.");
      setStatus("error");
    }
  }

  return (
    <form className="mt-4 grid gap-4 max-w-xl" onSubmit={handleSubmit} noValidate>
      <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />

      <input className="border rounded-lg p-3" name="name" placeholder="Tu nombre" required aria-label="Nombre" />
      <input className="border rounded-lg p-3" type="email" name="email" placeholder="Tu correo" required aria-label="Correo electrónico" />
      <textarea className="border rounded-lg p-3" name="message" placeholder="Mensaje" rows={4} required aria-label="Mensaje" />

      <label className="flex items-start gap-2 text-sm text-gray-700">
        <input type="checkbox" name="consent" className="mt-1" />
        <span>
          Acepto la <a className="link" href="/politica-de-datos">política de datos</a>.
        </span>
      </label>

      <button className="btn-brand disabled:opacity-50" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Enviando…" : "Enviar"}
      </button>

      {status === "ok" && <p className="text-green-700 text-sm">¡Gracias! Mensaje enviado correctamente.</p>}
      {status === "error" && <p className="text-red-600 text-sm">{errorMsg || "Hubo un problema al enviar."}</p>}

      <p className="text-xs text-gray-500">
        No compartimos tu información con terceros. Puedes solicitar su eliminación cuando quieras.
      </p>
    </form>
  );
}

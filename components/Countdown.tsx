// components/Countdown.tsx
"use client";

import React from "react";

type Props = {
  startISO: string; // ej: "2025-12-06T12:00:00-03:00"
  endISO: string;   // ej: "2025-12-08T23:59:59-03:00"
  className?: string;
  compact?: boolean; // si quieres que los cuadros sean más pequeños
};

function pad2(n: number) {
  return n.toString().padStart(2, "0");
}

export default function Countdown({ startISO, endISO, className, compact }: Props) {
  const start = React.useMemo(() => new Date(startISO), [startISO]);
  const end = React.useMemo(() => new Date(endISO), [endISO]);

  const [now, setNow] = React.useState<Date>(new Date());

  React.useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  let mode: "before" | "during" | "after" = "before";
  if (now >= start && now <= end) mode = "during";
  if (now > end) mode = "after";

  let d = 0, h = 0, m = 0, s = 0;
  if (mode === "before") {
    const diff = start.getTime() - now.getTime();
    d = Math.max(0, Math.floor(diff / 86400000));
    h = Math.max(0, Math.floor((diff / 3600000) % 24));
    m = Math.max(0, Math.floor((diff / 60000) % 60));
    s = Math.max(0, Math.floor((diff / 1000) % 60));
  } else if (mode === "during") {
    const diff = end.getTime() - now.getTime();
    d = Math.max(0, Math.floor(diff / 86400000));
    h = Math.max(0, Math.floor((diff / 3600000) % 24));
    m = Math.max(0, Math.floor((diff / 60000) % 60));
    s = Math.max(0, Math.floor((diff / 1000) % 60));
  }

  const label =
    mode === "before"
      ? "EL OKTOBERFEST COMIENZA EN:"
      : mode === "during"
      ? "¡NUESTRA CELEBRACION YA COMENZO... TE LO ESTAS PERDIENDO!"
      : "LA EDICION 2025 HA TERMINADO... NOS VEMOS EN OCTUBRE DEL 2026!!!";

  const boxBase =
    "flex flex-col items-center justify-center rounded-xl border bg-white/90 backdrop-blur px-3 py-2 md:px-4 md:py-3 shadow-sm";
  const numBase =
    "tabular-nums font-extrabold text-xl md:text-3xl";
  const capBase =
    "text-[10px] md:text-xs tracking-wide text-gray-600 mt-1";

  const stackGap = compact ? "gap-2" : "gap-3";

  return (
    <div className={className}>
      <div className={`flex items-center justify-center ${stackGap}`}>
        <span className="text-xs md:text-sm font-semibold text-white/95 bg-black/40 rounded-full px-2 py-1">
          {label}
        </span>
      </div>
      {mode !== "after" ? (
        <div className={`mt-2 flex items-stretch justify-center ${stackGap}`}>
          <div className={boxBase}>
            <div className={numBase}>{d}</div>
            <div className={capBase}>DÍAS</div>
          </div>
          <div className={boxBase}>
            <div className={numBase}>{pad2(h)}</div>
            <div className={capBase}>HRS</div>
          </div>
          <div className={boxBase}>
            <div className={numBase}>{pad2(m)}</div>
            <div className={capBase}>MIN</div>
          </div>
          <div className={boxBase}>
            <div className={numBase}>{pad2(s)}</div>
            <div className={capBase}>SEG</div>
          </div>
        </div>
      ) : (
        <div className="mt-2 text-center">
          <span className="inline-block rounded-xl bg-white/90 px-3 py-1 text-sm md:text-base font-medium">
            ¡Gracias por ser parte de nuestro evento... Te esperamos en Octubre del 2026!
          </span>
        </div>
      )}
    </div>
  );
}

// components/BackgroundSlideshow.tsx
"use client";

import React from "react";

type Props = {
  images: string[];     // rutas públicas: "/img/hero/hero_1.jpg", ...
  intervalMs?: number;  // duración de cada imagen (default 8000 ms)
  fadeMs?: number;      // duración del crossfade (default 900 ms)
  className?: string;   // altura desde fuera (ej: h-[78vh])
};

export default function BackgroundSlideshow({
  images,
  intervalMs = 8000,
  fadeMs = 900,
  className,
}: Props) {
  const safeImages = images?.length ? images : ["/img/placeholder.png"];
  const [idx, setIdx] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(() => {
      setIdx((i) => (i + 1) % safeImages.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [intervalMs, safeImages.length]);

  return (
    <div className={`relative overflow-hidden ${className ?? ""}`}>
      {/* Capas absolutas con crossfade. 
          Solo la imagen ACTIVA tiene animación "Ken Burns" (zoom suave) */}
      {safeImages.map((src, i) => {
        const isActive = i === idx;
        return (
          <img
            key={`${src}-${i}`}
            src={src}
            alt=""
            className={`absolute inset-0 w-full h-full object-cover will-change-transform ${
              isActive ? "kb-active" : "kb-idle"
            }`}
            style={{
              opacity: isActive ? 1 : 0,
              transition: `opacity ${fadeMs}ms ease`,
              // Pasamos la duración de la animación por variable CSS
              // para que la "Ken Burns" coincida con intervalMs.
              // (Le restamos un poco para que el crossfade no corte abrupto)
              // Puedes ajustar el -200 si quieres un encaje distinto.
              // @ts-ignore
              "--kb-duration": `${Math.max(0, intervalMs - 200)}ms`,
            } as React.CSSProperties}
          />
        );
      })}

      {/* Overlay para legibilidad del contenido encima */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Estilos locales */}
      <style jsx>{`
        @keyframes kbZoomOut {
          0%   { transform: scale(1.10); }
          100% { transform: scale(1.00); }
        }
        .kb-active {
          animation-name: kbZoomOut;
          animation-duration: var(--kb-duration, 8000ms);
          animation-timing-function: ease-out;
          animation-fill-mode: forwards; /* mantiene el último frame */
        }
        .kb-idle {
          transform: scale(1.00);
        }
      `}</style>
    </div>
  );
}

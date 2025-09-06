// components/BrandGrid.tsx
import React from "react";
import type { Brand } from "@/data/sponsors";

type Props = { title: string; items: Brand[] };

export default function BrandGrid({ title, items }: Props) {
  return (
    <section className="section">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {items.map((b) => (
          <a
            key={b.name}
            href={b.url || "#"}
            target={b.url ? "_blank" : "_self"}
            rel="noreferrer"
            className="border rounded-xl p-4 flex items-center justify-center hover:shadow-sm transition"
            aria-label={b.name}
          >
            {b.logo ? (
              // Si luego agregas logos (ruta pública), cámbialo por <img src=... />
              <span className="text-sm">{b.name}</span>
            ) : (
              <span className="text-sm">{b.name}</span>
            )}
          </a>
        ))}
      </div>
    </section>
  );
}

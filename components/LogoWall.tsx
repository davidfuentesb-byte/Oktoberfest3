// components/LogoWall.tsx
import React from "react";
import ImageWithFallback from "@/components/ImageWithFallback";
import type { Brand } from "@/data/sponsors";

type Item = Brand & { note?: string };

export default function LogoWall({
  title,
  items,
}: {
  title: string;
  items: Item[]; // { name, url?, logo?, note? }
}) {
  return (
    <section className="section">
      <div className="container-default">
        <h2 className="text-2xl font-bold">{title}</h2>

        {/* 
          Flex + wrap + justify-center:
          - Centra las filas si hay menos ítems que el máximo por fila.
          Columnas:
          - base: 3 por fila (w-1/3)
          - md:   4 por fila (md:w-1/4)
          - lg:   6 por fila (lg:w-1/6)
        */}
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          {items.map((it) => {
            const cardInner = (
              <div className="h-full rounded-xl border bg-white p-3 hover:shadow-sm transition">
                {/* Marco del logo: centrado y sin recortes */}
                <div className="aspect-square grid place-items-center">
                  <ImageWithFallback
                    src={
                      it.logo && it.logo.trim()
                        ? it.logo
                        : "/img/placeholder.png"
                    }
                    alt={it.name}
                    className="max-w-[80%] max-h-[80%] object-contain"
                  />
                </div>

                {/* Texto debajo */}
                <div className="mt-2 text-center">
                  <div className="text-sm font-semibold leading-tight">
                    {it.name}
                  </div>
                  {("note" in it && it.note) && (
                    <div className="text-xs text-gray-600 mt-0.5">
                      {it.note}
                    </div>
                  )}
                </div>
              </div>
            );

            // El elemento EXTERIOR es el ítem flex: ahí va el ancho responsivo
            const wrapperClasses = "w-1/3 md:w-1/4 lg:w-1/6";

            return it.url ? (
              <a
                key={it.name}
                href={it.url}
                target="_blank"
                rel="noreferrer"
                aria-label={it.name}
                className={wrapperClasses}
                title={it.name}
              >
                {cardInner}
              </a>
            ) : (
              <div key={it.name} className={wrapperClasses} title={it.name}>
                {cardInner}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

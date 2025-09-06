// components/PromoBrowser.tsx
"use client";

import React from "react";
import type { Promo } from "@/data/promos";
import PromoCard from "@/components/PromoCard";

type Props = {
  items: Promo[];
};

export default function PromoBrowser({ items }: Props) {
  const categories = React.useMemo(() => {
    const set = new Set(items.map((i) => i.category));
    return ["Todos", ...Array.from(set)];
  }, [items]);

  const [active, setActive] = React.useState<string>("Todos");
  const [q, setQ] = React.useState<string>("");

  const filtered = items.filter((i) => {
    const byCat = active === "Todos" ? true : i.category === (active as Promo["category"]);
    const byText =
      q.trim() === ""
        ? true
        : (i.name + " " + (i.desc || "") + " " + (i.address || "")).toLowerCase().includes(q.toLowerCase());
    return byCat && byText;
  });

  return (
    <>
      {/* Filtros */}
      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`btn-ghost ${active === c ? "bg-amber-50" : ""}`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Búsqueda */}
      <div className="mt-4">
        <input
          type="search"
          placeholder="Buscar por nombre, descripción o dirección"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="w-full md:w-1/2 border rounded-xl px-3 py-2"
        />
      </div>

      {/* Resultados */}
      {filtered.length === 0 ? (
        <p className="text-gray-600 mt-6">No hay resultados para tu búsqueda.</p>
      ) : (
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <PromoCard key={p.name} {...p} />
          ))}
        </div>
      )}
    </>
  );
}

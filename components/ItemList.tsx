// components/ItemList.tsx
import React from "react";
import type { Item } from "@/data/lineup";

export default function ItemList({ title, items }: { title: string; items: Item[] }) {
  return (
    <div className="card">
      <h3 className="font-semibold text-lg">{title}</h3>
      <ul className="mt-3 space-y-2">
        {items.map((it) => (
          <li key={it.name} className="border rounded-lg p-3">
            <div className="font-medium">{it.url ? <a className="link" href={it.url} target="_blank" rel="noreferrer">{it.name}</a> : it.name}</div>
            {it.desc && <div className="text-sm text-gray-600">{it.desc}</div>}
          </li>
        ))}
      </ul>
    </div>
  );
}

// components/SimpleCardList.tsx
import React from "react";

type Item = { name: string; desc?: string; image?: string; url?: string };

export default function SimpleCardList({ title, items }: { title: string; items: Item[] }) {
  return (
    <div className="card overflow-hidden">
      <h3 className="font-semibold text-lg">{title}</h3>
      <ul className="mt-3 space-y-3">
        {items.map((it) => (
          <li key={it.name} className="border rounded-lg overflow-hidden">
            {it.image && (
              <div className="aspect-[16/9] bg-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={it.image} alt={it.name} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="p-3">
              <div className="font-medium">
                {it.url ? (
                  <a className="link" href={it.url} target="_blank" rel="noreferrer">{it.name}</a>
                ) : (
                  it.name
                )}
              </div>
              {it.desc && <div className="text-sm text-gray-600 mt-1">{it.desc}</div>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

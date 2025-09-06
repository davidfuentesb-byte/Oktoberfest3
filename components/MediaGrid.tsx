// components/MediaGrid.tsx
import React from "react";
import MediaCard from "./MediaCard";

type Item = {
  name: string;
  desc?: string;
  image?: string;
  url?: string;
  // opcionales
  day?: string;
  time?: string;
  styles?: string[];
  tags?: string[];
};

export default function MediaGrid({ title, items }: { title: string; items: Item[] }) {
  return (
    <section className="section">
      <div className="container-default">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((it) => {
            const meta =
              it.day && it.time
                ? `${it.day} — ${it.time}`
                : it.styles?.length
                ? `Estilos: ${it.styles.join(", ")}`
                : it.tags?.length
                ? it.tags.join(" · ")
                : undefined;

            return (
              <MediaCard
                key={it.name}
                title={it.name}
                desc={it.desc}
                image={it.image}
                meta={meta}
                href={it.url}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

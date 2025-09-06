// components/CarouselSection.tsx
import React from "react";
import Carousel from "./Carousel";
import MediaCard from "./MediaCard";

type Item = {
  name: string;
  desc?: string;
  image?: string;
  url?: string;
  day?: string;
  time?: string;
  styles?: string[];
  tags?: string[];
};

type PerView = { base: number; md?: number; lg?: number };

export default function CarouselSection({
  title,
  items,
  perView = { base: 1, md: 2, lg: 3 },
  perCardMs = 2200,
  pauseEndMs = 2500,
  showHint = true,
}: {
  title: string;
  items: Item[];
  perView?: PerView;
  perCardMs?: number;
  pauseEndMs?: number;
  showHint?: boolean;
}) {
  return (
    <section className="section">
      <div className="container-default">
        <div className="flex items-end justify-between mb-3">
          <h2 className="text-2xl font-bold">{title}</h2>
          {showHint && (
            <span className="text-sm text-gray-500 hidden sm:block">
              Desliza para ver más →
            </span>
          )}
        </div>

        <Carousel
          ariaLabel={title}
          perView={perView}
          perCardMs={perCardMs}
          pauseEndMs={pauseEndMs}
        >
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
        </Carousel>
      </div>
    </section>
  );
}

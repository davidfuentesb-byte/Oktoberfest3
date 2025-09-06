// components/PromoCard.tsx
import ImageWithFallback from "@/components/ImageWithFallback";
import LinkButton from "@/components/LinkButton";
import React from "react";
import type { Promo } from "@/data/promos";

export default function PromoCard(p: Promo) {
  const telHref = p.phone ? `tel:${p.phone.replace(/\s+/g, "")}` : undefined;

  return (
    <article className="card p-0 overflow-hidden h-full">
      <div className="px-4 pt-3 flex items-center gap-2">
        <span className="badge">{p.category}</span>
        {p.discountText && <span className="badge">{p.discountText}</span>}
      </div>

      {/* Marco uniforme, logo sin recorte */}
      <div className="aspect-[4/3] bg-white border-t grid place-items-center">
        <ImageWithFallback
          src={p.image}
          alt={p.name}
          // El logo se ve completo (contain) y centrado; límites para que no “exploten”
          className="max-w-[85%] max-h-[80%] object-contain"
        />
      </div>

      <div className="p-4">
        <h3 className="font-semibold leading-snug">{p.name}</h3>
        {p.address && <div className="text-xs text-gray-500 mt-1">{p.address}</div>}
        {p.desc && <p className="text-sm text-gray-700 mt-2">{p.desc}</p>}
        {(p.validDates || p.terms) && (
          <p className="text-xs text-gray-500 mt-2">
            {p.validDates && <span>{p.validDates}</span>}
            {p.validDates && p.terms && " · "}
            {p.terms && <span>{p.terms}</span>}
          </p>
        )}

        <div className="mt-3 flex flex-wrap gap-2">
          {p.url && (
            <LinkButton href={p.url} asExternal variant="outline">
              Sitio / RRSS
            </LinkButton>
          )}
          {telHref && <a href={telHref} className="btn-ghost">Llamar</a>}
          {p.mapsUrl && (
            <LinkButton href={p.mapsUrl} asExternal variant="outline">
              Google Maps
            </LinkButton>
          )}
          {p.wazeUrl && (
            <LinkButton href={p.wazeUrl} asExternal variant="outline">
              Waze
            </LinkButton>
          )}
        </div>
      </div>
    </article>
  );
}

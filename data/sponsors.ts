// data/sponsors.ts
export type Brand = { name: string; url?: string; logo?: string };

export const SPONSORS: (Brand & { note?: string })[] = [
  { name: "Sponsor A", url: "https://ejemplo.com", logo: "/img/sponsors/a.png", note: "Escenario principal" },
  { name: "Sponsor B", logo: "/img/sponsors/b.png", note: "Sonido e iluminación" },
  { name: "Sponsor C", note: "Hielo y logística" }, // sin logo → usa placeholder
];

export const PARTNERS: (Brand & { note?: string })[] = [
  { name: "Municipalidad de Aysén", note: "Permisos y coordinación" },
  { name: "Turismo Puyuhuapi", note: "Difusión" },
  { name: "Comercio Local", note: "Red de apoyo" },
];

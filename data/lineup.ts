// data/lineup.ts
export type BaseItem = {
    name: string;
    desc?: string;
    url?: string;     // sitio/red social
    image?: string;   // ruta en /public
  };
  
  // — ARTISTAS con día/hora —
  export type Artist = BaseItem & {
    day: "Viernes (6 Dic)" | "Sábado (7 Dic)" | "Domingo (8 Dic)";
    time: string; // "20:00"
  };
  
  export const ARTISTS: Artist[] = [
    {
      name: "Banda Estelar",
      desc: "Show central de la noche.",
      image: "/img/artists/banda-estelar.jpg",
      day: "Sábado (7 Dic)",
      time: "21:00",
    },
    {
      name: "Trío Folklórico del Aysén",
      desc: "Cuecas y sonidos del sur.",
      image: "/img/artists/trio-folklorico.jpg",
      day: "Viernes (6 Dic)",
      time: "18:00",
    },
    {
      name: "DJ Fest",
      desc: "Cierre con clásicos festivos.",
      image: "/img/artists/dj-fest.jpg",
      day: "Domingo (8 Dic)",
      time: "17:30",
    },
  ];
  
  // — CERVECERÍAS (6) —
  export type Brewery = BaseItem & { taps?: number; styles?: string[] };
  
  export const BREWERIES: Brewery[] = [
    {
      name: "Cervecería Los Porteños",
      desc: "Anfitriones — ediciones especiales 2025.",
      image: "/img/breweries/los-portenos.png",
      styles: ["Lager", "Amber", "Bock"],
    },
    {
      name: "Lúpulo Austral",
      image: "/img/breweries/lupulo-austral.png",
      styles: ["IPA", "Pale Ale"],
    },
    {
      name: "Fiordo Brew",
      image: "/img/breweries/fiordo-brew.png",
      styles: ["Stout", "Porter"],
    },
    { name: "Cervecería 4", image: "/img/breweries/cerveceria-4.png" },
    { name: "Cervecería 5", image: "/img/breweries/cerveceria-5.png" },
    { name: "Cervecería 6", image: "/img/breweries/cerveceria-6.png" },
  ];
  
  // — FOOD (6–7) —
  export type FoodVendor = BaseItem & { tags?: string[] };
  
  export const FOOD: FoodVendor[] = [
    {
      name: "Food Truck Patagonia",
      desc: "Sándwiches y frituras.",
      image: "/img/food/patagonia.jpg",
      tags: ["Carne", "Rápida"],
    },
    {
      name: "Dulces del Sur",
      desc: "Kuchen y repostería local.",
      image: "/img/food/dulces-del-sur.jpg",
      tags: ["Dulces"],
    },
    {
      name: "Café Nómade",
      desc: "Café de especialidad.",
      image: "/img/food/cafe-nomade.jpg",
      tags: ["Café"],
    },
    { name: "Food 4", image: "/img/food/food-4.jpg" },
    { name: "Food 5", image: "/img/food/food-5.jpg" },
    { name: "Food 6", image: "/img/food/food-6.jpg" },
    { name: "Food 7", image: "/img/food/food-7.jpg" },
  ];
  
  // — Secciones de menor relevancia (genéricas) —
  export const CRAFTS: BaseItem[] = [
    { name: "Artesanías del Fiordo", desc: "Madera y lana.", image: "/img/crafts/artesania-1.jpg" },
    { name: "MapuTextil", desc: "Tejidos y accesorios.", image: "/img/crafts/artesania-2.jpg" },
  ];
  
  export const KIDS: BaseItem[] = [
    { name: "Zona Inflables", desc: "Sábado y domingo desde las 12:00.", image: "/img/kids/inflables.jpg" },
    { name: "Pinta Caritas", desc: "Durante la tarde.", image: "/img/kids/pintacaritas.jpg" },
    { name: "Taller de Manualidades", desc: "Domingo 13:00.", image: "/img/kids/manualidades.jpg" },
  ];
  
  export const CONTESTS: BaseItem[] = [
    { name: "Competencia de Schop", desc: "Viernes 20:00 — +18.", image: "/img/contests/schop.jpg" },
    { name: "Mejor Traje Típico", desc: "Sábado 18:30.", image: "/img/contests/traje.jpg" },
    { name: "Juegos Cerveceros", desc: "Domingo 15:00.", image: "/img/contests/juegos.jpg" },
  ];
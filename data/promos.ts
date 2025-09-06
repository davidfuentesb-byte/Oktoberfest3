// data/promos.ts
export type Promo = {
    name: string;
    category: "Restaurantes" | "Alojamientos" | "Delivery" | "Tours" | "Transporte" | "Tiendas" | "Otros";
    desc?: string;
    image?: string;      // ej: /img/promos/mi-local.jpg  (fallback a /img/placeholder.png)
    url?: string;        // sitio o RRSS
    phone?: string;      // solo dígitos (para tel:)
    address?: string;
    mapsUrl?: string;    // https://maps.google.com/?q=...
    wazeUrl?: string;    // https://waze.com/ul?ll=...&navigate=yes
    discountText?: string; // ej: "-10% en carta", "2x1 schop"
    validDates?: string;   // ej: "Válido 6–8 diciembre"
    terms?: string;        // ej: "No acumulable con otras promos"
  };
  
  // Ejemplos (puedes borrar/editar a gusto)
  export const PROMOS: Promo[] = [
    {
        name: "Panaderia Aflorar",
        category: "Panaderia",
        desc: "-15% En panes saborizados e Integrales (Panes medianos de 450g y Grandes de 800g) Hasta agotar Stock.",
        image: "/img/promos/aflorar_panaderia.jpg",
        url: "https://instagram.com/aflorarpanymas",
        phone: "+56987552460",
        address: "Av. Otto Uebel S/N, Puyuhuapi",
        mapsUrl: "https://www.google.com/maps?q=-44.32517698037242,-72.56326364081347",
        discountText: "",
        validDates: "Válido 6–8 diciembre",
      },
      {
        name: "Cabañas Rupu",
        category: "Cabañas",
        desc: "-10% Por noche. Si te quedas 3 noches te damos una adicional gratis.",
        image: "/img/promos/rupu_cabañas.png",
        url: "https://instagram.com/rupupuyuhuapi",
        phone: "+56994619138",
        address: "Fundo Puyuhuapi S/N Lote 20 (Ruta 7, acceso sur Puyuhuapi)",
        mapsUrl: "https://www.google.com/maps?q=-44.328995296260516,-72.55517141621695",
        discountText: "",
        validDates: "Válido 6–8 diciembre",
      },
    {
      name: "Restaurante La Bahía",
      category: "Restaurantes",
      desc: "Cocina patagónica y cervezas locales.",
      image: "/img/promos/ninoska_cabañas.png",
      url: "https://instagram.com/restlabahia",
      phone: "+56912345678",
      address: "Av. Principal 123, Puyuhuapi",
      mapsUrl: "https://www.google.com/maps?q=-44.32503,-72.55734",
      discountText: "-10% presentando tu entrada",
      validDates: "Válido 6–8 diciembre",
    },
    {
      name: "Hostal Fiordo Sur",
      category: "Alojamientos",
      desc: "Habitaciones con desayuno incluido.",
      image: "/img/promos/ninoska_pizza.png",
      url: "https://hostalfiordosur.cl",
      phone: "+56998765432",
      address: "Ruta 7 Km 1, Puyuhuapi",
      mapsUrl: "https://www.google.com/maps?q=-44.3265,-72.5601",
      discountText: "Noche con 5% dcto",
      validDates: "6–8 diciembre",
      terms: "Sujeto a disponibilidad",
    },
    {
      name: "Delivery Don Pepe",
      category: "Delivery",
      desc: "Comida casera a tu alojamiento.",
      image: "", // probar fallback
      phone: "+56955500011",
      url: "https://wa.me/56955500011",
      discountText: "Envio gratis en radio urbano",
      validDates: "Solo durante el evento",
    },
    {
      name: "Artesanías Patagón",
      category: "Tiendas",
      desc: "Tejidos y madera nativa.",
      image: "/img/promos/artesania-patagon.jpg",
      url: "https://facebook.com/artesaniapatagon",
      discountText: "2x1 en llaveros",
    },
  ];
  
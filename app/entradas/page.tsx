// app/entradas/page.tsx

export const metadata = {
  title: "Entradas — Oktoberfest Puyuhuapi 2025",
  description:
    "Compra tus entradas para el Oktoberfest Puyuhuapi (6, 7 y 8 de diciembre). Planes disponibles, beneficios, preguntas frecuentes y términos.",
};

type Plan = {
  name: string;
  price: string;
  desc: string;
  perks: string[];
  highlight?: boolean;
  href: string;
};

const plans: Plan[] = [
  {
    name: "Abono 3 días",
    price: "$XX.XXX",
    desc: "Pase completo para 6, 7 y 8 de diciembre.",
    perks: ["Vaso schopero oficial", "1 recarga incluida", "Fila rápida de ingreso"],
    highlight: true,
    href: "https://tu-plataforma-de-ventas.com/abono-3-dias",
  },
  {
    name: "Entrada diaria",
    price: "$X.XXX",
    desc: "Acceso a un día (elige sábado, domingo o lunes).",
    perks: ["Válida para una sola jornada", "Actividades y shows del día"],
    href: "https://tu-plataforma-de-ventas.com/entrada-diaria",
  },
  {
    name: "Residentes Puyuhuapi",
    price: "$X.XXX",
    desc: "Descuento exclusivo para residentes (con acreditación).",
    perks: ["Ingreso con documento que acredite residencia", "Cupo limitado"],
    href: "https://tu-plataforma-de-ventas.com/residentes",
  },
];

const faqs = [
  {
    q: "¿Cómo recibo mi entrada?",
    a: "Al completar la compra recibirás un correo con código QR. Preséntalo en el acceso (puede ser desde tu celular).",
  },
  {
    q: "¿Puedo transferir mi entrada?",
    a: "Depende de la plataforma de venta. Revisa las políticas en el proceso de compra.",
  },
  {
    q: "¿Hay reembolso?",
    a: "Sujeto a las condiciones de la plataforma y a casos de fuerza mayor. Revisa los términos antes de pagar.",
  },
  {
    q: "¿Qué necesito para el descuento de residentes?",
    a: "Documento que acredite domicilio en Puyuhuapi. La organización podrá verificarlo en el acceso.",
  },
];

export default function EntradasPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-amber-50">
        <div className="container-default py-14">
          <h1 className="text-4xl md:text-5xl font-extrabold">Entradas</h1>
          <p className="mt-3 text-lg text-gray-700 max-w-2xl">
            Asegura tu pase para el <strong>Oktoberfest Puyuhuapi 2025</strong> — 6, 7 y 8 de diciembre.
          </p>
          <div className="mt-6">
            <a href="#planes" className="btn-outline">Ver planes</a>
          </div>
        </div>
      </section>

      {/* Planes */}
      <section id="planes" className="section">
        <h2 className="text-2xl font-bold">Elige tu pase</h2>
        <p className="text-gray-600 mt-2">
          Compra segura en nuestra plataforma oficial. Los valores mostrados son referenciales.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {plans.map((p) => (
            <article
              key={p.name}
              className={`card relative ${p.highlight ? "ring-2 ring-brand" : ""}`}
            >
              {p.highlight && (
                <span className="absolute -top-3 left-4 bg-brand text-white text-xs font-semibold px-2 py-1 rounded-full">
                  Recomendado
                </span>
              )}

              <h3 className="text-xl font-semibold">{p.name}</h3>
              <div className="text-3xl font-extrabold mt-2">{p.price}</div>
              <p className="text-gray-600 mt-2">{p.desc}</p>

              <ul className="mt-4 space-y-2 text-sm text-gray-700">
                {p.perks.map((perk, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-brand" />
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>

              <a
                href={p.href}
                target="_blank"
                rel="noreferrer"
                className="btn-brand mt-6"
                aria-label={`Comprar ${p.name}`}
              >
                Comprar
              </a>
            </article>
          ))}
        </div>

        {/* Nota de plataforma */}
        <p className="text-xs text-gray-500 mt-4">
          * El precio final puede variar por comisiones/impuestos de la plataforma de pagos.
        </p>
      </section>

      {/* Beneficios y recomendaciones */}
      <section className="section section-alt">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="card">
            <h3 className="font-semibold">Beneficios del Abono</h3>
            <p className="text-gray-600 mt-1">
              Acceso los tres días, vaso oficial incluido y 1 recarga. Ideal para vivir el festival completo.
            </p>
          </div>
          <div className="card">
            <h3 className="font-semibold">Entrada Diaria</h3>
            <p className="text-gray-600 mt-1">
              Perfecta si solo puedes ir una jornada. Elige tu día en el proceso de compra.
            </p>
          </div>
          <div className="card">
            <h3 className="font-semibold">Residentes</h3>
            <p className="text-gray-600 mt-1">
              Descuento presentando documento que acredite domicilio. Cupos limitados.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section">
        <h2 className="text-2xl font-bold">Preguntas frecuentes</h2>
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {faqs.map((f, i) => (
            <div key={i} className="card">
              <h4 className="font-semibold">{f.q}</h4>
              <p className="text-gray-600 mt-1">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Términos rápidos */}
      <section className="section section-alt">
        <h3 className="text-xl font-semibold">Términos rápidos</h3>
        <ul className="list-disc ml-5 mt-2 text-gray-700 space-y-2">
          <li>Ingreso con documento de identidad y QR válido.</li>
          <li>Prohibido el ingreso de alcohol externo.</li>
          <li>Menores de edad deben ingresar acompañados de un adulto responsable.</li>
          <li>Evento al aire libre: sujeta a condiciones climáticas.</li>
          <li>Revisa políticas de cambios y reembolsos en la plataforma de venta.</li>
        </ul>

        <div className="mt-6">
          <a href="/evento" className="link">Ver información del evento →</a>
        </div>
      </section>

      {/* CTA final */}
      <section className="section">
        <div className="card flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold">¿Listo para celebrar?</h3>
            <p className="text-gray-600">
              Compra tu pase y vive el Oktoberfest Puyuhuapi 2025.
            </p>
          </div>
          <a href={plans[0].href} target="_blank" rel="noreferrer" className="btn-brand">
            Comprar abono 3 días
          </a>
        </div>
      </section>
    </>
  );
}

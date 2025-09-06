// app/evento/page.tsx
import Link from "next/link";
import LinkButton from "@/components/LinkButton";
import { SITE } from "@/data/site";
import { PROGRAM_2025 } from "@/data/schedule";
import CarouselSection from "@/components/CarouselSection";
import SimpleCardList from "@/components/SimpleCardList";
import { ARTISTS, BREWERIES, FOOD, CRAFTS, KIDS, CONTESTS } from "@/data/lineup";

export const metadata = {
  title: "Evento — Oktoberfest Puyuhuapi 2025",
  description:
    "Edición 2025: introducción, programa diario, artistas (carrusel), cervecerías (carrusel), comida (carrusel), artesanías, zona infantil, concursos, ubicación y preguntas frecuentes.",
};

export default function EventoPage() {
  const days = Array.from(new Set(PROGRAM_2025.map((i) => i.day)));
  const { lat, lng } = SITE.location;

  // DIRECTIONS desde la ubicación del usuario
  const gmapsDirUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  const wazeUrl = `https://waze.com/ul?ll=${lat},${lng}&navigate=yes`;
  const googleMapsEmbed = `https://www.google.com/maps?q=${lat},${lng}&z=14&output=embed`;

  return (
    <>
      {/* Intro 2025 */}
      <section className="bg-amber-50">
        <div className="container-default py-12">
          <h1 className="text-4xl md:text-5xl font-extrabold">Oktoberfest Puyuhuapi 2025</h1>
          <p className="mt-4 text-lg text-gray-700 max-w-2xl">
            La edición 2025 regresa a {SITE.location.name} los días 6, 7 y 8 de diciembre.
            Más cervezas especiales, un line-up musical potenciado, zona infantil ampliada y
            una propuesta gastronómica variada para toda la familia.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <LinkButton href="/entradas" variant="brand">Comprar entradas</LinkButton>
            {/* Live → ancla directa al bloque del Home */}
            <LinkButton href="/#live" variant="outline">
              {SITE.live.label}
            </LinkButton>
            <LinkButton href={gmapsDirUrl} target="_blank" rel="noreferrer" asExternal variant="outline">
              ¿Cómo llegar?
            </LinkButton>
          </div>
        </div>
      </section>

      {/* Programa */}
      <section className="section">
        <div className="container-default">
          <h2 className="text-2xl font-bold mb-4">Programa 2025</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {days.map((d) => (
              <div key={d} className="card">
                <h3 className="font-semibold mb-2">{d}</h3>
                <ul className="space-y-2">
                  {PROGRAM_2025.filter((i) => i.day === d).map((i, idx) => (
                    <li key={idx} className="border rounded-lg p-3">
                      <div className="font-semibold">{i.time} — {i.title}</div>
                      {i.desc && <div className="text-sm text-gray-600">{i.desc}</div>}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-3">
            * Programa sujeto a ajustes. Revisa actualizaciones cercanas al evento.
          </p>
        </div>
      </section>

      {/* Carruseles */}
      <CarouselSection
        title="Artistas"
        items={ARTISTS}
        perView={{ base: 1, md: 2, lg: 2 }}
        perCardMs={2600}
        pauseEndMs={2800}
      />
      <CarouselSection
        title="Cervecerías invitadas"
        items={BREWERIES}
        perView={{ base: 1, md: 2, lg: 4 }}
        perCardMs={2200}
        pauseEndMs={2600}
      />
      <CarouselSection
        title="Zona de comida"
        items={FOOD}
        perView={{ base: 1, md: 2, lg: 4 }}
        perCardMs={2200}
        pauseEndMs={2600}
      />

      {/* Secciones fijas con imagen opcional */}
      <section className="section section-alt">
        <div className="container-default">
          <h2 className="text-2xl font-bold mb-6">Más zonas</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <SimpleCardList title="Artesanías" items={CRAFTS} />
            <SimpleCardList title="Zona infantil" items={KIDS} />
            <SimpleCardList title="Concursos" items={CONTESTS} />
          </div>
        </div>
      </section>

      {/* Ubicación + Recomendaciones (mapa compacto cuadrado + recomendaciones más anchas) */}
      <section className="section">
        <div className="container-default">
          <h2 className="text-2xl font-bold mb-4">Ubicación</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* MAPA: en escritorio ocupa 1/3, con ancho máximo contenido */}
            <div className="md:col-span-1 card overflow-hidden">
              <h3 className="font-semibold mb-2">{SITE.location.name}</h3>
              <div className="mx-auto w-full max-w-sm aspect-square border rounded-xl overflow-hidden">
                <iframe src={googleMapsEmbed} className="w-full h-full" loading="lazy" />
              </div>
              <div className="mt-3 flex flex-wrap gap-3">
                <LinkButton href={gmapsDirUrl} target="_blank" rel="noreferrer" asExternal variant="outline">
                  Google Maps
                </LinkButton>
                <LinkButton href={wazeUrl} target="_blank" rel="noreferrer" asExternal variant="outline">
                  Waze
                </LinkButton>
              </div>
            </div>

            {/* RECOMENDACIONES: en escritorio ocupa 2/3 */}
            <aside className="md:col-span-2 card">
              <h3 className="font-semibold">Recomendaciones</h3>
              <ul className="mt-3 space-y-2 text-gray-700">
                <li><strong>Clima:</strong> patagónico; trae abrigo e impermeable.</li>
                <li><strong>Pagos:</strong> considera efectivo (señal puede ser limitada).</li>
                <li><strong>Movilidad:</strong> planifica traslados/estacionamiento.</li>
                <li><strong>Residuos:</strong> usa puntos limpios y respeta el entorno.</li>
                <li><strong>Familias:</strong> zona infantil el sábado y domingo.</li>
              </ul>
            </aside>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section section-alt">
        <div className="container-default">
          <h2 className="text-2xl font-bold mb-4">Preguntas frecuentes</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="font-semibold">¿La entrada incluye vaso?</h3>
              <p className="text-gray-700 mt-1">El abono 3 días incluye vaso schopero y una recarga.</p>
            </div>
            <div className="card">
              <h3 className="font-semibold">¿Puedo transferir mi entrada?</h3>
              <p className="text-gray-700 mt-1">Revisa las políticas en la plataforma de tickets.</p>
            </div>
            <div className="card">
              <h3 className="font-semibold">¿Hay opciones sin alcohol?</h3>
              <p className="text-gray-700 mt-1">Sí, contaremos con bebidas y preparaciones sin alcohol.</p>
            </div>
            <div className="card">
              <h3 className="font-semibold">¿El evento es pet-friendly?</h3>
              <p className="text-gray-700 mt-1">Sugerimos no asistir con mascotas por comodidad y seguridad.</p>
            </div>
          </div>

          <p className="text-sm text-gray-600 mt-4">
            ¿Tienes otra duda?{" "}
            <LinkButton href="/#contacto" variant="outline">Ir a Contacto</LinkButton>
          </p>
        </div>
      </section>
    </>
  );
}

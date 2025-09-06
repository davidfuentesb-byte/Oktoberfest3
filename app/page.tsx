// app/page.tsx
import { SITE } from "@/data/site";
import { SPONSORS, PARTNERS } from "@/data/sponsors";
import { getAllPosts } from "@/lib/posts";

import Countdown from "@/components/Countdown";
import PostCard from "@/components/PostCard";
import ContactFormGAS from "@/components/ContactFormGAS";
import DirectionsButtons from "@/components/DirectionsButtons";
import LogoWall from "@/components/LogoWall";
import BackgroundSlideshow from "@/components/BackgroundSlideshow";

export default function HomePage() {
  const latest = getAllPosts().slice(0, 3);

  // Coordenadas del evento
  const lat = -44.3250325322041;
  const lng = -72.557343571585;
  const mapsEmbed = `https://www.google.com/maps?q=${lat},${lng}&hl=es&z=14&output=embed`;

  // Imágenes del Hero (fondo). Ajusta a las que tengas; si alguna falta, usa placeholder.
  const HERO_IMAGES = [
    "/img/hero/hero_1.jpg",
    "/img/hero/hero_2.jpg",
    "/img/hero/hero_3.jpg",
    "/img/hero/hero_4.jpg",    
  ];

  return (
    <>
      {/* ====================== HERO ====================== */}
<section className="relative">
  {/* Fondo slideshow con “Ken Burns” */}
  <BackgroundSlideshow
    images={HERO_IMAGES.length ? HERO_IMAGES : ["/img/placeholder.png"]}
    intervalMs={8000}
    fadeMs={900}
    className="h-[90vh] md:h-[90vh] lg:h-[90vh]"
  />

  {/* Contenido centrado en primer plano */}
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="container-default">
      <div className="mx-auto max-w-3xl text-center">
        {/* Logo del evento — centrado, un poco más abajo y semi translúcido */}
        <img
          src="/img/brand/oktoberfest-logo_2.png"
          alt="Oktoberfest Puyuhuapi"
          className="mx-auto h-72 md:h-72 lg:h-72 w-auto object-contain drop-shadow opacity-60 translate-y-20"
        />

        {/* Frase bajo el logo */}
        <p className="mt-4 text-2xl md:text-3xl font-bold text-white drop-shadow">
          6, 7 y 8 de diciembre
        </p>

        {/* Cuenta regresiva */}
        <div className="mt-6">
          <Countdown
            startISO="2025-12-06T12:00:00-03:00"
            endISO="2025-12-08T23:59:59-03:00"
          />
          {/* Si quieres que los cuadros sean más pequeños:
              <Countdown startISO="..." endISO="..." compact />
          */}
        </div>
      </div>
    </div>
  </div>
</section>

      {/* =============== PROGRAMA (resumen) =============== */}
      <section className="section">
        <div className="container-default">
          <h2 className="text-2xl font-bold">
            Edición 2025 — Programa (resumen)
          </h2>
          <ul className="mt-4 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            <li className="card">
              <h3 className="font-semibold">Sábado 6</h3>
              <p className="text-gray-600 mt-1">
                Apertura 12:00 — Música y gastronomía
              </p>
            </li>
            <li className="card">
              <h3 className="font-semibold">Domingo 7</h3>
              <p className="text-gray-600 mt-1">Charlas, concursos y bandas</p>
            </li>
            <li className="card">
              <h3 className="font-semibold">Lunes 8</h3>
              <p className="text-gray-600 mt-1">
                Actividades familiares y clausura
              </p>
            </li>
          </ul>
          <a href="/evento" className="link mt-4 inline-block">
            Ver programa completo →
          </a>
        </div>
      </section>

      {/* ======================= PUYHUAPI ======================= */}
      <section className="section section-alt">
        <div className="container-default">
          <h2 className="text-2xl font-bold">Puyuhuapi</h2>
          <p className="mt-2 text-gray-600">
            Pueblo de fiordos en la Región de Aysén, naturaleza única,
            hospitalidad y cultura cervecera.
          </p>
        </div>
      </section>

      {/* ======================== HISTORIA ======================== */}
      <section className="section">
        <div className="container-default">
          <h2 className="text-2xl font-bold">Historia</h2>
          <p className="mt-2 text-gray-600">
            Nació como una celebración local y hoy convoca a visitantes de toda
            la región.
          </p>
          <a href="/evento" className="link mt-3 inline-block">
            Leer más →
          </a>
        </div>
      </section>

      {/* ====================== BLOG (últimos 3) ====================== */}
      <section className="section section-alt">
        <div className="container-default">
          <h2 className="text-2xl font-bold">Blog</h2>
          <p className="mt-2 text-gray-600">
            Novedades del festival, invitados, y más.
          </p>

          {latest.length === 0 ? (
            <p className="mt-4 text-gray-600">Aún no hay artículos.</p>
          ) : (
            <>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
                {latest.map((p) => (
                  <PostCard
                    key={p.slug}
                    slug={p.slug}
                    title={p.title}
                    date={p.date}
                    excerpt={p.excerpt}
                  />
                ))}
              </div>
              <a href="/blog" className="link mt-6 inline-block">
                Ver todos →
              </a>
            </>
          )}
        </div>
      </section>

      {/* ========================= LIVE ========================= */}
      <section id="live" className="section">
        <div className="container-default">
          <h2 className="text-2xl font-bold">Transmisión en vivo</h2>

          <div className="card overflow-hidden">
            {/* Player responsive 16:9 */}
            <div className="aspect-video bg-black">
              <iframe
                src={
                  SITE.live?.embedUrl
                    ? SITE.live.embedUrl
                    : SITE.live?.youtubeId
                    ? `https://www.youtube.com/embed/${SITE.live.youtubeId}?autoplay=0&rel=0`
                    : "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&rel=0"
                }
                title="Transmisión en vivo"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
              />
            </div>

            <p className="text-gray-700 mt-3">
              Sigue la cobertura en vivo del Oktoberfest Puyuhuapi 2025.
            </p>
          </div>
        </div>
      </section>

      {/* ======================== UBICACIÓN ======================== */}
      <section id="ubicacion" className="section section-alt">
        <div className="container-default">
          <h2 className="text-2xl font-bold">Ubicación</h2>
          <p className="text-gray-600">
            Puyuhuapi, comuna de Cisnes, Región de Aysén.
          </p>

          <div className="mt-4 aspect-video w-full border rounded-xl overflow-hidden">
            <iframe
              className="w-full h-full"
              src={mapsEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa Puyuhuapi"
            />
          </div>

          {/* Botones de navegación */}
          <DirectionsButtons
            className="mt-4"
            lat={lat}
            lng={lng}
            placeName="Oktoberfest Puyuhuapi 2025"
          />
        </div>
      </section>

      {/* =================== AUSPICIADORES / COLABORADORES =================== */}
      <LogoWall title="Auspiciadores" items={SPONSORS} />
      <LogoWall title="Colaboradores" items={PARTNERS} />

      {/* ========================== CONTACTO ========================== */}
      <section id="contacto" className="section section-alt">
        <div className="container-default">
          <h2 className="text-2xl font-bold">Contacto</h2>
          <ContactFormGAS /> {/* usa /api/contact-proxy por defecto */}
        </div>
      </section>
    </>
  );
}

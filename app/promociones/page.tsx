// app/promociones/page.tsx
import { PROMOS } from "@/data/promos";
import PromoBrowser from "@/components/PromoBrowser";
import { SITE } from "@/data/site";
import LinkButton from "@/components/LinkButton";

export const metadata = {
  title: "Promociones — Oktoberfest Puyuhuapi 2025",
  description:
    "Locales adheridos con beneficios durante el evento: restaurantes, alojamientos, delivery y más.",
};

export default function PromocionesPage() {
  const formUrl = SITE.promos?.formUrl || "";
  const formHasFileUpload = Boolean(SITE.promos?.formHasFileUpload);
  // Solo permitir embed si NO hay subida de archivos y el link viene con embedded=true
  const canEmbed = !formHasFileUpload && formUrl.includes("embedded=true");

  return (
    <>
      <section className="section">
        <div className="container-default">
          <h1 className="text-3xl md:text-4xl font-extrabold">Promociones</h1>
          <p className="text-gray-700 mt-2">
            Beneficios en locales adheridos durante los días 6, 7 y 8 de diciembre.
          </p>

          <div className="mt-6">
            <PromoBrowser items={PROMOS} />
          </div>

          <p className="text-xs text-gray-500 mt-6">
            * Los beneficios son responsabilidad de cada local y pueden estar sujetos a cambios sin previo aviso.
          </p>
        </div>
      </section>

      {/* Sección: súmate a la campaña */}
<section className="section section-alt">
  <div className="container-default">
    <div className="card">
      <h2 className="text-2xl font-bold">¿Quieres sumar tu emprendimiento?</h2>
      <p className="mt-2 text-gray-700">
        Durante el Oktoberfest Puyuhuapi 2025, destacaremos y promocionaremos locales adheridos con
        ofertas o beneficios para asistentes a nuestro evento. Si quieres ser parte de esta iniciativa, completa el formulario con
        tus datos y adjunta el logo de tu emprendimiento. Nos comprometemos a dar la mayor visibilidad posible a esta iniciativa para que
        el Oktoberfest Puyuhuapi sea un beneficio para todos.  
      </p>

      <ul className="mt-4 space-y-2 text-gray-700 list-disc pl-5">
        <li>Rubros: Son todos bienvenidos, Restaurantes, Alojamientos, Supermercados, Camping, Delivery, Tiendas, Tours y más.</li>
        <li>Detalla tu oferta, promoción, descuento o beneficio y si tiene restricciones o condiciones especiales (hasta agotar stock, cupos limitados, etc).</li>
        <li>Adjunta tu logo en formato de imagen (JPG/PNG) de preferencia con fondo blanco o transparente.</li>
        <li>Debes tener una cuenta de correo de Gmail para llenar el formulario. Si no tienes, pidele ayuda a alguien o comunicate con nosotros.</li>
        <li>Llena el formulario antes del 30 de Septiembre</li>
        {SITE.promos?.deadline && <li>{SITE.promos.deadline}.</li>}
      </ul>

      {SITE.promos?.formUrl ? (
        <div className="mt-4 flex flex-wrap gap-3">
          <LinkButton href={SITE.promos.formUrl} asExternal>
            Abrir Formulario
          </LinkButton>
          {SITE.promos?.formHasFileUpload && (
            <span className="text-xs text-gray-500">
              
            </span>
          )}
        </div>
      ) : (
        <p className="mt-4 text-sm text-gray-500">
          (Pronto habilitaremos el formulario en línea)
        </p>
      )}
    </div>
  </div>
</section>
    </>
  );
}

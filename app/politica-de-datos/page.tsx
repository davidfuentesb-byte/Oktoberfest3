// app/politica-de-datos/page.tsx

export const metadata = {
    title: "Política de datos — Oktoberfest Puyuhuapi",
    description:
      "Política de manejo de datos para el sitio del evento Oktoberfest Puyuhuapi organizado por Cervecería Los Porteños.",
  };
  
  export default function PoliticaDeDatosPage() {
    return (
      <main className="container-default py-12 prose prose-neutral max-w-3xl">
        <h1>Política de manejo de datos</h1>
  
        <p><strong>Última actualización:</strong> {new Date().toLocaleDateString("es-CL")}</p>
  
        <p>
          En <strong>Oktoberfest Puyuhuapi</strong>, organizado por <strong>Cervecería Los Porteños</strong>,
          nos comprometemos a proteger tu privacidad. Esta política explica qué datos recopilamos,
          con qué fines y cómo ejercer tus derechos.
        </p>
  
        <h2>1. ¿Qué datos recopilamos?</h2>
        <ul>
          <li><strong>Formulario de contacto:</strong> nombre, correo electrónico y mensaje.</li>
          <li><strong>Metadatos técnicos mínimos:</strong> fecha y hora de envío.</li>
        </ul>
  
        <h2>2. ¿Para qué usamos tus datos?</h2>
        <ul>
          <li>Responder consultas relacionadas con el evento.</li>
          <li>Mejorar la atención e información del sitio.</li>
        </ul>
  
        <h2>3. Base legal del tratamiento</h2>
        <p>
          Tratamos tus datos en base a tu <strong>consentimiento</strong>, otorgado al enviar el formulario
          y marcar la casilla correspondiente.
        </p>
  
        <h2>4. Conservación</h2>
        <p>
          Los mensajes se almacenan en una hoja de cálculo de Google (Google Sheets) asociada a
          nuestra cuenta corporativa. Conservamos los datos por el tiempo necesario para gestionar
          tu solicitud y para fines administrativos internos.
        </p>
  
        <h2>5. Encargados y transferencias</h2>
        <p>
          Utilizamos servicios de Google (Google Apps Script, Google Sheets y Gmail) para recibir,
          almacenar y notificar mensajes. Google puede procesar datos en servidores fuera de tu país.
          Consulta las políticas de Google para más detalles.
        </p>
  
        <h2>6. Seguridad</h2>
        <p>
          Limitamos el acceso a los datos y usamos un flujo de envío con medidas anti-spam básicas.
          No vendemos ni cedemos tus datos a terceros con fines comerciales.
        </p>
  
        <h2>7. Tus derechos</h2>
        <p>
          Puedes solicitar acceso, rectificación o eliminación de tus datos, así como retirar tu
          consentimiento en cualquier momento.
        </p>
  
        <h2>8. Contacto</h2>
        <p>
          Si tienes preguntas o deseas ejercer tus derechos, escríbenos a{" "}
          <a href="mailto:cervecerialosportenos@gmail.com">cervecerialosportenos@gmail.com</a>.
        </p>
  
        <h2>9. Cambios a esta política</h2>
        <p>
          Podemos actualizar esta política para reflejar cambios legales o de servicio. Publicaremos
          la versión vigente en esta misma página.
        </p>
      </main>
    );
  }
  
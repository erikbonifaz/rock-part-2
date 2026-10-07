export const originalSource = `import { useState } from "react";

export default function ContactForm() {
  const [email, setEmail] = useState("");

  const sendForm = async () => {
    const response = await fetch(
      "https://api.example.com/contact",
      {
        method: "POST",
        body: JSON.stringify({ email: email })
      }
    );

    alert("Mensaje enviado");
  };

  return (
    <div>
      <input
        type="text"
        onChange={(e) => setEmail(e.target.value)}
      />

      <div onClick={sendForm}>
        Enviar
      </div>
    </div>
  );
}`;

export const categories = [
  {
    id: 'accesibilidad', title: 'Accesibilidad', icon: 'accessibility',
    intro: 'El formulario debe poder entenderse y completarse con teclado, lector de pantalla y distintas necesidades visuales.',
    issues: [
      { problem: 'El input no tiene nombre accesible.', detail: 'Sin una etiqueta, un lector de pantalla no explica qué dato se espera. Un placeholder tampoco sustituye al label.', solution: 'Asociar label e input mediante htmlFor e id. En esta página existe una sola instancia del formulario.' },
      { problem: 'El div de envío solo responde al clic.', detail: 'No recibe foco ni ofrece el comportamiento de un botón al usar teclado.', solution: 'Usar button type="submit" dentro de form. Así se obtiene semántica, foco y activación mediante teclado sin recrearlos con ARIA.' },
      { problem: 'El resultado desaparece al cerrar alert.', detail: 'El aviso interrumpe el flujo y no deja una confirmación junto al formulario.', solution: 'Mostrar mensajes persistentes con role="alert" para errores y role="status" para el resultado. Asociar la ayuda con aria-describedby y mantener foco visible.' },
    ],
    snippet: '<label htmlFor="contact-email">Correo electrónico</label>\n<input id="contact-email" type="email" required />',
    source: { label: 'React · Etiquetas e identificadores', url: 'https://react.dev/reference/react-dom/components/input#providing-a-label-for-an-input' },
  },
  {
    id: 'ux', title: 'UX', icon: 'sparkles',
    intro: 'Cada envío debe dejar claro qué está pasando, qué pasó y cómo continuar.',
    issues: [
      { problem: 'No hay estado de carga.', detail: 'El usuario no sabe si el clic se registró y puede intentar enviar varias veces.', solution: 'Mostrar “Enviando…”, deshabilitar el botón mientras se espera y comprobar el estado de envío antes de hacer la petición.' },
      { problem: 'Se anuncia éxito sin confirmación.', detail: 'Una respuesta 500 también llega a alert. “Mensaje enviado” además promete una entrega que el código no verifica.', solution: 'Confirmar la recepción solo después de una respuesta aceptada por el contrato. Mostrar el resultado dentro del formulario; 202 significa aceptación, no entrega.' },
      { problem: 'No existe un camino de recuperación.', detail: 'No se explica un error ni se decide qué hacer con el correo introducido.', solution: 'Conservar el correo ante un fallo, permitir un nuevo intento y limpiar el campo después del éxito. Usar mensajes claros para errores HTTP y de conexión.' },
    ],
    snippet: '<button type="submit" disabled={submitting}>\n  {submitting ? "Enviando…" : "Enviar mensaje"}\n</button>',
    source: { label: 'React · Estados de una interfaz', url: 'https://react.dev/learn/reacting-to-input-with-state' },
  },
  {
    id: 'validaciones', title: 'Validaciones', icon: 'listchecks',
    intro: 'Validar en el cliente mejora la experiencia; validar en el servidor protege los datos que realmente se procesan.',
    issues: [
      { problem: 'Se acepta un correo vacío o con formato incorrecto.', detail: 'type="text" no aprovecha las restricciones específicas para correo.', solution: 'Usar type="email" y required. El navegador bloquea el envío y muestra su mensaje de validación antes de ejecutar onSubmit; no hace falta una regex propia.' },
      { problem: 'No se normaliza ni se limita el dato.', detail: 'Los espacios externos y entradas excesivas pueden causar rechazos o inconsistencias.', solution: 'Aplicar trim al enviar y maxLength={254} como límite de ejemplo. El backend debe aplicar su propia validación y el mismo límite acordado.' },
      { problem: 'La validación del cliente se puede omitir.', detail: 'Un usuario puede hacer peticiones directas. Un formato correcto tampoco demuestra que el buzón existe.', solution: 'Repetir las validaciones en el servidor. JSONPlaceholder no valida un correo de contacto real; aquí sirve para probar la respuesta HTTP.' },
    ],
    snippet: '<input type="email" required maxLength={254} />\n// Al enviar: JSON.stringify({ email: email.trim() })',
    source: { label: 'OWASP · Validación de entradas', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html' },
  },
  {
    id: 'seguridad', title: 'Seguridad', icon: 'shield',
    intro: 'El snippet no demuestra una vulnerabilidad XSS o SQL. Sí deja garantías de seguridad que debe resolver el servicio.',
    issues: [
      { problem: 'JSON.stringify no hace seguro un dato.', detail: 'Serializar JSON no valida el correo ni protege su uso posterior en consultas o contenido.', solution: 'Validar en backend, usar consultas parametrizadas y codificar la salida según su contexto. Mantener el renderizado de texto de React y evitar HTML arbitrario.' },
      { problem: 'No hay protección visible frente a spam.', detail: 'El botón bloqueado no evita que alguien haga llamadas directas al servicio.', solution: 'En una API de contacto real, limitar las solicitudes y validar los datos en el servidor. Estas medidas no se implementan en esta demo de frontend.' },
      { problem: 'El correo requiere cuidado y un endpoint confiable.', detail: 'Es un dato personal. El navegador no es un lugar seguro para secretos, incluso en variables VITE_*.', solution: 'Usar HTTPS, no incluir claves privadas en el cliente ni registrar correos sin necesidad. Definir retención y autorización en backend. En esta demo pública se deben usar datos ficticios.' },
    ],
    snippet: '// Usa HTTPS y datos ficticios en la demo.\n// Nunca incluyas claves privadas en el frontend.',
    source: { label: 'OWASP · Seguridad del frontend', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Web_Frontend_Security_Cheat_Sheet.html' },
  },
  {
    id: 'apis', title: 'APIs', icon: 'plug',
    intro: 'Una petición debe respetar el contrato: URL, contenido, estados y significado de una respuesta satisfactoria.',
    issues: [
      { problem: 'Falta declarar que el body es JSON.', detail: 'El servidor no tiene por qué interpretar correctamente un cuerpo sin Content-Type adecuado.', solution: 'Enviar Content-Type: application/json y, si el contrato lo usa, Accept: application/json. Usar la forma corta JSON.stringify({ email }).' },
      { problem: 'response se obtiene pero no se comprueba.', detail: 'fetch resuelve también ante 400 o 500. Esperar una respuesta no equivale a confirmar éxito.', solution: 'Comprobar response.ok y response.status. Interpretar los estados del contrato; evitar response.json() si se permite 204 sin cuerpo. Si el éxito exige datos, validarlos antes de confirmarlo.' },
      { problem: 'La URL del enunciado es ilustrativa.', detail: 'api.example.com no representa un backend disponible. Un origen distinto también necesita permitir la petición mediante CORS.', solution: 'Para esta demo, usar el endpoint /posts de JSONPlaceholder. Simula la creación de un recurso y permite probar la respuesta; no envía correos. No usar no-cors para esconder errores.' },
    ],
    snippet: 'headers: { "Content-Type": "application/json" },\n// fetch no rechaza automáticamente respuestas 4xx/5xx.\nif (!response.ok) throw new Error("Error HTTP");',
    source: { label: 'MDN · API Fetch', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch' },
  },
  {
    id: 'errores', title: 'Manejo de errores', icon: 'circlealert',
    intro: 'Los fallos son parte del flujo. La interfaz debe recuperar el control y evitar un éxito falso.',
    issues: [
      { problem: 'No hay try/catch ni recuperación.', detail: 'Un fallo de red produce una promesa rechazada que no se trata y el usuario queda sin información.', solution: 'Encerrar el envío en try/catch, mostrar un mensaje claro y volver a habilitar el botón al pasar al estado de error.' },
      { problem: 'Un error HTTP se trata como éxito.', detail: 'Una respuesta 400 o 500 no rechaza la promesa de fetch. El código original llega al alert de éxito.', solution: 'Lanzar un error si response.ok es falso. El catch muestra el fallo, conserva el correo y permite un reintento manual.' },
    ],
    snippet: 'try {\n  const response = await fetch(url, options);\n  if (!response.ok) throw new Error("No se pudo enviar");\n} catch (error) { /* Mostrar el error */ }',
    source: { label: 'MDN · Errores de fetch', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch' },
  },
  {
    id: 'react', title: 'React', icon: 'atom',
    intro: 'El estado debe representar la interfaz y las operaciones pendientes deben respetar el ciclo de vida del componente.',
    issues: [
      { problem: 'Se guarda email en estado, pero el input no recibe value.', detail: 'El input es no controlado: puede funcionar al escribir, pero cambiar el estado no actualiza su valor visible.', solution: 'Usar value={email} junto con onChange para mantener una sola fuente de verdad. Un input no controlado con FormData también sería válido si se elige de forma coherente.' },
      { problem: 'Solo existe estado para el dato.', detail: 'La interfaz no representa espera, errores de validación ni resultado de la operación.', solution: 'Añadir estados explícitos y locales. Mantener el formulario separado de la página para que escribir no vuelva a renderizar todo el análisis.' },
    ],
    snippet: '<input value={email}\n  onChange={(event) => setEmail(event.target.value)} />',
    source: { label: 'React · Inputs controlados', url: 'https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable' },
  },
  {
    id: 'html', title: 'HTML', icon: 'code',
    intro: 'Los elementos nativos ya resuelven parte del comportamiento, la semántica y la interacción esperada.',
    issues: [
      { problem: 'Un div sustituye al formulario y otro al botón.', detail: 'Se pierde la semántica de envío y el comportamiento esperado al pulsar Enter.', solution: 'Usar form onSubmit y button type="submit". Ejecutar preventDefault para gestionar el envío con JavaScript sin recargar la página.' },
      { problem: 'Faltan atributos útiles en el input.', detail: 'type="text" no identifica el dato; no hay name, id, required ni autocompletado.', solution: 'Añadir type="email", name="email", id, required y autoComplete="email". Conservar una etiqueta visible y aprovechar el teclado para correo que ofrece type="email" en móviles.' },
      { problem: 'La estructura no ofrece ayuda ni mensajes asociados.', detail: 'Un input aislado no comunica el requisito ni explica el error.', solution: 'Colocar ayuda y errores cerca del campo y enlazarlos con aria-describedby. Usar HTML semántico primero y ARIA solo para completar información.' },
    ],
    snippet: '<form onSubmit={handleSubmit}>\n  <input type="email" name="email" required />\n  <button type="submit">Enviar mensaje</button>\n</form>',
    source: { label: 'MDN · El elemento button', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button' },
  },
  {
    id: 'performance', title: 'Performance', icon: 'gauge',
    intro: 'La mejora relevante aquí es evitar trabajo innecesario, sin convertir un formulario pequeño en una arquitectura compleja.',
    issues: [
      { problem: 'Los clics repetidos generan peticiones innecesarias.', detail: 'Se consume red y servidor para el mismo envío.', solution: 'Deshabilitar el botón mientras se espera y comprobar submitting al iniciar el envío. Es suficiente para la interacción normal de esta demo.' },
      { problem: 'Hay oportunidades de simplificar, no un problema demostrado de render.', detail: 'Recrear sendForm o el handler de onChange no es por sí solo un cuello de botella en este caso.', solution: 'Mantener el estado cerca del input y medir antes de usar memo o useCallback. No hacer debounce al escribir si no se realizan peticiones por cada pulsación.' },
    ],
    snippet: 'if (submitting) return;\n// El botón usa disabled={submitting}.',
    source: { label: 'React · Optimizar solo cuando hace falta', url: 'https://react.dev/reference/react/memo#should-you-add-memo-everywhere' },
  },
  {
    id: 'practicas', title: 'Buenas prácticas', icon: 'book',
    intro: 'Una solución defendible en entrevista explica sus decisiones, limita su alcance y se puede verificar.',
    issues: [
      { problem: 'El flujo no explica sus decisiones ni se comprueba.', detail: 'No queda claro qué significa éxito ni qué sucede si el servicio falla.', solution: 'Mantener un handleSubmit legible, estados sencillos y mensajes útiles. Probar correo inválido, éxito y error. Verificar lint y el build de producción.' },
      { problem: 'El mensaje de éxito excede lo que hace el componente.', detail: 'Solo se envía email; no hay un campo de mensaje ni una garantía de entrega.', solution: 'Hablar de recepción de la solicitud. Añadir un mensaje, consentimiento u otros campos solo si el producto lo requiere. Separar las correcciones necesarias de las mejoras opcionales.' },
    ],
    snippet: 'body: JSON.stringify({ email: email.trim() })\n// Confirmar recepción, no prometer entrega de un correo.',
    source: { label: 'React · Pensar en componentes y estado', url: 'https://react.dev/learn/thinking-in-react' },
  },
];

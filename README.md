# ContactForm · Rock — Parte 2

Página de presentación de un ejercicio de debugging, creada con React y Vite. Incluye el componente original, una mejora sencilla, las diez áreas de análisis solicitadas y una demo.

## Ejecutar

Requiere Node.js 22.12 o superior.

```bash
npm install
npm run dev
```

Vite muestra la dirección local en la terminal (normalmente http://127.0.0.1:5173).

```bash
npm run lint
npm test
npm run build
npm run preview
```

## Alcance

La mejora usa `useState`, un `form` y un `button` semánticos, correo controlado, validación HTML con `type="email"` y `required`, estado de carga, cabecera JSON, `response.ok` y `try/catch`. Se mantiene simple, sin controladores de aborto ni servicios adicionales.

El escenario de éxito hace un POST a [JSONPlaceholder](https://jsonplaceholder.typicode.com/#create) con `{ email }`. Usa un correo ficticio. La API responde como si creara un recurso, pero no lo persiste ni envía un correo. El segundo escenario provoca un error local para comprobar la recuperación.

La validación y la protección contra spam de un servicio real corresponden al backend. El componente se presenta una sola vez, por lo que su id de input es fijo.

El código mejorado visible se importa desde el archivo real con `?raw`; así la comparación siempre corresponde a la demo. Las explicaciones incluyen referencias a React, MDN y OWASP.

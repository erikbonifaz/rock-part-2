# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

React con Vite, solicitado por el usuario. Construcción directa en código, confirmada por el usuario.

## Users

Un candidato y las personas que revisan su ejercicio durante una entrevista técnica de desarrollo web.

## Product Purpose

Presentar únicamente la Parte 2 — Debugging: comparar el ContactForm proporcionado con una implementación mejorada y explicar accesibilidad, UX, validaciones, seguridad, APIs, manejo de errores, React, HTML, performance y buenas prácticas.

## Capabilities and Constraints

Página simple, bonita, en español. Código original fiel al mensaje del usuario. Demo interactiva autorizada: un POST a JSONPlaceholder con correo ficticio y un error local. JSONPlaceholder simula creación, no entrega correos. El usuario exige lo mínimo necesario: sin AbortController, timeouts, gestión de carreras ni arquitectura compleja. La solución usa useState, form, validación HTML, loading, response.ok y try/catch. El backend de contacto queda fuera del alcance.

## Evidence on Hand

El mensaje del usuario contiene el componente original, las diez categorías y la pregunta. El documento de referencia no añade requisitos autorizados fuera de ese alcance.

## Brand Commitments

El usuario pidió una paleta acorde a https://rock-experience-ten.vercel.app/, sin cambios complejos. La página de referencia usa negro #101010, blanco cálido #f2f0e9, rojo #ff2442 y gris cálido #aaa69f. Se conserva la composición y se adapta únicamente su paleta.

## Product Principles

- Cada problema debe tener una explicación y una solución concreta.
- La demo debe corresponder al código mejorado mostrado.
- Distinguir las mejoras del frontend de las garantías que requieren backend, sin implementar mecanismos avanzados fuera de la petición.
- Priorizar legibilidad y facilidad para presentar el análisis.

---
name: "rock / debugging"
description: "Diseño implementado de la revisión de ContactForm."
colors:
  bg: "#101010"
  surface: "#191919"
  ink: "#f2f0e9"
  muted: "#aaa69f"
  primary: "#ff2442"
  primary-hover: "#ff536c"
  line: "#353431"
  green: "#99c4a8"
  code: "#171717"
  inset: "#242321"
  selected-bg: "#322026"
  selected-ink: "#ff7186"
  error: "#ff8b9a"
  amber: "#e6b068"
typography:
  display:
    fontFamily: "Manrope Variable, sans-serif"
    fontSize: "clamp(32px, 3.65vw, 49px)"
    fontWeight: 780
    lineHeight: 1.19
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Manrope Variable, sans-serif"
    fontSize: "27px"
    fontWeight: 780
    lineHeight: 1.35
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Manrope Variable, sans-serif"
    fontSize: "21px"
    fontWeight: 800
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Manrope Variable, sans-serif"
    fontSize: "12px"
    lineHeight: 1.8
  label:
    fontFamily: "Manrope Variable, sans-serif"
    fontSize: "12px"
    fontWeight: 650
  code:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "11px"
    lineHeight: 1.85
rounded:
  panel: "14px"
  navigation: "7px"
  control: "6px"
  badge: "4px"
spacing:
  compact: "8px"
  small: "12px"
  medium: "20px"
  large: "24px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    rounded: "{rounded.control}"
    padding: "13px"
    width: "100%"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-copy:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    padding: "4px"
  input-email:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "0 13px"
    height: "45px"
    width: "100%"
  category-tab:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    rounded: "{rounded.navigation}"
    padding: "13px 15px"
  category-tab-selected:
    backgroundColor: "{colors.selected-bg}"
    textColor: "{colors.selected-ink}"
  scenario-option:
    rounded: "{rounded.badge}"
    padding: "9px 4px"
  panel:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
  code-panel:
    backgroundColor: "{colors.code}"
    rounded: "{rounded.panel}"
---

# Design System: rock / debugging

## Overview

La dirección existente es un laboratorio de revisión de formularios: lectura clara, comparación y estados visibles. La paleta toma el negro, blanco cálido y rojo de Rock Experience solicitado por el usuario. Se expresa mediante tipografía, iconos de línea y paneles, sin imágenes de producto.

## Colors

El rojo es el acento principal para acciones, enlaces, foco y énfasis del título. El negro sostiene la página; las superficies carbón y los bordes separan las áreas de lectura. El blanco cálido identifica contenido principal y el gris, contexto secundario. Ámbar y verde distinguen original y solución; los errores combinan texto rosado con mensajes explícitos.

## Typography

Manrope Variable se usa en títulos, lectura y controles. JetBrains Mono se reserva para código, nombres de archivo y datos técnicos. Los títulos tienen peso alto y tracking compacto; el cuerpo deja espacio entre líneas. El código mantiene su alineación y desplazamiento propio.

## Layout

El contenedor mide como máximo 1240px, con márgenes laterales de 48px en escritorio, 28px bajo 1050px, 20px bajo 760px y 16px bajo 480px. La comparación usa dos columnas iguales. El análisis combina una navegación lateral de 214px con el contenido; la demo coloca explicación y formulario en paralelo.

Bajo 760px, introducción, análisis y demo se apilan; las categorías pasan a tres columnas. Bajo 480px, se apilan los paneles de código y las filas de problemas, las categorías pasan a dos columnas y cada columna de análisis recupera su etiqueta. El campo de correo llega a 16px para lectura y entrada móvil.

## Elevation & Depth

No hay sombras. La profundidad se comunica mediante fondos carbón, bloques interiores más claros y bordes de un píxel. El movimiento se limita a transiciones de color (160ms), desplazamiento suave y el indicador de envío; se reduce cuando el sistema solicita menos movimiento.

## Shapes

Los paneles usan esquinas suaves; controles y navegación, radios menores. Bordes finos delimitan formularios y contenidos, mientras las filas de análisis se separan con líneas. Los puntos de versión y los iconos de línea acompañan las etiquetas de texto.

## Components

- **Botón principal:** rojo, ancho completo y texto oscuro. El hover aclara el acento; durante el envío se desactiva y muestra texto e indicador de espera.
- **Copiar y enlaces:** acciones ligeras, sin rellenos prominentes; el color cambia al pasar el cursor y la copia comunica su resultado.
- **Campo de correo:** superficie carbón, borde visible, etiqueta y ayuda persistentes. El foco usa un contorno rojo de 3px con separación de 4px; el estado de lectura bloqueada oscurece el fondo.
- **Navegación:** enlaces compactos en cabecera y categorías con fondo rojizo para la selección. En móvil pequeño, la cabecera conserva el enlace a la demo.
- **Selector de escenarios:** dos opciones dentro de un borde compartido; la selección usa el mismo par rojizo de las categorías y el foco rodea la opción.
- **Paneles:** contenido y demo sobre carbón con borde; código sobre un carbón más oscuro, cabecera, barra de archivo y desplazamiento independiente. La sintaxis añade tonos cálidos y verde suave.
- **Estados:** éxito verde, error rosado y espera gris; cada estado tiene un mensaje, además del color.

## Do's and Don'ts

- **Do** conservar la jerarquía entre fondo, superficie, texto y acento descrita por los tokens.
- **Do** mantener foco visible, etiquetas de controles y mensajes de estado explícitos.
- **Do** preservar la legibilidad del código mediante fuente monoespaciada y desplazamiento dentro del panel.
- **Don't** introducir sombras o imágenes decorativas en esta composición sobria.
- **Don't** comunicar selección, éxito o error únicamente con color.

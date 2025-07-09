# 🎮 Aplicación de Reserva de Juegos - Taller de Front-End

Este repositorio contiene el código fuente de una aplicación desarrollada como parte del **Taller de Front-End** de la **Universidad ORT Uruguay**. La aplicación permite a los usuarios **explorar, reservar y/o comprar videojuegos** disponibles para diferentes consolas.

---

## 🎯 Objetivo

El objetivo principal del proyecto fue desarrollar una **SPA (Single Page Application)** moderna utilizando **React** y **Redux**, aplicando buenas prácticas en el manejo de estados globales y la actualización en tiempo real de las estadísticas de uso de las consolas.

---

## 🛠️ Tecnologías utilizadas

- ⚛️ [React](https://reactjs.org/)
- 🧠 [Redux Toolkit](https://redux-toolkit.js.org/)
- 📦 JavaScript (ES6+)
- 💅 CSS / Styled Components (opcional según implementación)
- 🌐 LocalStorage o API mock (según versión del proyecto)

---

## 🔧 Funcionalidades principales

- ✅ Visualización de juegos por consola (PlayStation, Xbox, Nintendo, etc.).
- 🎮 Filtro por categoría, consola o disponibilidad.
- 🛒 Funcionalidad de reserva/compra de juegos.
- 📊 Actualización **en tiempo real** de gráficas y estadísticas por consola mediante Redux.
- 💾 Persistencia parcial del estado (opcional con almacenamiento local).

---

## 🧠 Estructura del estado global (Redux)

Se utilizó **Redux Toolkit** con una estructura basada en `slices`, organizando el estado en distintas responsabilidades, por ejemplo:

- `juegosSlice`: manejo de juegos disponibles, reservas y compras.
- `consolasSlice`: manejo de consolas disponibles.
- `ventasSlice`: estadísticas y métricas en tiempo real.
- `spinnerSlice` y `estadosSlice`: estado de carga, errores y navegación activa.

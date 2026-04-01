# Plan de Transformación: Mapa Interactivo ITO Universal (Web & Mobile)

Este documento detalla la estrategia para convertir la aplicación actual en una plataforma web responsiva de alto rendimiento, manteniendo la compatibilidad nativa y aplicando mejores prácticas de ingeniería de software.

## 1. Objetivos Principales
- **Universalidad**: Un solo código base para Web y Mobile.
- **Responsividad**: Interfaz adaptativa (Sidebar en Desktop, BottomSheet/Navbar en Mobile).
- **Modularización**: Separación clara entre datos (edificios), lógica de estado (filtros) y renderizado (mapa).
- **Rendimiento**: Optimización de cargas de GeoJSON y renderizado de extrusiones 3D.

## 2. Arquitectura Propuesta

### A. Capa de Datos (Data Layer)
- Mantener la estructura de `components/buildings/defs` para granularidad.
- Implementar un **BuildingRegistry** centralizado que permita búsquedas por ID y filtrado por categorías de forma más eficiente.

### B. Capa de Lógica (State Management)
- **`useMapState` Hook**: Centralizará:
  - Edificios visibles (basado en categorías).
  - Edificio seleccionado.
  - Parámetros de cámara (pitch, bearing, zoom).
  - Estado de la UI (¿está abierto el sidebar?).

### C. Capa de UI (Presentational Layer)
- **`UniversalLayout`**: Utilizará `useWindowDimensions` o Media Queries de CSS para alternar entre:
  - **Desktop**: `[ Sidebar | Map ]`
  - **Mobile**: `[ Map ]` + `[ Floating Navbar / BottomSheet ]`
- **`UniversalMap`**: Un componente que abstraiga la implementación.
  - Web: `maplibre-gl` directo.
  - Mobile: `WebView` (actual) o nativo, compartiendo el mismo formato de GeoJSON.

## 3. Hoja de Ruta (Roadmap)

### Fase 1: Limpieza y Hook de Estado (Inmediato)
- Crear `hooks/useMapState.ts`.
- Refactorizar `app/map.web.tsx` para usar este hook.

### Fase 2: Componentes Responsivos
- Crear `components/ui/ResponsiveContainer.tsx`.
- Modificar `SidebarWeb` para que sea colapsable o se convierta en un menú móvil.

### Fase 3: Unificación del Mapa
- Crear `components/map/MapAdapter.tsx` para estandarizar las props del mapa.
- Asegurar que el estilo del mapa y las extrusiones 3D sean consistentes.

### Fase 4: Mejores Prácticas y Patrones
- **Patrón Singleton/Registry**: Para el catálogo de edificios.
- **Patrón Strategy**: Para el renderizado del mapa según la plataforma.

## 4. Requerimientos Técnicos
- **Tailwind CSS (Opcional/Preferido)**: Para facilitar la responsividad en Web (aunque el usuario prefiere Vanilla CSS, usaré clases de React Native Web que se traduzcan bien).
- **Lucide React / Expo Symbols**: Para iconografía consistente.

---
*Este plan será ejecutado de forma iterativa, validando cada cambio en el entorno web antes de proceder al siguiente.*

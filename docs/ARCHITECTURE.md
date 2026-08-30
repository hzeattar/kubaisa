# Architecture

The Qubaisa Virtual Palace uses a React-driven SPA architecture integrating WebGL via React Three Fiber.

## Core Pillars
1. **App Shell (React):** Handles 2D UI, loading, product side-panels, and virtual joystick.
2. **WebGL Scene (R3F):** Renders the architectural environment, lighting, and proxy furniture.
3. **State Management (Zustand):** Synchronizes 3D events with 2D UI (e.g. `activeZone`, `selectedProduct`, `language`).

## Directory Structure
- `/src/components`: Reusable UI and 3D components.
- `/src/experience`: Core R3F scene definition and camera controllers.
- `/src/scenes`: Individual rooms and zones (Exterior, Lobby, Modern, Neo-Classic).
- `/src/data`: Localized product inventory details.

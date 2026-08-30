# Qubaisa Virtual Palace (قصر قبيصة الافتراضي)

A premium interactive 3D WebGL showroom for Qubaisa Furniture, built using React, Three.js, and React Three Fiber.

## Tech Stack
- **Framework:** React 19 + Vite
- **3D Engine:** Three.js + React Three Fiber + Drei
- **State Management:** Zustand
- **Styling:** Tailwind CSS

## Features
- **Virtual Palace:** Architectural facade, Grand Lobby, and multiple showrooms.
- **Interactive Products:** 3D hotspots providing localized product details.
- **Guided Tour:** Cinematic camera traversal.
- **Mobile First:** Virtual joystick and touch-look capabilities.
- **Bilingual:** Full Arabic (RTL) and English support.

## Getting Started
```bash
npm install
npm run dev
```

## Production
```bash
npm run build
npm run start
```

## Railway Deployment
This project is configured to deploy seamlessly to Railway. 
`railway.json` sets the Nixpacks builder and uses `npm run start` to serve the `dist/` folder via a minimal Express server.

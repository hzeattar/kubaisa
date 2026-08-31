# Agent Skills — Cinematic Luxury Web / Furniture Showroom

This is the skill set required for the Qubaisa redesign. It is intentionally broader than ordinary frontend development because the final quality depends on art direction, motion, media, 3D, performance and mobile behavior together.

## Priority A — mandatory skills

### 1. Luxury Web Art Direction

Agent must be able to:

- analyze premium furniture, interior, architecture and luxury-brand websites
- distinguish editorial/cinematic design from generic SaaS or gaming UI
- build visual hierarchy around photography/film/product rather than cards
- use negative space, restrained typography and premium pacing
- avoid cheap glow, HUD, neon and unnecessary effects

Deliverables:

- visual direction board
- typography system
- color/material language
- spacing/rhythm system
- reference-frame comparisons

### 2. Scroll-Driven Storytelling / Scrollytelling

Required knowledge:

- GSAP
- ScrollTrigger
- pinned sections
- scrubbed timelines
- timeline labels
- responsive `matchMedia()` timelines
- direction-aware transitions
- snapping only where it improves UX
- cleanup in React

The agent should treat scroll as a timeline controller, not as a trigger for random entrance effects.

### 3. Motion Design / Cinematic Choreography

Required capabilities:

- shot planning
- camera blocking
- easing curves
- visual holds
- foreground/background parallax
- match cuts / masked transitions / crossfades
- timing text against visual focal points
- separate desktop/mobile choreography

A beautiful still composition is mandatory at every meaningful stop in the timeline.

### 4. React / TypeScript / Vite Frontend Architecture

Required capabilities:

- React component architecture
- strict TypeScript
- Vite build optimization
- lazy loading / dynamic imports
- Error Boundaries
- state separation between scroll, UI and WebGL
- semantic HTML
- code splitting
- production asset paths

### 5. Responsive / Mobile-First Experience Design

Required capabilities:

- iOS Safari viewport/safe-area handling
- Android Chrome testing
- touch-first UI
- no hover dependence
- responsive media variants
- mobile-specific camera crop/path
- reduced effects on weaker devices
- handling browser chrome / `dvh`

Mobile must be art-directed independently, not shrunk from desktop.

### 6. Performance Engineering / Core Web Vitals

Required capabilities:

- Lighthouse interpretation
- Chrome Performance profiling
- GPU/frame-time awareness
- LCP / CLS / INP
- lazy loading
- preloading only critical media
- avoiding long main-thread tasks
- WebGL DPR controls
- memory leak detection
- video/media network budgeting

### 7. Accessibility / Progressive Enhancement

Required capabilities:

- `prefers-reduced-motion`
- keyboard/focus states
- semantic landmarks
- usable CTA contrast
- fallback content without WebGL
- fallback stills for cinematic media
- no critical information encoded only in animation

---

## Priority B — 3D / media skills

### 8. Three.js / React Three Fiber

Required knowledge:

- scene graph
- camera control
- lighting/environment maps
- PBR materials
- texture color spaces
- shadows
- instancing
- frustum/culling awareness
- `useFrame`
- Drei helpers
- performance monitor / adaptive DPR

Use R3F for selected high-value scenes only, not automatically for the entire website.

### 9. Scroll + WebGL Synchronization

Required knowledge:

- mapping normalized scroll progress to camera/object properties
- GSAP controlling Three.js values
- R3F `ScrollControls/useScroll` patterns
- 14islands `r3f-scroll-rig` architecture as a reference
- avoiding two competing animation clocks

### 10. Theatre.js / Visual Animation Authoring

Useful when manual code-based camera keyframing becomes slow.

Agent should understand:

- Theatre.js sheet/projects
- camera/object sequencing
- lights/material parameter animation
- integrating Theatre values into R3F/Three.js
- exporting/storing production state

It is an authoring aid, not a mandatory runtime dependency.

### 11. Blender / 3D Asset Preparation

Required capabilities for any real product model:

- real-world scale
- clean normals
- UVs
- topology cleanup
- light baking where useful
- PBR material authoring
- camera staging
- render output for video fallback
- GLB export

### 12. glTF Production Optimization

Required tools/knowledge:

- glTF Transform
- Meshopt
- Draco evaluation
- KTX2/Basis texture compression
- texture resizing
- geometry simplification
- removing unused nodes/materials/animations
- visual regression after compression

Never optimize only by file size; compare appearance and runtime cost.

### 13. Video / Frame-Sequence Engineering

Required capabilities:

- FFmpeg
- MP4/WebM encoding
- removing unnecessary audio
- bitrate/resolution ladders
- poster generation
- responsive sources
- scroll-to-currentTime mapping
- `requestVideoFrameCallback()` where useful
- buffering/seek testing on iOS/Android
- image-sequence alternative when video seeking is unreliable

### 14. Image Optimization

Required capabilities:

- WebP/AVIF generation
- responsive `srcset`/sizes
- crop variants
- color consistency
- lazy loading
- poster/placeholder generation
- preserving brand photography quality

---

## Priority C — product and QA skills

### 15. Furniture / Interior Product Presentation

Agent should understand presentation patterns for:

- sofas/salons
- dining sets
- bedroom collections
- upholstery details
- carved wood / metal accents
- material closeups
- room composition

The goal is to sell craftsmanship and atmosphere, not just show an isolated 3D object.

### 16. Content Research / Verification

Required capabilities:

- inspect supplied Facebook/source pages
- separate genuine brand content from inspiration
- record product/category/source provenance
- avoid inventing product names/specifications
- store approved content in structured data

### 17. Localization / Arabic RTL

Required capabilities:

- Arabic typography
- RTL layout
- bidirectional UI
- Arabic/English content parity
- avoiding hard-coded alignment assumptions
- correct Arabic font loading and shaping

### 18. Visual Regression QA

Required workflow:

- reference screenshots per breakpoint
- before/after comparisons
- desktop/mobile captures
- scene-by-scene checklist
- ensure every scroll stop remains composed
- verify overlays never cover the key furniture subject

### 19. Cross-Browser / Device QA

Mandatory targets:

- Chrome desktop
- Edge desktop
- Firefox desktop
- Safari macOS where available
- Chrome Android physical device
- Safari iPhone physical device

Also test:

- reduced motion
- slow network
- WebGL disabled/unavailable
- video decode/seek degradation

### 20. Railway / Production Deployment

Required capabilities:

- Vite production build
- static asset caching
- Express/static serving
- health endpoints
- Railway health checks
- deployment verification
- rollback discipline

No visual redesign should be deployed simply because GitHub reports a branch as mergeable.

---

# Preferred tool/reference stack

## Core

- React
- TypeScript
- Vite
- GSAP + ScrollTrigger
- CSS/Tailwind

## Smooth scroll

- Lenis only after device QA

## 3D

- Three.js
- React Three Fiber
- Drei
- Theatre.js when useful

## Media

- Blender
- FFmpeg
- glTF Transform
- image optimization pipeline

## Reference repositories / examples

### 14islands/r3f-scroll-rig

Use as an architectural reference for synchronizing DOM layout/scroll with a persistent R3F canvas.

https://github.com/14islands/r3f-scroll-rig

### pmndrs React Three Fiber examples

Study especially:

- camera-scroll
- scrollcontrols-gltf
- scrollcontrols-and-lens-refraction
- useintersect-and-scrollcontrols
- furniture / transition examples

https://github.com/pmndrs/react-three-fiber

### Lenis

Official smooth-scroll library useful for WebGL/scroll synchronization.

https://github.com/darkroomengineering/lenis

### Theatre.js

Use for authoring complex camera/lighting animation if hand-coded GSAP timelines become difficult to art-direct.

https://www.theatrejs.com/

### GSAP ScrollTrigger

Primary scroll choreography system.

https://gsap.com/docs/v3/Plugins/ScrollTrigger/

---

# Skills the agent should NOT over-prioritize for this redesign

These are not the main problem now:

- character controller
- first-person movement
- joystick engineering
- physics simulation
- complex collision/BVH for walking
- game HUD design
- multiplayer/game-engine patterns

They can be removed from the primary path unless a later requirement explicitly needs them.

---

# Recommended agent execution mode

For this project the agent should think in this order:

1. Art Director
2. Motion Designer
3. UX Designer
4. Frontend Architect
5. 3D/WebGL Engineer
6. Performance Engineer
7. QA Engineer

If engineering decisions are made before the visual story is approved, the project is likely to become technically complex while still looking cheap.

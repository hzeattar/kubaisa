# Qubaisa Cinematic Scroll Showroom — Redesign Plan

## 1. Decision

The project should stop behaving like a first-person 3D game.

The primary experience will become a **luxury cinematic scrolling website**:

- The visitor only scrolls vertically.
- Scroll progress drives the camera / film / scene.
- The experience feels like a directed commercial, not a game.
- Product information appears at intentionally composed moments.
- Mobile is a first-class target, not a reduced desktop port.
- Real-time WebGL is used only where it adds visible value.
- High-fidelity pre-rendered video/frame sequences are preferred when they look materially better and perform more reliably.

The current first-person controls, joystick, free walking, collision system and game-style HUD are not part of the new core experience.

---

## 2. Recommended architecture: hybrid, not pure WebGL

### Layer A — Cinematic visual spine

Use one of two media types per sequence:

1. **Pre-rendered cinematic video / frame sequence** for palace exteriors, interiors and complex furniture compositions where visual realism is more important than user-controlled geometry.
2. **Real-time Three.js / React Three Fiber** only for hero/product moments that benefit from real depth, lighting response, subtle cursor parallax or product inspection.

This avoids the biggest problem with the current build: low-quality procedural geometry being asked to carry the entire brand experience.

### Layer B — Scroll orchestration

Use a single scroll timeline to control:

- camera or video time
- crossfades
- text entrances/exits
- section pinning
- subtle zoom / depth effects
- product labels and CTA timing
- scene-to-scene transitions

Recommended primary orchestrator: **GSAP + ScrollTrigger**.

Optional smooth scrolling layer: **Lenis**, integrated with ScrollTrigger.

### Layer C — Editorial UI

Keep normal DOM for:

- headings
- product names
- descriptions
- buttons
- contact / WhatsApp CTA
- collections
- brand story
- footer

Do not render normal website copy as WebGL text unless there is a strong visual reason.

### Layer D — Product interaction islands

Real-time 3D should be isolated to small high-value sections, for example:

- one hero furniture piece
- a 360-degree product reveal
- material/color change
- one close-up of craftsmanship

Each WebGL island must have a static or video fallback.

---

## 3. Proposed homepage story

### Act 0 — Loading / brand reveal

- Local Qubaisa logo.
- Minimal loading state.
- No fake progress.
- Preload only the first cinematic segment and critical poster assets.

### Act 1 — Arrival

Full-screen exterior palace/showroom shot.

Scroll slowly pushes the view toward the entrance.

Overlay copy is extremely minimal:

- Qubaisa / قبيصة
- short luxury statement
- “Scroll to enter”

No joystick, WASD, floor selector or game HUD.

### Act 2 — Entrance / brand world

As scrolling continues:

- camera passes the entrance
- light changes from exterior to warm interior
- Qubaisa logo/brand treatment appears in architecture
- one or two short brand statements fade in/out

### Act 3 — Neo-Classical collection

A directed cinematic camera path reveals:

- room-wide shot
- close-up on carved wood / gold detail
- upholstery close-up
- hero salon composition

Overlay a quiet product label with optional “View collection”.

### Act 4 — Modern collection

Seamless transition into a contemporary interior.

- camera tracks laterally or curves around the set
- material and silhouette details become focal points
- one product card appears only after the product is visually established

### Act 5 — Craftsmanship / detail

Use macro visuals:

- fabrics
- carved details
- wood finish
- metal/gold accents

This can be full-frame video + typography rather than 3D.

### Act 6 — Collections / product navigation

After the cinematic experience, transition into a more conventional premium website section:

- Neo-Classical
- Modern
- Dining
- Bedrooms if real source material exists
- custom work if verified

Cards should use real Qubaisa imagery where available.

### Act 7 — Visit / contact

Finish with:

- showroom/brand CTA
- social links
- WhatsApp/contact
- Facebook pages
- optional location

The cinematic part should lead to business action instead of becoming an endless demo.

---

## 4. Scroll mechanics

### Desktop

- native vertical scroll as source of truth
- smooth damping optional
- pinned full-screen visual canvas/video during major acts
- progress-driven timeline
- modest cursor parallax only on capable devices

### Mobile

- vertical scroll only
- no virtual joystick
- no mandatory drag-to-look
- no orientation requirement
- no hover-dependent UI
- shorter camera moves and fewer simultaneous effects
- lower video resolution / bitrate variant
- lower DPR for WebGL segments
- touch-safe CTAs of at least practical mobile size

### Reduced motion

If `prefers-reduced-motion: reduce`:

- remove scrubbed camera motion where possible
- show still hero renders / crossfades
- maintain all content and navigation

---

## 5. Video/frame-sequence strategy

### Prefer video when

- the scene contains complex architectural detail
- the visual must be photorealistic
- there are many reflections / soft GI / expensive materials
- no product customization is needed
- mobile consistency matters more than real-time interaction

### Prefer image sequence when

- exact frame-to-scroll control is critical
- seeking compressed video creates visible latency on target devices
- the sequence is short enough to keep memory/network reasonable

### Prefer real-time WebGL when

- the user needs true 3D rotation or material interaction
- depth/parallax materially improves the presentation
- the model is optimized and visually verified

### Encoding plan

Provide at least:

- desktop high-quality WebM/MP4
- mobile lower-bitrate variant
- poster image
- still fallback

Do not ship audio in purely visual cinematic clips.

---

## 6. Visual direction

Target: **luxury editorial furniture campaign**, not “3D demo”.

### Typography

- one elegant display serif for English headlines
- a strong premium Arabic family with proper Arabic shaping
- restrained body sans-serif
- very little copy on visual scenes

### Color

Use the actual Qubaisa identity as source of truth.

Likely structure:

- near-black / deep navy
- warm ivory
- champagne / muted gold
- warm neutral interior tones

Avoid excessive glow, neon, HUD lines and game UI.

### Motion

- slow, confident camera moves
- cinematic easing
- long holds on hero compositions
- no constant floating/bobbing
- no meaningless 3D motion

### Composition

Every viewport should look like an intentional campaign frame even when the user stops scrolling.

---

## 7. Source-content policy

Use the supplied Qubaisa / related Facebook pages for research and source material when legally/technically accessible:

- Hayah Modern
- Kubaisa Furniture / قبيصة للأثاث
- kabassa.contemporary.furniture

Before production use, classify every item as:

- verified Qubaisa product/content
- inspiration/reference only
- unknown/unverified

Do not present generic sample furniture as genuine Qubaisa inventory.

---

## 8. Technical stack

Keep:

- React
- TypeScript
- Vite
- Three.js / React Three Fiber where needed
- Tailwind or equivalent CSS layer

Add/consider:

- `gsap` + `ScrollTrigger` — primary scroll timeline
- `lenis` — optional smooth scroll, only if QA proves it improves experience
- `@theatre/core` / Theatre.js during authoring if camera choreography becomes complex
- `@react-three/postprocessing` only for restrained, measured effects
- `@gltf-transform/*` CLI/tooling for real GLB optimization
- Draco / Meshopt / KTX2 only when validated against browser/device support and quality

Use `14islands/r3f-scroll-rig` and pmndrs scroll examples as implementation references, not automatic dependencies.

---

## 9. Asset pipeline

### Real Qubaisa media

1. collect approved source photos/video
2. categorize by collection/room/detail
3. color-correct to a consistent campaign look
4. crop desktop + mobile variants
5. compress and generate WebP/AVIF stills
6. create cinematic sequence where appropriate

### 3D

If real products are modeled:

1. source/create in Blender
2. real-world scale
3. clean topology
4. PBR materials
5. bake what does not need to stay dynamic
6. reduce texture resolution per device target
7. export GLB
8. run GLTF Transform / meshopt/Draco tests
9. visually compare before/after compression
10. document license/source

No placeholder 3D model should ship solely to fill space.

---

## 10. Performance budget

Targets should be measured on actual devices.

Initial budgets:

- first viewport should become useful before the entire cinematic site is downloaded
- preload only the first scene
- lazy load later scenes
- no giant GLB in initial bundle
- no full-resolution desktop video on mobile
- cap real-time rendering DPR dynamically
- pause or reduce WebGL work when scene is outside the active section
- avoid more than one expensive fullscreen WebGL scene unless profiling proves acceptable

Measure:

- LCP
- CLS
- INP
- first cinematic readiness
- dropped frames during scrolling
- JS heap growth during full-page scroll
- GPU/thermal behavior on mobile

---

## 11. Responsive breakpoints are not enough

The mobile experience gets its own art direction.

For every cinematic act define:

- desktop camera crop/path
- tablet crop/path
- phone crop/path
- text safe area
- CTA placement
- media asset variant
- reduced-motion fallback

Do not simply scale the desktop layout down.

---

## 12. Implementation phases

### Phase 0 — Current-state video diagnosis

Wait for the user's video and inspect:

- visual quality problems
- scene proportions
- mobile problems
- loading behavior
- broken interactions
- what, if anything, is worth preserving

No merge to `main` before this review.

### Phase 1 — Art-direction prototype

Build only the first 2–3 acts:

- logo/loading
- exterior arrival
- transition through entrance
- first collection reveal

Use temporary approved/high-quality media if needed, but clearly mark it as reference/proxy.

Goal: prove the visual language before building the whole site.

### Phase 2 — Scroll engine

Implement:

- native vertical page structure
- ScrollTrigger timeline
- scene progress model
- pinned cinematic viewport
- mobile-specific timeline
- reduced-motion variant

### Phase 3 — Content integration

Add verified Qubaisa imagery/data, product names and categories.

### Phase 4 — Selective 3D

Only after the cinematic layout is approved:

- add one product 3D reveal at a time
- keep static/video fallback
- profile each addition

### Phase 5 — mobile/performance pass

Test real Android and iPhone devices, not DevTools only.

### Phase 6 — production QA

- typecheck
- production build
- desktop Chrome/Firefox/Safari/Edge
- Android Chrome
- iOS Safari
- reduced motion
- slow network
- WebGL unavailable
- media seek/scrub behavior
- Railway health check

### Phase 7 — merge/deploy

Only merge after visual sign-off and QA evidence.

---

## 13. Definition of done

The redesign is acceptable only when:

- a new visitor understands the brand without learning controls
- the entire core journey works with normal up/down scrolling
- stopping anywhere in the main sequence produces a composed visual frame
- mobile has no joystick or game-like input requirement
- the site uses verified brand/product media or explicitly labeled proxy material
- the first screen does not wait for the whole site to download
- later scenes lazy-load correctly
- there is a reduced-motion fallback
- there is a non-WebGL fallback
- no visual sequence causes obvious frame drops on the agreed mobile test devices
- contact/collection CTAs remain easy to use
- production build and Railway deployment are verified before merge

---

## 14. What to preserve from the previous quality branch

Potentially reusable after review:

- local Qubaisa logo asset
- production Express health endpoint / cache hardening
- Railway healthcheck improvements
- translation typing cleanup
- responsive safe-area CSS concepts
- graceful error/WebGL fallback concepts
- performance documentation/QA discipline

Do **not** automatically carry over:

- FirstPersonCamera
- joystick controls
- collision/walkable-region architecture
- guided-tour implementation based on free 3D navigation
- procedural palace/furniture just because it already exists

The visual direction must be re-approved from zero after the current-state video review.

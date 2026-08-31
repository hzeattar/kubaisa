# Qubaisa Virtual Palace — Performance Budget

This document is a production guardrail for the guided 3D palace. High visual fidelity is required, but new visual work must not make the first visit progressively heavier.

## Rendering strategy

- Exterior is the first visual segment and should mount first.
- Grand Lobby / Entrance Threshold should mount only shortly before the camera crosses the entrance.
- Wing halls should mount only after a Modern / Neo-Classical choice.
- Detailed furniture rooms must not be loaded until selected.
- Use a local PMREM `RoomEnvironment` for PBR reflections instead of a runtime HDR dependency.
- `PerformanceMonitor` controls adaptive quality rather than serving one expensive render profile to every device.

## Adaptive quality

Current guided-canvas targets:

| Setting | Mobile / coarse pointer | Desktop |
| --- | --- | --- |
| DPR range | ~0.88–1.22 | ~1.0–1.55 |
| Directional shadow map | 512 or 1024 | 512 or 1024 |
| Shadow filter | PCF Soft | PCF Soft |
| Tone mapping | ACES Filmic | ACES Filmic |

Quality must degrade gradually when sustained frame performance falls. Never use raw `window.devicePixelRatio` without a cap.

## Runtime asset rules

- Runtime images/models belong in `public/` only if the browser actually needs them.
- Blender, MaterialX, USD, engine material files, DX normal maps, displacement maps and other authoring sources must not live in the deployed public tree unless a runtime feature explicitly needs them.
- Keep source/master assets outside the browser runtime tree or in external authoring storage.
- New furniture should use optimized GLB/glTF.
- Prefer Meshopt for geometry delivery; evaluate Draco only where it produces a meaningful size win.
- For production furniture textures, evaluate KTX2/Basis after the visual model is approved.
- Repeated architecture/decor should use instancing where practical.

## Current asset cleanup

The Phase 1 performance pass removed an unused `classic_chair.glb` that was about 20 MB and removed non-runtime source/auxiliary files from the public texture folders. The application keeps the Color + NormalGL maps that its current material hooks actually request.

This cleanup reduces the deployed public artifact and avoids carrying unused browser-accessible assets. It must not be described as an equal reduction in initial network transfer because unused public files were not necessarily requested by the browser.

## Texture strategy

Current PBR texture hooks use 1K Color + NormalGL maps with:

- mipmaps
- linear mipmap filtering
- capped anisotropy (maximum 4)
- sRGB only for base color
- non-color space for normal data

Do not replace these with 4K/8K maps merely to make surfaces appear sharper. First improve UV scale, texture sampling, material response, lighting and camera composition.

## Lighting budget

- Prefer broad architectural `RectAreaLight` washes for interior ambience.
- Keep realtime point lights only where a local physical emitter materially improves depth.
- Decorative fixtures can be emissive without each owning a realtime light.
- One main directional light provides the important exterior shadow direction.
- Avoid dozens of shadow-casting lights.

## Geometry budget

- Repeated balusters, bollards and stair treads should be instanced.
- Hero geometry may be detailed; background geometry should be simplified.
- Do not import multi-million-triangle vegetation or furniture directly into production.
- Any high-detail source asset needs an optimization/LOD pass before it is shipped.

## Visual quality rule

Performance optimizations must preserve the luxury target. Prefer improvements that raise perceived realism without increasing payload, including:

- physically plausible roughness / metalness
- restrained clearcoat on polished stone
- local PBR environment reflections
- soft directional/contact grounding
- believable camera height and focal length
- correct scale and architectural depth
- clean composition

## QA before every room expansion

Before making another room production-ready, record or inspect:

1. first visible frame / time to useful visual
2. largest newly requested model
3. largest newly requested texture
4. draw-call change
5. triangle-count change
6. desktop frame stability
7. representative mobile frame stability
8. memory behavior when leaving the room
9. failed asset/network requests
10. visual screenshots at the room entrance and hero viewpoint

Quality before quantity: one convincing, smooth room is preferred over several heavy blockouts.

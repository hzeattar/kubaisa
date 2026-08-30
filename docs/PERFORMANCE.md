# Performance Notes

## Changes in the current quality pass

- Removed two unused/heavy sample furniture GLBs (~4.2 MB and ~20 MB) and a broken 14-byte placeholder model.
- Uses local 1K PBR texture sets and a local ~1.4 MB HDRI instead of depending on runtime environment CDNs.
- Added adaptive DPR via `PerformanceMonitor` for the default AUTO quality mode.
- Removed the previous scene-wide downward raycast on every frame; navigation now uses lightweight walkable regions/collision proxies for the current single-floor vertical slice.
- The lobby chandelier local point light no longer casts a dynamic shadow.
- Canvas far plane is bounded to 180m and the experience uses a restrained 55° FOV.

## Asset cleanup still recommended

The `public/textures` tree currently contains authoring/source files that are not required by the browser (for example `.blend`, `.mtlx`, `.tres`, `.usdc`, DirectX normals, displacement maps and previews). These should move out of `public/` during a dedicated asset-pipeline cleanup so Railway does not ship them as static runtime files.

## Validation status

No trustworthy FPS/draw-call/GPU measurement has been produced in this connector-only session. GitHub Actions also has not produced a run yet, so this document intentionally does not claim a successful production build or measured frame rate.

Before merging to `main`, run:

```bash
npm install
npm run lint
npm run build
npm run start
```

Then test the generated production service in Chrome desktop and representative Android/iPhone viewports, recording FPS, draw calls, JS/asset transfer and any WebGL warnings.

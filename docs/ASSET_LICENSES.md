# Asset Licenses and Usage

This file documents assets that are currently shipped by the Qubaisa Virtual Palace branch. Proxy furniture is not presented as verified Qubaisa inventory.

## Runtime 3D furniture

The current vertical slice uses original procedural React Three Fiber geometry for the visible Modern and Neo-Classical furniture proxies. This avoids shipping the previously-added large sample GLBs while the real Qubaisa product library is still unavailable.

Removed during the quality pass:
- `modern_sofa.glb` (Khronos SheenChair sample, ~4.2 MB): no longer used because it was a chair scaled as a sofa and did not match the target visual language.
- `classic_chair.glb` (~20 MB): unused and too heavy for the current mobile-first vertical slice.
- `table.glb`: invalid/broken placeholder file.

When real furniture GLBs are added later, document source, author, license, original size, optimized size and production path before shipping them.

## Textures

Source: ambientCG
License: CC0 / Public Domain

Runtime texture sets:
- `Marble012_1K-JPG`
- `Plaster001_1K-JPG`
- `Wood062_1K-JPG`
- `Metal034_1K-JPG`
- `Fabric030_1K-JPG` (Modern upholstery proxy)
- `Fabric042_1K-JPG` (Classic upholstery proxy)

Only the color, OpenGL normal and roughness maps required at runtime should be considered production dependencies. Source-authoring files in `public/` should be moved out of the runtime tree in a later asset-cleanup pass.

## Environment

- Source: Poly Haven
- Asset: `spruit_sunrise_1k.hdr` (stored locally as `public/hdri/sunset.hdr`)
- License: CC0
- Purpose: local image-based lighting / reflections without runtime dependency on an external CDN.

## Fonts / brand mark

The current facade still uses remotely-loaded Cairo / Playfair text as a temporary signage fallback. The supplied Qubaisa logo artwork must replace this before final brand sign-off. The final logo asset should be stored locally and documented here.

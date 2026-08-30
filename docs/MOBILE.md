# Mobile Experience

The Qubaisa Virtual Palace is designed to keep the immersive vertical slice usable on touch-first devices instead of treating mobile as a scaled desktop view.

## Current controls

- Left virtual joystick: movement.
- Right half of the WebGL canvas: pointer-tracked look control.
- Pointer IDs are tracked independently so movement and look can be used simultaneously.
- Product/floor UI pauses first-person movement to avoid input leaking through overlays.
- The UI applies safe-area insets for phones with notches/home indicators.
- The application uses `100dvh` with a `min-h-screen` fallback for mobile browser chrome.

## Rendering quality

`AUTO` is the default quality mode. `QualityController` uses Drei `PerformanceMonitor` to lower or raise DPR based on measured runtime performance. DPR is capped even on very high-density screens to protect mobile GPU fill rate.

Current DPR targets:
- AUTO: adaptive, approximately 0.7 to a device-capped maximum of 1.75.
- LOW: 0.8.
- MEDIUM: 1.1.
- HIGH: 1.5, still capped by the device limit.

## Current limitations

- The vertical slice is one navigable floor. The grand stair is visually present but blocked until a real upper-floor scene exists.
- Collision currently uses explicit walkable zones and simplified rectangular proxy obstacles. A final architectural mesh can later move to BVH/capsule collision.
- Physical-device Safari/Android QA has not yet been executed from this repository session. Do not treat emulator/responsive assumptions as real-device certification.

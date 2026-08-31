# Computer Vision QA Skill — Qubaisa Cinematic Web

This project uses a dedicated visual-QA workflow whenever screenshots or screen recordings are supplied.

The purpose is not object recognition for its own sake. The goal is to convert visual evidence into actionable design and engineering fixes.

## Inputs

Preferred evidence, in descending order:

1. short screen recording of the full journey
2. desktop screenshots at key scroll stops
3. mobile portrait screenshots
4. mobile landscape screenshots
5. browser console / network screenshots when visual defects appear asset-related

If a video upload is too large, extract or provide representative frames at:

- initial load
- exterior hero
- entrance transition
- lobby
- modern collection
- neo-classical collection
- product/detail section
- footer/contact
- any broken visual state

## Visual analysis checklist

For each frame, inspect:

### Composition
- focal subject is obvious within one second
- no accidental empty dead space
- no furniture hidden under text
- camera crop feels intentional
- horizon and verticals do not look accidentally distorted

### Brand quality
- Qubaisa logo is accurate and readable
- champagne gold does not look yellow/neon
- deep navy remains premium rather than crushed black
- typography feels editorial, not SaaS/game-like

### Architecture
- believable scale
- doors/windows/floors align
- no visible backside geometry
- no floating or intersecting meshes
- no obvious primitive blockout in hero areas

### Furniture
- scale is believable
- upholstery reads as fabric
- furniture is grounded by contact shadows
- modern and neo-classical collections are visually distinct
- no generic proxy is presented as verified Qubaisa inventory

### Materials / lighting
- no blown highlights
- no black/unlit PBR materials
- glass and gold remain controlled
- walls preserve texture/detail instead of flat white clipping
- lighting supports the product focal point

### Motion / scroll
- scroll direction matches camera direction
- no sudden camera jumps
- no sections where scroll moves but visual story appears frozen
- stopping at any important scroll position still produces a composed frame
- text appears after the visual subject is established

### UI
- no gaming HUD, joystick, WASD prompt or pointer-lock language in the core journey
- navigation stays readable over changing backgrounds
- CTA placement never covers product focal points
- Arabic RTL and English LTR align correctly

### Mobile
- content fits safe areas
- no text clipped by browser chrome
- key subject remains inside the crop
- no hover-only affordance
- no mandatory drag-to-look
- scroll remains the only required gesture

### Performance symptoms visible in video
- dropped-frame bursts
- delayed texture pop-in
- black frames during scene/media switch
- layout shift
- delayed typography/font swap
- video seek stutter

## Severity model

P0 — blocks use or shows a broken/blank experience

P1 — major brand-quality issue visible immediately

P2 — noticeable visual or interaction defect

P3 — polish issue

## Output format

Every visual audit should produce:

- timestamp/frame
- observed defect
- severity
- probable cause
- exact file/system to inspect
- recommended fix
- verification shot required after fix

## Rule

Do not approve a visual feature from source code alone.

A feature is visually complete only after browser/device evidence has been inspected.

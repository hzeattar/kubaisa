# Qubaisa Cinematic Media Specification

This specification defines how palace / showroom visuals should be rendered and delivered to the scroll-driven site.

## 1. Storyboard deliverables

Produce five approved visual acts before creating a long final film:

1. Exterior arrival / facade hero
2. Entrance-to-lobby transition
3. Modern Living reveal
4. Neo-Classical Salon reveal
5. Craft / materials detail

Each act must have an approved still frame first. Do not render a long sequence around an unapproved composition.

## 2. Camera language

- Human / architectural eye level; avoid game/FPS framing.
- Recommended equivalent focal range: roughly 28–50mm for architecture, 50–85mm for furniture/detail.
- Slow dolly / truck / arc moves.
- No camera bob, handheld shake, aggressive roll or exaggerated wide-angle distortion.
- Every pause point must be a useful campaign still.
- Keep furniture as the subject after the entrance sequence; architecture becomes the frame, not the hero forever.

## 3. Desktop master

Preferred master render:

- 3840x2160 or higher authoring master
- 16:9 composition with protected center/safe subject area
- 24 or 30 fps
- no baked UI/text
- no audio required
- clean color-managed render master before web compression

Web delivery candidate:

- 1920x1080 or 1600x900 depending on visual QA
- MP4/H.264 baseline compatibility
- optional WebM/VP9 or AV1 only when browser/device tests justify it
- short GOP/keyframe interval optimized for seeking/scrubbing
- poster WebP/AVIF

## 4. Mobile master

Do not crop the desktop file blindly.

Create an independently art-directed mobile render/crop:

- 9:16 or a portrait-friendly master
- subject intentionally kept in center/safe area
- camera path can be shortened or reframed
- fewer tiny background details
- larger visual subject

Web delivery candidate:

- approximately 720x1280 to 1080x1920 depending on quality/performance test
- lower bitrate than desktop
- same visual chapter timings where practical

## 5. Scroll-seeking requirements

The delivery video must be designed for seeking, not ordinary playback.

- no long fades that become muddy when scrubbing backward
- avoid cuts that produce ambiguous in-between frames
- use short keyframe intervals
- test forward and reverse scrubbing
- map the entire cinematic media to the story portion only; Collections/Contact are normal DOM sections

If seeking performance is poor on iOS/Android, replace the affected act with:

- short image sequence, or
- a separate shorter clip, or
- real-time WebGL only when it is actually lighter/better.

## 6. Visual direction

Palette:

- deep navy / near black
- warm ivory / limestone / travertine
- controlled champagne gold
- warm walnut and neutral upholstery

Lighting:

- exterior: golden hour / blue-hour transition
- interior: warm architectural lighting with controlled highlights
- furniture must retain fabric texture and contact shadows
- avoid crushed black corners and blown white walls

Gold:

- metallic champagne/brushed gold
- restrained saturation
- never flat bright yellow

## 7. Furniture scenes

### Modern

Target visual traits:

- low, comfortable silhouette
- curved / softened geometry
- cream, off-white, sand, greige upholstery
- generous rug and coffee-table composition
- warm wood / dark accent contrast

### Neo-Classical

Target visual traits:

- cream / beige upholstery
- carved or shaped frame language
- champagne / aged-gold accents
- marble / premium wood
- luxurious salon composition
- avoid excessive baroque visual noise

All real product claims must be tied to verified Qubaisa source material.

## 8. Asset naming

Recommended public media structure:

public/media/cinematic/
  desktop/
    qubaisa-palace-v01.mp4
    qubaisa-palace-v01-poster.webp
  mobile/
    qubaisa-palace-v01-mobile.mp4
    qubaisa-palace-v01-mobile-poster.webp

Production paths can then be supplied via:

- VITE_CINEMATIC_VIDEO_DESKTOP
- VITE_CINEMATIC_VIDEO_MOBILE
- VITE_CINEMATIC_POSTER

If no media variables are configured, the site intentionally falls back to the scroll-directed R3F scene.

## 9. Performance acceptance

Before approval measure on a real phone:

- first useful visual arrival
- network transfer before first interaction
- scroll-to-frame latency
- dropped frames during fast scroll
- memory growth after complete down/up scroll
- thermal/GPU behavior for WebGL fallback

Do not preload the whole site just to make the first scroll smooth.

## 10. Computer Vision QA frames

For each build capture these checkpoints:

- 0%: exterior hero
- 12–18%: facade/sign approach
- 28–35%: entrance/lobby
- 45–58%: modern collection
- 62–74%: neo-classical collection
- 76–80%: craft transition/end of cinematic media
- Collections DOM section
- Contact/footer

Capture the same checkpoints on:

- desktop wide
- mobile portrait
- mobile landscape where supported

Run the checklist in `COMPUTER_VISION_QA_SKILL.md` against every release candidate.

# QA Status

## Verified by source audit in this pass

- Corrected lobby floor/ceiling depth alignment.
- Replaced solid front wall with an actual central entrance opening.
- Corrected Modern/Neo-Classical quick-navigation destinations to their scene centers.
- Prevented navigation into the unfinished staircase/upper-floor area.
- Reworked current collision from broad world clamps to explicit walkable regions and simplified obstacle proxies.
- Reworked mobile look/joystick input around independently tracked pointer IDs.
- Added adaptive DPR controller and graceful 2D error fallback.
- Reworked Modern and Neo-Classical proxy furniture and removed unused large GLBs.

## Not yet certified

The following must be treated as pending until executed in a build/browser-capable environment:

- TypeScript command result.
- Production Vite build result.
- Production Express server smoke test.
- Desktop WebGL visual QA on the branch.
- Android physical-device QA.
- iPhone/Safari physical-device QA.
- Railway preview/deployment verification for this branch.
- Objective FPS/draw-call/GPU-memory measurements.

## Required pre-merge checklist

- [ ] `npm run lint` succeeds.
- [ ] `npm run build` succeeds.
- [ ] `npm run start` serves the built app.
- [ ] Exterior renders with local HDRI/materials.
- [ ] Main entrance is traversable.
- [ ] Lobby has no blank floor gap.
- [ ] Modern quick-nav arrives inside the Modern room.
- [ ] Neo-Classical quick-nav arrives inside the Neo-Classical room.
- [ ] Reception, pillars, hero furniture and staircase block movement appropriately.
- [ ] Guided tour visits actual room centers and returns to lobby.
- [ ] Left joystick + right look work simultaneously on touch.
- [ ] Product panel/floor selector do not leak movement input.
- [ ] Arabic RTL and English LTR are both usable.
- [ ] No essential asset 404s.
- [ ] No persistent console errors.
- [ ] Railway public URL works after merge/deploy.

Do not merge the draft PR solely because it is Git-mergeable; merge only after the checks above have real evidence.

import { lazy, Suspense } from 'react';
import type { Department } from '../journey/journeyModel';

const ModernWingHall = lazy(() =>
  import('./ModernWingHall').then((module) => ({ default: module.ModernWingHall })),
);

const NeoClassicWingHall = lazy(() =>
  import('./NeoClassicWingHall').then((module) => ({ default: module.NeoClassicWingHall })),
);

/**
 * Keeps each collection's technical-art direction isolated and code-split.
 * A wing's implementation is requested only after the cinematic scene director
 * reaches the hall stage, keeping both hall implementations out of first paint.
 */
export function WingHallRouter({ department }: { department: Department }) {
  return (
    <Suspense fallback={null}>
      {department === 'modern' ? <ModernWingHall /> : <NeoClassicWingHall />}
    </Suspense>
  );
}

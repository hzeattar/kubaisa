import React, { Suspense } from 'react';
import { CinematicCanvas } from './CinematicCanvas';
import { CinematicStaticFallback, CinematicVisualBoundary } from './CinematicVisualBoundary';
import type { Department } from '../journey/journeyModel';

export function CinematicVisual({ department }: { department: Department | null }) {
  return (
    <CinematicVisualBoundary>
      <div 
        style={{ 
          width: '100%', height: '100%', 
          position: 'relative', overflow: 'hidden', 
          backgroundColor: '#050505' 
        }}
      >
        <Suspense fallback={<CinematicStaticFallback />}>
          <CinematicCanvas department={department} />
        </Suspense>
      </div>
    </CinematicVisualBoundary>
  );
}

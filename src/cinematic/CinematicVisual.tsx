import { useEffect, useMemo, useRef, useState } from 'react';
import { cinematicScroll } from './scrollState';
import { CinematicStaticFallback, CinematicVisualBoundary } from './CinematicVisualBoundary';
import { InteractiveRoomExperience } from '../interactive/InteractiveRoomExperience';
import type { Department } from '../journey/journeyModel';

type ViewNode = {
  src: string;
  start: number;
  end: number;
};

// Luxury placeholder images representing the cinematic architectural walkthrough
const VIEWS: ViewNode[] = [
  { src: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=1920&q=80', start: 0, end: 0.3 },     // Exterior / Arrival
  { src: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1920&q=80', start: 0.2, end: 0.5 },   // Grand Lobby
  { src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1920&q=80', start: 0.4, end: 0.8 },   // Modern Hall
  { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80', start: 0.4, end: 0.8 },   // Classic Hall
];

export function CinematicVisual({ department }: { department: Department | null }) {
  const [videoFailed, setVideoFailed] = useState(true); // Force fallback to DOM Parallax for now
  const rafRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tick = () => {
      if (!containerRef.current) return;
      const progress = cinematicScroll.progress;
      const isModern = department === 'modern';
      const isClassic = department === 'classic';

      const nodes = containerRef.current.children;
      for (let i = 0; i < VIEWS.length; i++) {
        const view = VIEWS[i];
        const el = nodes[i] as HTMLElement;
        if (!el) continue;

        // Route logic: Show Modern/Classic hall depending on department
        if (i === 2 && isClassic) { el.style.opacity = '0'; continue; }
        if (i === 3 && isModern) { el.style.opacity = '0'; continue; }
        if (i >= 2 && !department) { el.style.opacity = '0'; continue; }

        if (progress >= view.start && progress <= view.end + 0.1) {
          // Calculate local progress 0..1 for crossfade and zoom
          const span = view.end - view.start;
          let localProgress = (progress - view.start) / span;
          
          let opacity = 1;
          if (localProgress < 0.2) opacity = localProgress / 0.2; // Fade in
          if (localProgress > 1.0) opacity = 1 - (localProgress - 1.0) / 0.1; // Fade out

          opacity = Math.max(0, Math.min(1, opacity));
          
          // Subtle cinematic zoom in
          const scale = 1 + (localProgress * 0.15);

          el.style.opacity = opacity.toString();
          el.style.transform = `scale(${scale})`;
        } else {
          el.style.opacity = '0';
        }
      }
      rafRef.current = window.requestAnimationFrame(tick);
    };

    rafRef.current = window.requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, [department]);

  return (
    <CinematicVisualBoundary>
      <div 
        ref={containerRef} 
        style={{ 
          width: '100%', height: '100%', 
          position: 'relative', overflow: 'hidden', 
          backgroundColor: '#05070b' 
        }}
      >
        {VIEWS.map((v, i) => (
          <img 
            key={i} 
            src={v.src} 
            alt="" 
            style={{ 
              position: 'absolute', inset: 0, 
              width: '100%', height: '100%', 
              objectFit: 'cover', opacity: 0, 
              transition: 'opacity 0.1s ease-out',
              willChange: 'opacity, transform'
            }} 
          />
        ))}
      </div>
    </CinematicVisualBoundary>
  );
}

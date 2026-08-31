import { useEffect, useMemo, useRef, useState } from 'react';
import { CinematicCanvas } from './CinematicCanvas';
import { cinematicScroll } from './scrollState';

const getIsMobile = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(max-width: 800px)').matches;
};

export function CinematicVisual() {
  const [isMobile, setIsMobile] = useState(getIsMobile);
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number | null>(null);

  const source = useMemo(() => {
    const desktop = import.meta.env.VITE_CINEMATIC_VIDEO_DESKTOP;
    const mobile = import.meta.env.VITE_CINEMATIC_VIDEO_MOBILE;
    return isMobile ? (mobile || desktop) : desktop;
  }, [isMobile]);

  const poster = import.meta.env.VITE_CINEMATIC_POSTER;

  useEffect(() => {
    const media = window.matchMedia('(max-width: 800px)');
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!source) return;
    const video = videoRef.current;
    if (!video) return;

    const tick = () => {
      if (Number.isFinite(video.duration) && video.duration > 0) {
        const desired = cinematicScroll.progress * Math.max(0, video.duration - 0.04);
        const delta = desired - video.currentTime;

        // Smooth tiny scroll changes, but seek immediately when the user jumps far.
        if (Math.abs(delta) > 0.6) {
          video.currentTime = desired;
        } else if (Math.abs(delta) > 0.025) {
          video.currentTime += delta * 0.22;
        }
      }

      rafRef.current = window.requestAnimationFrame(tick);
    };

    rafRef.current = window.requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, [source]);

  if (!source) {
    return <CinematicCanvas />;
  }

  return (
    <video
      ref={videoRef}
      className="cinematic-video"
      src={source}
      poster={poster}
      preload="metadata"
      muted
      playsInline
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}

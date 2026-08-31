import { useEffect, useMemo, useRef, useState } from 'react';
import { CinematicCanvas } from './CinematicCanvas';
import { cinematicScroll } from './scrollState';
import { CinematicStaticFallback, CinematicVisualBoundary } from './CinematicVisualBoundary';

const CINEMATIC_SCROLL_END = 0.9;

type Department = 'modern' | 'classic';

const getIsMobile = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(max-width: 800px)').matches;
};

export function CinematicVisual({ department }: { department: Department | null }) {
  const [isMobile, setIsMobile] = useState(getIsMobile);
  const [videoFailed, setVideoFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number | null>(null);

  const configuredSource = useMemo(() => {
    const desktop = import.meta.env.VITE_CINEMATIC_VIDEO_DESKTOP;
    const mobile = import.meta.env.VITE_CINEMATIC_VIDEO_MOBILE;
    return isMobile ? (mobile || desktop) : desktop;
  }, [isMobile]);

  // The generic film can cover the palace arrival. Once the visitor chooses a
  // wing we need a branch-aware visual, so the live R3F journey takes over until
  // dedicated Modern/Classical films are authored later.
  const source = department || videoFailed ? undefined : configuredSource;
  const poster = import.meta.env.VITE_CINEMATIC_POSTER;

  useEffect(() => {
    const media = window.matchMedia('(max-width: 800px)');
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    setVideoFailed(false);
  }, [configuredSource]);

  useEffect(() => {
    if (!source) return;
    const video = videoRef.current;
    if (!video) return;

    const tick = () => {
      if (Number.isFinite(video.duration) && video.duration > 0) {
        const normalized = Math.min(1, Math.max(0, cinematicScroll.progress / CINEMATIC_SCROLL_END));
        const desired = normalized * Math.max(0, video.duration - 0.04);
        const delta = desired - video.currentTime;

        if (Math.abs(delta) > 0.6) video.currentTime = desired;
        else if (Math.abs(delta) > 0.025) video.currentTime += delta * 0.22;
      }

      rafRef.current = window.requestAnimationFrame(tick);
    };

    rafRef.current = window.requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [source]);

  if (!source) {
    return (
      <CinematicVisualBoundary>
        <CinematicCanvas department={department} />
      </CinematicVisualBoundary>
    );
  }

  return (
    <CinematicVisualBoundary>
      <video
        ref={videoRef}
        src={source}
        poster={poster}
        preload="metadata"
        muted
        playsInline
        aria-hidden="true"
        tabIndex={-1}
        onError={() => setVideoFailed(true)}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          objectFit: 'cover',
          objectPosition: 'center',
          background: '#05070b',
        }}
      >
        <CinematicStaticFallback />
      </video>
    </CinematicVisualBoundary>
  );
}

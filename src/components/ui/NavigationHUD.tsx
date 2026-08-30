import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useAppStore, Quality } from '../../stores/useAppStore';
import { useTranslation } from '../../hooks/useTranslation';
import { mobileInput } from '../../experience/camera/FirstPersonCamera';

const qualityOrder: Quality[] = ['auto', 'high', 'medium', 'low'];

const VirtualJoystick = () => {
  const [activePointer, setActivePointer] = useState<number | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const baseRef = useRef<HTMLDivElement>(null);

  const reset = () => {
    setActivePointer(null);
    setPosition({ x: 0, y: 0 });
    mobileInput.moveX = 0;
    mobileInput.moveY = 0;
  };

  useEffect(() => reset, []);

  const updatePosition = (clientX: number, clientY: number) => {
    const base = baseRef.current;
    if (!base) return;

    const rect = base.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    let deltaX = clientX - centerX;
    let deltaY = clientY - centerY;
    const maxRadius = Math.max(1, rect.width / 2 - 22);
    const distance = Math.hypot(deltaX, deltaY);

    if (distance > maxRadius) {
      deltaX = (deltaX / distance) * maxRadius;
      deltaY = (deltaY / distance) * maxRadius;
    }

    setPosition({ x: deltaX, y: deltaY });
    mobileInput.moveX = deltaX / maxRadius;
    mobileInput.moveY = deltaY / maxRadius;
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (activePointer !== null) return;
    setActivePointer(event.pointerId);
    event.currentTarget.setPointerCapture(event.pointerId);
    updatePosition(event.clientX, event.clientY);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerId !== activePointer) return;
    updatePosition(event.clientX, event.clientY);
  };

  const handlePointerEnd = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerId !== activePointer) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    reset();
  };

  return (
    <div
      ref={baseRef}
      aria-label="Move"
      className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#050a15]/35 border border-white/20 flex items-center justify-center relative touch-none pointer-events-auto shadow-lg backdrop-blur-sm"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
    >
      <div
        className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#d4af37]/75 border border-[#f3e5ab]/50 shadow-md absolute transition-shadow"
        style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
      />
    </div>
  );
};

export const NavigationHUD: React.FC = () => {
  const {
    activeZone,
    setMode,
    mode,
    language,
    setLanguage,
    quality,
    setQuality,
    setShowFloorSelector,
  } = useAppStore();
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(pointer: coarse)');
    const checkMobile = () => setIsMobile(media.matches || window.innerWidth <= 768);
    checkMobile();
    media.addEventListener?.('change', checkMobile);
    window.addEventListener('resize', checkMobile);
    return () => {
      media.removeEventListener?.('change', checkMobile);
      window.removeEventListener('resize', checkMobile);
      mobileInput.moveX = 0;
      mobileInput.moveY = 0;
    };
  }, []);

  const qualityLabel = useMemo(() => {
    const key = quality === 'auto'
      ? 'qualityAuto'
      : quality === 'high'
        ? 'qualityHigh'
        : quality === 'medium'
          ? 'qualityMedium'
          : 'qualityLow';
    return t('ui', key);
  }, [quality, t]);

  const cycleQuality = () => {
    const index = qualityOrder.indexOf(quality);
    setQuality(qualityOrder[(index + 1) % qualityOrder.length]);
  };

  return (
    <div
      className="absolute inset-0 flex flex-col justify-between pointer-events-none"
      style={{
        paddingTop: 'max(1rem, env(safe-area-inset-top))',
        paddingRight: 'max(1rem, env(safe-area-inset-right))',
        paddingBottom: 'max(1rem, env(safe-area-inset-bottom))',
        paddingLeft: 'max(1rem, env(safe-area-inset-left))',
      }}
    >
      <div className="flex justify-between items-start gap-3 pointer-events-auto">
        <div className="bg-[#050a15]/78 backdrop-blur-md border border-[#d4af37]/20 px-3 py-2 md:px-4 rounded-lg max-w-[55vw]">
          <span className="text-[#f3e5ab] font-serif text-sm md:text-lg block leading-tight truncate">
            {t('loading', 'title')}
          </span>
          <span className="text-[#fdfbf7]/70 text-xs md:text-sm font-sans block truncate">
            {t('zones', activeZone)}
          </span>
        </div>

        <div className="flex gap-2 flex-wrap justify-end">
          <button
            className="min-h-10 px-3 md:px-4 py-2 bg-white/5 hover:bg-white/10 border border-[#d4af37]/30 text-[#d4af37] rounded-lg transition-colors text-xs md:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#d4af37]/60"
            onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
          >
            {language === 'ar' ? 'EN' : 'العربية'}
          </button>
          {!isMobile && (
            <button
              className="min-h-10 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors text-xs text-white/80 focus:outline-none focus:ring-2 focus:ring-[#d4af37]/60"
              onClick={cycleQuality}
              title={t('ui', 'quality')}
            >
              {qualityLabel}
            </button>
          )}
          <button
            className="min-h-10 px-3 md:px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-[#d4af37]/60"
            onClick={() => setMode(mode === 'explore' ? 'guided-tour' : 'explore')}
          >
            {mode === 'explore' ? t('ui', 'guidedTour') : t('ui', 'explore')}
          </button>
        </div>
      </div>

      <div className={`flex items-end gap-4 ${isMobile ? 'justify-between' : 'justify-end'} pointer-events-none`}>
        {isMobile && (
          <div className="pointer-events-auto">
            <VirtualJoystick />
          </div>
        )}

        <div className="flex flex-col items-end gap-3 pointer-events-auto">
          {!isMobile && (
            <div className="text-white/55 text-xs bg-black/40 px-3 py-1.5 rounded-lg max-w-xs text-center">
              {t('ui', 'moveHint')}
            </div>
          )}
          <button
            onClick={() => setShowFloorSelector(true)}
            className="min-h-11 px-4 md:px-6 py-2.5 md:py-3 bg-[#d4af37]/90 text-[#050a15] rounded-lg hover:bg-[#d4af37] font-semibold transition-colors shadow-lg pointer-events-auto focus:outline-none focus:ring-2 focus:ring-white/70"
          >
            {t('ui', 'floorDirectory')}
          </button>
        </div>
      </div>
    </div>
  );
};

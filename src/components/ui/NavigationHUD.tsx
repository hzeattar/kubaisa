import React, { useEffect, useState, useRef } from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { useTranslation } from '../../hooks/useTranslation';
import { mobileInput } from '../../experience/camera/FirstPersonCamera';

// Simple virtual joystick component
const VirtualJoystick = () => {
  const [active, setActive] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const baseRef = useRef<HTMLDivElement>(null);
  const stickRef = useRef<HTMLDivElement>(null);

  const handleStart = (e: React.TouchEvent) => {
    setActive(true);
    updatePosition(e.touches[0]);
  };

  const handleMove = (e: React.TouchEvent) => {
    if (active) {
      updatePosition(e.touches[0]);
    }
  };

  const handleEnd = () => {
    setActive(false);
    setPosition({ x: 0, y: 0 });
    mobileInput.moveX = 0;
    mobileInput.moveY = 0;
  };

  const updatePosition = (touch: React.Touch) => {
    if (!baseRef.current) return;
    
    const rect = baseRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    let deltaX = touch.clientX - centerX;
    let deltaY = touch.clientY - centerY;
    
    const maxRadius = rect.width / 2 - 20; // 20 is stick radius
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    if (distance > maxRadius) {
      deltaX = (deltaX / distance) * maxRadius;
      deltaY = (deltaY / distance) * maxRadius;
    }
    
    setPosition({ x: deltaX, y: deltaY });
    
    // Update global mobile input (normalize -1 to 1)
    mobileInput.moveX = deltaX / maxRadius;
    mobileInput.moveY = deltaY / maxRadius;
  };

  return (
    <div 
      ref={baseRef}
      className="w-32 h-32 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center relative touch-none pointer-events-auto shadow-lg"
      onTouchStart={handleStart}
      onTouchMove={handleMove}
      onTouchEnd={handleEnd}
      onTouchCancel={handleEnd}
    >
      <div 
        ref={stickRef}
        className="w-16 h-16 rounded-full bg-[#d4af37]/80 shadow-md absolute"
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      />
    </div>
  );
};

export const NavigationHUD: React.FC = () => {
  const { activeZone, setMode, mode } = useAppStore();
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile('ontouchstart' in window || window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="absolute inset-0 flex flex-col justify-between p-6 pointer-events-none">
      {/* Top Bar */}
      <div className="flex justify-between items-start pointer-events-auto">
        <div className="bg-[#050a15]/80 backdrop-blur-sm border border-[#d4af37]/20 px-4 py-2 rounded">
          <span className="text-[#f3e5ab] font-serif text-lg block leading-tight">
            {t('loading', 'title')}
          </span>
          <span className="text-[#fdfbf7]/70 text-sm font-sans">
            {t('zones', activeZone)}
          </span>
        </div>
        
        <div className="flex gap-2">
          <button 
            className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-[#d4af37]/30 text-[#d4af37] rounded transition-colors text-sm font-semibold"
            onClick={() => useAppStore.getState().setLanguage(useAppStore.getState().language === 'ar' ? 'en' : 'ar')}
          >
            {useAppStore.getState().language === 'ar' ? 'EN' : 'العربية'}
          </button>
          <button 
            className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded transition-colors text-sm"
            onClick={() => setMode(mode === 'explore' ? 'guided-tour' : 'explore')}
          >
            {mode === 'explore' ? t('ui', 'guidedTour') : t('ui', 'explore')}
          </button>
        </div>
      </div>

      {/* Bottom Bar / Controls */}
      <div className={`flex items-end ${isMobile ? 'justify-between' : 'justify-end'} pointer-events-none`}>
        {isMobile && (
          <div className="pointer-events-auto">
             <VirtualJoystick />
          </div>
        )}
        
        <div className="flex flex-col items-end gap-4 pointer-events-auto">
          {!isMobile && (
            <div className="text-white/50 text-xs bg-black/40 px-3 py-1 rounded">
              WASD / Arrow Keys to move. Drag to look.
            </div>
          )}
          {/* Quick Navigation Button */}
          <button 
            onClick={() => useAppStore.getState().setShowFloorSelector(true)}
            className="px-6 py-3 bg-[#d4af37]/90 text-[#050a15] rounded hover:bg-[#d4af37] font-semibold transition-colors shadow-lg pointer-events-auto"
          >
            {t('ui', 'floorDirectory')}
          </button>
        </div>
      </div>
    </div>
  );
};

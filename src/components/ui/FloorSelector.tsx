import React from 'react';
import { useAppStore, ActiveZone } from '../../stores/useAppStore';
import { useTranslation } from '../../hooks/useTranslation';

interface ZoneData {
  id: ActiveZone;
  floorKey: string;
  position: [number, number, number];
}

const zones: ZoneData[] = [
  { id: 'exterior', floorKey: 'exterior', position: [0, 1.7, 10] },
  { id: 'lobby', floorKey: 'lobby', position: [0, 1.7, -12] },
  { id: 'living-modern', floorKey: 'living-modern', position: [-25, 1.7, -20] },
  { id: 'living-neoclassic', floorKey: 'living-neoclassic', position: [25, 1.7, -20] },
];

export const FloorSelector: React.FC = () => {
  const { showFloorSelector, setShowFloorSelector, setActiveZone, setTeleportTarget, language } = useAppStore();
  const { t } = useTranslation();

  if (!showFloorSelector) return null;

  const handleSelectZone = (zone: ZoneData) => {
    setActiveZone(zone.id);
    setTeleportTarget(zone.position);
    setShowFloorSelector(false);
  };

  const isRtl = language === 'ar';

  return (
    <div className="absolute inset-0 bg-[#050a15]/80 backdrop-blur-md z-40 flex items-center justify-center p-4 md:p-6 pointer-events-auto">
      <div className="bg-[#0d1527] border border-[#d4af37]/30 rounded-xl p-5 md:p-8 max-w-lg w-full shadow-2xl relative" dir={isRtl ? 'rtl' : 'ltr'}>
        <button
          onClick={() => setShowFloorSelector(false)}
          className={`absolute top-4 ${isRtl ? 'left-4' : 'right-4'} text-white/50 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#d4af37]/60 rounded px-2 py-1`}
          aria-label={t('ui', 'close')}
        >
          {t('ui', 'close')}
        </button>

        <h2 className="text-2xl md:text-3xl font-serif text-[#d4af37] mb-8 text-center">
          {t('ui', 'floorDirectory')}
        </h2>

        <div className="space-y-3 md:space-y-4">
          {zones.map(zone => (
            <button
              key={zone.id}
              onClick={() => handleSelectZone(zone)}
              className="w-full px-5 md:px-6 py-4 bg-white/5 hover:bg-[#d4af37]/20 border border-white/10 hover:border-[#d4af37]/50 rounded-lg transition-all group flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-[#d4af37]/60"
            >
              <span className="text-[#fdfbf7] group-hover:text-[#f3e5ab] text-base md:text-lg font-medium">
                {t('zones', zone.id)}
              </span>
              <span className="text-white/30 group-hover:text-[#d4af37]" aria-hidden="true">
                {isRtl ? '←' : '→'}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

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
  { id: 'lobby', floorKey: 'lobby', position: [0, 1.7, -18] },
  { id: 'living-modern', floorKey: 'living-modern', position: [-15, 1.7, -23] },
  { id: 'living-neoclassic', floorKey: 'living-neoclassic', position: [15, 1.7, -23] },
];

export const FloorSelector: React.FC = () => {
  const { showFloorSelector, setShowFloorSelector, setActiveZone, setTeleportTarget } = useAppStore();
  const { t } = useTranslation();

  if (!showFloorSelector) return null;

  const handleSelectZone = (zone: ZoneData) => {
    setActiveZone(zone.id);
    setTeleportTarget(zone.position);
    setShowFloorSelector(false);
  };

  return (
    <div className="absolute inset-0 bg-[#050a15]/80 backdrop-blur-md z-40 flex items-center justify-center p-6 pointer-events-auto">
      <div className="bg-[#0d1527] border border-[#d4af37]/30 rounded-lg p-8 max-w-lg w-full shadow-2xl relative">
        <button 
          onClick={() => setShowFloorSelector(false)}
          className="absolute top-4 right-4 text-white/50 hover:text-white"
        >
          {t('ui', 'close')}
        </button>
        
        <h2 className="text-3xl font-serif text-[#d4af37] mb-8 text-center">
          {t('ui', 'floorDirectory')}
        </h2>

        <div className="space-y-4">
          {zones.map((zone) => (
            <button
              key={zone.id}
              onClick={() => handleSelectZone(zone)}
              className="w-full text-right (dir-rtl) px-6 py-4 bg-white/5 hover:bg-[#d4af37]/20 border border-white/10 hover:border-[#d4af37]/50 rounded transition-all group flex justify-between items-center"
            >
              <span className="text-[#fdfbf7] group-hover:text-[#f3e5ab] text-lg font-medium">
                {t('zones', zone.id)}
              </span>
              <span className="text-white/30 group-hover:text-[#d4af37]">
                &rarr;
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

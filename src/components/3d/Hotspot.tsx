import React from 'react';
import { Html } from '@react-three/drei';
import { useAppStore } from '../../stores/useAppStore';
import { useTranslation } from '../../hooks/useTranslation';

interface HotspotProps {
  position: [number, number, number];
  productId: string;
  labelAr: string;
  labelEn: string;
}

export const Hotspot: React.FC<HotspotProps> = ({ position, productId, labelAr, labelEn }) => {
  const setSelectedProduct = useAppStore(state => state.setSelectedProduct);
  const language = useAppStore(state => state.language);

  const label = language === 'ar' ? labelAr : labelEn;

  return (
    <Html position={position} center distanceFactor={15} zIndexRange={[100, 0]}>
      <div 
        onClick={(e) => {
          e.stopPropagation();
          setSelectedProduct(productId);
        }}
        className="group cursor-pointer flex flex-col items-center"
      >
        {/* Pulsing Dot */}
        <div className="relative flex items-center justify-center w-8 h-8">
          <div className="absolute inset-0 bg-[#d4af37] rounded-full opacity-40 animate-ping" />
          <div className="relative w-5 h-5 bg-[#d4af37] border-2 border-white rounded-full shadow-[0_0_10px_rgba(212,175,55,0.8)] group-hover:scale-125 transition-transform duration-300" />
        </div>
        
        {/* Label */}
        <div className="mt-2 px-4 py-1.5 bg-[#050a15]/90 backdrop-blur border border-[#d4af37]/40 text-[#f3e5ab] text-sm font-medium rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap select-none pointer-events-none">
          {label}
        </div>
      </div>
    </Html>
  );
};

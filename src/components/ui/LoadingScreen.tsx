import React from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { useTranslation } from '../../hooks/useTranslation';

export const LoadingScreen: React.FC = () => {
  const { setShowIntro, loadingProgress } = useAppStore();
  const { t } = useTranslation();

  return (
    <div className="w-full h-full bg-[#050a15] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Brand Logo / Text */}
      <div className="z-10 text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-serif text-[#d4af37] mb-4 drop-shadow-md">
          {t('loading', 'title')}
        </h1>
        <p className="text-lg md:text-xl text-[#f3e5ab] font-sans opacity-80">
          {t('loading', 'subtitle')}
        </p>
      </div>

      {/* Progress Bar (Mock for now) */}
      <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden z-10 mb-8">
        <div 
          className="h-full bg-[#d4af37] transition-all duration-300 ease-out"
          style={{ width: `${Math.max(10, loadingProgress * 100)}%` }}
        />
      </div>

      {/* Enter Button (Shows when loaded) */}
      <button 
        onClick={() => setShowIntro(false)}
        className="z-10 px-8 py-3 bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] rounded hover:bg-[#d4af37]/20 transition-all font-sans font-semibold tracking-wide"
      >
        {t('loading', 'enter')}
      </button>
      
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d1527] to-transparent opacity-50 z-0 pointer-events-none" />
    </div>
  );
};

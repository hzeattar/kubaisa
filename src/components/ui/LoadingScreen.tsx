import React, { useEffect } from 'react';
import { useProgress } from '@react-three/drei';
import { useAppStore } from '../../stores/useAppStore';
import { useTranslation } from '../../hooks/useTranslation';

export const LoadingScreen: React.FC = () => {
  const { setShowIntro } = useAppStore();
  const { t } = useTranslation();
  const { progress, active, loaded, total } = useProgress();

  return (
    <div className="w-full h-full bg-[#050a15] flex flex-col items-center justify-center relative overflow-hidden">
      <div className="z-10 text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-serif text-[#d4af37] mb-4 drop-shadow-md">
          {t('loading', 'title')}
        </h1>
        <p className="text-lg md:text-xl text-[#f3e5ab] font-sans opacity-80">
          {active ? `${t('loading', 'subtitle')} (${Math.round(progress)}%)` : t('loading', 'subtitle')}
        </p>
      </div>

      <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden z-10 mb-8">
        <div 
          className="h-full bg-[#d4af37] transition-all duration-300 ease-out"
          style={{ width: `${Math.max(5, progress)}%` }}
        />
      </div>

      <button 
        onClick={() => setShowIntro(false)}
        disabled={progress < 100 && total > 0}
        className={`z-10 px-8 py-3 rounded font-sans font-semibold tracking-wide transition-all ${
          progress === 100 || total === 0
            ? 'bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] hover:bg-[#d4af37]/20 cursor-pointer'
            : 'bg-white/5 border border-white/10 text-white/30 cursor-not-allowed'
        }`}
      >
        {t('loading', 'enter')}
      </button>

      <div className="absolute inset-0 bg-gradient-to-t from-[#0d1527] to-transparent opacity-50 z-0 pointer-events-none" />
    </div>
  );
};

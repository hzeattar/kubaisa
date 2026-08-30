import React from 'react';
import { useProgress } from '@react-three/drei';
import { useAppStore } from '../../stores/useAppStore';
import { useTranslation } from '../../hooks/useTranslation';

export const LoadingScreen: React.FC = () => {
  const { setShowIntro } = useAppStore();
  const { t } = useTranslation();
  const { progress, active, total } = useProgress();
  const ready = progress >= 100 || total === 0;

  return (
    <div className="w-full h-full bg-[#050a15] flex flex-col items-center justify-center relative overflow-hidden px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(212,175,55,0.13),transparent_42%)] pointer-events-none" />

      <div className="z-10 text-center mb-8 md:mb-10 flex flex-col items-center">
        <div className="w-28 h-28 md:w-36 md:h-36 rounded-2xl overflow-hidden border border-[#d4af37]/30 shadow-[0_20px_70px_rgba(0,0,0,0.45)] mb-6 bg-[#050a15]">
          <img
            src="/brand/qubaisa-logo.webp"
            alt="Qubaisa Furniture | قبيصة للأثاث"
            className="w-full h-full object-cover"
            draggable={false}
          />
        </div>
        <h1 className="text-3xl md:text-6xl font-serif text-[#d4af37] mb-3 drop-shadow-md">
          {t('loading', 'title')}
        </h1>
        <p className="text-base md:text-xl text-[#f3e5ab] font-sans opacity-80">
          {active ? `${t('loading', 'subtitle')} (${Math.round(progress)}%)` : t('loading', 'subtitle')}
        </p>
      </div>

      <div className="w-64 max-w-[75vw] h-1 bg-white/10 rounded-full overflow-hidden z-10 mb-8" aria-hidden="true">
        <div
          className="h-full bg-[#d4af37] transition-all duration-300 ease-out"
          style={{ width: `${Math.max(5, progress)}%` }}
        />
      </div>

      <button
        onClick={() => setShowIntro(false)}
        disabled={!ready}
        className={`z-10 min-h-12 px-8 py-3 rounded-lg font-sans font-semibold tracking-wide transition-all focus:outline-none focus:ring-2 focus:ring-[#d4af37]/70 ${
          ready
            ? 'bg-[#d4af37]/10 border border-[#d4af37]/40 text-[#d4af37] hover:bg-[#d4af37]/20 cursor-pointer'
            : 'bg-white/5 border border-white/10 text-white/30 cursor-not-allowed'
        }`}
      >
        {t('loading', 'enter')}
      </button>

      <div className="absolute inset-0 bg-gradient-to-t from-[#0d1527]/80 via-transparent to-black/20 opacity-80 z-0 pointer-events-none" />
    </div>
  );
};

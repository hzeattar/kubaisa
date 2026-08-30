import React from 'react';

type Props = { children: React.ReactNode };
type State = { failed: boolean };

export class ExperienceErrorBoundary extends React.Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    if (import.meta.env.DEV) {
      console.error('Qubaisa 3D experience failed to render', error);
    }
  }

  render() {
    if (!this.state.failed) return this.props.children;

    return (
      <div className="absolute inset-0 overflow-auto bg-[#050a15] text-[#fdfbf7] p-6 md:p-12" dir="rtl">
        <div className="max-w-3xl mx-auto min-h-full flex flex-col justify-center">
          <p className="text-[#d4af37] text-sm tracking-[0.2em] mb-3">QUBAISA FURNITURE</p>
          <h1 className="text-3xl md:text-5xl font-semibold mb-4">قبيصة للأثاث</h1>
          <p className="text-white/75 text-base md:text-lg leading-8 mb-2">
            تعذر تشغيل الجولة ثلاثية الأبعاد على هذا الجهاز حالياً، لكن يمكنك متابعة أقسام المعرض من النسخة الخفيفة.
          </p>
          <p className="text-white/55 text-sm md:text-base leading-7 mb-8" dir="ltr">
            The immersive 3D tour is unavailable on this device right now. You can still browse the showroom departments below.
          </p>

          <div className="grid sm:grid-cols-2 gap-3">
            {[
              ['الاستقبال', 'Grand Lobby'],
              ['المعيشة المودرن', 'Modern Living'],
              ['الصالونات النيو كلاسيك', 'Neo-Classical Salons'],
              ['غرف السفرة — قريباً', 'Dining — Coming soon'],
              ['غرف النوم — قريباً', 'Bedrooms — Coming soon'],
              ['الأطفال والشباب — قريباً', 'Kids & Youth — Coming soon'],
            ].map(([ar, en]) => (
              <div key={en} className="border border-[#d4af37]/20 bg-white/5 rounded-xl p-4">
                <div className="text-[#f3e5ab] font-medium">{ar}</div>
                <div className="text-white/45 text-sm mt-1" dir="ltr">{en}</div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-8 self-start px-5 py-3 rounded-lg border border-[#d4af37]/40 text-[#d4af37] hover:bg-[#d4af37]/10 focus:outline-none focus:ring-2 focus:ring-[#d4af37]/60"
          >
            إعادة المحاولة / Retry
          </button>
        </div>
      </div>
    );
  }
}

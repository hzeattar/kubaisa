import { Component, type ErrorInfo, type ReactNode } from 'react';
import './runtime.css';

type Props = {
  children: ReactNode;
};

type State = {
  failed: boolean;
  error?: Error | null;
};

export function CinematicStaticFallback({ error }: { error?: string }) {
  const developmentDetail = import.meta.env.DEV ? error : undefined;

  return (
    <div className="cinematic-static-fallback" role="status" aria-live="polite">
      <div className="cinematic-static-fallback__glow" />
      <div className="cinematic-static-fallback__architecture" aria-hidden="true">
        <span className="cinematic-static-fallback__wing cinematic-static-fallback__wing--left" />
        <span className="cinematic-static-fallback__center" />
        <span className="cinematic-static-fallback__wing cinematic-static-fallback__wing--right" />
      </div>
      <img src="/brand/qubaisa-logo.webp" alt="Qubaisa Furniture" />
      <div style={{ position: 'absolute', bottom: '28px', left: '50%', transform: 'translateX(-50%)', color: '#fff', textAlign: 'center', zIndex: 10, fontFamily: 'Cairo, sans-serif', width: 'min(520px, 88vw)' }}>
        <h2 style={{ marginBottom: '8px', fontWeight: 500 }}>قصر قبيصة الافتراضي</h2>
        <p style={{ color: 'rgba(255,255,255,.72)', fontSize: '12px', lineHeight: 1.8, margin: 0 }}>
          تعذر تشغيل المشهد ثلاثي الأبعاد على هذا الجهاز. يمكنك إعادة المحاولة بدون فقد محتوى الموقع.
        </p>
        {developmentDetail && <p style={{ color: '#d9b86d', fontSize: '10px', marginTop: '8px', wordBreak: 'break-word' }}>{developmentDetail}</p>}
        <button onClick={() => window.location.reload()} style={{ padding: '10px 18px', background: 'rgba(201,164,93,.14)', border: '1px solid rgba(232,212,170,.35)', color: '#f6efe4', borderRadius: '999px', cursor: 'pointer', marginTop: '14px' }}>
          إعادة المحاولة / Retry
        </button>
      </div>
    </div>
  );
}

/**
 * A WebGL error must never take down the semantic website. Three/R3F failures
 * are isolated here so the brand story and contact content remain usable while
 * the visual layer degrades to an intentional static composition.
 */
export class CinematicVisualBoundary extends Component<Props, State> {
  state: State = { failed: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { failed: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Cinematic visual failed; using static fallback.', error, info);
  }

  render() {
    if (this.state.failed) return <CinematicStaticFallback error={this.state.error?.message} />;
    return this.props.children;
  }
}

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
  return (
    <div className="cinematic-static-fallback" aria-hidden="true">
      <div className="cinematic-static-fallback__glow" />
      <div className="cinematic-static-fallback__architecture">
        <span className="cinematic-static-fallback__wing cinematic-static-fallback__wing--left" />
        <span className="cinematic-static-fallback__center" />
        <span className="cinematic-static-fallback__wing cinematic-static-fallback__wing--right" />
      </div>
      <img src="/brand/qubaisa-logo.webp" alt="Qubaisa Logo" />
      <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', color: '#fff', textAlign: 'center', zIndex: 10, fontFamily: 'sans-serif' }}>
        <h2>قصر قبيصة الافتراضي</h2>
        {error && <p style={{ color: '#ff4444', fontSize: '12px', maxWidth: '80vw', wordWrap: 'break-word' }}>{error}</p>}
        <button onClick={() => window.location.reload()} style={{ padding: '8px 16px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: '4px', cursor: 'pointer', marginTop: '10px' }}>
          إعادة التحميل / Retry
        </button>
      </div>
    </div>
  );
}

/**
 * A WebGL error must never take down the semantic website. Three/R3F failures
 * are isolated here so the brand story, collections and contact content remain
 * usable while the visual layer degrades to an intentional static composition.
 */
export class CinematicVisualBoundary extends Component<Props, State> {
  state: State = { failed: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { failed: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (import.meta.env.DEV) {
      console.error('Cinematic visual failed; using static fallback.', error, info);
    }
  }

  render() {
    if (this.state.failed) return <CinematicStaticFallback error={this.state.error?.message} />;
    return this.props.children;
  }
}

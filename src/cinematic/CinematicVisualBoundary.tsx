import { Component, type ErrorInfo, type ReactNode } from 'react';
import './runtime.css';

type Props = {
  children: ReactNode;
};

type State = {
  failed: boolean;
};

export function CinematicStaticFallback() {
  return (
    <div className="cinematic-static-fallback" aria-hidden="true">
      <div className="cinematic-static-fallback__glow" />
      <div className="cinematic-static-fallback__architecture">
        <span className="cinematic-static-fallback__wing cinematic-static-fallback__wing--left" />
        <span className="cinematic-static-fallback__center" />
        <span className="cinematic-static-fallback__wing cinematic-static-fallback__wing--right" />
      </div>
      <img src="/brand/qubaisa-logo.webp" alt="" />
    </div>
  );
}

/**
 * A WebGL error must never take down the semantic website. Three/R3F failures
 * are isolated here so the brand story, collections and contact content remain
 * usable while the visual layer degrades to an intentional static composition.
 */
export class CinematicVisualBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (import.meta.env.DEV) {
      console.error('Cinematic visual failed; using static fallback.', error, info);
    }
  }

  render() {
    if (this.state.failed) return <CinematicStaticFallback />;
    return this.props.children;
  }
}

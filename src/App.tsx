/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useAppStore } from './stores/useAppStore';
import { UIOverlay } from './components/ui/UIOverlay';
import { LoadingScreen } from './components/ui/LoadingScreen';
import { PalaceScene } from './experience/PalaceScene';

export default function App() {
  const { showIntro, setIsLoaded } = useAppStore();

  useEffect(() => {
    setIsLoaded(true);
  }, [setIsLoaded]);

  return (
    <div className="relative w-full h-[100dvh] min-h-screen overflow-hidden bg-[#050a15] font-sans text-[#fdfbf7]">
      <div className="absolute inset-0 z-0">
        <Canvas
          shadows
          camera={{ position: [0, 1.7, 10], fov: 55, near: 0.1, far: 180 }}
          gl={{ antialias: true, powerPreference: 'high-performance' }}
          style={{ touchAction: 'none' }}
        >
          <Suspense fallback={null}>
            <PalaceScene />
          </Suspense>
        </Canvas>
      </div>

      <div className="absolute inset-0 z-10 pointer-events-none">
        <UIOverlay />
      </div>

      {showIntro && (
        <div className="absolute inset-0 z-50">
          <LoadingScreen />
        </div>
      )}
    </div>
  );
}

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
  const { showIntro, isLoaded, setIsLoaded } = useAppStore();

  useEffect(() => {
    // Basic initialization
    setIsLoaded(true);
  }, [setIsLoaded]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#050a15] font-sans text-[#fdfbf7]">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        <Canvas
          shadows
          camera={{ position: [0, 1.7, 10], fov: 60 }}
          gl={{ antialias: true, powerPreference: 'high-performance' }}
        >
          <Suspense fallback={null}>
            <PalaceScene />
          </Suspense>
        </Canvas>
      </div>
      
      {/* 2D UI Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <UIOverlay />
      </div>

      {/* Loading / Intro Screen overlay */}
      {showIntro && (
        <div className="absolute inset-0 z-50">
          <LoadingScreen />
        </div>
      )}
    </div>
  );
}

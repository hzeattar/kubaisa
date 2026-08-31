import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { PerformanceMonitor } from '@react-three/drei';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import * as THREE from 'three';

function LocalRoomEnvironment() {
  const { gl, scene } = useThree();

  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const room = new RoomEnvironment();
    const environment = pmrem.fromScene(room, 0.035).texture;
    scene.environment = environment;

    return () => {
      if (scene.environment === environment) scene.environment = null;
      environment.dispose();
      room.clear();
      pmrem.dispose();
    };
  }, [gl, scene]);

  return null;
}

export function AdaptiveRoomCanvas({
  cameraPosition,
  children,
}: {
  cameraPosition: [number, number, number];
  children: ReactNode;
}) {
  const [quality, setQuality] = useState(0.82);
  const isMobile = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 820px), (pointer: coarse)').matches,
    [],
  );
  const dpr = THREE.MathUtils.lerp(isMobile ? 0.88 : 1.0, isMobile ? 1.22 : 1.5, quality);

  return (
    <Canvas
      shadows
      dpr={dpr}
      performance={{ min: 0.5 }}
      camera={{ position: cameraPosition, fov: 47, near: 0.1, far: 80 }}
      gl={{
        antialias: true,
        alpha: false,
        stencil: false,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
      }}
      onCreated={({ gl }) => {
        gl.toneMappingExposure = 0.98;
        gl.outputColorSpace = THREE.SRGBColorSpace;
        gl.shadowMap.type = THREE.PCFSoftShadowMap;
      }}
    >
      <LocalRoomEnvironment />
      <PerformanceMonitor
        flipflops={3}
        onIncline={() => setQuality((value) => Math.min(1, value + 0.08))}
        onDecline={() => setQuality((value) => Math.max(0.45, value - 0.14))}
        onFallback={() => setQuality(0.5)}
      >
        {children}
      </PerformanceMonitor>
    </Canvas>
  );
}

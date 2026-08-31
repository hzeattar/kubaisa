import { Suspense, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Lobby } from '../scenes/lobby/Lobby';
import { ModernLiving } from '../scenes/living/modern/ModernLiving';
import { NeoClassicLiving } from '../scenes/living/neoclassic/NeoClassicLiving';
import { cinematicScroll } from './scrollState';
import { BrandFacadeSign } from './BrandFacadeSign';
import { CinematicExterior } from './CinematicExterior';
import { CinematicStaticFallback } from './CinematicVisualBoundary';

const CAMERA_POINTS = [
  new THREE.Vector3(0, 5.8, 30),
  new THREE.Vector3(0, 4.8, 18),
  new THREE.Vector3(0, 3.2, 8),
  new THREE.Vector3(0, 2.2, -8),
  new THREE.Vector3(0, 2.1, -18),
  new THREE.Vector3(-19, 2.2, -19),
  new THREE.Vector3(-25, 2.1, -24),
  new THREE.Vector3(0, 2.4, -24),
  new THREE.Vector3(20, 2.2, -20),
  new THREE.Vector3(25, 2.1, -25),
] as const;

const TARGET_POINTS = [
  new THREE.Vector3(0, 8, -12),
  new THREE.Vector3(0, 7, -13),
  new THREE.Vector3(0, 4.5, -14),
  new THREE.Vector3(0, 3.5, -20),
  new THREE.Vector3(0, 2.5, -28),
  new THREE.Vector3(-24, 2, -25),
  new THREE.Vector3(-25, 1.4, -28),
  new THREE.Vector3(0, 2, -28),
  new THREE.Vector3(24, 2, -25),
  new THREE.Vector3(25, 1.4, -28),
] as const;

const NORMALIZED_SCROLL_END = 0.78;
const EXTERIOR = 1;
const LOBBY = 2;
const MODERN = 4;
const CLASSIC = 8;

function getSceneMask(progress: number) {
  let mask = 0;

  // The old implementation rendered every room at the same time. That meant
  // the lobby entrance wall could sit in front of the exterior hero shot and
  // distant rooms could leak into unrelated camera angles. These windows keep
  // only the current act and a small transition overlap mounted.
  if (progress < 0.4) mask |= EXTERIOR;
  if ((progress >= 0.34 && progress < 0.58) || (progress >= 0.72 && progress < 0.88)) mask |= LOBBY;
  if (progress >= 0.5 && progress < 0.76) mask |= MODERN;
  if (progress >= 0.78) mask |= CLASSIC;

  return mask || LOBBY;
}

function CinematicCamera() {
  const { camera } = useThree();
  const cameraCurve = useMemo(() => new THREE.CatmullRomCurve3([...CAMERA_POINTS], false, 'catmullrom', 0.35), []);
  const targetCurve = useMemo(() => new THREE.CatmullRomCurve3([...TARGET_POINTS], false, 'catmullrom', 0.35), []);
  const desiredPosition = useMemo(() => new THREE.Vector3(), []);
  const desiredTarget = useMemo(() => new THREE.Vector3(), []);
  const lookMatrix = useMemo(() => new THREE.Matrix4(), []);
  const desiredQuaternion = useMemo(() => new THREE.Quaternion(), []);

  useFrame((_, delta) => {
    const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const raw = THREE.MathUtils.clamp(cinematicScroll.progress, 0, NORMALIZED_SCROLL_END) / NORMALIZED_SCROLL_END;
    const progress = reducedMotion ? Math.round(raw * 4) / 4 : raw;

    cameraCurve.getPoint(progress, desiredPosition);
    targetCurve.getPoint(progress, desiredTarget);

    const positionDamping = reducedMotion ? 1 : 1 - Math.exp(-delta * 3.8);
    const rotationDamping = reducedMotion ? 1 : 1 - Math.exp(-delta * 4.6);

    camera.position.lerp(desiredPosition, positionDamping);
    lookMatrix.lookAt(camera.position, desiredTarget, camera.up);
    desiredQuaternion.setFromRotationMatrix(lookMatrix);
    camera.quaternion.slerp(desiredQuaternion, rotationDamping);
  });

  return null;
}

function SceneDirector() {
  const initialMask = getSceneMask(0);
  const [mask, setMask] = useState(initialMask);
  const maskRef = useRef(initialMask);

  useFrame(() => {
    const progress = THREE.MathUtils.clamp(cinematicScroll.progress, 0, NORMALIZED_SCROLL_END) / NORMALIZED_SCROLL_END;
    const nextMask = getSceneMask(progress);
    if (nextMask !== maskRef.current) {
      maskRef.current = nextMask;
      setMask(nextMask);
    }
  });

  return (
    <>
      {(mask & EXTERIOR) !== 0 && (
        <Suspense fallback={null}>
          <CinematicExterior />
          <BrandFacadeSign />
        </Suspense>
      )}

      {(mask & LOBBY) !== 0 && (
        <Suspense fallback={null}>
          <Lobby />
        </Suspense>
      )}

      {(mask & MODERN) !== 0 && (
        <Suspense fallback={null}>
          <group position={[-25, 0, -20]}><ModernLiving /></group>
        </Suspense>
      )}

      {(mask & CLASSIC) !== 0 && (
        <Suspense fallback={null}>
          <group position={[25, 0, -20]}><NeoClassicLiving /></group>
        </Suspense>
      )}
    </>
  );
}

function CinematicWorld() {
  return (
    <>
      <color attach="background" args={['#07101b']} />
      <CinematicCamera />
      <ambientLight intensity={0.2} color="#ffe8cb" />
      <hemisphereLight args={['#fff0d8', '#17110c', 0.46]} />
      <directionalLight
        position={[22, 28, 28]}
        intensity={1.25}
        color="#ffe3b0"
        castShadow
        shadow-bias={-0.0004}
        shadow-mapSize={[1024, 1024]}
      >
        <orthographicCamera attach="shadow-camera" args={[-35, 35, 35, -35, 0.5, 120]} />
      </directionalLight>
      <SceneDirector />
    </>
  );
}

export function CinematicCanvas() {
  return (
    <Canvas
      shadows
      dpr={[1, 1.6]}
      camera={{ position: [0, 5.8, 30], fov: 43, near: 0.1, far: 180 }}
      gl={{ antialias: true, powerPreference: 'high-performance', toneMapping: THREE.ACESFilmicToneMapping }}
      onCreated={({ gl }) => {
        gl.toneMappingExposure = 0.92;
        gl.outputColorSpace = THREE.SRGBColorSpace;
      }}
      fallback={<CinematicStaticFallback />}
    >
      <CinematicWorld />
    </Canvas>
  );
}

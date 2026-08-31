import { Suspense, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { cinematicScroll } from './scrollState';
import { BrandFacadeSign } from './BrandFacadeSign';
import { CinematicExterior } from './CinematicExterior';
import { CinematicLobby } from './CinematicLobby';
import { WingHall } from './WingHall';
import { CinematicStaticFallback } from './CinematicVisualBoundary';
import type { Department } from '../journey/journeyModel';

const EXTERIOR = 1;
const LOBBY = 2;
const HALL = 4;

function cameraPoints(department: Department | null) {
  const common = [
    new THREE.Vector3(0, 5.9, 31),
    new THREE.Vector3(0, 5.0, 20),
    new THREE.Vector3(0, 3.55, 9),
    new THREE.Vector3(0, 2.35, -5),
    new THREE.Vector3(0, 2.15, -18),
  ];

  if (department === 'modern') {
    return [
      ...common,
      new THREE.Vector3(-6, 2.25, -22),
      new THREE.Vector3(-15, 2.2, -25),
      new THREE.Vector3(-23.5, 2.05, -28),
      new THREE.Vector3(-25, 1.85, -38),
      new THREE.Vector3(-25, 1.82, -49),
      new THREE.Vector3(-25, 1.82, -61),
    ];
  }

  if (department === 'classic') {
    return [
      ...common,
      new THREE.Vector3(6, 2.25, -22),
      new THREE.Vector3(15, 2.2, -25),
      new THREE.Vector3(23.5, 2.05, -28),
      new THREE.Vector3(25, 1.85, -38),
      new THREE.Vector3(25, 1.82, -49),
      new THREE.Vector3(25, 1.82, -61),
    ];
  }

  return [
    ...common,
    new THREE.Vector3(0, 2.2, -23),
    new THREE.Vector3(0, 2.25, -28),
    new THREE.Vector3(0, 2.35, -32),
  ];
}

function targetPoints(department: Department | null) {
  const common = [
    new THREE.Vector3(0, 8.1, -12),
    new THREE.Vector3(0, 7.2, -13),
    new THREE.Vector3(0, 4.8, -14),
    new THREE.Vector3(0, 3.8, -20),
    new THREE.Vector3(0, 3.2, -30),
  ];

  if (department === 'modern') {
    return [
      ...common,
      new THREE.Vector3(-12, 2.6, -27),
      new THREE.Vector3(-21, 2.25, -31),
      new THREE.Vector3(-25, 2.1, -37),
      new THREE.Vector3(-25, 1.65, -48),
      new THREE.Vector3(-25, 1.65, -59),
      new THREE.Vector3(-25, 1.6, -70),
    ];
  }

  if (department === 'classic') {
    return [
      ...common,
      new THREE.Vector3(12, 2.6, -27),
      new THREE.Vector3(21, 2.25, -31),
      new THREE.Vector3(25, 2.1, -37),
      new THREE.Vector3(25, 1.65, -48),
      new THREE.Vector3(25, 1.65, -59),
      new THREE.Vector3(25, 1.6, -70),
    ];
  }

  return [
    ...common,
    new THREE.Vector3(0, 3.3, -33),
    new THREE.Vector3(0, 3.35, -36),
    new THREE.Vector3(0, 3.4, -39),
  ];
}

function easeJourney(value: number) {
  const t = THREE.MathUtils.clamp(value, 0, 1);
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function getSceneMask(progress: number, department: Department | null) {
  let mask = 0;
  if (progress < 0.42) mask |= EXTERIOR;
  if (progress >= 0.28 && progress < (department ? 0.72 : 1.01)) mask |= LOBBY;
  if (department && progress >= 0.55) mask |= HALL;
  return mask || LOBBY;
}

function CinematicCamera({ department }: { department: Department | null }) {
  const { camera } = useThree();
  const cameraCurve = useMemo(
    () => new THREE.CatmullRomCurve3(cameraPoints(department), false, 'catmullrom', 0.3),
    [department],
  );
  const targetCurve = useMemo(
    () => new THREE.CatmullRomCurve3(targetPoints(department), false, 'catmullrom', 0.3),
    [department],
  );
  const desiredPosition = useMemo(() => new THREE.Vector3(), []);
  const desiredTarget = useMemo(() => new THREE.Vector3(), []);
  const lookMatrix = useMemo(() => new THREE.Matrix4(), []);
  const desiredQuaternion = useMemo(() => new THREE.Quaternion(), []);

  useFrame((_, delta) => {
    const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const raw = THREE.MathUtils.clamp(cinematicScroll.progress, 0, 1);
    const progress = reducedMotion ? Math.round(raw * 6) / 6 : easeJourney(raw);

    cameraCurve.getPoint(progress, desiredPosition);
    targetCurve.getPoint(progress, desiredTarget);

    const positionDamping = reducedMotion ? 1 : 1 - Math.exp(-delta * 4.2);
    const rotationDamping = reducedMotion ? 1 : 1 - Math.exp(-delta * 5.0);

    camera.position.lerp(desiredPosition, positionDamping);
    lookMatrix.lookAt(camera.position, desiredTarget, camera.up);
    desiredQuaternion.setFromRotationMatrix(lookMatrix);
    camera.quaternion.slerp(desiredQuaternion, rotationDamping);
  });

  return null;
}

function SceneDirector({ department }: { department: Department | null }) {
  const initialMask = getSceneMask(0, department);
  const [mask, setMask] = useState(initialMask);
  const maskRef = useRef(initialMask);

  useFrame(() => {
    const nextMask = getSceneMask(THREE.MathUtils.clamp(cinematicScroll.progress, 0, 1), department);
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
          <CinematicLobby />
        </Suspense>
      )}

      {(mask & HALL) !== 0 && department && (
        <Suspense fallback={null}>
          <WingHall department={department} />
        </Suspense>
      )}
    </>
  );
}

function CinematicWorld({ department }: { department: Department | null }) {
  return (
    <>
      <color attach="background" args={['#07101b']} />
      <fog attach="fog" args={['#07101b', 54, 132]} />
      <CinematicCamera department={department} />
      <ambientLight intensity={0.16} color="#ffe8cb" />
      <hemisphereLight args={['#fff0d8', '#17110c', 0.38]} />
      <directionalLight
        position={[22, 28, 28]}
        intensity={1.15}
        color="#ffe3b0"
        castShadow
        shadow-bias={-0.0004}
        shadow-mapSize={[1024, 1024]}
      >
        <orthographicCamera attach="shadow-camera" args={[-35, 35, 35, -35, 0.5, 130]} />
      </directionalLight>
      <SceneDirector department={department} />
    </>
  );
}

export function CinematicCanvas({ department }: { department: Department | null }) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.45]}
      camera={{ position: [0, 5.9, 31], fov: 42, near: 0.1, far: 190 }}
      gl={{ antialias: true, powerPreference: 'high-performance', toneMapping: THREE.ACESFilmicToneMapping }}
      onCreated={({ gl }) => {
        gl.toneMappingExposure = 0.96;
        gl.outputColorSpace = THREE.SRGBColorSpace;
      }}
      fallback={<CinematicStaticFallback />}
    >
      <CinematicWorld department={department} />
    </Canvas>
  );
}

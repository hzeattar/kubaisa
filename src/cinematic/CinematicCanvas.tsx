import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerformanceMonitor } from '@react-three/drei';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import * as THREE from 'three';
import { cinematicScroll } from './scrollState';
import { BrandFacadeSign } from './BrandFacadeSign';
import { CinematicExterior } from './CinematicExterior';
import { FacadeDetails } from './FacadeDetails';
import { CinematicLobby } from './CinematicLobby';
import { EntranceThreshold } from './EntranceThreshold';
import { WingHall } from './WingHall';
import { CinematicStaticFallback } from './CinematicVisualBoundary';
import type { Department } from '../journey/journeyModel';

const EXTERIOR = 1;
const LOBBY = 2;
const HALL = 4;

function cameraPoints(department: Department | null) {
  const common = [
    new THREE.Vector3(0, 5.8, 37),
    new THREE.Vector3(0, 5.2, 29),
    new THREE.Vector3(0, 4.35, 20),
    new THREE.Vector3(0, 3.45, 10),
    new THREE.Vector3(0, 2.65, -1.5),
    new THREE.Vector3(0, 2.05, -8.8),
    new THREE.Vector3(0, 1.86, -11.4),
    new THREE.Vector3(0, 1.78, -14.1),
    new THREE.Vector3(0, 1.78, -18.1),
    new THREE.Vector3(0, 1.86, -22.7),
    new THREE.Vector3(0, 1.95, -26.5),
  ];

  if (department === 'modern') {
    return [
      ...common,
      new THREE.Vector3(-5.8, 2.05, -29),
      new THREE.Vector3(-13.5, 2.1, -31),
      new THREE.Vector3(-21.5, 2.0, -34),
      new THREE.Vector3(-25, 1.85, -41),
      new THREE.Vector3(-25, 1.82, -51),
      new THREE.Vector3(-25, 1.82, -61),
    ];
  }

  if (department === 'classic') {
    return [
      ...common,
      new THREE.Vector3(5.8, 2.05, -29),
      new THREE.Vector3(13.5, 2.1, -31),
      new THREE.Vector3(21.5, 2.0, -34),
      new THREE.Vector3(25, 1.85, -41),
      new THREE.Vector3(25, 1.82, -51),
      new THREE.Vector3(25, 1.82, -61),
    ];
  }

  return [...common, new THREE.Vector3(0, 2.0, -28.1)];
}

function targetPoints(department: Department | null) {
  const common = [
    new THREE.Vector3(0, 8.2, -14),
    new THREE.Vector3(0, 7.4, -14),
    new THREE.Vector3(0, 6.3, -14),
    new THREE.Vector3(0, 4.8, -14),
    new THREE.Vector3(0, 3.6, -13.5),
    new THREE.Vector3(0, 3.0, -14.5),
    new THREE.Vector3(0, 2.65, -16.2),
    new THREE.Vector3(0, 2.75, -19),
    new THREE.Vector3(0, 3.5, -24),
    new THREE.Vector3(0, 4.2, -30),
    new THREE.Vector3(0, 3.8, -31.8),
  ];

  if (department === 'modern') {
    return [
      ...common,
      new THREE.Vector3(-8, 2.8, -31.8),
      new THREE.Vector3(-18, 2.35, -34),
      new THREE.Vector3(-25, 2.1, -40),
      new THREE.Vector3(-25, 1.68, -49),
      new THREE.Vector3(-25, 1.65, -59),
      new THREE.Vector3(-25, 1.6, -70),
    ];
  }

  if (department === 'classic') {
    return [
      ...common,
      new THREE.Vector3(8, 2.8, -31.8),
      new THREE.Vector3(18, 2.35, -34),
      new THREE.Vector3(25, 2.1, -40),
      new THREE.Vector3(25, 1.68, -49),
      new THREE.Vector3(25, 1.65, -59),
      new THREE.Vector3(25, 1.6, -70),
    ];
  }

  return [...common, new THREE.Vector3(0, 3.6, -34)];
}

function easeJourney(value: number) {
  const t = THREE.MathUtils.clamp(value, 0, 1);
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function getSceneMask(progress: number, department: Department | null) {
  let mask = 0;

  // Keep first paint focused on the palace exterior. The heavier lobby only
  // mounts shortly before the camera crosses the threshold, reducing startup
  // texture work while preserving a seamless architectural transition.
  if (progress < 0.59) mask |= EXTERIOR;
  if (progress >= 0.39 && progress < (department ? 0.81 : 1.01)) mask |= LOBBY;
  if (department && progress >= 0.7) mask |= HALL;

  return mask || LOBBY;
}

function LocalPbrEnvironment() {
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

function CinematicCamera({ department }: { department: Department | null }) {
  const { camera } = useThree();
  const cameraCurve = useMemo(
    () => new THREE.CatmullRomCurve3(cameraPoints(department), false, 'catmullrom', 0.28),
    [department],
  );
  const targetCurve = useMemo(
    () => new THREE.CatmullRomCurve3(targetPoints(department), false, 'catmullrom', 0.28),
    [department],
  );
  const desiredPosition = useMemo(() => new THREE.Vector3(), []);
  const desiredTarget = useMemo(() => new THREE.Vector3(), []);
  const lookMatrix = useMemo(() => new THREE.Matrix4(), []);
  const desiredQuaternion = useMemo(() => new THREE.Quaternion(), []);

  useFrame((_, delta) => {
    const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const raw = THREE.MathUtils.clamp(cinematicScroll.progress, 0, 1);
    const progress = reducedMotion ? Math.round(raw * 7) / 7 : easeJourney(raw);

    cameraCurve.getPoint(progress, desiredPosition);
    targetCurve.getPoint(progress, desiredTarget);

    const positionDamping = reducedMotion ? 1 : 1 - Math.exp(-delta * 4.0);
    const rotationDamping = reducedMotion ? 1 : 1 - Math.exp(-delta * 4.8);

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
          <FacadeDetails />
          <BrandFacadeSign />
        </Suspense>
      )}

      {(mask & LOBBY) !== 0 && (
        <Suspense fallback={null}>
          <CinematicLobby />
          <EntranceThreshold />
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

function CinematicWorld({ department, quality }: { department: Department | null; quality: number }) {
  const shadowSize = quality >= 0.72 ? 1024 : 512;

  return (
    <>
      <color attach="background" args={['#07101b']} />
      <fog attach="fog" args={['#07101b', 58, 138]} />
      <LocalPbrEnvironment />
      <CinematicCamera department={department} />
      <ambientLight intensity={0.2} color="#ffe8cb" />
      <hemisphereLight args={['#fff0d8', '#17110c', 0.44]} />
      <directionalLight
        position={[22, 28, 28]}
        intensity={1.28}
        color="#ffe3b0"
        castShadow
        shadow-bias={-0.0004}
        shadow-mapSize-width={shadowSize}
        shadow-mapSize-height={shadowSize}
      >
        <orthographicCamera attach="shadow-camera" args={[-35, 35, 35, -35, 0.5, 130]} />
      </directionalLight>
      <SceneDirector department={department} />
    </>
  );
}

export function CinematicCanvas({ department }: { department: Department | null }) {
  const [quality, setQuality] = useState(0.82);
  const isMobile = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 820px), (pointer: coarse)').matches,
    [],
  );
  const dpr = THREE.MathUtils.lerp(isMobile ? 0.88 : 1.0, isMobile ? 1.22 : 1.55, quality);

  return (
    <Canvas
      shadows
      dpr={dpr}
      performance={{ min: 0.5 }}
      camera={{ position: [0, 5.8, 37], fov: 40, near: 0.1, far: 190 }}
      gl={{
        antialias: true,
        alpha: false,
        stencil: false,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
      }}
      onCreated={({ gl }) => {
        gl.toneMappingExposure = 1.0;
        gl.outputColorSpace = THREE.SRGBColorSpace;
        gl.shadowMap.type = THREE.PCFSoftShadowMap;
        gl.shadowMap.autoUpdate = true;
      }}
      fallback={<CinematicStaticFallback />}
    >
      <PerformanceMonitor
        flipflops={3}
        onIncline={() => setQuality((value) => Math.min(1, value + 0.08))}
        onDecline={() => setQuality((value) => Math.max(0.45, value - 0.14))}
        onFallback={() => setQuality(0.5)}
      >
        <CinematicWorld department={department} quality={quality} />
      </PerformanceMonitor>
    </Canvas>
  );
}

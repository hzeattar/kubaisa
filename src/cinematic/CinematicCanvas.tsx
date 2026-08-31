import { Suspense, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { ModernLiving } from '../scenes/living/modern/ModernLiving';
import { NeoClassicLiving } from '../scenes/living/neoclassic/NeoClassicLiving';
import { cinematicScroll } from './scrollState';
import { BrandFacadeSign } from './BrandFacadeSign';
import { CinematicExterior } from './CinematicExterior';
import { CinematicLobby } from './CinematicLobby';
import { CinematicStaticFallback } from './CinematicVisualBoundary';

type Department = 'modern' | 'classic';
const EXTERIOR = 1;
const LOBBY = 2;
const MODERN = 4;
const CLASSIC = 8;

function cameraPoints(department: Department | null) {
  const common = [
    new THREE.Vector3(0, 5.8, 30),
    new THREE.Vector3(0, 4.8, 18),
    new THREE.Vector3(0, 3.2, 8),
    new THREE.Vector3(0, 2.2, -8),
    new THREE.Vector3(0, 2.15, -18),
  ];
  if (department === 'modern') return [...common, new THREE.Vector3(-8,2.3,-19), new THREE.Vector3(-17,2.25,-21), new THREE.Vector3(-23,2.15,-23), new THREE.Vector3(-25,1.9,-26)];
  if (department === 'classic') return [...common, new THREE.Vector3(8,2.3,-19), new THREE.Vector3(17,2.25,-21), new THREE.Vector3(23,2.15,-23), new THREE.Vector3(25,1.9,-26)];
  return [...common, new THREE.Vector3(0,2.3,-22), new THREE.Vector3(0,2.5,-27), new THREE.Vector3(0,2.7,-31), new THREE.Vector3(0,2.8,-34)];
}

function targetPoints(department: Department | null) {
  const common = [
    new THREE.Vector3(0, 8, -12),
    new THREE.Vector3(0, 7, -13),
    new THREE.Vector3(0, 4.5, -14),
    new THREE.Vector3(0, 3.8, -20),
    new THREE.Vector3(0, 3.2, -31),
  ];
  if (department === 'modern') return [...common, new THREE.Vector3(-14,2.5,-24), new THREE.Vector3(-22,2.1,-25), new THREE.Vector3(-25,1.7,-27), new THREE.Vector3(-25,1.3,-30)];
  if (department === 'classic') return [...common, new THREE.Vector3(14,2.5,-24), new THREE.Vector3(22,2.1,-25), new THREE.Vector3(25,1.7,-27), new THREE.Vector3(25,1.3,-30)];
  return [...common, new THREE.Vector3(0,3.2,-33), new THREE.Vector3(0,3.4,-36), new THREE.Vector3(0,3.5,-38), new THREE.Vector3(0,3.5,-39)];
}

function getSceneMask(progress: number, department: Department | null) {
  let mask = 0;
  if (progress < 0.38) mask |= EXTERIOR;
  if (progress >= 0.28 && (department ? progress < 0.72 : true)) mask |= LOBBY;
  if (department === 'modern' && progress >= 0.58) mask |= MODERN;
  if (department === 'classic' && progress >= 0.58) mask |= CLASSIC;
  return mask || LOBBY;
}

function CinematicCamera({ department }: { department: Department | null }) {
  const { camera } = useThree();
  const cameraCurve = useMemo(() => new THREE.CatmullRomCurve3(cameraPoints(department), false, 'catmullrom', 0.32), [department]);
  const targetCurve = useMemo(() => new THREE.CatmullRomCurve3(targetPoints(department), false, 'catmullrom', 0.32), [department]);
  const desiredPosition = useMemo(() => new THREE.Vector3(), []);
  const desiredTarget = useMemo(() => new THREE.Vector3(), []);
  const lookMatrix = useMemo(() => new THREE.Matrix4(), []);
  const desiredQuaternion = useMemo(() => new THREE.Quaternion(), []);

  useFrame((_, delta) => {
    const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const raw = THREE.MathUtils.clamp(cinematicScroll.progress, 0, 1);
    const progress = reducedMotion ? Math.round(raw * 5) / 5 : raw;
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

function SceneDirector({ department }: { department: Department | null }) {
  const initialMask = getSceneMask(0, department);
  const [mask, setMask] = useState(initialMask);
  const maskRef = useRef(initialMask);
  useFrame(() => {
    const nextMask = getSceneMask(THREE.MathUtils.clamp(cinematicScroll.progress, 0, 1), department);
    if (nextMask !== maskRef.current) { maskRef.current = nextMask; setMask(nextMask); }
  });
  return <>
    {(mask & EXTERIOR) !== 0 && <Suspense fallback={null}><CinematicExterior /><BrandFacadeSign /></Suspense>}
    {(mask & LOBBY) !== 0 && <Suspense fallback={null}><CinematicLobby /></Suspense>}
    {(mask & MODERN) !== 0 && <Suspense fallback={null}><group position={[-25,0,-20]}><ModernLiving /></group></Suspense>}
    {(mask & CLASSIC) !== 0 && <Suspense fallback={null}><group position={[25,0,-20]}><NeoClassicLiving /></group></Suspense>}
  </>;
}

function CinematicWorld({ department }: { department: Department | null }) {
  return <>
    <color attach="background" args={['#07101b']} />
    <fog attach="fog" args={['#07101b',48,120]} />
    <CinematicCamera department={department} />
    <ambientLight intensity={0.18} color="#ffe8cb" />
    <hemisphereLight args={['#fff0d8','#17110c',0.42]} />
    <directionalLight position={[22,28,28]} intensity={1.2} color="#ffe3b0" castShadow shadow-bias={-0.0004} shadow-mapSize={[1024,1024]}><orthographicCamera attach="shadow-camera" args={[-35,35,35,-35,0.5,120]} /></directionalLight>
    <SceneDirector department={department} />
  </>;
}

export function CinematicCanvas({ department }: { department: Department | null }) {
  return <Canvas shadows dpr={[1,1.6]} camera={{ position:[0,5.8,30], fov:43, near:0.1, far:180 }} gl={{ antialias:true, powerPreference:'high-performance', toneMapping:THREE.ACESFilmicToneMapping }} onCreated={({gl}) => { gl.toneMappingExposure = 0.92; gl.outputColorSpace = THREE.SRGBColorSpace; }} fallback={<CinematicStaticFallback />}>
    <CinematicWorld department={department} />
  </Canvas>;
}

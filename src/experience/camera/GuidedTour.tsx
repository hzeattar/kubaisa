import React, { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useAppStore } from '../../stores/useAppStore';

const TOUR_POINTS = [
  new THREE.Vector3(0, 4.8, 24),
  new THREE.Vector3(0, 6.5, 12),
  new THREE.Vector3(0, 2.1, 2.5),
  new THREE.Vector3(0, 1.7, -8),
  new THREE.Vector3(0, 2.4, -16),
  new THREE.Vector3(-25, 1.7, -16),
  new THREE.Vector3(-25, 1.7, -24),
  new THREE.Vector3(0, 2.2, -16),
  new THREE.Vector3(25, 1.7, -16),
  new THREE.Vector3(25, 1.7, -24),
  new THREE.Vector3(0, 1.7, -12),
];

export const GuidedTour: React.FC = () => {
  const mode = useAppStore(state => state.mode);
  const setMode = useAppStore(state => state.setMode);
  const setActiveZone = useAppStore(state => state.setActiveZone);
  const { camera } = useThree();
  const progress = useRef(0);
  const curveRef = useRef<THREE.CatmullRomCurve3 | null>(null);

  useEffect(() => {
    if (mode !== 'guided-tour') return;

    progress.current = 0;
    curveRef.current = new THREE.CatmullRomCurve3(TOUR_POINTS, false, 'catmullrom', 0.35);
  }, [mode]);

  useFrame((_, delta) => {
    if (mode !== 'guided-tour' || !curveRef.current) return;

    progress.current = Math.min(1, progress.current + Math.min(delta, 0.05) * 0.022);

    const currentPos = curveRef.current.getPoint(progress.current);
    const lookAhead = Math.min(progress.current + 0.035, 1);
    const targetPos = curveRef.current.getPoint(lookAhead);

    camera.position.lerp(currentPos, 0.1);

    const lookMatrix = new THREE.Matrix4().lookAt(camera.position, targetPos, camera.up);
    const targetQuaternion = new THREE.Quaternion().setFromRotationMatrix(lookMatrix);
    camera.quaternion.slerp(targetQuaternion, 0.06);

    if (progress.current < 0.34) setActiveZone('exterior');
    else if (progress.current < 0.48) setActiveZone('lobby');
    else if (progress.current < 0.64) setActiveZone('living-modern');
    else if (progress.current < 0.78) setActiveZone('lobby');
    else if (progress.current < 0.94) setActiveZone('living-neoclassic');
    else setActiveZone('lobby');

    if (progress.current >= 1) {
      camera.position.set(0, 1.7, -12);
      setActiveZone('lobby');
      setMode('explore');
      curveRef.current = null;
    }
  });

  return null;
};

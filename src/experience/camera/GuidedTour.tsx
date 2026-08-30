import React, { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useAppStore } from '../../stores/useAppStore';

export const GuidedTour: React.FC = () => {
  const mode = useAppStore(state => state.mode);
  const setMode = useAppStore(state => state.setMode);
  const { camera } = useThree();
  const progress = useRef(0);
  const curveRef = useRef<THREE.CatmullRomCurve3 | null>(null);

  useEffect(() => {
    if (mode === 'guided-tour') {
      progress.current = 0;
      
      // Define path points
      const points = [
        new THREE.Vector3(0, 1.7, 5),     // Exterior
        new THREE.Vector3(0, 1.7, -10),   // Lobby
        new THREE.Vector3(-20, 1.7, -25), // Modern Living
        new THREE.Vector3(20, 1.7, -25),  // NeoClassic Living
        new THREE.Vector3(0, 1.7, -10),   // Back to Lobby
      ];
      
      curveRef.current = new THREE.CatmullRomCurve3(points);
      curveRef.current.closed = true;
    }
  }, [mode]);

  useFrame((state, delta) => {
    if (mode !== 'guided-tour' || !curveRef.current) return;
    
    progress.current += delta * 0.05; // Speed
    if (progress.current >= 1) {
      progress.current = 0;
      setMode('explore'); // End tour
      return;
    }

    const currentPos = curveRef.current.getPoint(progress.current);
    const nextPos = curveRef.current.getPoint(Math.min(progress.current + 0.01, 1));
    
    camera.position.copy(currentPos);
    camera.lookAt(nextPos);
  });

  return null;
};

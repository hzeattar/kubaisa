import React, { useEffect, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useAppStore } from '../../stores/useAppStore';

// Cinematic path for the guided tour
const TOUR_POINTS = [
  new THREE.Vector3(0, 1.7, 10),      // Start further back for establishing shot
  new THREE.Vector3(0, 1.7, 5),       // Move closer to facade
  new THREE.Vector3(0, 2.5, -5),      // Up steps, looking at entrance
  new THREE.Vector3(0, 1.7, -15),     // Inside Lobby, looking at center
  new THREE.Vector3(0, 3, -30),       // High view of the grand staircase
  new THREE.Vector3(-15, 1.7, -25),   // Enter Modern Living
  new THREE.Vector3(15, 1.7, -25),    // Enter Neo-Classic
  new THREE.Vector3(0, 1.7, -20),     // Back to lobby center
];

export const GuidedTour: React.FC = () => {
  const mode = useAppStore(state => state.mode);
  const setMode = useAppStore(state => state.setMode);
  const { camera } = useThree();
  const progress = useRef(0);
  const curveRef = useRef<THREE.CatmullRomCurve3 | null>(null);

  useEffect(() => {
    if (mode === 'guided-tour') {
      progress.current = 0;
      curveRef.current = new THREE.CatmullRomCurve3(TOUR_POINTS);
      curveRef.current.closed = true;
      curveRef.current.tension = 0.5; // Smooth cinematic curves
    }
  }, [mode]);

  useFrame((state, delta) => {
    if (mode !== 'guided-tour' || !curveRef.current) return;
    
    // Slower, cinematic speed
    progress.current += delta * 0.03; 
    
    if (progress.current >= 1) {
      progress.current = 0;
      setMode('explore'); // End tour
      return;
    }

    const currentPos = curveRef.current.getPoint(progress.current);
    // Look slightly ahead on the curve
    const lookAhead = Math.min(progress.current + 0.05, 1);
    const targetPos = curveRef.current.getPoint(lookAhead);
    
    // Smooth camera positioning
    camera.position.lerp(currentPos, 0.1);
    
    // Smooth lookAt
    const targetRotation = new THREE.Matrix4().lookAt(camera.position, targetPos, camera.up);
    const targetQuaternion = new THREE.Quaternion().setFromRotationMatrix(targetRotation);
    camera.quaternion.slerp(targetQuaternion, 0.05);
  });

  return null;
};

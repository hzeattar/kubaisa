import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useAppStore } from '../../stores/useAppStore';
import * as THREE from 'three';

export const IntroSequence: React.FC = () => {
  const showIntro = useAppStore(state => state.showIntro);
  const { camera } = useThree();
  const time = useRef(0);

  useFrame((state, delta) => {
    if (!showIntro) return;
    
    time.current += delta;
    
    // Shot 1: Wide establishing view
    if (time.current < 4) {
      camera.position.lerp(new THREE.Vector3(0, 5, 25), 0.05);
      camera.lookAt(0, 10, -10);
    }
    // Shot 2: Push toward Qubaisa facade/sign
    else if (time.current < 9) {
      camera.position.lerp(new THREE.Vector3(0, 10, 10), 0.02);
      camera.lookAt(0, 12, 0); // Looking at the sign
    }
    // Shot 3: Approach entrance and prepare for entry
    else {
      camera.position.lerp(new THREE.Vector3(0, 1.7, 5), 0.03);
      const targetRotation = new THREE.Matrix4().lookAt(camera.position, new THREE.Vector3(0, 1.7, -10), camera.up);
      const targetQuaternion = new THREE.Quaternion().setFromRotationMatrix(targetRotation);
      camera.quaternion.slerp(targetQuaternion, 0.03);
    }
  });

  return null;
};

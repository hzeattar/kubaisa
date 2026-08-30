import React from 'react';
import { Sky, Stars } from '@react-three/drei';
import { FirstPersonCamera } from './camera/FirstPersonCamera';
import { Exterior } from '../scenes/exterior/Exterior';
import { Lobby } from '../scenes/lobby/Lobby';
import { ModernLiving } from '../scenes/living/modern/ModernLiving';
import { NeoClassicLiving } from '../scenes/living/neoclassic/NeoClassicLiving';

export const PalaceScene: React.FC = () => {
  return (
    <>
      <FirstPersonCamera />
      
      {/* Lighting & Environment */}
      <ambientLight intensity={0.4} />
      <hemisphereLight skyColor="#ffffff" groundColor="#444444" intensity={0.6} />
      <directionalLight 
        position={[50, 50, 20]} 
        intensity={1.5} 
        castShadow
        shadow-bias={-0.0001}
        shadow-mapSize={[2048, 2048]}
      />
      
      <Sky sunPosition={[50, 50, 20]} turbidity={0.1} rayleigh={0.5} />
      <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
      
      {/* The Palace Architecture */}
      <group>
        <Exterior />
        <Lobby />
        <ModernLiving />
        <NeoClassicLiving />
      </group>
    </>
  );
};

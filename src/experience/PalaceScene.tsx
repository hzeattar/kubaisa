import React, { Suspense } from 'react';
import { Sky, Environment, BakeShadows } from '@react-three/drei';
import { FirstPersonCamera } from './camera/FirstPersonCamera';
import { Exterior } from '../scenes/exterior/Exterior';
import { Lobby } from '../scenes/lobby/Lobby';
import { ModernLiving } from '../scenes/living/modern/ModernLiving';
import { NeoClassicLiving } from '../scenes/living/neoclassic/NeoClassicLiving';
import { GuidedTour } from './camera/GuidedTour';
import { IntroSequence } from './camera/IntroSequence';
import { useAppStore } from '../stores/useAppStore';

export const PalaceScene: React.FC = () => {
  const activeZone = useAppStore(state => state.activeZone);
  
  return (
    <>
      <FirstPersonCamera />
      <IntroSequence />
      <GuidedTour />
      
      {/* Lighting & Environment - Golden Hour */}
      <ambientLight intensity={0.2} color="#ffedd6" />
      <hemisphereLight args={['#ffedd6', '#332a22', 0.4]} />
      <directionalLight 
        position={[30, 20, 30]} 
        intensity={1.2} 
        color="#ffedd6"
        castShadow
        shadow-bias={-0.0005}
        shadow-mapSize={[1024, 1024]}
      >
        <orthographicCamera attach="shadow-camera" args={[-30, 30, 30, -30, 0.5, 100]} />
      </directionalLight>
      
      <Sky sunPosition={[30, 20, 30]} turbidity={0.3} rayleigh={1.2} mieCoefficient={0.005} mieDirectionalG={0.7} />
      {/* Environment removed to prevent CDN loading issues causing black screen */}

      {/* The Palace Architecture */}
      <group>
        <Exterior />
        <Lobby />
        {/* Living modern goes to the left of the lobby */}
        <group position={[-25, 0, -20]}>
          <ModernLiving />
        </group>
        {/* Living classic goes to the right of the lobby */}
        <group position={[25, 0, -20]}>
          <NeoClassicLiving />
        </group>
      </group>
    </>
  );
};

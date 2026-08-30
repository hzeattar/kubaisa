import React from 'react';
import { Sky } from '@react-three/drei';
import { FirstPersonCamera } from './camera/FirstPersonCamera';
import { GuidedTour } from './camera/GuidedTour';
import { IntroSequence } from './camera/IntroSequence';
import { QualityController } from './performance/QualityController';
import { Exterior } from '../scenes/exterior/Exterior';
import { Lobby } from '../scenes/lobby/Lobby';
import { ModernLiving } from '../scenes/living/modern/ModernLiving';
import { NeoClassicLiving } from '../scenes/living/neoclassic/NeoClassicLiving';

export const PalaceScene: React.FC = () => {
  return (
    <>
      <QualityController />
      <FirstPersonCamera />
      <IntroSequence />
      <GuidedTour />

      <ambientLight intensity={0.18} color="#ffedd6" />
      <hemisphereLight args={['#ffedd6', '#2b241e', 0.35]} />
      <directionalLight
        position={[30, 20, 30]}
        intensity={1.15}
        color="#ffedd6"
        castShadow
        shadow-bias={-0.0005}
        shadow-mapSize={[1024, 1024]}
      >
        <orthographicCamera attach="shadow-camera" args={[-30, 30, 30, -30, 0.5, 100]} />
      </directionalLight>

      <Sky
        sunPosition={[30, 20, 30]}
        turbidity={0.35}
        rayleigh={1.3}
        mieCoefficient={0.005}
        mieDirectionalG={0.72}
      />

      <Exterior />
      <Lobby />

      <group position={[-25, 0, -20]}>
        <ModernLiving />
      </group>

      <group position={[25, 0, -20]}>
        <NeoClassicLiving />
      </group>
    </>
  );
};

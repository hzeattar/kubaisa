import React from 'react';
import { useSharedTextures } from '../../components/3d/Materials';

const LuxuryTree: React.FC<{ position: [number, number, number]; scale?: number }> = ({ position, scale = 1 }) => {
  const { wood } = useSharedTextures();
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.18, 0.28, 3, 12]} />
        <meshStandardMaterial {...wood} color="#5d4633" roughness={0.85} />
      </mesh>
      <mesh position={[0, 3.2, 0]} castShadow receiveShadow>
        <sphereGeometry args={[1.25, 16, 12]} />
        <meshStandardMaterial color="#24361f" roughness={0.95} />
      </mesh>
      <mesh position={[-0.55, 3.7, 0.25]} castShadow receiveShadow>
        <sphereGeometry args={[0.8, 14, 10]} />
        <meshStandardMaterial color="#2f4728" roughness={0.95} />
      </mesh>
      <mesh position={[0.6, 3.6, -0.1]} castShadow receiveShadow>
        <sphereGeometry args={[0.85, 14, 10]} />
        <meshStandardMaterial color="#2a4024" roughness={0.95} />
      </mesh>
    </group>
  );
};

const Bollard: React.FC<{ position: [number, number, number] }> = ({ position }) => (
  <group position={position}>
    <mesh position={[0, 0.35, 0]} castShadow>
      <cylinderGeometry args={[0.07, 0.09, 0.7, 12]} />
      <meshStandardMaterial color="#17191d" roughness={0.35} metalness={0.75} />
    </mesh>
    <mesh position={[0, 0.7, 0]}>
      <sphereGeometry args={[0.11, 12, 8]} />
      <meshStandardMaterial color="#ffe3ad" emissive="#ffc66a" emissiveIntensity={1.2} roughness={0.3} />
    </mesh>
    <pointLight position={[0, 0.75, 0]} intensity={0.16} distance={3} color="#ffdca0" />
  </group>
);

const ReflectingFountain = () => {
  const { marble, metal } = useSharedTextures();
  return (
    <group position={[0, 0, 7]}>
      <mesh position={[0, 0.15, 0]} receiveShadow>
        <cylinderGeometry args={[4.2, 4.4, 0.3, 64]} />
        <meshStandardMaterial {...marble} color="#d9d2c6" roughness={0.28} />
      </mesh>
      <mesh position={[0, 0.32, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[3.9, 64]} />
        <meshPhysicalMaterial color="#6f8f9b" roughness={0.12} metalness={0.1} transmission={0.15} transparent opacity={0.82} />
      </mesh>
      <mesh position={[0, 1.05, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.34, 1.5, 20]} />
        <meshStandardMaterial {...metal} color="#b89950" roughness={0.35} metalness={0.9} />
      </mesh>
      <mesh position={[0, 1.78, 0]} castShadow>
        <sphereGeometry args={[0.24, 18, 12]} />
        <meshStandardMaterial {...metal} color="#d4b76d" roughness={0.25} metalness={0.95} />
      </mesh>
    </group>
  );
};

export const ArrivalLandscape: React.FC = () => {
  const trees: [number, number, number][] = [
    [-20, 0.8, -5],
    [-16.5, 0.8, -5.5],
    [20, 0.8, -5],
    [16.5, 0.8, -5.5],
  ];

  const bollards = [-11, -8, -5, 5, 8, 11];

  return (
    <group>
      {trees.map((position, index) => (
        <LuxuryTree key={`tree-${index}`} position={position} scale={index % 2 === 0 ? 0.95 : 0.78} />
      ))}
      {bollards.map(x => (
        <Bollard key={`bollard-${x}`} position={[x, 0, -2.5]} />
      ))}
      <ReflectingFountain />
    </group>
  );
};

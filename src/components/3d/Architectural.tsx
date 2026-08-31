import React from 'react';
import {
  useMetalTexture,
  usePlasterTexture,
} from './Materials';

export const Pillar: React.FC<{ position: [number, number, number]; height?: number; radius?: number }> = ({
  position,
  height = 4,
  radius = 0.3,
}) => {
  const plaster = usePlasterTexture();
  return (
    <group position={position}>
      <mesh position={[0, -height / 2 + 0.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[radius * 2.8, 0.4, radius * 2.8]} />
        <meshStandardMaterial {...plaster} color="#e5e0d8" />
      </mesh>
      <mesh position={[0, -height / 2 + 0.5, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[radius * 1.2, radius * 1.4, 0.2, 32]} />
        <meshStandardMaterial {...plaster} color="#e5e0d8" />
      </mesh>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[radius, radius, height - 1.2, 32]} />
        <meshStandardMaterial {...plaster} color="#e5e0d8" />
      </mesh>
      <mesh position={[0, height / 2 - 0.5, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[radius * 1.4, radius * 1.2, 0.2, 32]} />
        <meshStandardMaterial {...plaster} color="#e5e0d8" />
      </mesh>
      <mesh position={[0, height / 2 - 0.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[radius * 2.8, 0.4, radius * 2.8]} />
        <meshStandardMaterial {...plaster} color="#e5e0d8" />
      </mesh>
    </group>
  );
};

export const Window: React.FC<{
  position: [number, number, number];
  width?: number;
  height?: number;
  arched?: boolean;
}> = ({ position, width = 2, height = 4 }) => {
  const metal = useMetalTexture();
  const plaster = usePlasterTexture();

  return (
    <group position={position}>
      <mesh position={[0, 0, -0.1]} castShadow receiveShadow>
        <boxGeometry args={[width + 0.6, height + 0.6, 0.4]} />
        <meshStandardMaterial {...plaster} color="#dcd7cf" />
      </mesh>
      <mesh position={[0, 0, 0.05]} castShadow receiveShadow>
        <boxGeometry args={[width + 0.15, height + 0.15, 0.1]} />
        <meshStandardMaterial {...metal} color="#222" roughness={0.6} metalness={0.8} />
      </mesh>
      <mesh position={[0, 0, 0.08]} castShadow receiveShadow>
        <boxGeometry args={[0.05, height, 0.12]} />
        <meshStandardMaterial color="#222" roughness={0.6} metalness={0.8} />
      </mesh>
      <mesh position={[0, height / 4, 0.08]} castShadow receiveShadow>
        <boxGeometry args={[width, 0.05, 0.12]} />
        <meshStandardMaterial color="#222" roughness={0.6} metalness={0.8} />
      </mesh>
      <mesh position={[0, -height / 4, 0.08]} castShadow receiveShadow>
        <boxGeometry args={[width, 0.05, 0.12]} />
        <meshStandardMaterial color="#222" roughness={0.6} metalness={0.8} />
      </mesh>
      <mesh position={[0, 0, 0.1]}>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial color="#02050a" roughness={0.1} metalness={0.9} envMapIntensity={2} transparent opacity={0.85} />
      </mesh>
    </group>
  );
};

import React from 'react';
import * as THREE from 'three';
import { useSharedTextures } from './Materials';

export const Pillar: React.FC<{position: [number, number, number], height?: number, radius?: number}> = ({position, height = 4, radius = 0.3}) => {
  const { plaster } = useSharedTextures();
  return (
    <group position={position}>
      {/* Base */}
      <mesh position={[0, -height/2 + 0.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[radius * 2.8, 0.4, radius * 2.8]} />
        <meshStandardMaterial {...plaster} color="#e5e0d8" />
      </mesh>
      {/* Base molding */}
      <mesh position={[0, -height/2 + 0.5, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[radius * 1.2, radius * 1.4, 0.2, 32]} />
        <meshStandardMaterial {...plaster} color="#e5e0d8" />
      </mesh>
      {/* Column */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[radius, radius, height - 1.2, 32]} />
        <meshStandardMaterial {...plaster} color="#e5e0d8" />
      </mesh>
      {/* Capital molding */}
      <mesh position={[0, height/2 - 0.5, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[radius * 1.4, radius * 1.2, 0.2, 32]} />
        <meshStandardMaterial {...plaster} color="#e5e0d8" />
      </mesh>
      {/* Capital */}
      <mesh position={[0, height/2 - 0.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[radius * 2.8, 0.4, radius * 2.8]} />
        <meshStandardMaterial {...plaster} color="#e5e0d8" />
      </mesh>
    </group>
  )
}

export const Window: React.FC<{position: [number, number, number], width?: number, height?: number, arched?: boolean}> = ({position, width = 2, height = 4, arched = false}) => {
  const { metal, plaster } = useSharedTextures();
  
  return (
    <group position={position}>
      {/* Recessed Frame/Wall cutout representation */}
      <mesh position={[0, 0, -0.1]} castShadow receiveShadow>
        <boxGeometry args={[width + 0.6, height + 0.6, 0.4]} />
        <meshStandardMaterial {...plaster} color="#dcd7cf" />
      </mesh>

      {/* Metal Frame */}
      <mesh position={[0, 0, 0.05]} castShadow receiveShadow>
        <boxGeometry args={[width + 0.15, height + 0.15, 0.1]} />
        <meshStandardMaterial {...metal} color="#222" roughness={0.6} metalness={0.8} />
      </mesh>
      
      {/* Mullions (Grids) */}
      <mesh position={[0, 0, 0.08]} castShadow receiveShadow>
        <boxGeometry args={[0.05, height, 0.12]} />
        <meshStandardMaterial color="#222" roughness={0.6} metalness={0.8} />
      </mesh>
      <mesh position={[0, height/4, 0.08]} castShadow receiveShadow>
        <boxGeometry args={[width, 0.05, 0.12]} />
        <meshStandardMaterial color="#222" roughness={0.6} metalness={0.8} />
      </mesh>
      <mesh position={[0, -height/4, 0.08]} castShadow receiveShadow>
        <boxGeometry args={[width, 0.05, 0.12]} />
        <meshStandardMaterial color="#222" roughness={0.6} metalness={0.8} />
      </mesh>

      {/* Glass */}
      <mesh position={[0, 0, 0.1]}>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial color="#02050a" roughness={0.1} metalness={0.9} envMapIntensity={2} transparent opacity={0.85} />
      </mesh>
    </group>
  )
}

import React from 'react';
import * as THREE from 'three';

export const Pillar: React.FC<{position: [number, number, number], height?: number, radius?: number, color?: string}> = ({position, height = 4, radius = 0.3, color = "#e5e0d8"}) => {
  return (
    <group position={position}>
      {/* Base */}
      <mesh position={[0, -height/2 + 0.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[radius * 3, 0.4, radius * 3]} />
        <meshStandardMaterial color={color} roughness={0.7} />
      </mesh>
      {/* Column */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[radius, radius, height - 0.8, 16]} />
        <meshStandardMaterial color={color} roughness={0.7} />
      </mesh>
      {/* Capital */}
      <mesh position={[0, height/2 - 0.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[radius * 3, 0.4, radius * 3]} />
        <meshStandardMaterial color={color} roughness={0.7} />
      </mesh>
    </group>
  )
}

export const Window: React.FC<{position: [number, number, number], width?: number, height?: number}> = ({position, width = 2, height = 4}) => {
  return (
    <group position={position}>
      {/* Frame */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[width + 0.4, height + 0.4, 0.2]} />
        <meshStandardMaterial color="#111" roughness={0.8} />
      </mesh>
      {/* Glass */}
      <mesh position={[0, 0, 0.05]}>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial color="#050a15" roughness={0.1} metalness={0.9} envMapIntensity={2} />
      </mesh>
    </group>
  )
}

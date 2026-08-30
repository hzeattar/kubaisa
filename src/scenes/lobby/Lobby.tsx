import React from 'react';
import { Pillar } from '../../components/3d/Architectural';
import { Hotspot } from '../../components/3d/Hotspot';

export const Lobby: React.FC = () => {
  return (
    <group position={[0, 0, -20]}>
      {/* Grand Lobby Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[28, 28]} />
        <meshStandardMaterial color="#fdfbf7" roughness={0.1} metalness={0.1} /> {/* Premium Marble */}
      </mesh>

      {/* Ceiling */}
      <mesh position={[0, 8, 0]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[28, 28]} />
        <meshStandardMaterial color="#ffffff" roughness={0.9} />
      </mesh>

      {/* Back Wall (Elevator / Staircase area) */}
      <mesh position={[0, 4, -13.5]} receiveShadow>
        <boxGeometry args={[28, 8, 1]} />
        <meshStandardMaterial color="#e5e0d8" roughness={0.8} /> 
      </mesh>
      
      {/* Statement Wall Panel */}
      <mesh position={[0, 4, -12.9]} receiveShadow>
        <boxGeometry args={[10, 8, 0.2]} />
        <meshStandardMaterial color="#050a15" roughness={0.6} /> 
      </mesh>

      {/* Elevator Doors */}
      <mesh position={[0, 2, -12.75]} castShadow receiveShadow>
        <boxGeometry args={[3, 4, 0.1]} />
        <meshStandardMaterial color="#d4af37" roughness={0.3} metalness={0.9} />
      </mesh>

      {/* Grand Staircase (Visual) */}
      <group position={[-8, 0, -10]}>
        {[0,1,2,3,4,5,6,7,8,9,10].map(i => (
          <mesh key={i} position={[0, i * 0.3 + 0.15, i * 0.4]} receiveShadow castShadow>
            <boxGeometry args={[4, 0.3, 0.4]} />
            <meshStandardMaterial color="#fdfbf7" roughness={0.2} metalness={0.1} />
          </mesh>
        ))}
      </group>
      <group position={[8, 0, -10]}>
        {[0,1,2,3,4,5,6,7,8,9,10].map(i => (
          <mesh key={i} position={[0, i * 0.3 + 0.15, i * 0.4]} receiveShadow castShadow>
            <boxGeometry args={[4, 0.3, 0.4]} />
            <meshStandardMaterial color="#fdfbf7" roughness={0.2} metalness={0.1} />
          </mesh>
        ))}
      </group>

      {/* Left Wall (Separating from Modern) */}
      <mesh position={[-13.5, 4, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[26, 8, 1]} />
        <meshStandardMaterial color="#e5e0d8" roughness={0.8} /> 
      </mesh>
      
      {/* Right Wall (Separating from NeoClassic) */}
      <mesh position={[13.5, 4, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[26, 8, 1]} />
        <meshStandardMaterial color="#e5e0d8" roughness={0.8} /> 
      </mesh>

      {/* Front Wall (Entrance with wide opening) */}
      <mesh position={[-9.5, 4, 13.5]} receiveShadow>
        <boxGeometry args={[9, 8, 1]} />
        <meshStandardMaterial color="#e5e0d8" roughness={0.8} /> 
      </mesh>
      <mesh position={[9.5, 4, 13.5]} receiveShadow>
        <boxGeometry args={[9, 8, 1]} />
        <meshStandardMaterial color="#e5e0d8" roughness={0.8} /> 
      </mesh>
      <mesh position={[0, 6.5, 13.5]} receiveShadow>
        <boxGeometry args={[10, 3, 1]} />
        <meshStandardMaterial color="#e5e0d8" roughness={0.8} /> 
      </mesh>

      {/* Lobby Pillars */}
      <Pillar position={[-5, 4, 13]} height={8} radius={0.4} />
      <Pillar position={[5, 4, 13]} height={8} radius={0.4} />
      <Pillar position={[-5, 4, -8]} height={8} radius={0.4} />
      <Pillar position={[5, 4, -8]} height={8} radius={0.4} />

      {/* Reception Desk */}
      <mesh position={[0, 0.6, -8]} castShadow receiveShadow>
        <boxGeometry args={[5, 1.2, 1.5]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.6} />
      </mesh>
      <mesh position={[0, 1.25, -7.8]} castShadow receiveShadow>
        <boxGeometry args={[5.2, 0.1, 0.6]} />
        <meshStandardMaterial color="#d4af37" roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Grand Chandelier */}
      <group position={[0, 6, 0]}>
        <mesh>
          <cylinderGeometry args={[2, 0.1, 2, 16]} />
          <meshStandardMaterial color="#d4af37" roughness={0.1} metalness={1} wireframe />
        </mesh>
        <mesh position={[0, -1, 0]}>
          <cylinderGeometry args={[1.5, 0.1, 1.5, 16]} />
          <meshStandardMaterial color="#d4af37" roughness={0.1} metalness={1} wireframe />
        </mesh>
        <mesh position={[0, -2, 0]}>
          <sphereGeometry args={[0.8, 16, 16]} />
          <meshStandardMaterial color="#f3e5ab" emissive="#f3e5ab" emissiveIntensity={2} />
          <pointLight intensity={2.5} color="#f3e5ab" distance={20} />
        </mesh>
      </group>
    </group>
  );
};

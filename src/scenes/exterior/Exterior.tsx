import React from 'react';
import { Text } from '@react-three/drei';
import { Pillar, Window } from '../../components/3d/Architectural';

export const Exterior: React.FC = () => {
  return (
    <group>
      {/* Ground / Driveway */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[120, 120]} />
        <meshStandardMaterial color="#222" roughness={0.9} />
      </mesh>

      {/* Arrival Landscaping - Paving */}
      <mesh position={[0, 0.01, -5]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[40, 20]} />
        <meshStandardMaterial color="#333" roughness={0.8} />
      </mesh>

      {/* Planters */}
      <mesh position={[-15, 0.5, -5]} castShadow receiveShadow>
        <boxGeometry args={[4, 1, 4]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>
      <mesh position={[15, 0.5, -5]} castShadow receiveShadow>
        <boxGeometry args={[4, 1, 4]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>
      
      {/* Central Steps */}
      <group position={[0, 0, -10]}>
        {[0, 1, 2].map(i => (
          <mesh key={i} position={[0, i * 0.2 + 0.1, -i * 0.5]} receiveShadow castShadow>
            <boxGeometry args={[12, 0.2, 0.5]} />
            <meshStandardMaterial color="#e5e0d8" roughness={0.6} />
          </mesh>
        ))}
      </group>

      {/* Main Building Facade */}
      <group position={[0, 0, -12]}>
        {/* Base Floor */}
        <mesh position={[0, 3, -1]} castShadow receiveShadow>
          <boxGeometry args={[40, 6, 2]} />
          <meshStandardMaterial color="#dcd7cf" roughness={0.7} />
        </mesh>
        
        {/* Second Floor */}
        <mesh position={[0, 9, -1]} castShadow receiveShadow>
          <boxGeometry args={[40, 6, 2]} />
          <meshStandardMaterial color="#e5e0d8" roughness={0.6} />
        </mesh>
        
        {/* Cornice */}
        <mesh position={[0, 12.2, -0.8]} castShadow receiveShadow>
          <boxGeometry args={[41, 0.4, 2.4]} />
          <meshStandardMaterial color="#cfc9c0" roughness={0.8} />
        </mesh>
        <mesh position={[0, 6.2, -0.8]} castShadow receiveShadow>
          <boxGeometry args={[40.5, 0.2, 2.2]} />
          <meshStandardMaterial color="#cfc9c0" roughness={0.8} />
        </mesh>

        {/* Windows - Ground Floor */}
        {[-15, -10, 10, 15].map(x => (
          <Window key={`g-${x}`} position={[x, 3, 0.1]} />
        ))}

        {/* Windows - Second Floor */}
        {[-15, -10, -5, 0, 5, 10, 15].map(x => (
          <Window key={`s-${x}`} position={[x, 9, 0.1]} />
        ))}

        {/* Grand Entrance Pillars */}
        <Pillar position={[-4, 3, 0]} height={6} radius={0.4} />
        <Pillar position={[4, 3, 0]} height={6} radius={0.4} />
        <Pillar position={[-4, 9, 0]} height={6} radius={0.35} />
        <Pillar position={[4, 9, 0]} height={6} radius={0.35} />

        {/* Entrance Canopy / Architrave */}
        <mesh position={[0, 6, 1]} castShadow receiveShadow>
          <boxGeometry args={[10, 0.6, 3]} />
          <meshStandardMaterial color="#111" roughness={0.5} metalness={0.8} />
        </mesh>

        {/* Qubaisa Signage Premium Panel */}
        <group position={[0, 11, 0.1]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[10, 2.5, 0.2]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.8} metalness={0.5} />
          </mesh>
          <mesh position={[0, 0, 0.1]} castShadow receiveShadow>
            <boxGeometry args={[9.8, 2.3, 0.1]} />
            <meshStandardMaterial color="#050a15" roughness={0.4} metalness={0.6} />
          </mesh>
          <Text
            position={[0, 0.3, 0.2]}
            fontSize={1.2}
            color="#d4af37"
            font="https://fonts.gstatic.com/s/cairo/v28/SLXVc1nY6Hkvalvtsw.woff"
            anchorX="center"
            anchorY="middle"
          >
            قبيصة للأثاث
            <meshStandardMaterial color="#d4af37" emissive="#d4af37" emissiveIntensity={0.2} roughness={0.2} metalness={1} />
          </Text>
          <Text
            position={[0, -0.6, 0.2]}
            fontSize={0.4}
            color="#d4af37"
            font="https://fonts.gstatic.com/s/playfairdisplay/v30/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvXDXbtM.woff"
            anchorX="center"
            anchorY="middle"
          >
            QUBAISA FURNITURE
            <meshStandardMaterial color="#d4af37" roughness={0.2} metalness={1} />
          </Text>
        </group>
        
        {/* Main Doors */}
        <mesh position={[0, 2, 0]} castShadow receiveShadow>
          <boxGeometry args={[4, 4, 0.1]} />
          <meshStandardMaterial color="#050a15" roughness={0.2} metalness={0.8} />
        </mesh>
        <mesh position={[0, 2, 0.06]}>
          <planeGeometry args={[0.05, 4]} />
          <meshStandardMaterial color="#d4af37" roughness={0.2} metalness={1} />
        </mesh>
      </group>
    </group>
  );
};

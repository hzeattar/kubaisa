import React from 'react';
import { Text, Environment } from '@react-three/drei';
import { Pillar, Window } from '../../components/3d/Architectural';
import { useSharedTextures } from '../../components/3d/Materials';

export const Exterior: React.FC = () => {
  const { plaster, marble, metal } = useSharedTextures();

  return (
    <group>
      {/* Environment HDRI for real lighting and reflections */}
      <Environment files="/hdri/venice_sunset_1k.hdr" background={true} blur={0.05} />

      {/* Ground / Driveway */}
      <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[120, 120]} />
        <meshStandardMaterial color="#111" roughness={0.9} />
      </mesh>

      {/* Arrival Landscaping - Paving */}
      <mesh position={[0, 0, -5]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[50, 30]} />
        <meshStandardMaterial {...marble} color="#444" roughness={0.8} />
      </mesh>

      {/* Greenery / Planters */}
      <group position={[-18, 0, -6]}>
        <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
          <boxGeometry args={[8, 0.8, 6]} />
          <meshStandardMaterial {...marble} color="#222" />
        </mesh>
        <mesh position={[0, 1, 0]} castShadow receiveShadow>
          <boxGeometry args={[7.5, 0.4, 5.5]} />
          <meshStandardMaterial color="#0a1205" roughness={0.9} />
        </mesh>
      </group>
      
      <group position={[18, 0, -6]}>
        <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
          <boxGeometry args={[8, 0.8, 6]} />
          <meshStandardMaterial {...marble} color="#222" />
        </mesh>
        <mesh position={[0, 1, 0]} castShadow receiveShadow>
          <boxGeometry args={[7.5, 0.4, 5.5]} />
          <meshStandardMaterial color="#0a1205" roughness={0.9} />
        </mesh>
      </group>

      {/* Central Steps to Grand Entrance */}
      <group position={[0, 0, -10]}>
        {[0, 1, 2, 3, 4].map(i => (
          <mesh key={i} position={[0, i * 0.15 + 0.075, -i * 0.6]} receiveShadow castShadow>
            <boxGeometry args={[14, 0.15, 0.6]} />
            <meshStandardMaterial {...marble} color="#d4ccb8" roughness={0.4} />
          </mesh>
        ))}
      </group>

      {/* Main Building Facade - French Neo-Classical */}
      <group position={[0, 0.75, -13.5]}>
        
        {/* === CENTRAL MASS === */}
        <group position={[0, 0, 1]}>
          <mesh position={[0, 5, -0.5]} castShadow receiveShadow>
            <boxGeometry args={[16, 10, 2]} />
            <meshStandardMaterial {...plaster} color="#e6dfd3" />
          </mesh>
          {/* Central Pediment / Upper level */}
          <mesh position={[0, 12, -0.5]} castShadow receiveShadow>
            <boxGeometry args={[16, 4, 2]} />
            <meshStandardMaterial {...plaster} color="#e0d9cc" />
          </mesh>
          {/* Entrance Portal Cutout effect (using dark inner box) */}
          <mesh position={[0, 3, 0.1]} castShadow receiveShadow>
            <boxGeometry args={[8, 6, 1]} />
            <meshStandardMaterial color="#050a15" />
          </mesh>
          {/* Main Glass Doors */}
          <mesh position={[-2, 3, 0.5]} castShadow receiveShadow>
            <boxGeometry args={[4, 6, 0.1]} />
            <meshStandardMaterial color="#02050a" roughness={0.1} metalness={0.9} envMapIntensity={2} transparent opacity={0.8} />
          </mesh>
          <mesh position={[2, 3, 0.5]} castShadow receiveShadow>
            <boxGeometry args={[4, 6, 0.1]} />
            <meshStandardMaterial color="#02050a" roughness={0.1} metalness={0.9} envMapIntensity={2} transparent opacity={0.8} />
          </mesh>
          {/* Door Handles */}
          <mesh position={[-0.2, 3, 0.6]} castShadow receiveShadow>
            <cylinderGeometry args={[0.04, 0.04, 1.2]} />
            <meshStandardMaterial {...metal} color="#d4af37" roughness={0.3} metalness={1} />
          </mesh>
          <mesh position={[0.2, 3, 0.6]} castShadow receiveShadow>
            <cylinderGeometry args={[0.04, 0.04, 1.2]} />
            <meshStandardMaterial {...metal} color="#d4af37" roughness={0.3} metalness={1} />
          </mesh>

          {/* Grand Entrance Pillars */}
          <Pillar position={[-5, 5, 1]} height={10} radius={0.4} />
          <Pillar position={[5, 5, 1]} height={10} radius={0.4} />
          
          {/* Entrance Canopy / Architrave */}
          <mesh position={[0, 10.4, 1]} castShadow receiveShadow>
            <boxGeometry args={[12, 0.8, 1.5]} />
            <meshStandardMaterial {...plaster} color="#f0ede6" />
          </mesh>
          
          {/* Qubaisa Premium Signage Panel */}
          <group position={[0, 12, 0.6]}>
            {/* Dark Navy Cladding Backing */}
            <mesh castShadow receiveShadow>
              <boxGeometry args={[12, 2.8, 0.3]} />
              <meshStandardMaterial {...marble} color="#050c1c" roughness={0.2} metalness={0.4} />
            </mesh>
            <mesh position={[0, 0, 0.16]} castShadow receiveShadow>
              <boxGeometry args={[11.6, 2.4, 0.1]} />
              <meshStandardMaterial color="#02050b" roughness={0.3} metalness={0.6} />
            </mesh>
            
            {/* Champagne Gold Arabic Text */}
            <Text
              position={[0, 0.4, 0.25]}
              fontSize={1.4}
              font="https://fonts.gstatic.com/s/cairo/v31/SLXgc1nY6HkvangtZmpQdkhzfH5lkSs2SgRjCAGMQ1z0hAc5W1Q.ttf"
              anchorX="center"
              anchorY="middle"
            >
              قبيصة للأثاث
              <meshStandardMaterial color="#e6c27a" roughness={0.2} metalness={1} emissive="#e6c27a" emissiveIntensity={0.15} />
            </Text>
            
            {/* Champagne Gold English Text */}
            <Text
              position={[0, -0.6, 0.25]}
              fontSize={0.45}
              letterSpacing={0.1}
              font="https://fonts.gstatic.com/s/playfairdisplay/v40/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKeiukDQ.ttf"
              anchorX="center"
              anchorY="middle"
            >
              QUBAISA FURNITURE
              <meshStandardMaterial color="#e6c27a" roughness={0.2} metalness={1} />
            </Text>
          </group>
        </group>

        {/* === WINGS (Left and Right) === */}
        {/* Base Floor (Rusticated dark stone effect) */}
        <mesh position={[0, 3, 0]} castShadow receiveShadow>
          <boxGeometry args={[50, 6, 2]} />
          <meshStandardMaterial {...plaster} color="#ccc5b8" />
        </mesh>
        
        {/* Second & Third Floor */}
        <mesh position={[0, 10, 0]} castShadow receiveShadow>
          <boxGeometry args={[50, 8, 2]} />
          <meshStandardMaterial {...plaster} color="#e6dfd3" />
        </mesh>
        
        {/* Parapet / Roofline */}
        <mesh position={[0, 14.4, 0.2]} castShadow receiveShadow>
          <boxGeometry args={[51, 1, 2.4]} />
          <meshStandardMaterial {...plaster} color="#d6cfc2" />
        </mesh>
        
        <mesh position={[0, 6.2, 0.2]} castShadow receiveShadow>
          <boxGeometry args={[50.5, 0.4, 2.4]} />
          <meshStandardMaterial {...plaster} color="#d6cfc2" />
        </mesh>

        {/* Windows - Ground Floor */}
        {[-20, -14, 14, 20].map(x => (
          <Window key={`g-${x}`} position={[x, 3, 1.1]} width={2.5} height={4.5} />
        ))}
        {/* Windows - Second Floor */}
        {[-20, -14, -8, 8, 14, 20].map(x => (
          <Window key={`s-${x}`} position={[x, 10, 1.1]} width={2.5} height={5} arched />
        ))}
        
        {/* Wing Pilasters */}
        {[-23, -17, -11, 11, 17, 23].map(x => (
          <mesh key={`pilaster-${x}`} position={[x, 10, 1.2]} castShadow receiveShadow>
            <boxGeometry args={[1.2, 8, 0.3]} />
            <meshStandardMaterial {...plaster} color="#f0ede6" />
          </mesh>
        ))}

      </group>
    </group>
  );
};

import React from 'react';
import { Text } from '@react-three/drei';

export const Exterior: React.FC = () => {
  return (
    <group>
      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
      </mesh>

      {/* Main Building Facade Placeholder */}
      <mesh position={[0, 5, -15]} castShadow receiveShadow>
        <boxGeometry args={[30, 10, 2]} />
        <meshStandardMaterial color="#e5e0d8" roughness={0.4} /> {/* Limestone / Travertine feel */}
      </mesh>

      {/* Entrance Canopy */}
      <mesh position={[0, 4, -13]} castShadow receiveShadow>
        <boxGeometry args={[8, 0.5, 4]} />
        <meshStandardMaterial color="#111" roughness={0.5} metalness={0.8} />
      </mesh>
      
      {/* Pillars */}
      <mesh position={[-3.5, 2, -13]} castShadow receiveShadow>
        <cylinderGeometry args={[0.2, 0.2, 4]} />
        <meshStandardMaterial color="#d4af37" roughness={0.2} metalness={0.9} />
      </mesh>
      <mesh position={[3.5, 2, -13]} castShadow receiveShadow>
        <cylinderGeometry args={[0.2, 0.2, 4]} />
        <meshStandardMaterial color="#d4af37" roughness={0.2} metalness={0.9} />
      </mesh>

      {/* Qubaisa Signage */}
      <group position={[0, 7, -13.9]}>
        <Text
          fontSize={1.5}
          color="#d4af37"
          font="https://fonts.gstatic.com/s/cairo/v28/SLXVc1nY6Hkvalvtsw.woff" // Cairo font for Arabic
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#000"
        >
          قبيصة
          <meshStandardMaterial color="#d4af37" emissive="#d4af37" emissiveIntensity={0.5} roughness={0.2} metalness={1} />
        </Text>
        <Text
          position={[0, -1, 0]}
          fontSize={0.5}
          color="#d4af37"
          font="https://fonts.gstatic.com/s/playfairdisplay/v30/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvXDXbtM.woff" // Playfair
          anchorX="center"
          anchorY="middle"
        >
          QUBAISA FURNITURE
          <meshStandardMaterial color="#d4af37" roughness={0.2} metalness={1} />
        </Text>
      </group>
    </group>
  );
};

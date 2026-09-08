import React from 'react';
import { Float, MeshReflectorMaterial, MeshTransmissionMaterial, Text, ContactShadows } from '@react-three/drei';

function LuxuryRoomShell() {
  return (
    <group>
      {/* Glossy Reflector Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[30, 40]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={40}
          roughness={0.1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#050505"
          metalness={0.5}
        />
      </mesh>

      <ContactShadows frames={1} resolution={256} position={[0, 0, 0]} scale={40} blur={2.5} far={10} opacity={0.4} />

      {/* Back Wall */}
      <mesh position={[0, 6, -15]} receiveShadow>
        <boxGeometry args={[30, 12, 1]} />
        <meshStandardMaterial color="#080808" roughness={0.2} metalness={0.8} />
      </mesh>
      
      {/* Side Walls */}
      <mesh position={[-15, 6, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[40, 12, 1]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.3} metalness={0.6} />
      </mesh>
      <mesh position={[15, 6, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[40, 12, 1]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.3} metalness={0.6} />
      </mesh>
    </group>
  );
}

function ProductPedestal({ position, label }: { position: [number, number, number], label: string }) {
  return (
    <group position={position}>
      {/* Base */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[2.5, 2.5, 0.8, 64]} />
        <meshStandardMaterial color="#111" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Glowing Ring */}
      <mesh position={[0, 0.85, 0]}>
        <cylinderGeometry args={[2.4, 2.4, 0.05, 64]} />
        <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={0.5} />
      </mesh>

      {/* Abstract Glass Placeholder */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[0, 3, 0]}>
          <boxGeometry args={[3, 2, 1.5]} />
          <MeshTransmissionMaterial 
            backside
            samples={4}
            thickness={2}
            chromaticAberration={0.03}
            color="#d5e4ec" 
          />
        </mesh>
      </Float>

      {/* Label */}
      <Text
        position={[0, 5, 0]}
        fontSize={0.4}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.2}
      >
        {label}
      </Text>

      {/* Spotlight */}
      <pointLight position={[0, 6, 0]} intensity={1.5} color="#ffffff" distance={15} />
    </group>
  );
}

export const ModernLiving: React.FC = () => {
  return (
    <group>
      <LuxuryRoomShell />
      
      {/* Centerpiece Pedestal */}
      <ProductPedestal position={[0, 0, -2]} label="MODERN LIVING COLLECTION" />
      
      {/* Side Pedestals */}
      <ProductPedestal position={[-7, 0, 2]} label="LOUNGE CHAIR" />
      <ProductPedestal position={[7, 0, 2]} label="COFFEE TABLE" />
    </group>
  );
};

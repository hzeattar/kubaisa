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
          roughness={0.15}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#050505"
          metalness={0.5}
        />
      </mesh>

      <ContactShadows position={[0, 0, 0]} scale={40} blur={3} far={10} opacity={0.5} color="#111111" />

      {/* Back Wall */}
      <mesh position={[0, 6, -15]} receiveShadow>
        <boxGeometry args={[30, 12, 1]} />
        <meshStandardMaterial color="#080808" roughness={0.3} metalness={0.5} />
      </mesh>
      
      {/* Side Walls */}
      <mesh position={[-15, 6, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[40, 12, 1]} />
        <meshStandardMaterial color="#080808" roughness={0.4} metalness={0.4} />
      </mesh>
      <mesh position={[15, 6, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[40, 12, 1]} />
        <meshStandardMaterial color="#080808" roughness={0.4} metalness={0.4} />
      </mesh>
    </group>
  );
}

function ProductPedestal({ position, label }: { position: [number, number, number], label: string }) {
  return (
    <group position={position}>
      {/* Base */}
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[2.5, 2.6, 0.6, 64]} />
        <meshStandardMaterial color="#111111" metalness={0.3} roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.65, 0]}>
        <cylinderGeometry args={[2.4, 2.5, 0.1, 64]} />
        <meshStandardMaterial color="#ffffff" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Abstract Glass Placeholder */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh position={[0, 3, 0]}>
          <cylinderGeometry args={[1.5, 1.5, 3, 32]} />
          <MeshTransmissionMaterial 
            backside
            samples={4}
            thickness={3}
            chromaticAberration={0.05}
            color="#d5e4ec" 
          />
        </mesh>
      </Float>

      {/* Label */}
      <Text
        position={[0, 5.5, 0]}
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

export const KidsRoom: React.FC = () => {
  return (
    <group>
      <LuxuryRoomShell />
      <ProductPedestal position={[0, 0, -2]} label="KIDS COLLECTION" />
      <ProductPedestal position={[-7, 0, 2]} label="VIEW PRODUCT" />
      <ProductPedestal position={[7, 0, 2]} label="VIEW DETAILS" />
    </group>
  );
};

import { Float, MeshReflectorMaterial, MeshTransmissionMaterial, ContactShadows } from '@react-three/drei';

export function NeoClassicWingHall() {
  return (
    <group position={[25, 0, -24]}>
      {/* Warm Classic Floor */}
      <mesh position={[0, -0.05, -25]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 60]} />
        <MeshReflectorMaterial
          blur={[400, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={60}
          roughness={0.15}
          depthScale={1}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#0f0d0a"
          metalness={0.4}
        />
      </mesh>

      <ContactShadows position={[0, 0, -25]} scale={40} blur={3} far={10} opacity={0.5} color="#4a3b2c" />

      {/* Abstract Classic Exhibits (Warm glowing glass arches) */}
      {[
        { z: -12, side: 1 },
        { z: -28, side: -1 },
        { z: -42, side: 1 },
      ].map((exhibit, i) => (
        <group key={i} position={[exhibit.side * 5, 0, exhibit.z]}>
          {/* Classic Pedestal */}
          <mesh position={[0, 0.3, 0]}>
            <boxGeometry args={[3, 0.6, 3]} />
            <meshStandardMaterial color="#1f1a14" metalness={0.3} roughness={0.7} />
          </mesh>
          <mesh position={[0, 0.6, 0]}>
            <boxGeometry args={[2.8, 0.1, 2.8]} />
            <meshStandardMaterial color="#c19d5e" metalness={0.9} roughness={0.2} />
          </mesh>

          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
            <mesh position={[0, 3.5, 0]}>
              <cylinderGeometry args={[1.5, 1.5, 4, 32]} />
              <MeshTransmissionMaterial 
                backside
                samples={4}
                thickness={3}
                chromaticAberration={0.05}
                color="#f8ecd5" 
              />
            </mesh>
          </Float>
          {/* Warm spot illumination */}
          <pointLight position={[0, 4, 0]} intensity={1.5} color="#ffd6a3" distance={12} />
        </group>
      ))}

      {/* End of Hall Monolith (Classic) */}
      <mesh position={[0, 5, -50]}>
        <boxGeometry args={[16, 10, 1]} />
        <meshStandardMaterial color="#1a1510" roughness={0.3} metalness={0.5} />
      </mesh>
      <mesh position={[0, 5, -49.4]}>
        <boxGeometry args={[8, 8, 0.1]} />
        <meshStandardMaterial color="#c19d5e" roughness={0.2} metalness={0.8} />
      </mesh>
    </group>
  );
}

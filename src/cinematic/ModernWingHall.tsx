import { Float, MeshReflectorMaterial, MeshTransmissionMaterial, ContactShadows } from '@react-three/drei';

export function ModernWingHall() {
  return (
    <group position={[-25, 0, -24]}>
      {/* Sleek Modern Floor */}
      <mesh position={[0, -0.05, -25]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 60]} />
        <MeshReflectorMaterial
          blur={[400, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={50}
          roughness={0.05}
          depthScale={1}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#050505"
          metalness={0.6}
        />
      </mesh>

      <ContactShadows frames={1} resolution={256} position={[0, 0, -25]} scale={40} blur={2.5} far={10} opacity={0.4} />

      {/* Abstract Modern Exhibits (Floating glowing displays) */}
      {[
        { z: -10, side: -1 },
        { z: -25, side: 1 },
        { z: -40, side: -1 },
      ].map((exhibit, i) => (
        <group key={i} position={[exhibit.side * 5, 0, exhibit.z]}>
          <mesh position={[0, 0.2, 0]}>
            <cylinderGeometry args={[2, 2, 0.4, 32]} />
            <meshStandardMaterial color="#ffffff" emissive="#222" metalness={0.8} roughness={0.2} />
          </mesh>
          <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <mesh position={[0, 3, 0]}>
              <boxGeometry args={[1.5, 3, 1.5]} />
              <MeshTransmissionMaterial 
                backside
                samples={4}
                thickness={2}
                chromaticAberration={0.02}
                color={exhibit.side === 1 ? '#d5e4ec' : '#f0e6d2'} 
              />
            </mesh>
          </Float>
          {/* Subtle spot illumination */}
          <pointLight position={[0, 4, 0]} intensity={1} color="#ffffff" distance={10} />
        </group>
      ))}

      {/* End of Hall Monolith */}
      <mesh position={[0, 5, -50]}>
        <boxGeometry args={[16, 10, 1]} />
        <meshStandardMaterial color="#080808" roughness={0.1} metalness={0.9} />
      </mesh>
    </group>
  );
}

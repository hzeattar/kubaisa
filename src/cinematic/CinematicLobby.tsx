import { Image, MeshReflectorMaterial, MeshTransmissionMaterial, Float, ContactShadows } from '@react-three/drei';

export function CinematicLobby() {
  return (
    <group>
      {/* Luxury Mirror Floor */}
      <mesh position={[0, -0.05, -20]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[50, 60]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={80}
          roughness={0.1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#151515"
          metalness={0.5}
        />
      </mesh>

      {/* Ground Contact Shadows for grounded realism without heavy shadowmaps */}
      <ContactShadows frames={1} resolution={256} position={[0, 0, -20]} scale={50} blur={2} far={10} opacity={0.5} />

      {/* Abstract Glowing Architecture (Glass Panels) */}
      {[-1, 1].map((side) => (
        <group key={side} position={[side * 8, 0, 0]}>
          <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.5}>
            <mesh position={[0, 4, -15]} rotation={[0, side * 0.1, 0]}>
              <boxGeometry args={[4, 10, 0.2]} />
              <MeshTransmissionMaterial 
                backside
                samples={4}
                thickness={2}
                chromaticAberration={0.05}
                anisotropy={0.1}
                distortion={0.1}
                distortionScale={0.3}
                temporalDistortion={0.1}
                color="#e5dfd5"
              />
            </mesh>
          </Float>
          
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
            <mesh position={[side * 4, 3, -25]} rotation={[0, side * -0.2, 0]}>
              <boxGeometry args={[3, 8, 0.1]} />
              <MeshTransmissionMaterial 
                backside
                samples={4}
                thickness={1}
                chromaticAberration={0.02}
                color="#ffffff"
              />
            </mesh>
          </Float>
        </group>
      ))}

      {/* Grand Central Monolith (Holds Logo) */}
      <mesh position={[0, 5, -35]}>
        <boxGeometry args={[12, 10, 1]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Qubaisa Logo Floating in the Dark */}
      <Image
        url="/brand/qubaisa-logo.webp"
        position={[0, 5, -34.4]}
        scale={[6, 2]}
        toneMapped={false}
        transparent
      />

      {/* Subtle lighting accents */}
      <pointLight position={[0, 5, -30]} intensity={2} color="#ffd8a3" distance={20} decay={2} />
    </group>
  );
}

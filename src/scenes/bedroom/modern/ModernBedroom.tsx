import { RoundedBox } from '@react-three/drei';
import { useArchitecturalTextures, useModernFabricTexture } from '../../../components/3d/Materials';

export function ModernBedroom() {
  const { plaster, wood } = useArchitecturalTextures();
  const fabric = useModernFabricTexture();
  return (
    <group>
      {/* Floor */}
      <mesh position={[0, -0.05, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[14, 14]} />
        <meshStandardMaterial {...wood} color="#a69482" />
      </mesh>
      
      {/* Back Wall with hidden light panel */}
      <group position={[0, 2, -4]}>
        <mesh receiveShadow>
          <boxGeometry args={[14, 4, 0.2]} />
          <meshStandardMaterial {...plaster} color="#cac3ba" />
        </mesh>
        {/* Accent Wood Panel */}
        <mesh position={[0, 0, 0.15]} receiveShadow>
          <boxGeometry args={[4, 4, 0.1]} />
          <meshStandardMaterial {...wood} color="#3d352d" />
        </mesh>
        {/* LED Strip */}
        <mesh position={[0, 0, 0.2]}>
          <boxGeometry args={[4.05, 4.05, 0.01]} />
          <meshStandardMaterial color="#fff" emissive="#ffe6c2" emissiveIntensity={1.5} />
        </mesh>
      </group>

      {/* Modern Bed */}
      <group position={[0, 0, -2.5]}>
        {/* Base */}
        <RoundedBox args={[2, 0.3, 2.2]} position={[0, 0.15, 0]} radius={0.02} castShadow receiveShadow>
          <meshStandardMaterial {...fabric} color="#5e5a56" />
        </RoundedBox>
        {/* Mattress */}
        <RoundedBox args={[1.9, 0.2, 2.1]} position={[0, 0.4, 0]} radius={0.05} castShadow receiveShadow>
          <meshStandardMaterial color="#f0efe9" />
        </RoundedBox>
        {/* Pillows */}
        <RoundedBox args={[0.7, 0.1, 0.4]} position={[-0.45, 0.55, -0.7]} radius={0.05} castShadow>
          <meshStandardMaterial color="#e0ded6" />
        </RoundedBox>
        <RoundedBox args={[0.7, 0.1, 0.4]} position={[0.45, 0.55, -0.7]} radius={0.05} castShadow>
          <meshStandardMaterial color="#e0ded6" />
        </RoundedBox>
        {/* Duvet */}
        <mesh position={[0, 0.52, 0.3]} castShadow>
          <boxGeometry args={[1.95, 0.05, 1.4]} />
          <meshStandardMaterial {...fabric} color="#7a7269" />
        </mesh>
      </group>

      {/* Nightstands */}
      {[-1.5, 1.5].map((x) => (
        <group key={x} position={[x, 0, -3.2]}>
          <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.6, 0.6, 0.4]} />
            <meshStandardMaterial color="#2b2825" />
          </mesh>
          {/* Lamp */}
          <mesh position={[0, 0.6, 0]}>
            <cylinderGeometry args={[0.02, 0.05, 0.2]} />
            <meshStandardMaterial color="#111" />
          </mesh>
          <mesh position={[0, 0.8, 0]}>
            <sphereGeometry args={[0.1]} />
            <meshStandardMaterial color="#fff" emissive="#ffddaa" emissiveIntensity={1} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

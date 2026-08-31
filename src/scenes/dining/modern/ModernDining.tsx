import { RoundedBox } from '@react-three/drei';
import { useArchitecturalTextures, useModernFabricTexture } from '../../../components/3d/Materials';

export function ModernDining() {
  const { plaster } = useArchitecturalTextures();
  const fabric = useModernFabricTexture();

  return (
    <group>
      {/* Floor */}
      <mesh position={[0, -0.05, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[14, 14]} />
        <meshStandardMaterial color="#2a2826" roughness={0.9} />
      </mesh>
      
      {/* Back Wall */}
      <mesh position={[0, 2, -4]} receiveShadow>
        <boxGeometry args={[14, 4, 0.2]} />
        <meshStandardMaterial {...plaster} color="#e5e0d8" />
      </mesh>

      {/* Dining Table */}
      <group position={[0, 0, -1]}>
        {/* Table Top */}
        <RoundedBox args={[2.8, 0.1, 1.2]} position={[0, 0.75, 0]} radius={0.05} smoothness={4} castShadow receiveShadow>
          <meshStandardMaterial color="#f0eee9" roughness={0.1} metalness={0.1} /> {/* Marble-like */}
        </RoundedBox>
        {/* Table Legs */}
        <mesh position={[-1, 0.375, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.75, 16]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[1, 0.375, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.75, 16]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>

      {/* Chairs */}
      {[
        [-0.8, -0.6], [0, -0.6], [0.8, -0.6],
        [-0.8, 0.6], [0, 0.6], [0.8, 0.6],
      ].map((pos, i) => (
        <group key={i} position={[pos[0], 0, -1 + pos[1]]} rotation={[0, pos[1] > 0 ? Math.PI : 0, 0]}>
          <RoundedBox args={[0.5, 0.1, 0.45]} position={[0, 0.45, 0]} radius={0.05} castShadow>
            <meshStandardMaterial {...fabric} color="#d4ccb9" />
          </RoundedBox>
          <RoundedBox args={[0.5, 0.4, 0.1]} position={[0, 0.7, -0.2]} radius={0.05} castShadow>
            <meshStandardMaterial {...fabric} color="#d4ccb9" />
          </RoundedBox>
          <mesh position={[-0.2, 0.225, 0.15]} castShadow><cylinderGeometry args={[0.02, 0.02, 0.45]} /><meshStandardMaterial color="#1a1a1a" /></mesh>
          <mesh position={[0.2, 0.225, 0.15]} castShadow><cylinderGeometry args={[0.02, 0.02, 0.45]} /><meshStandardMaterial color="#1a1a1a" /></mesh>
          <mesh position={[-0.2, 0.225, -0.15]} castShadow><cylinderGeometry args={[0.02, 0.02, 0.45]} /><meshStandardMaterial color="#1a1a1a" /></mesh>
          <mesh position={[0.2, 0.225, -0.15]} castShadow><cylinderGeometry args={[0.02, 0.02, 0.45]} /><meshStandardMaterial color="#1a1a1a" /></mesh>
        </group>
      ))}

      {/* Modern Chandelier */}
      <group position={[0, 2.5, -1]}>
        <mesh position={[0, 0.5, 0]}><cylinderGeometry args={[0.01, 0.01, 1]} /><meshStandardMaterial color="#1a1a1a" /></mesh>
        <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.02, 0.02, 2]} /><meshStandardMaterial color="#1a1a1a" /></mesh>
        <mesh position={[-0.8, 0, 0]}><sphereGeometry args={[0.15]} /><meshStandardMaterial color="#fff" emissive="#ffe2b6" emissiveIntensity={2} /></mesh>
        <mesh position={[0.8, 0, 0]}><sphereGeometry args={[0.15]} /><meshStandardMaterial color="#fff" emissive="#ffe2b6" emissiveIntensity={2} /></mesh>
      </group>
    </group>
  );
}

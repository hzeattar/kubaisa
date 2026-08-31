import { RoundedBox } from '@react-three/drei';
import { useArchitecturalTextures, useModernFabricTexture } from '../../components/3d/Materials';

export function KidsRoom() {
  const { plaster, wood } = useArchitecturalTextures();
  const fabric = useModernFabricTexture();
  return (
    <group>
      {/* Floor */}
      <mesh position={[0, -0.05, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[14, 14]} />
        <meshStandardMaterial {...wood} color="#e5dacb" />
      </mesh>
      
      {/* Walls */}
      <group position={[0, 2, -4]}>
        <mesh receiveShadow>
          <boxGeometry args={[14, 4, 0.2]} />
          <meshStandardMaterial {...plaster} color="#f0f4f8" />
        </mesh>
        {/* Playful wall graphic */}
        <mesh position={[0, 0, 0.15]}>
          <circleGeometry args={[1.5, 32]} />
          <meshStandardMaterial color="#ffc107" roughness={0.8} />
        </mesh>
      </group>

      {/* Bunk Bed */}
      <group position={[-1.5, 0, -2.5]}>
        {/* Frame */}
        <mesh position={[-0.5, 1, -0.5]} castShadow><cylinderGeometry args={[0.05, 0.05, 2]} /><meshStandardMaterial color="#fff" /></mesh>
        <mesh position={[0.5, 1, -0.5]} castShadow><cylinderGeometry args={[0.05, 0.05, 2]} /><meshStandardMaterial color="#fff" /></mesh>
        <mesh position={[-0.5, 1, 0.5]} castShadow><cylinderGeometry args={[0.05, 0.05, 2]} /><meshStandardMaterial color="#fff" /></mesh>
        <mesh position={[0.5, 1, 0.5]} castShadow><cylinderGeometry args={[0.05, 0.05, 2]} /><meshStandardMaterial color="#fff" /></mesh>
        
        {/* Bottom Bed */}
        <RoundedBox args={[1, 0.1, 2]} position={[0, 0.2, 0]} radius={0.02} castShadow>
          <meshStandardMaterial color="#fff" />
        </RoundedBox>
        <RoundedBox args={[0.9, 0.15, 1.9]} position={[0, 0.3, 0]} radius={0.05} castShadow>
          <meshStandardMaterial color="#e0f7fa" />
        </RoundedBox>
        
        {/* Top Bed */}
        <RoundedBox args={[1, 0.1, 2]} position={[0, 1.2, 0]} radius={0.02} castShadow>
          <meshStandardMaterial color="#fff" />
        </RoundedBox>
        <RoundedBox args={[0.9, 0.15, 1.9]} position={[0, 1.3, 0]} radius={0.05} castShadow>
          <meshStandardMaterial color="#fff3e0" />
        </RoundedBox>
        
        {/* Ladder */}
        <mesh position={[0.5, 0.7, 0]} rotation={[0, 0, -0.2]} castShadow>
          <cylinderGeometry args={[0.02, 0.02, 1.5]} />
          <meshStandardMaterial color="#aaa" />
        </mesh>
        <mesh position={[0.5, 0.7, -0.3]} rotation={[0, 0, -0.2]} castShadow>
          <cylinderGeometry args={[0.02, 0.02, 1.5]} />
          <meshStandardMaterial color="#aaa" />
        </mesh>
      </group>

      {/* Desk */}
      <group position={[1.5, 0, -2.5]}>
        <mesh position={[0, 0.75, 0]} castShadow>
          <boxGeometry args={[1.5, 0.05, 0.8]} />
          <meshStandardMaterial color="#fff" />
        </mesh>
        <mesh position={[-0.7, 0.375, -0.3]} castShadow><cylinderGeometry args={[0.03, 0.03, 0.75]} /><meshStandardMaterial color="#aaa" /></mesh>
        <mesh position={[0.7, 0.375, -0.3]} castShadow><cylinderGeometry args={[0.03, 0.03, 0.75]} /><meshStandardMaterial color="#aaa" /></mesh>
        <mesh position={[-0.7, 0.375, 0.3]} castShadow><cylinderGeometry args={[0.03, 0.03, 0.75]} /><meshStandardMaterial color="#aaa" /></mesh>
        <mesh position={[0.7, 0.375, 0.3]} castShadow><cylinderGeometry args={[0.03, 0.03, 0.75]} /><meshStandardMaterial color="#aaa" /></mesh>
        
        {/* Chair */}
        <group position={[0, 0, 0.5]}>
          <mesh position={[0, 0.45, 0]} castShadow><cylinderGeometry args={[0.2, 0.2, 0.05]} /><meshStandardMaterial color="#ff5252" /></mesh>
          <mesh position={[0, 0.225, 0]} castShadow><cylinderGeometry args={[0.02, 0.02, 0.45]} /><meshStandardMaterial color="#aaa" /></mesh>
          <mesh position={[0, 0.8, 0.15]} castShadow rotation={[0.2, 0, 0]}><boxGeometry args={[0.3, 0.3, 0.05]} /><meshStandardMaterial color="#ff5252" /></mesh>
        </group>
      </group>

      {/* Rug */}
      <mesh position={[0, 0.01, -1.5]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[2.5, 1.5]} />
        <meshStandardMaterial {...fabric} color="#4caf50" />
      </mesh>
    </group>
  );
}

import { RoundedBox } from '@react-three/drei';
import { useArchitecturalTextures, useModernFabricTexture } from '../../../components/3d/Materials';

export function ModernKidsRoom() {
  const { plaster, wood } = useArchitecturalTextures();
  const fabric = useModernFabricTexture();
  return (
    <group>
      {/* Floor */}
      <mesh position={[0, -0.05, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[14, 14]} />
        <meshStandardMaterial {...wood} color="#c2b2a1" />
      </mesh>
      
      {/* Back Wall */}
      <group position={[0, 2, -4]}>
        <mesh receiveShadow>
          <boxGeometry args={[14, 4, 0.2]} />
          <meshStandardMaterial {...plaster} color="#eef2f5" />
        </mesh>
        {/* Playful Wall Decals / Shapes */}
        <mesh position={[-2, 0, 0.15]} receiveShadow>
          <circleGeometry args={[1, 32]} />
          <meshStandardMaterial color="#88aacc" roughness={0.6} />
        </mesh>
        <mesh position={[2, 1, 0.15]} receiveShadow>
          <circleGeometry args={[0.5, 32]} />
          <meshStandardMaterial color="#cc8899" roughness={0.6} />
        </mesh>
      </group>

      {/* Bed */}
      <group position={[-1.5, 0, -2.5]}>
        {/* Base */}
        <RoundedBox args={[1.2, 0.4, 2.1]} position={[0, 0.2, 0]} radius={0.05} castShadow receiveShadow>
          <meshStandardMaterial {...wood} color="#e8e8e8" />
        </RoundedBox>
        {/* Mattress */}
        <RoundedBox args={[1.1, 0.2, 2.0]} position={[0, 0.5, 0]} radius={0.05} castShadow receiveShadow>
          <meshStandardMaterial color="#fff" />
        </RoundedBox>
        {/* Pillows & Duvet */}
        <RoundedBox args={[0.6, 0.1, 0.4]} position={[0, 0.65, -0.7]} radius={0.05} castShadow>
          <meshStandardMaterial color="#ddf" />
        </RoundedBox>
        <mesh position={[0, 0.62, 0.3]} castShadow>
          <boxGeometry args={[1.15, 0.05, 1.4]} />
          <meshStandardMaterial {...fabric} color="#99bbcc" />
        </mesh>
      </group>

      {/* Desk Area */}
      <group position={[1.5, 0, -3]}>
        {/* Desk */}
        <RoundedBox args={[1.6, 0.05, 0.7]} position={[0, 0.75, 0]} radius={0.02} castShadow receiveShadow>
          <meshStandardMaterial {...wood} color="#e8e8e8" />
        </RoundedBox>
        <mesh position={[-0.7, 0.375, 0]} castShadow>
          <boxGeometry args={[0.05, 0.75, 0.6]} />
          <meshStandardMaterial {...wood} color="#e8e8e8" />
        </mesh>
        <mesh position={[0.7, 0.375, 0]} castShadow>
          <boxGeometry args={[0.05, 0.75, 0.6]} />
          <meshStandardMaterial {...wood} color="#e8e8e8" />
        </mesh>
        
        {/* Chair */}
        <group position={[0, 0, 0.6]}>
          <mesh position={[0, 0.45, 0]} castShadow>
            <cylinderGeometry args={[0.2, 0.2, 0.05, 16]} />
            <meshStandardMaterial color="#ccaa44" />
          </mesh>
          <mesh position={[0, 0.225, 0]} castShadow>
            <cylinderGeometry args={[0.02, 0.02, 0.45]} />
            <meshStandardMaterial color="#333" />
          </mesh>
          <mesh position={[0, 0.6, -0.15]} castShadow rotation={[0.2, 0, 0]}>
            <boxGeometry args={[0.3, 0.3, 0.05]} />
            <meshStandardMaterial color="#ccaa44" />
          </mesh>
        </group>
      </group>
    </group>
  );
}

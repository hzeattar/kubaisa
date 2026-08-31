import { RoundedBox } from '@react-three/drei';
import { useArchitecturalTextures, useClassicFabricTexture } from '../../../components/3d/Materials';

export function NeoClassicDining() {
  const { plaster, wood } = useArchitecturalTextures();
  const fabric = useClassicFabricTexture();
  return (
    <group>
      {/* Floor */}
      <mesh position={[0, -0.05, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[14, 14]} />
        <meshStandardMaterial color="#3a322b" roughness={0.7} />
      </mesh>
      
      {/* Back Wall with Panels */}
      <group position={[0, 2, -4]}>
        <mesh receiveShadow>
          <boxGeometry args={[14, 4, 0.2]} />
          <meshStandardMaterial {...plaster} color="#d9d1c7" />
        </mesh>
        <mesh position={[-2, 0, 0.15]} receiveShadow>
          <boxGeometry args={[2, 3, 0.1]} />
          <meshStandardMaterial {...plaster} color="#e3ddd5" />
        </mesh>
        <mesh position={[2, 0, 0.15]} receiveShadow>
          <boxGeometry args={[2, 3, 0.1]} />
          <meshStandardMaterial {...plaster} color="#e3ddd5" />
        </mesh>
      </group>

      {/* Classic Dining Table */}
      <group position={[0, 0, -1]}>
        {/* Table Top */}
        <RoundedBox args={[3, 0.15, 1.4]} position={[0, 0.75, 0]} radius={0.02} smoothness={2} castShadow receiveShadow>
          <meshStandardMaterial {...wood} color="#3b2b1f" />
        </RoundedBox>
        {/* Carved Legs (Simplified) */}
        <mesh position={[-1.2, 0.375, 0]} castShadow>
          <cylinderGeometry args={[0.15, 0.2, 0.75, 16]} />
          <meshStandardMaterial {...wood} color="#3b2b1f" />
        </mesh>
        <mesh position={[1.2, 0.375, 0]} castShadow>
          <cylinderGeometry args={[0.15, 0.2, 0.75, 16]} />
          <meshStandardMaterial {...wood} color="#3b2b1f" />
        </mesh>
      </group>

      {/* Chairs */}
      {[
        [-1, -0.7], [0, -0.7], [1, -0.7],
        [-1, 0.7], [0, 0.7], [1, 0.7],
      ].map((pos, i) => (
        <group key={i} position={[pos[0], 0, -1 + pos[1]]} rotation={[0, pos[1] > 0 ? Math.PI : 0, 0]}>
          <RoundedBox args={[0.55, 0.15, 0.5]} position={[0, 0.45, 0]} radius={0.05} castShadow>
            <meshStandardMaterial {...fabric} color="#9c8c7d" />
          </RoundedBox>
          {/* Classic Oval Backrest */}
          <mesh position={[0, 0.85, -0.2]} castShadow rotation={[0.1 + Math.PI/2, 0, 0]}>
            <cylinderGeometry args={[0.25, 0.25, 0.1]} />
            <meshStandardMaterial {...fabric} color="#9c8c7d" />
          </mesh>
          <mesh position={[0, 0.85, -0.22]} castShadow rotation={[0.1 + Math.PI/2, 0, 0]}>
            <cylinderGeometry args={[0.28, 0.28, 0.08]} />
            <meshStandardMaterial {...wood} color="#e8cd9c" /> {/* Gilded frame */}
          </mesh>
          <mesh position={[-0.2, 0.225, 0.15]} castShadow><cylinderGeometry args={[0.03, 0.02, 0.45]} /><meshStandardMaterial {...wood} color="#3b2b1f" /></mesh>
          <mesh position={[0.2, 0.225, 0.15]} castShadow><cylinderGeometry args={[0.03, 0.02, 0.45]} /><meshStandardMaterial {...wood} color="#3b2b1f" /></mesh>
          <mesh position={[-0.2, 0.225, -0.15]} castShadow><cylinderGeometry args={[0.03, 0.02, 0.45]} /><meshStandardMaterial {...wood} color="#3b2b1f" /></mesh>
          <mesh position={[0.2, 0.225, -0.15]} castShadow><cylinderGeometry args={[0.03, 0.02, 0.45]} /><meshStandardMaterial {...wood} color="#3b2b1f" /></mesh>
        </group>
      ))}

      {/* Crystal Chandelier (Proxy) */}
      <group position={[0, 2.5, -1]}>
        <mesh position={[0, 0.5, 0]}><cylinderGeometry args={[0.02, 0.02, 1]} /><meshStandardMaterial color="#e8cd9c" /></mesh>
        <mesh position={[0, 0, 0]}><cylinderGeometry args={[0.4, 0.01, 0.1, 8]} /><meshStandardMaterial color="#e8cd9c" /></mesh>
        <mesh position={[0, -0.2, 0]}><sphereGeometry args={[0.1]} /><meshStandardMaterial color="#fff" emissive="#ffe2b6" emissiveIntensity={1} /></mesh>
      </group>
    </group>
  );
}

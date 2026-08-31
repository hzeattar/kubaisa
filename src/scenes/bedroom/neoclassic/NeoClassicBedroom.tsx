import { RoundedBox } from '@react-three/drei';
import { useArchitecturalTextures, useClassicFabricTexture } from '../../../components/3d/Materials';

export function NeoClassicBedroom() {
  const { plaster, wood } = useArchitecturalTextures();
  const fabric = useClassicFabricTexture();
  return (
    <group>
      {/* Floor */}
      <mesh position={[0, -0.05, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[14, 14]} />
        <meshStandardMaterial {...wood} color="#5a4231" />
      </mesh>
      
      {/* Back Wall with Classic Panels */}
      <group position={[0, 2, -4]}>
        <mesh receiveShadow>
          <boxGeometry args={[14, 4, 0.2]} />
          <meshStandardMaterial {...plaster} color="#e6dfd1" />
        </mesh>
        <mesh position={[-2.5, 0, 0.15]} receiveShadow>
          <boxGeometry args={[1.5, 3, 0.05]} />
          <meshStandardMaterial {...plaster} color="#eee9e0" />
        </mesh>
        <mesh position={[2.5, 0, 0.15]} receiveShadow>
          <boxGeometry args={[1.5, 3, 0.05]} />
          <meshStandardMaterial {...plaster} color="#eee9e0" />
        </mesh>
        {/* Wall Sconces */}
        <mesh position={[-2.5, 0.5, 0.2]}><sphereGeometry args={[0.08]} /><meshStandardMaterial color="#fff" emissive="#ffddaa" emissiveIntensity={1} /></mesh>
        <mesh position={[2.5, 0.5, 0.2]}><sphereGeometry args={[0.08]} /><meshStandardMaterial color="#fff" emissive="#ffddaa" emissiveIntensity={1} /></mesh>
      </group>

      {/* Classic Bed */}
      <group position={[0, 0, -2.5]}>
        {/* Base */}
        <RoundedBox args={[2, 0.3, 2.2]} position={[0, 0.15, 0]} radius={0.05} castShadow receiveShadow>
          <meshStandardMaterial {...wood} color="#eee9e0" />
        </RoundedBox>
        {/* Tufted Headboard */}
        <RoundedBox args={[2.2, 1.4, 0.15]} position={[0, 0.8, -1.05]} radius={0.05} castShadow receiveShadow>
          <meshStandardMaterial {...fabric} color="#bbaea0" roughness={0.9} />
        </RoundedBox>
        {/* Gilded frame around headboard */}
        <mesh position={[0, 0.8, -1]} castShadow>
          <boxGeometry args={[2.3, 1.5, 0.05]} />
          <meshStandardMaterial color="#d4af37" roughness={0.3} metalness={0.8} />
        </mesh>
        {/* Mattress */}
        <RoundedBox args={[1.9, 0.2, 2.1]} position={[0, 0.4, 0]} radius={0.05} castShadow receiveShadow>
          <meshStandardMaterial color="#fffbf2" />
        </RoundedBox>
        {/* Pillows */}
        <RoundedBox args={[0.7, 0.15, 0.4]} position={[-0.45, 0.55, -0.6]} radius={0.05} castShadow>
          <meshStandardMaterial color="#fffbf2" />
        </RoundedBox>
        <RoundedBox args={[0.7, 0.15, 0.4]} position={[0.45, 0.55, -0.6]} radius={0.05} castShadow>
          <meshStandardMaterial color="#fffbf2" />
        </RoundedBox>
        {/* Duvet */}
        <mesh position={[0, 0.52, 0.4]} castShadow>
          <boxGeometry args={[1.95, 0.05, 1.2]} />
          <meshStandardMaterial {...fabric} color="#8c7a6b" />
        </mesh>
      </group>

      {/* Classic Nightstands */}
      {[-1.6, 1.6].map((x) => (
        <group key={x} position={[x, 0, -3.2]}>
          <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.3, 0.3, 0.7, 32]} />
            <meshStandardMaterial {...wood} color="#eee9e0" />
          </mesh>
          <mesh position={[0, 0.7, 0]} castShadow>
            <cylinderGeometry args={[0.32, 0.32, 0.02, 32]} />
            <meshStandardMaterial color="#d4af37" />
          </mesh>
        </group>
      ))}
    </group>
  );
}

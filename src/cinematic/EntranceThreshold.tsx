import { useArchitecturalTextures } from '../components/3d/Materials';

const gold = '#c6a15b';

function PortalFrame({ x, accent }: { x: number; accent: string }) {
  const { marble, plaster, metal } = useArchitecturalTextures();

  return (
    <group position={[x, 0, -31.6]}>
      <mesh position={[0, 3.15, 0.15]} receiveShadow>
        <boxGeometry args={[5.8, 6.3, 0.42]} />
        <meshStandardMaterial {...plaster} color="#e9e2d8" roughness={0.66} />
      </mesh>
      <mesh position={[0, 3.0, 0.41]}>
        <boxGeometry args={[4.35, 5.2, 0.16]} />
        <meshStandardMaterial color="#101820" roughness={0.34} metalness={0.16} />
      </mesh>
      <mesh position={[0, 5.88, 0.46]} castShadow>
        <boxGeometry args={[5.15, 0.14, 0.16]} />
        <meshStandardMaterial {...metal} color={accent} metalness={0.9} roughness={0.3} emissive={accent} emissiveIntensity={0.12} />
      </mesh>
      {[-2.7, 2.7].map((side) => (
        <mesh key={side} position={[side, 3.15, 0.38]} castShadow receiveShadow>
          <boxGeometry args={[0.38, 6.35, 0.45]} />
          <meshStandardMaterial {...marble} color="#ddd4c6" roughness={0.34} />
        </mesh>
      ))}
      <pointLight position={[0, 3.7, -1.8]} intensity={8} distance={8} decay={2} color={accent} />
    </group>
  );
}

export function EntranceThreshold() {
  const { marble, plaster, wood, metal } = useArchitecturalTextures();

  return (
    <group>
      {/* Arrival runner begins directly behind the opening so the exterior and interior read as one building. */}
      <mesh position={[0, 0.015, -13.9]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[7.4, 8.8]} />
        <meshStandardMaterial {...marble} color="#cfc6b9" roughness={0.26} />
      </mesh>
      <mesh position={[0, 0.035, -16.8]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[3.1, 7.2]} />
        <meshStandardMaterial {...wood} color="#352920" roughness={0.48} />
      </mesh>

      {/* Two nested portals create a real vestibule instead of a hard cut from facade to lobby. */}
      {[-12.35, -16.05].map((z, portalIndex) => (
        <group key={z} position={[0, 0, z]}>
          {[-4.0, 4.0].map((x) => (
            <mesh key={x} position={[x, 3.55, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.62, 7.1, 0.72]} />
              <meshStandardMaterial {...marble} color={portalIndex === 0 ? '#e7ded0' : '#ddd3c4'} roughness={0.38} />
            </mesh>
          ))}
          <mesh position={[0, 6.95, 0]} castShadow receiveShadow>
            <boxGeometry args={[8.6, 0.7, 0.8]} />
            <meshStandardMaterial {...plaster} color="#eee7dc" roughness={0.64} />
          </mesh>
          <mesh position={[0, 6.48, 0.46]} castShadow>
            <boxGeometry args={[7.8, 0.08, 0.08]} />
            <meshStandardMaterial {...metal} color={gold} metalness={0.9} roughness={0.28} emissive="#8a642b" emissiveIntensity={0.14} />
          </mesh>
        </group>
      ))}

      {/* Warm concealed ceiling light pulls the customer physically into the palace. */}
      <mesh position={[0, 7.15, -14.2]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[6.8, 6.8]} />
        <meshStandardMaterial color="#f0d7ae" emissive="#f0c783" emissiveIntensity={1.15} side={2} />
      </mesh>
      <pointLight position={[0, 5.4, -14.8]} intensity={13} distance={12} decay={2} color="#ffd59d" />

      {/* Decision portals are visible before any UI asks for Modern / Neo-Classical. */}
      <PortalFrame x={-7.15} accent="#d7bf8b" />
      <PortalFrame x={7.15} accent="#c99a55" />

      <mesh position={[0, 0.02, -27.5]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[6.1, 64]} />
        <meshStandardMaterial {...marble} color="#e2d9cd" roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.045, -27.5]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <ringGeometry args={[4.75, 4.92, 64]} />
        <meshStandardMaterial {...metal} color={gold} metalness={0.84} roughness={0.34} />
      </mesh>
    </group>
  );
}

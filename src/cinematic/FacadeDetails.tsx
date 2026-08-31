import { Instance, Instances } from '@react-three/drei';
import { useArchitecturalTextures } from '../components/3d/Materials';

const gold = '#c6a15b';

function EntranceLantern({ x }: { x: number }) {
  const { metal } = useArchitecturalTextures();

  return (
    <group position={[x, 3.9, -11.18]}>
      <mesh castShadow>
        <boxGeometry args={[0.36, 1.18, 0.3]} />
        <meshStandardMaterial {...metal} color="#2c261f" metalness={0.84} roughness={0.34} />
      </mesh>
      <mesh position={[0, 0, 0.17]}>
        <boxGeometry args={[0.22, 0.72, 0.08]} />
        <meshStandardMaterial
          color="#ffe0ac"
          emissive="#f2b95f"
          emissiveIntensity={3.4}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[0, 0.7, 0]} castShadow>
        <coneGeometry args={[0.22, 0.28, 4]} />
        <meshStandardMaterial {...metal} color="#9a793e" metalness={0.9} roughness={0.3} />
      </mesh>
    </group>
  );
}

function EntrancePlanter({ x }: { x: number }) {
  const { marble, metal } = useArchitecturalTextures();

  return (
    <group position={[x, 0, -8.9]}>
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.72, 0.58, 1.0, 24]} />
        <meshPhysicalMaterial
          {...marble}
          color="#cfc5b7"
          roughness={0.36}
          clearcoat={0.08}
          clearcoatRoughness={0.55}
        />
      </mesh>
      <mesh position={[0, 0.96, 0]} castShadow>
        <torusGeometry args={[0.63, 0.06, 10, 32]} />
        <meshStandardMaterial {...metal} color={gold} metalness={0.86} roughness={0.32} />
      </mesh>
      <mesh position={[0, 2.0, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.12, 2.0, 10]} />
        <meshStandardMaterial color="#4a3426" roughness={0.92} />
      </mesh>
      <mesh position={[0, 3.1, 0]} castShadow>
        <icosahedronGeometry args={[0.92, 2]} />
        <meshStandardMaterial color="#263d2c" roughness={0.96} />
      </mesh>
    </group>
  );
}

export function FacadeDetails() {
  const { marble, plaster, metal } = useArchitecturalTextures();

  return (
    <group>
      {/* Layered entrance arch: stone depth first, then a restrained champagne reveal. */}
      <mesh position={[0, 6.18, -11.28]} castShadow>
        <torusGeometry args={[4.15, 0.19, 14, 72, Math.PI]} />
        <meshPhysicalMaterial
          {...marble}
          color="#e7dfd4"
          roughness={0.3}
          clearcoat={0.08}
          clearcoatRoughness={0.52}
        />
      </mesh>
      {[-4.15, 4.15].map((x) => (
        <mesh key={x} position={[x, 3.2, -11.28]} castShadow receiveShadow>
          <boxGeometry args={[0.38, 5.95, 0.42]} />
          <meshStandardMaterial {...plaster} color="#eee7dc" roughness={0.58} />
        </mesh>
      ))}

      <mesh position={[0, 6.42, -11.06]} castShadow>
        <torusGeometry args={[4.14, 0.055, 10, 72, Math.PI]} />
        <meshStandardMaterial
          {...metal}
          color={gold}
          metalness={0.92}
          roughness={0.26}
          emissive="#76501e"
          emissiveIntensity={0.12}
        />
      </mesh>

      <EntranceLantern x={-8.2} />
      <EntranceLantern x={8.2} />
      <EntranceLantern x={-5.9} />
      <EntranceLantern x={5.9} />
      <EntrancePlanter x={-7.4} />
      <EntrancePlanter x={7.4} />

      {/* One broad architectural wash replaces four per-lantern realtime lights. */}
      <rectAreaLight
        width={13}
        height={4.8}
        intensity={3.6}
        color="#ffd7a1"
        position={[0, 4.2, -10.6]}
        rotation={[0, Math.PI, 0]}
      />

      {/* Restrained upper balustrade, instanced into one draw call. */}
      <group position={[0, 10.9, -11.35]}>
        <mesh position={[0, 0.48, 0]} castShadow receiveShadow>
          <boxGeometry args={[12.2, 0.15, 0.32]} />
          <meshStandardMaterial {...marble} color="#d9d0c2" roughness={0.38} />
        </mesh>
        <mesh position={[0, -0.46, 0]} castShadow receiveShadow>
          <boxGeometry args={[12.2, 0.15, 0.32]} />
          <meshStandardMaterial {...marble} color="#d9d0c2" roughness={0.38} />
        </mesh>
        <Instances limit={19} castShadow>
          <cylinderGeometry args={[0.065, 0.085, 0.82, 8]} />
          <meshStandardMaterial {...marble} color="#e5ddd1" roughness={0.42} />
          {Array.from({ length: 19 }, (_, index) => (
            <Instance key={index} position={[-5.4 + index * 0.6, 0, 0]} />
          ))}
        </Instances>
      </group>

      {/* Fine recessed facade joints catch shadow without adding heavy geometry. */}
      <Instances limit={9}>
        <boxGeometry args={[0.035, 4.4, 0.035]} />
        <meshStandardMaterial color="#8e877d" roughness={0.86} />
        {[-13.4, -10.2, -7, -3.8, 3.8, 7, 10.2, 13.4].map((x) => (
          <Instance key={x} position={[x, 8.9, -11.03]} />
        ))}
      </Instances>
    </group>
  );
}

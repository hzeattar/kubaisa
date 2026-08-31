import { Instance, Instances, RoundedBox } from '@react-three/drei';
import { useModernRoomTextures } from '../components/3d/Materials';

const CHAMPAGNE = '#b99a61';
const DARK_METAL = '#252a2d';

type ModernTextures = ReturnType<typeof useModernRoomTextures>;

type WallSegment = { center: number; length: number };

const LEFT_WALL_SEGMENTS: WallSegment[] = [
  { center: -1.9, length: 11.8 },
  { center: -22.1, length: 14.4 },
  { center: -45.15, length: 17.7 },
];

const RIGHT_WALL_SEGMENTS: WallSegment[] = [
  { center: -6.85, length: 21.7 },
  { center: -32.8, length: 16.2 },
  { center: -50.95, length: 6.1 },
];

function ModernLivingHero({ textures }: { textures: ModernTextures }) {
  const { marble, wood, metal, fabricModern } = textures;

  return (
    <group position={[-10.6, 0, -11.4]} rotation={[0, Math.PI / 2, 0]}>
      <mesh position={[0, 3.15, -3.15]} receiveShadow>
        <boxGeometry args={[8.4, 6.3, 0.22]} />
        <meshStandardMaterial color="#d9d4cd" roughness={0.78} />
      </mesh>
      <mesh position={[0, 0.015, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[8.4, 7.5]} />
        <meshStandardMaterial {...wood} color="#73675d" roughness={0.62} />
      </mesh>

      <RoundedBox args={[6.25, 0.045, 4.65]} radius={0.18} smoothness={4} position={[0, 0.055, -0.15]} receiveShadow>
        <meshStandardMaterial color="#b9b1a8" roughness={0.96} />
      </RoundedBox>

      <group position={[-0.35, 0, -1.15]}>
        <RoundedBox args={[4.8, 0.62, 1.22]} radius={0.22} smoothness={5} position={[0, 0.48, 0]} castShadow receiveShadow>
          <meshStandardMaterial {...fabricModern} color="#c9c1b8" roughness={0.82} />
        </RoundedBox>
        <RoundedBox args={[4.75, 0.58, 0.34]} radius={0.15} smoothness={5} position={[0, 1.03, -0.45]} castShadow>
          <meshStandardMaterial {...fabricModern} color="#bcb3aa" roughness={0.84} />
        </RoundedBox>
        {[-1.5, 0, 1.5].map((x) => (
          <RoundedBox key={x} args={[1.28, 0.74, 0.26]} radius={0.16} smoothness={5} position={[x, 1.17, -0.28]} rotation={[-0.08, 0, 0]} castShadow>
            <meshStandardMaterial {...fabricModern} color={x === 0 ? '#d1c9c0' : '#c4bbb2'} roughness={0.86} />
          </RoundedBox>
        ))}
        <RoundedBox args={[1.18, 0.54, 1.1]} radius={0.18} smoothness={5} position={[-2.87, 0.44, 0]} castShadow>
          <meshStandardMaterial {...fabricModern} color="#c9c1b8" roughness={0.82} />
        </RoundedBox>
        <RoundedBox args={[1.18, 0.54, 1.1]} radius={0.18} smoothness={5} position={[2.87, 0.44, 0]} castShadow>
          <meshStandardMaterial {...fabricModern} color="#c9c1b8" roughness={0.82} />
        </RoundedBox>
      </group>

      <group position={[2.65, 0, 1.15]} rotation={[0, -0.62, 0]}>
        <RoundedBox args={[1.55, 0.55, 1.35]} radius={0.28} smoothness={5} position={[0, 0.48, 0]} castShadow>
          <meshStandardMaterial {...fabricModern} color="#a89f96" roughness={0.84} />
        </RoundedBox>
        <RoundedBox args={[1.5, 1.15, 0.3]} radius={0.22} smoothness={5} position={[0, 1.12, -0.48]} rotation={[-0.12, 0, 0]} castShadow>
          <meshStandardMaterial {...fabricModern} color="#a89f96" roughness={0.86} />
        </RoundedBox>
      </group>

      <group position={[0.5, 0, 1.0]}>
        <mesh position={[0, 0.42, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.92, 0.92, 0.11, 40]} />
          <meshPhysicalMaterial {...marble} color="#d8d2ca" roughness={0.22} clearcoat={0.16} clearcoatRoughness={0.3} />
        </mesh>
        <mesh position={[0, 0.2, 0]} castShadow>
          <cylinderGeometry args={[0.58, 0.7, 0.38, 24]} />
          <meshStandardMaterial {...metal} color="#4a4239" metalness={0.78} roughness={0.34} />
        </mesh>
        <mesh position={[-1.05, 0.34, 0.5]} castShadow receiveShadow>
          <cylinderGeometry args={[0.58, 0.58, 0.09, 32]} />
          <meshPhysicalMaterial {...marble} color="#c6beb5" roughness={0.28} clearcoat={0.08} />
        </mesh>
      </group>

      <RoundedBox args={[3.35, 0.55, 0.55]} radius={0.08} smoothness={4} position={[0.2, 0.52, -2.72]} castShadow receiveShadow>
        <meshStandardMaterial {...wood} color="#4a4038" roughness={0.5} />
      </RoundedBox>
      <mesh position={[0.2, 2.65, -3.0]} castShadow>
        <boxGeometry args={[3.35, 2.35, 0.07]} />
        <meshStandardMaterial color="#a99b8e" roughness={0.86} />
      </mesh>
      <mesh position={[0.2, 2.65, -2.95]}>
        <boxGeometry args={[2.9, 1.9, 0.03]} />
        <meshStandardMaterial color="#353b3f" roughness={0.8} />
      </mesh>
      <mesh position={[0.2, 4.0, -2.88]}>
        <boxGeometry args={[2.3, 0.045, 0.045]} />
        <meshStandardMaterial {...metal} color={CHAMPAGNE} metalness={0.88} roughness={0.34} />
      </mesh>

      <rectAreaLight width={6.3} height={3.6} intensity={4.1} color="#ffd9ad" position={[0, 4.6, 1.8]} rotation={[-0.25, Math.PI, 0]} />
    </group>
  );
}

function ModernLivingPortal({ textures }: { textures: ModernTextures }) {
  const { plaster, marble, metal } = textures;

  return (
    <group position={[-7.08, 0, -11.4]} rotation={[0, Math.PI / 2, 0]}>
      {[-3.18, 3.18].map((x) => (
        <mesh key={x} position={[x, 3.25, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.34, 6.5, 0.54]} />
          <meshStandardMaterial {...plaster} color="#e1ddd6" roughness={0.7} />
        </mesh>
      ))}
      <mesh position={[0, 6.32, 0]} castShadow receiveShadow>
        <boxGeometry args={[6.7, 0.36, 0.58]} />
        <meshPhysicalMaterial {...marble} color="#cfc9c1" roughness={0.34} clearcoat={0.04} />
      </mesh>
      <mesh position={[0, 6.02, 0.31]}>
        <boxGeometry args={[5.9, 0.055, 0.08]} />
        <meshStandardMaterial {...metal} color={CHAMPAGNE} metalness={0.82} roughness={0.36} emissive="#6b5534" emissiveIntensity={0.12} />
      </mesh>
      <mesh position={[0, 0.13, 0.2]} receiveShadow>
        <boxGeometry args={[6.15, 0.12, 0.46]} />
        <meshPhysicalMaterial {...marble} color="#bdb7af" roughness={0.34} clearcoat={0.05} />
      </mesh>
    </group>
  );
}

function ModernPreviewPortal({
  side,
  z,
  textures,
  accent = '#8fa4ad',
}: {
  side: -1 | 1;
  z: number;
  textures: ModernTextures;
  accent?: string;
}) {
  const { plaster, metal, marble } = textures;
  const x = side * 7.08;
  const rotationY = side < 0 ? Math.PI / 2 : -Math.PI / 2;

  return (
    <group position={[x, 0, z]} rotation={[0, rotationY, 0]}>
      <mesh position={[0, 3.25, -0.08]} castShadow receiveShadow>
        <boxGeometry args={[6.5, 6.5, 0.34]} />
        <meshStandardMaterial {...plaster} color="#ddd8d1" roughness={0.72} />
      </mesh>
      <mesh position={[0, 3.0, 0.14]}>
        <boxGeometry args={[5.65, 5.45, 0.08]} />
        <meshPhysicalMaterial
          color="#101a20"
          roughness={0.28}
          metalness={0.14}
          transparent
          opacity={0.78}
          clearcoat={0.28}
          clearcoatRoughness={0.36}
        />
      </mesh>
      {[-2.94, 2.94].map((frameX) => (
        <mesh key={frameX} position={[frameX, 3.15, 0.18]} castShadow>
          <boxGeometry args={[0.16, 6.0, 0.24]} />
          <meshStandardMaterial {...metal} color={DARK_METAL} metalness={0.72} roughness={0.42} />
        </mesh>
      ))}
      <mesh position={[0, 5.92, 0.25]} castShadow>
        <boxGeometry args={[6.05, 0.11, 0.27]} />
        <meshStandardMaterial {...metal} color={accent} metalness={0.78} roughness={0.34} emissive={accent} emissiveIntensity={0.1} />
      </mesh>
      <mesh position={[0, 0.16, 0.2]} receiveShadow>
        <boxGeometry args={[5.85, 0.12, 0.42]} />
        <meshPhysicalMaterial {...marble} color="#c9c3bb" roughness={0.34} clearcoat={0.05} />
      </mesh>
      <mesh position={[0, 3.0, 0.28]}>
        <boxGeometry args={[0.045, 4.9, 0.035]} />
        <meshStandardMaterial color="#7d8d95" metalness={0.7} roughness={0.38} />
      </mesh>
    </group>
  );
}

function HallWallSegment({
  side,
  center,
  length,
  textures,
}: {
  side: -1 | 1;
  center: number;
  length: number;
  textures: ModernTextures;
}) {
  const { plaster } = textures;

  return (
    <mesh position={[side * 7.35, 4.05, center]} receiveShadow castShadow>
      <boxGeometry args={[0.34, 8.1, length]} />
      <meshStandardMaterial {...plaster} color="#d8d3cc" roughness={0.74} />
    </mesh>
  );
}

function ModernHallShell({ textures }: { textures: ModernTextures }) {
  const { wood, plaster, metal, marble } = textures;
  const ribs = Array.from({ length: 9 }, (_, index) => -2 - index * 6.0);

  return (
    <group>
      <mesh position={[0, -0.08, -24]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[14.8, 60]} />
        <meshStandardMaterial {...wood} color="#6f655c" roughness={0.62} />
      </mesh>
      <mesh position={[0, -0.012, -24]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[3.1, 59]} />
        <meshPhysicalMaterial {...marble} color="#aaa39b" roughness={0.36} clearcoat={0.04} />
      </mesh>
      <mesh position={[0, 8.35, -24]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[14.8, 60]} />
        <meshStandardMaterial {...plaster} color="#e5e0d9" roughness={0.8} side={2} />
      </mesh>

      {LEFT_WALL_SEGMENTS.map((segment) => (
        <HallWallSegment key={`left-${segment.center}`} side={-1} center={segment.center} length={segment.length} textures={textures} />
      ))}
      {RIGHT_WALL_SEGMENTS.map((segment) => (
        <HallWallSegment key={`right-${segment.center}`} side={1} center={segment.center} length={segment.length} textures={textures} />
      ))}

      <Instances limit={ribs.length} castShadow>
        <boxGeometry args={[14.1, 0.24, 0.34]} />
        <meshStandardMaterial {...metal} color="#4b4945" metalness={0.42} roughness={0.46} />
        {ribs.map((z) => <Instance key={z} position={[0, 8.05, z]} />)}
      </Instances>
      <Instances limit={ribs.length}>
        <boxGeometry args={[7.8, 0.035, 0.08]} />
        <meshStandardMaterial color="#f4d7aa" emissive="#dca75c" emissiveIntensity={0.72} toneMapped={false} />
        {ribs.map((z) => <Instance key={`light-${z}`} position={[0, 7.82, z]} />)}
      </Instances>

      <rectAreaLight width={12} height={4.0} intensity={3.2} color="#ffe0b9" position={[0, 6.3, -15]} rotation={[-Math.PI / 2, 0, 0]} />
      <rectAreaLight width={12} height={4.0} intensity={2.5} color="#ffe0b9" position={[0, 6.3, -39]} rotation={[-Math.PI / 2, 0, 0]} />
    </group>
  );
}

export function ModernWingHall() {
  const textures = useModernRoomTextures();

  return (
    <group position={[-25, 0, -24]}>
      <ModernHallShell textures={textures} />
      <ModernLivingPortal textures={textures} />
      <ModernLivingHero textures={textures} />

      <ModernPreviewPortal side={1} z={-21.2} textures={textures} accent="#9aa7ab" />
      <ModernPreviewPortal side={-1} z={-32.8} textures={textures} accent="#8fa4ad" />
      <ModernPreviewPortal side={1} z={-44.4} textures={textures} accent="#a3988c" />

      <group position={[0, 0, -52.8]}>
        <mesh position={[0, 4.05, 0]} receiveShadow>
          <boxGeometry args={[13.8, 8.1, 0.45]} />
          <meshStandardMaterial color="#cbc6bf" roughness={0.76} />
        </mesh>
        <mesh position={[0, 4.2, 0.26]}>
          <boxGeometry args={[5.7, 2.1, 0.08]} />
          <meshStandardMaterial color="#1b252b" roughness={0.44} metalness={0.14} />
        </mesh>
        <mesh position={[0, 5.46, 0.31]}>
          <boxGeometry args={[4.3, 0.055, 0.055]} />
          <meshStandardMaterial color={CHAMPAGNE} metalness={0.84} roughness={0.34} emissive="#6a522e" emissiveIntensity={0.16} />
        </mesh>
      </group>
    </group>
  );
}

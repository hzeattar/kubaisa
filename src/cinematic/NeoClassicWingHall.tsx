import { Instance, Instances, RoundedBox } from '@react-three/drei';
import { useClassicRoomTextures } from '../components/3d/Materials';

const CHAMPAGNE = '#c19d5e';
const DARK_WOOD = '#493529';

type ClassicTextures = ReturnType<typeof useClassicRoomTextures>;

function ClassicSofa({
  width,
  position,
  rotationY = 0,
  textures,
  accent = '#d7c8b8',
}: {
  width: number;
  position: [number, number, number];
  rotationY?: number;
  textures: ClassicTextures;
  accent?: string;
}) {
  const { fabricClassic, metal, wood } = textures;
  const half = width / 2;

  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <RoundedBox args={[width, 0.5, 1.3]} radius={0.16} smoothness={4} position={[0, 0.54, 0]} castShadow receiveShadow>
        <meshStandardMaterial {...fabricClassic} color={accent} roughness={0.8} />
      </RoundedBox>
      <RoundedBox args={[width - 0.2, 1.02, 0.34]} radius={0.17} smoothness={4} position={[0, 1.2, -0.5]} rotation={[-0.06, 0, 0]} castShadow>
        <meshStandardMaterial {...fabricClassic} color={accent} roughness={0.82} />
      </RoundedBox>
      <mesh position={[0, 0.25, 0.03]} castShadow>
        <boxGeometry args={[width + 0.12, 0.11, 1.12]} />
        <meshStandardMaterial {...metal} color={CHAMPAGNE} metalness={0.88} roughness={0.34} />
      </mesh>
      <mesh position={[0, 1.76, -0.56]} castShadow>
        <boxGeometry args={[width - 0.28, 0.08, 0.11]} />
        <meshStandardMaterial {...metal} color={CHAMPAGNE} metalness={0.9} roughness={0.3} />
      </mesh>
      {[-1, 1].map((side) => (
        <group key={side} position={[side * (half + 0.08), 0, 0]}>
          <RoundedBox args={[0.3, 0.78, 1.2]} radius={0.13} smoothness={4} position={[0, 0.78, 0]} castShadow>
            <meshStandardMaterial {...fabricClassic} color={accent} roughness={0.82} />
          </RoundedBox>
          <mesh position={[0, 1.22, -0.04]} castShadow>
            <sphereGeometry args={[0.13, 12, 10]} />
            <meshStandardMaterial {...metal} color={CHAMPAGNE} metalness={0.9} roughness={0.3} />
          </mesh>
        </group>
      ))}
      {[-1, 1].map((side) => (
        <mesh key={`leg-${side}`} position={[side * (half - 0.4), 0.14, 0.15]} castShadow>
          <cylinderGeometry args={[0.055, 0.08, 0.3, 12]} />
          <meshStandardMaterial {...wood} color={DARK_WOOD} roughness={0.54} />
        </mesh>
      ))}
    </group>
  );
}

function NeoSalonHero({ textures }: { textures: ClassicTextures }) {
  const { plaster, marble, metal, wood } = textures;

  return (
    <group position={[10.65, 0, -11.4]} rotation={[0, -Math.PI / 2, 0]}>
      <mesh position={[0, 3.25, -3.25]} receiveShadow castShadow>
        <boxGeometry args={[8.5, 6.5, 0.24]} />
        <meshStandardMaterial {...plaster} color="#e7ddcf" roughness={0.72} />
      </mesh>
      <mesh position={[0, 0.015, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[8.5, 7.6]} />
        <meshPhysicalMaterial {...marble} color="#c7b9a7" roughness={0.3} clearcoat={0.07} clearcoatRoughness={0.46} />
      </mesh>
      <RoundedBox args={[6.6, 0.04, 4.9]} radius={0.16} smoothness={4} position={[0, 0.055, -0.1]} receiveShadow>
        <meshStandardMaterial color="#8b7968" roughness={0.95} />
      </RoundedBox>

      {/* Restrained classical wall panelling behind the hero set. */}
      {[-2.45, 0, 2.45].map((x) => (
        <group key={x} position={[x, 3.05, -3.08]}>
          <mesh receiveShadow>
            <boxGeometry args={[2.05, 3.75, 0.06]} />
            <meshStandardMaterial {...plaster} color="#f0e7da" roughness={0.68} />
          </mesh>
          <mesh position={[0, 0, 0.045]}>
            <boxGeometry args={[1.72, 3.42, 0.025]} />
            <meshStandardMaterial {...plaster} color="#e5d9c8" roughness={0.74} />
          </mesh>
        </group>
      ))}
      <mesh position={[0, 5.25, -2.96]} castShadow>
        <boxGeometry args={[7.7, 0.075, 0.08]} />
        <meshStandardMaterial {...metal} color={CHAMPAGNE} metalness={0.88} roughness={0.34} />
      </mesh>

      <group position={[0, 0, -0.75]}>
        <ClassicSofa width={4.35} position={[0, 0, -1.35]} textures={textures} />
        <ClassicSofa width={1.8} position={[-3.0, 0, 1.05]} rotationY={0.62} textures={textures} accent="#cab7a2" />
        <ClassicSofa width={1.8} position={[3.0, 0, 1.05]} rotationY={-0.62} textures={textures} accent="#cab7a2" />

        <group position={[0, 0, 0.95]}>
          <RoundedBox args={[2.65, 0.12, 1.55]} radius={0.15} smoothness={4} position={[0, 0.56, 0]} castShadow receiveShadow>
            <meshPhysicalMaterial {...marble} color="#e0d6c8" roughness={0.2} clearcoat={0.1} clearcoatRoughness={0.32} />
          </RoundedBox>
          <RoundedBox args={[2.48, 0.08, 1.38]} radius={0.13} smoothness={3} position={[0, 0.47, 0]} castShadow>
            <meshStandardMaterial {...metal} color={CHAMPAGNE} metalness={0.9} roughness={0.32} />
          </RoundedBox>
          {[-0.95, 0.95].flatMap((x) => [-0.48, 0.48].map((z) => (
            <mesh key={`${x}-${z}`} position={[x, 0.25, z]} castShadow>
              <cylinderGeometry args={[0.045, 0.06, 0.48, 10]} />
              <meshStandardMaterial {...metal} color="#aa8247" metalness={0.88} roughness={0.36} />
            </mesh>
          )))}
        </group>
      </group>

      <group position={[0, 0, 2.85]}>
        <RoundedBox args={[3.2, 0.62, 0.48]} radius={0.07} smoothness={3} position={[0, 0.48, 0]} castShadow receiveShadow>
          <meshStandardMaterial {...wood} color="#513b2d" roughness={0.5} />
        </RoundedBox>
        <RoundedBox args={[3.38, 0.11, 0.58]} radius={0.04} smoothness={3} position={[0, 0.85, 0]} castShadow>
          <meshPhysicalMaterial {...marble} color="#ddd2c4" roughness={0.22} clearcoat={0.06} />
        </RoundedBox>
        <mesh position={[0, 2.35, -0.08]} castShadow>
          <torusGeometry args={[1.0, 0.065, 12, 40]} />
          <meshStandardMaterial {...metal} color={CHAMPAGNE} metalness={0.9} roughness={0.3} />
        </mesh>
        <mesh position={[0, 2.35, -0.11]}>
          <circleGeometry args={[0.92, 40]} />
          <meshPhysicalMaterial color="#899397" roughness={0.08} metalness={0.72} envMapIntensity={1.35} />
        </mesh>
      </group>

      <rectAreaLight width={6.5} height={3.8} intensity={4.0} color="#ffd6a3" position={[0, 4.8, 2.0]} rotation={[-0.25, Math.PI, 0]} />
    </group>
  );
}

function ClassicPreviewPortal({
  side,
  z,
  textures,
}: {
  side: -1 | 1;
  z: number;
  textures: ClassicTextures;
}) {
  const { plaster, metal, marble } = textures;
  const x = side * 7.02;
  const rotationY = side < 0 ? Math.PI / 2 : -Math.PI / 2;

  return (
    <group position={[x, 0, z]} rotation={[0, rotationY, 0]}>
      <mesh position={[0, 2.55, -0.08]}>
        <boxGeometry args={[4.8, 4.8, 0.36]} />
        <meshStandardMaterial color="#17120e" roughness={0.4} />
      </mesh>
      <mesh position={[0, 4.8, -0.08]} rotation={[0, 0, 0]}>
        <circleGeometry args={[2.4, 36, 0, Math.PI]} />
        <meshStandardMaterial color="#17120e" roughness={0.4} side={2} />
      </mesh>

      {[-2.58, 2.58].map((frameX) => (
        <mesh key={frameX} position={[frameX, 3.15, 0.18]} castShadow receiveShadow>
          <boxGeometry args={[0.34, 6.25, 0.44]} />
          <meshStandardMaterial {...plaster} color="#e7dccd" roughness={0.68} />
        </mesh>
      ))}
      <mesh position={[0, 4.82, 0.2]} castShadow>
        <torusGeometry args={[2.58, 0.16, 10, 48, Math.PI]} />
        <meshPhysicalMaterial {...marble} color="#ded1bf" roughness={0.3} clearcoat={0.05} />
      </mesh>
      <mesh position={[0, 5.02, 0.3]} castShadow>
        <torusGeometry args={[2.58, 0.045, 8, 48, Math.PI]} />
        <meshStandardMaterial {...metal} color={CHAMPAGNE} metalness={0.9} roughness={0.3} emissive="#654a23" emissiveIntensity={0.12} />
      </mesh>
      <mesh position={[0, 0.16, 0.19]} receiveShadow>
        <boxGeometry args={[4.95, 0.13, 0.44]} />
        <meshPhysicalMaterial {...marble} color="#c7b7a3" roughness={0.32} clearcoat={0.05} />
      </mesh>
      <mesh position={[0, 2.7, 0.23]}>
        <boxGeometry args={[0.045, 4.65, 0.04]} />
        <meshStandardMaterial {...metal} color="#8e6f40" metalness={0.82} roughness={0.36} />
      </mesh>
    </group>
  );
}

function WallSegment({
  side,
  z,
  length,
  textures,
}: {
  side: -1 | 1;
  z: number;
  length: number;
  textures: ClassicTextures;
}) {
  const { plaster, marble } = textures;
  const x = side * 7.35;

  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, 4.05, 0]} receiveShadow castShadow>
        <boxGeometry args={[0.34, 8.1, length]} />
        <meshStandardMaterial {...plaster} color="#e8ded1" roughness={0.72} />
      </mesh>
      <mesh position={[side * -0.18, 1.15, 0]} castShadow>
        <boxGeometry args={[0.08, 0.1, Math.max(0.2, length - 0.25)]} />
        <meshStandardMaterial {...marble} color="#c9b9a5" roughness={0.38} />
      </mesh>
    </group>
  );
}

function NeoClassicHallShell({ textures }: { textures: ClassicTextures }) {
  const { marble, plaster, metal } = textures;
  const ceilingStations = [-2, -8, -14, -20, -26, -32, -38, -44, -50];

  return (
    <group>
      <mesh position={[0, -0.08, -24]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[14.8, 60]} />
        <meshPhysicalMaterial {...marble} color="#b9aa97" roughness={0.32} clearcoat={0.06} clearcoatRoughness={0.48} />
      </mesh>
      <mesh position={[0, -0.015, -24]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[3.2, 59]} />
        <meshStandardMaterial color="#7d6856" roughness={0.9} />
      </mesh>
      <mesh position={[0, 8.4, -24]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[14.8, 60]} />
        <meshStandardMaterial {...plaster} color="#eee4d7" roughness={0.78} side={2} />
      </mesh>

      {/* Left wall: one Dining preview opening. */}
      <WallSegment side={-1} z={-7.15} length={26.3} textures={textures} />
      <WallSegment side={-1} z={-40.65} length={26.7} textures={textures} />

      {/* Right wall: Salon hero opening followed by Bedroom preview. */}
      <WallSegment side={1} z={-0.95} length={13.9} textures={textures} />
      <WallSegment side={1} z={-23.7} length={17.6} textures={textures} />
      <WallSegment side={1} z={-46.75} length={14.5} textures={textures} />

      <Instances limit={ceilingStations.length} castShadow>
        <boxGeometry args={[14.1, 0.22, 0.38]} />
        <meshStandardMaterial {...plaster} color="#d7c9b8" roughness={0.66} />
        {ceilingStations.map((z) => <Instance key={z} position={[0, 8.08, z]} />)}
      </Instances>
      <Instances limit={ceilingStations.length}>
        <boxGeometry args={[8.0, 0.035, 0.08]} />
        <meshStandardMaterial color="#f5d39d" emissive="#d79b4d" emissiveIntensity={0.58} toneMapped={false} />
        {ceilingStations.map((z) => <Instance key={`light-${z}`} position={[0, 7.84, z]} />)}
      </Instances>

      {/* Ceiling medallions are cheap geometry but make the classic hall read differently from Modern. */}
      {[-8, -26, -44].map((z) => (
        <group key={`medallion-${z}`} position={[0, 8.0, z]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh>
            <cylinderGeometry args={[1.15, 1.15, 0.08, 32]} />
            <meshStandardMaterial {...plaster} color="#eadfD1" roughness={0.68} />
          </mesh>
          <mesh position={[0, 0.06, 0]}>
            <torusGeometry args={[0.78, 0.045, 8, 32]} />
            <meshStandardMaterial {...metal} color={CHAMPAGNE} metalness={0.86} roughness={0.34} />
          </mesh>
        </group>
      ))}

      <rectAreaLight width={12} height={4.2} intensity={3.4} color="#ffd6a3" position={[0, 6.5, -14]} rotation={[-Math.PI / 2, 0, 0]} />
      <rectAreaLight width={12} height={4.2} intensity={2.8} color="#ffd1a0" position={[0, 6.5, -39]} rotation={[-Math.PI / 2, 0, 0]} />
    </group>
  );
}

export function NeoClassicWingHall() {
  const textures = useClassicRoomTextures();
  const { plaster, marble, metal, wood } = textures;

  return (
    <group position={[25, 0, -24]}>
      <NeoClassicHallShell textures={textures} />
      <NeoSalonHero textures={textures} />

      <ClassicPreviewPortal side={-1} z={-23.8} textures={textures} />
      <ClassicPreviewPortal side={1} z={-36.0} textures={textures} />

      <group position={[0, 0, -53.1]}>
        <mesh position={[0, 4.05, 0]} receiveShadow>
          <boxGeometry args={[13.8, 8.1, 0.45]} />
          <meshStandardMaterial {...plaster} color="#d9cdbf" roughness={0.72} />
        </mesh>
        <RoundedBox args={[5.0, 1.2, 0.58]} radius={0.08} smoothness={3} position={[0, 0.72, 0.42]} castShadow receiveShadow>
          <meshStandardMaterial {...wood} color="#523b2d" roughness={0.48} />
        </RoundedBox>
        <RoundedBox args={[5.2, 0.11, 0.66]} radius={0.04} smoothness={3} position={[0, 1.36, 0.42]} castShadow>
          <meshPhysicalMaterial {...marble} color="#d8cdbf" roughness={0.2} clearcoat={0.06} />
        </RoundedBox>
        <mesh position={[0, 4.5, 0.27]} castShadow>
          <torusGeometry args={[1.22, 0.075, 12, 42]} />
          <meshStandardMaterial {...metal} color={CHAMPAGNE} metalness={0.9} roughness={0.3} />
        </mesh>
        <mesh position={[0, 4.5, 0.24]}>
          <circleGeometry args={[1.1, 42]} />
          <meshPhysicalMaterial color="#8e999c" roughness={0.08} metalness={0.72} envMapIntensity={1.35} />
        </mesh>
      </group>
    </group>
  );
}

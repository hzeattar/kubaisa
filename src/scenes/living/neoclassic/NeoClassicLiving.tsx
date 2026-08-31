import React from 'react';
import { Instance, Instances, RoundedBox } from '@react-three/drei';
import { useClassicRoomTextures } from '../../../components/3d/Materials';

const CHAMPAGNE = '#c19d5e';
const DARK_WOOD = '#493329';
const DARK_GLASS = '#10171a';

type ClassicTextures = ReturnType<typeof useClassicRoomTextures>;

type ClassicSeatProps = {
  position: [number, number, number];
  textures: ClassicTextures;
  rotationY?: number;
  width?: number;
  accent?: string;
};

const ClassicSeat: React.FC<ClassicSeatProps> = ({
  position,
  textures,
  rotationY = 0,
  width = 3.8,
  accent = '#d8c8b8',
}) => {
  const { fabricClassic, wood, metal } = textures;
  const halfWidth = width / 2;

  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <RoundedBox args={[width, 0.5, 1.35]} radius={0.16} smoothness={4} position={[0, 0.55, 0]} castShadow receiveShadow>
        <meshStandardMaterial {...fabricClassic} color={accent} roughness={0.8} />
      </RoundedBox>
      <RoundedBox args={[width - 0.25, 1.12, 0.34]} radius={0.18} smoothness={4} position={[0, 1.23, -0.52]} rotation={[-0.06, 0, 0]} castShadow receiveShadow>
        <meshStandardMaterial {...fabricClassic} color={accent} roughness={0.82} />
      </RoundedBox>

      <mesh position={[0, 0.23, 0.05]} castShadow>
        <boxGeometry args={[width + 0.18, 0.12, 1.18]} />
        <meshStandardMaterial {...metal} color={CHAMPAGNE} roughness={0.34} metalness={0.88} />
      </mesh>
      <mesh position={[0, 1.84, -0.58]} castShadow>
        <boxGeometry args={[width - 0.2, 0.09, 0.14]} />
        <meshStandardMaterial {...metal} color="#d2ae69" roughness={0.3} metalness={0.9} />
      </mesh>
      <mesh position={[0, 1.92, -0.58]} rotation={[0, 0, Math.PI]} scale={[1.45, 1, 1]} castShadow>
        <torusGeometry args={[0.62, 0.045, 10, 36, Math.PI]} />
        <meshStandardMaterial {...metal} color="#d2ae69" roughness={0.3} metalness={0.9} />
      </mesh>

      {[-1, 1].map((side) => (
        <group key={side} position={[side * (halfWidth + 0.12), 0, 0]}>
          <RoundedBox args={[0.34, 0.84, 1.26]} radius={0.15} smoothness={4} position={[0, 0.81, 0]} castShadow receiveShadow>
            <meshStandardMaterial {...fabricClassic} color={accent} roughness={0.82} />
          </RoundedBox>
          <mesh position={[0, 1.27, -0.05]} castShadow>
            <sphereGeometry args={[0.15, 14, 10]} />
            <meshStandardMaterial {...metal} color={CHAMPAGNE} roughness={0.32} metalness={0.9} />
          </mesh>
        </group>
      ))}

      {[-1, 1].flatMap((side) => [-1, 1].map((depth) => (
        <mesh key={`${side}-${depth}`} position={[side * (halfWidth - 0.36), 0.13, depth * 0.37]} castShadow>
          <cylinderGeometry args={[0.05, 0.075, 0.32, 12]} />
          <meshStandardMaterial {...wood} color={DARK_WOOD} roughness={0.55} />
        </mesh>
      )))}
    </group>
  );
};

function ClassicCoffeeTable({ textures }: { textures: ClassicTextures }) {
  const { marble, metal } = textures;

  return (
    <group position={[0, 0, 0.7]}>
      <RoundedBox args={[2.8, 0.13, 1.65]} radius={0.2} smoothness={4} position={[0, 0.62, 0]} castShadow receiveShadow>
        <meshPhysicalMaterial
          {...marble}
          color="#e1d6c7"
          roughness={0.2}
          clearcoat={0.1}
          clearcoatRoughness={0.32}
        />
      </RoundedBox>
      <RoundedBox args={[2.62, 0.09, 1.48]} radius={0.18} smoothness={4} position={[0, 0.52, 0]} castShadow>
        <meshStandardMaterial {...metal} color={CHAMPAGNE} roughness={0.3} metalness={0.9} />
      </RoundedBox>
      {[-1.1, 1.1].flatMap((x) => [-0.58, 0.58].map((z) => (
        <mesh key={`${x}-${z}`} position={[x, 0.27, z]} castShadow>
          <cylinderGeometry args={[0.05, 0.035, 0.5, 12]} />
          <meshStandardMaterial {...metal} color="#a9834a" roughness={0.34} metalness={0.88} />
        </mesh>
      )))}
    </group>
  );
}

function ArchedShowroomWindow({ x, textures }: { x: number; textures: ClassicTextures }) {
  const { plaster, marble, metal } = textures;
  const width = 3.25;
  const radius = width / 2;
  const rectHeight = 4.25;
  const archY = rectHeight / 2;
  const rectY = -radius / 2;

  return (
    <group position={[x, 4.1, -13.02]}>
      {/* Layered reveal gives the glass believable depth without a heavy boolean mesh. */}
      <mesh position={[0, 0, -0.18]} castShadow receiveShadow>
        <boxGeometry args={[4.0, 6.75, 0.54]} />
        <meshStandardMaterial {...plaster} color="#d8cdbf" roughness={0.7} />
      </mesh>

      <mesh position={[0, rectY, 0.11]}>
        <boxGeometry args={[width, rectHeight, 0.08]} />
        <meshPhysicalMaterial
          color={DARK_GLASS}
          roughness={0.08}
          metalness={0.05}
          clearcoat={0.88}
          clearcoatRoughness={0.13}
          transparent
          opacity={0.88}
          envMapIntensity={1.25}
        />
      </mesh>
      <mesh position={[0, archY, 0.11]}>
        <circleGeometry args={[radius, 40, 0, Math.PI]} />
        <meshPhysicalMaterial
          color={DARK_GLASS}
          roughness={0.08}
          metalness={0.05}
          clearcoat={0.88}
          clearcoatRoughness={0.13}
          transparent
          opacity={0.88}
          envMapIntensity={1.25}
          side={2}
        />
      </mesh>

      <mesh position={[0, archY, 0.2]} castShadow>
        <torusGeometry args={[radius + 0.11, 0.11, 12, 48, Math.PI]} />
        <meshPhysicalMaterial {...marble} color="#ded1bf" roughness={0.3} clearcoat={0.05} />
      </mesh>
      <mesh position={[0, archY + 0.18, 0.27]} castShadow>
        <torusGeometry args={[radius + 0.12, 0.035, 8, 48, Math.PI]} />
        <meshStandardMaterial {...metal} color={CHAMPAGNE} metalness={0.9} roughness={0.32} />
      </mesh>

      <mesh position={[0, rectY, 0.21]} castShadow>
        <boxGeometry args={[0.05, rectHeight - 0.12, 0.08]} />
        <meshStandardMaterial {...metal} color="#554638" metalness={0.74} roughness={0.4} />
      </mesh>
      <mesh position={[0, rectY + 0.82, 0.21]} castShadow>
        <boxGeometry args={[width - 0.12, 0.05, 0.08]} />
        <meshStandardMaterial {...metal} color="#554638" metalness={0.74} roughness={0.4} />
      </mesh>
      <mesh position={[0, rectY - 0.78, 0.21]} castShadow>
        <boxGeometry args={[width - 0.12, 0.05, 0.08]} />
        <meshStandardMaterial {...metal} color="#554638" metalness={0.74} roughness={0.4} />
      </mesh>

      <mesh position={[0, -3.13, 0.06]} castShadow receiveShadow>
        <boxGeometry args={[4.15, 0.18, 0.76]} />
        <meshPhysicalMaterial {...marble} color="#c9baa7" roughness={0.31} clearcoat={0.05} />
      </mesh>
    </group>
  );
}

function SalonShell({ textures }: { textures: ClassicTextures }) {
  const { wood, plaster, marble, metal } = textures;
  const cofferX = [-6.8, -2.25, 2.25, 6.8];
  const sidePanelZ = [-8.5, -3.0, 2.5, 8.0];

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 28]} />
        <meshStandardMaterial {...wood} color="#654b39" roughness={0.54} />
      </mesh>
      <mesh position={[0, 0.018, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[18.2, 26.2]} />
        <meshPhysicalMaterial {...marble} color="#b7a691" roughness={0.34} clearcoat={0.045} clearcoatRoughness={0.52} />
      </mesh>
      <RoundedBox args={[13.8, 0.04, 17.4]} radius={0.18} smoothness={4} position={[0, 0.052, -1.6]} receiveShadow>
        <meshStandardMaterial color="#8b7866" roughness={0.96} />
      </RoundedBox>

      <mesh position={[0, 4.5, -13.5]} receiveShadow castShadow>
        <boxGeometry args={[20, 9, 0.72]} />
        <meshStandardMaterial {...plaster} color="#e8ded1" roughness={0.73} />
      </mesh>
      <mesh position={[-9.65, 4.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow castShadow>
        <boxGeometry args={[28, 9, 0.7]} />
        <meshStandardMaterial {...plaster} color="#dfd3c4" roughness={0.74} />
      </mesh>
      <mesh position={[9.65, 4.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow castShadow>
        <boxGeometry args={[28, 9, 0.7]} />
        <meshStandardMaterial {...plaster} color="#e4d9cc" roughness={0.74} />
      </mesh>
      <mesh position={[0, 8.82, 0]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 28]} />
        <meshStandardMaterial {...plaster} color="#ece2d6" roughness={0.8} side={2} />
      </mesh>

      <ArchedShowroomWindow x={-5} textures={textures} />
      <ArchedShowroomWindow x={5} textures={textures} />

      {/* Keep moulding only in solid wall zones so it never covers the glazing. */}
      {[-8.2, 0, 8.2].map((x) => (
        <group key={`rear-panel-${x}`} position={[x, 3.05, -13.08]}>
          <mesh receiveShadow castShadow>
            <boxGeometry args={[1.25, 3.8, 0.07]} />
            <meshStandardMaterial {...plaster} color="#f0e7dc" roughness={0.69} />
          </mesh>
          <mesh position={[0, 0, 0.045]}>
            <boxGeometry args={[0.96, 3.48, 0.025]} />
            <meshStandardMaterial {...plaster} color="#dfd4c6" roughness={0.75} />
          </mesh>
        </group>
      ))}

      <Instances limit={sidePanelZ.length * 2} castShadow>
        <boxGeometry args={[0.065, 3.55, 2.6]} />
        <meshStandardMaterial {...plaster} color="#eee4d8" roughness={0.71} />
        {[-9.28, 9.28].flatMap((x) => sidePanelZ.map((z) => (
          <Instance key={`${x}-${z}`} position={[x, 3.05, z]} />
        )))}
      </Instances>

      <Instances limit={cofferX.length} castShadow>
        <boxGeometry args={[3.55, 0.18, 25.8]} />
        <meshStandardMaterial {...plaster} color="#d5c7b7" roughness={0.68} />
        {cofferX.map((x) => <Instance key={x} position={[x, 8.52, 0]} />)}
      </Instances>
      <Instances limit={3} castShadow>
        <boxGeometry args={[18.6, 0.18, 0.28]} />
        <meshStandardMaterial {...plaster} color="#d5c7b7" roughness={0.68} />
        {[-7.3, 0, 7.3].map((z) => <Instance key={z} position={[0, 8.5, z]} />)}
      </Instances>

      <group position={[0, 8.38, -1.6]}>
        <mesh>
          <cylinderGeometry args={[1.1, 1.1, 0.09, 36]} />
          <meshStandardMaterial {...plaster} color="#eadfd1" roughness={0.68} />
        </mesh>
        <mesh position={[0, -0.06, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.76, 0.045, 8, 36]} />
          <meshStandardMaterial {...metal} color={CHAMPAGNE} metalness={0.88} roughness={0.33} />
        </mesh>
      </group>

      <mesh position={[0, 1.18, -13.08]} castShadow>
        <boxGeometry args={[17.4, 0.055, 0.06]} />
        <meshStandardMaterial {...metal} color={CHAMPAGNE} metalness={0.82} roughness={0.38} />
      </mesh>

      <rectAreaLight position={[0, 6.45, 3.6]} rotation={[-Math.PI / 2.25, 0, 0]} width={11} height={5.0} intensity={3.7} color="#ffe0b4" />
      <rectAreaLight position={[0, 6.7, -8.2]} rotation={[-Math.PI / 2, 0, 0]} width={12} height={3.4} intensity={2.8} color="#ffd5a2" />
    </group>
  );
}

export const NeoClassicLiving: React.FC = () => {
  const textures = useClassicRoomTextures();
  const { wood, marble, metal } = textures;

  return (
    <group>
      <SalonShell textures={textures} />

      {/* Keep the hero sofa around z=-5.4 so the existing product hotspot stays aligned. */}
      <group position={[0, 0, -3]}>
        <ClassicSeat textures={textures} position={[0, 0, -2.4]} width={4.25} accent="#d5c5b3" />
        <ClassicSeat textures={textures} position={[-4.65, 0, 1]} rotationY={Math.PI / 2.25} width={2.05} accent="#c8b29c" />
        <ClassicSeat textures={textures} position={[4.65, 0, 1]} rotationY={-Math.PI / 2.25} width={2.05} accent="#c8b29c" />
        <ClassicCoffeeTable textures={textures} />
      </group>

      <group position={[0, 0, 7.4]}>
        <RoundedBox args={[4.8, 1.2, 0.56]} radius={0.07} smoothness={3} position={[0, 0.7, 0]} castShadow receiveShadow>
          <meshStandardMaterial {...wood} color="#50392b" roughness={0.5} />
        </RoundedBox>
        <RoundedBox args={[5.0, 0.11, 0.68]} radius={0.04} smoothness={3} position={[0, 1.34, 0]} castShadow receiveShadow>
          <meshPhysicalMaterial {...marble} color="#d9cdbf" roughness={0.21} clearcoat={0.07} />
        </RoundedBox>
        <mesh position={[0, 3.45, -0.12]} castShadow>
          <torusGeometry args={[1.38, 0.075, 12, 48]} />
          <meshStandardMaterial {...metal} color={CHAMPAGNE} roughness={0.31} metalness={0.9} />
        </mesh>
        <mesh position={[0, 3.45, -0.15]}>
          <circleGeometry args={[1.28, 48]} />
          <meshPhysicalMaterial color="#8f999c" roughness={0.08} metalness={0.72} envMapIntensity={1.4} />
        </mesh>
      </group>
    </group>
  );
};

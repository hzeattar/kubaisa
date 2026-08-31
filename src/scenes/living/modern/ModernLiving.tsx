import React from 'react';
import { Instance, Instances, RoundedBox } from '@react-three/drei';
import { useModernRoomTextures } from '../../../components/3d/Materials';

const CHAMPAGNE = '#b99a61';
const DARK_METAL = '#24282b';

type ModernTextures = ReturnType<typeof useModernRoomTextures>;
type SeatModuleProps = {
  position: [number, number, number];
  textures: ModernTextures;
  rotationY?: number;
  width?: number;
  armLeft?: boolean;
  armRight?: boolean;
};

const SeatModule: React.FC<SeatModuleProps> = ({
  position,
  textures,
  rotationY = 0,
  width = 1.75,
  armLeft = false,
  armRight = false,
}) => {
  const { fabricModern } = textures;

  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <RoundedBox args={[width, 0.42, 1.45]} radius={0.18} smoothness={4} position={[0, 0.48, 0]} castShadow receiveShadow>
        <meshStandardMaterial {...fabricModern} color="#ded7ce" roughness={0.84} />
      </RoundedBox>
      <RoundedBox args={[width, 0.92, 0.34]} radius={0.16} smoothness={4} position={[0, 1.05, -0.57]} rotation={[-0.08, 0, 0]} castShadow receiveShadow>
        <meshStandardMaterial {...fabricModern} color="#d8d0c7" roughness={0.86} />
      </RoundedBox>
      {armLeft && (
        <RoundedBox args={[0.34, 0.72, 1.42]} radius={0.15} smoothness={4} position={[-width / 2 - 0.12, 0.76, 0]} castShadow receiveShadow>
          <meshStandardMaterial {...fabricModern} color="#d6cec4" roughness={0.86} />
        </RoundedBox>
      )}
      {armRight && (
        <RoundedBox args={[0.34, 0.72, 1.42]} radius={0.15} smoothness={4} position={[width / 2 + 0.12, 0.76, 0]} castShadow receiveShadow>
          <meshStandardMaterial {...fabricModern} color="#d6cec4" roughness={0.86} />
        </RoundedBox>
      )}
    </group>
  );
};

const LoungeChair: React.FC<{
  position: [number, number, number];
  rotationY: number;
  textures: ModernTextures;
}> = ({ position, rotationY, textures }) => {
  const { fabricModern, wood } = textures;

  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <RoundedBox args={[1.55, 0.46, 1.55]} radius={0.22} smoothness={4} position={[0, 0.5, 0]} castShadow receiveShadow>
        <meshStandardMaterial {...fabricModern} color="#b8ada2" roughness={0.84} />
      </RoundedBox>
      <RoundedBox args={[1.5, 1.08, 0.34]} radius={0.2} smoothness={4} position={[0, 1.1, -0.57]} rotation={[-0.1, 0, 0]} castShadow receiveShadow>
        <meshStandardMaterial {...fabricModern} color="#b8ada2" roughness={0.86} />
      </RoundedBox>
      {[-0.56, 0.56].map((x) => (
        <mesh key={x} position={[x, 0.18, 0.25]} castShadow>
          <cylinderGeometry args={[0.05, 0.06, 0.36, 12]} />
          <meshStandardMaterial {...wood} color="#3b3029" roughness={0.58} />
        </mesh>
      ))}
    </group>
  );
};

function ShowroomWindow({ x, textures }: { x: number; textures: ModernTextures }) {
  const { plaster, metal, marble } = textures;

  return (
    <group position={[x, 4.15, -13.02]}>
      <mesh position={[0, 0, -0.15]} castShadow receiveShadow>
        <boxGeometry args={[4.55, 6.25, 0.5]} />
        <meshStandardMaterial {...plaster} color="#d8d3cc" roughness={0.72} />
      </mesh>
      <mesh position={[0, 0, 0.13]}>
        <boxGeometry args={[4.0, 5.7, 0.08]} />
        <meshPhysicalMaterial
          color="#07131b"
          roughness={0.08}
          metalness={0.05}
          clearcoat={0.9}
          clearcoatRoughness={0.12}
          transparent
          opacity={0.86}
          envMapIntensity={1.25}
        />
      </mesh>
      <mesh position={[0, 0, 0.2]} castShadow>
        <boxGeometry args={[0.055, 5.55, 0.08]} />
        <meshStandardMaterial {...metal} color={DARK_METAL} metalness={0.78} roughness={0.38} />
      </mesh>
      {[-1.32, 1.32].map((y) => (
        <mesh key={y} position={[0, y, 0.2]} castShadow>
          <boxGeometry args={[3.92, 0.055, 0.08]} />
          <meshStandardMaterial {...metal} color={DARK_METAL} metalness={0.78} roughness={0.38} />
        </mesh>
      ))}
      <mesh position={[0, -3.1, 0.06]} castShadow receiveShadow>
        <boxGeometry args={[4.75, 0.18, 0.72]} />
        <meshPhysicalMaterial {...marble} color="#cbc4bc" roughness={0.32} clearcoat={0.06} />
      </mesh>
    </group>
  );
}

function RoomShell({ textures }: { textures: ModernTextures }) {
  const { wood, plaster, metal } = textures;
  const ceilingRibs = [-7.5, -2.5, 2.5, 7.5];
  const panelCenters = [-8.25, 0, 8.25];

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 28]} />
        <meshStandardMaterial {...wood} color="#8a7b6d" roughness={0.6} />
      </mesh>

      <RoundedBox args={[12.4, 0.045, 10.0]} radius={0.18} smoothness={4} position={[0, 0.055, -2.6]} receiveShadow>
        <meshStandardMaterial color="#b9b0a5" roughness={0.97} />
      </RoundedBox>

      <mesh position={[0, 4.5, -13.5]} receiveShadow castShadow>
        <boxGeometry args={[20, 9, 0.72]} />
        <meshStandardMaterial {...plaster} color="#e7e2db" roughness={0.76} />
      </mesh>
      <mesh position={[-9.65, 4.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow castShadow>
        <boxGeometry args={[28, 9, 0.7]} />
        <meshStandardMaterial {...plaster} color="#d6d0c8" roughness={0.78} />
      </mesh>
      <mesh position={[9.65, 4.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow castShadow>
        <boxGeometry args={[28, 9, 0.7]} />
        <meshStandardMaterial {...plaster} color="#ddd8d1" roughness={0.78} />
      </mesh>
      <mesh position={[0, 8.82, 0]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 28]} />
        <meshStandardMaterial {...plaster} color="#e6e1da" roughness={0.82} side={2} />
      </mesh>

      <ShowroomWindow x={-5.0} textures={textures} />
      <ShowroomWindow x={5.0} textures={textures} />

      {/* Panels live only in the solid wall zones so they never cover the glazing. */}
      <Instances limit={panelCenters.length} castShadow>
        <boxGeometry args={[1.3, 3.8, 0.07]} />
        <meshStandardMaterial {...plaster} color="#eee9e2" roughness={0.72} />
        {panelCenters.map((x) => (
          <Instance key={x} position={[x, 3.0, -13.1]} />
        ))}
      </Instances>

      <Instances limit={ceilingRibs.length} castShadow>
        <boxGeometry args={[19.0, 0.18, 0.32]} />
        <meshStandardMaterial {...metal} color="#625a51" metalness={0.28} roughness={0.5} />
        {ceilingRibs.map((z) => (
          <Instance key={z} position={[0, 8.56, z]} />
        ))}
      </Instances>
      <Instances limit={ceilingRibs.length}>
        <boxGeometry args={[9.5, 0.035, 0.08]} />
        <meshStandardMaterial color="#f5d9ad" emissive="#dda95e" emissiveIntensity={0.68} toneMapped={false} />
        {ceilingRibs.map((z) => (
          <Instance key={`light-${z}`} position={[0, 8.43, z]} />
        ))}
      </Instances>

      <mesh position={[0, 1.18, -13.1]} castShadow>
        <boxGeometry args={[17.5, 0.055, 0.06]} />
        <meshStandardMaterial {...metal} color={CHAMPAGNE} metalness={0.82} roughness={0.38} />
      </mesh>

      <rectAreaLight position={[0, 6.5, 3.8]} rotation={[-Math.PI / 2.25, 0, 0]} width={11} height={5} intensity={3.8} color="#ffe4bf" />
      <rectAreaLight position={[0, 6.8, -8]} rotation={[-Math.PI / 2, 0, 0]} width={12} height={3.5} intensity={2.8} color="#ffe0b5" />
    </group>
  );
}

export const ModernLiving: React.FC = () => {
  const textures = useModernRoomTextures();
  const { wood, marble, metal, fabricModern } = textures;

  return (
    <group>
      <RoomShell textures={textures} />

      <group position={[0, 0, -3]}>
        <SeatModule textures={textures} position={[-1.65, 0, -1.2]} rotationY={0.13} armLeft />
        <SeatModule textures={textures} position={[0, 0, -1.45]} width={1.8} />
        <SeatModule textures={textures} position={[1.65, 0, -1.2]} rotationY={-0.13} armRight />
        <LoungeChair textures={textures} position={[-4.25, 0, 1.65]} rotationY={0.72} />
        <LoungeChair textures={textures} position={[4.25, 0, 1.65]} rotationY={-0.72} />

        {[-1.45, 0, 1.45].map((x, index) => (
          <RoundedBox
            key={x}
            args={[0.72, 0.72, 0.18]}
            radius={0.12}
            smoothness={4}
            position={[x, 1.15, -1.85]}
            rotation={[0.04, index === 1 ? 0 : index === 0 ? 0.12 : -0.12, 0]}
            castShadow
          >
            <meshStandardMaterial {...fabricModern} color={index === 1 ? '#b5a18d' : '#ece5dc'} roughness={0.88} />
          </RoundedBox>
        ))}

        <mesh position={[0, 0.42, 1]} castShadow receiveShadow>
          <cylinderGeometry args={[1.55, 1.55, 0.1, 48]} />
          <meshPhysicalMaterial {...marble} color="#ded8d0" roughness={0.2} clearcoat={0.12} clearcoatRoughness={0.28} />
        </mesh>
        <mesh position={[0, 0.22, 1]} castShadow receiveShadow>
          <cylinderGeometry args={[0.74, 0.9, 0.42, 32]} />
          <meshStandardMaterial {...metal} color="#292827" roughness={0.34} metalness={0.78} />
        </mesh>
      </group>

      <group position={[6.9, 0, 5.8]}>
        <RoundedBox args={[4.4, 0.8, 0.52]} radius={0.08} smoothness={4} position={[0, 0.48, 0]} castShadow receiveShadow>
          <meshStandardMaterial {...wood} color="#4b4037" roughness={0.52} />
        </RoundedBox>
        <RoundedBox args={[4.62, 0.12, 0.62]} radius={0.04} smoothness={3} position={[0, 1.05, -0.02]} castShadow receiveShadow>
          <meshPhysicalMaterial {...marble} color="#d7d0c8" roughness={0.22} clearcoat={0.08} />
        </RoundedBox>
        <mesh position={[0, 2.65, -0.28]} castShadow>
          <boxGeometry args={[3.7, 2.6, 0.07]} />
          <meshStandardMaterial color="#2d3438" roughness={0.8} />
        </mesh>
        <mesh position={[0, 4.15, -0.2]}>
          <boxGeometry args={[2.6, 0.045, 0.045]} />
          <meshStandardMaterial {...metal} color={CHAMPAGNE} metalness={0.86} roughness={0.34} />
        </mesh>
      </group>
    </group>
  );
};

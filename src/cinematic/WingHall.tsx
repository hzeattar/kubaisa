import { RoundedBox } from '@react-three/drei';
import { useArchitecturalTextures } from '../components/3d/Materials';
import type { Department, RoomKey } from '../journey/journeyModel';

const GOLD = '#c6a15b';

function PreviewFurniture({ room, modern }: { room: RoomKey; modern: boolean }) {
  const accent = modern ? '#d8cec0' : '#e7ddcf';
  const frame = modern ? '#3d332b' : '#a68146';

  if (room === 'living') {
    return (
      <group position={[0, 0, -0.6]}>
        <RoundedBox args={[3.4, 0.72, 1.1]} radius={0.26} smoothness={4} position={[0, 0.42, 0]} castShadow>
          <meshStandardMaterial color={accent} roughness={0.82} />
        </RoundedBox>
        <RoundedBox args={[3.4, 0.65, 0.35]} radius={0.18} smoothness={4} position={[0, 1.0, -0.34]} castShadow>
          <meshStandardMaterial color={accent} roughness={0.84} />
        </RoundedBox>
        <mesh position={[0, 0.26, 1.05]} castShadow>
          <cylinderGeometry args={[0.7, 0.78, 0.26, 32]} />
          <meshStandardMaterial color={modern ? '#b8aa99' : '#d6c9b8'} roughness={0.4} metalness={0.05} />
        </mesh>
      </group>
    );
  }

  if (room === 'dining') {
    return (
      <group position={[0, 0, -0.4]}>
        <RoundedBox args={[3.2, 0.12, 1.45]} radius={0.08} smoothness={3} position={[0, 0.82, 0]} castShadow>
          <meshStandardMaterial color={modern ? '#d5cfc5' : '#ddd1c1'} roughness={0.28} />
        </RoundedBox>
        {[-1.2, 1.2].map((x) => (
          <mesh key={x} position={[x, 0.4, 0]} castShadow>
            <cylinderGeometry args={[0.08, 0.11, 0.8, 16]} />
            <meshStandardMaterial color={frame} metalness={modern ? 0.25 : 0.72} roughness={0.42} />
          </mesh>
        ))}
        {[-1.1, 0, 1.1].flatMap((x) => [-1, 1].map((side) => (
          <group key={`${x}-${side}`} position={[x, 0, side * 1.15]} rotation={[0, side > 0 ? Math.PI : 0, 0]}>
            <RoundedBox args={[0.55, 0.12, 0.5]} radius={0.08} position={[0, 0.48, 0]} castShadow>
              <meshStandardMaterial color={accent} roughness={0.8} />
            </RoundedBox>
            <RoundedBox args={[0.55, 0.62, 0.12]} radius={0.08} position={[0, 0.83, -0.22]} castShadow>
              <meshStandardMaterial color={accent} roughness={0.82} />
            </RoundedBox>
          </group>
        )))}
      </group>
    );
  }

  if (room === 'bedroom') {
    return (
      <group position={[0, 0, -0.8]}>
        <RoundedBox args={[2.7, 0.42, 3.15]} radius={0.16} position={[0, 0.32, 0]} castShadow>
          <meshStandardMaterial color={accent} roughness={0.84} />
        </RoundedBox>
        <RoundedBox args={[2.9, 2.1, 0.28]} radius={0.18} position={[0, 1.25, -1.52]} castShadow>
          <meshStandardMaterial color={modern ? '#8d8174' : '#d6c6b1'} roughness={0.76} />
        </RoundedBox>
        {[-1.8, 1.8].map((x) => (
          <RoundedBox key={x} args={[0.72, 0.64, 0.58]} radius={0.08} position={[x, 0.34, -1.15]} castShadow>
            <meshStandardMaterial color={frame} roughness={0.5} metalness={modern ? 0.05 : 0.34} />
          </RoundedBox>
        ))}
      </group>
    );
  }

  return (
    <group position={[0, 0, -0.8]}>
      <RoundedBox args={[2.35, 0.36, 3]} radius={0.14} position={[-0.9, 0.3, 0]} castShadow>
        <meshStandardMaterial color="#d8d0c6" roughness={0.82} />
      </RoundedBox>
      <RoundedBox args={[2.4, 1.45, 0.22]} radius={0.12} position={[-0.9, 1.02, -1.45]} castShadow>
        <meshStandardMaterial color="#c7b8a7" roughness={0.76} />
      </RoundedBox>
      <RoundedBox args={[1.9, 0.1, 0.72]} radius={0.05} position={[1.55, 0.78, -0.65]} castShadow>
        <meshStandardMaterial color="#9f876e" roughness={0.5} />
      </RoundedBox>
      <mesh position={[1.55, 1.62, -0.98]} castShadow>
        <boxGeometry args={[2, 1.25, 0.08]} />
        <meshStandardMaterial color="#d7cdbc" roughness={0.72} />
      </mesh>
    </group>
  );
}

function PortalBay({
  side,
  z,
  room,
  department,
  index,
}: {
  side: -1 | 1;
  z: number;
  room: RoomKey;
  department: Department;
  index: number;
}) {
  const { marble, plaster, wood, metal } = useArchitecturalTextures();
  const modern = department === 'modern';
  const x = side * 7.1;
  const previewX = side * 10.7;
  const rotationY = side < 0 ? Math.PI / 2 : -Math.PI / 2;
  const portalColor = modern ? '#ece5dc' : '#efe5d7';

  return (
    <group>
      <group position={[x, 0, z]} rotation={[0, rotationY, 0]}>
        <mesh position={[-2.65, 3.3, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.52, 6.6, 0.65]} />
          <meshStandardMaterial {...plaster} color={portalColor} roughness={0.64} />
        </mesh>
        <mesh position={[2.65, 3.3, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.52, 6.6, 0.65]} />
          <meshStandardMaterial {...plaster} color={portalColor} roughness={0.64} />
        </mesh>
        <mesh position={[0, 6.35, 0]} castShadow receiveShadow>
          <boxGeometry args={[5.8, 0.54, 0.72]} />
          <meshStandardMaterial {...marble} color={modern ? '#d8cec0' : '#ded0bd'} roughness={0.36} />
        </mesh>
        <mesh position={[0, 0.2, 0.2]} receiveShadow>
          <boxGeometry args={[5.25, 0.18, 0.3]} />
          <meshStandardMaterial {...metal} color={modern ? '#54483e' : GOLD} metalness={modern ? 0.36 : 0.82} roughness={0.38} />
        </mesh>
        <mesh position={[0, 6.02, 0.34]}>
          <boxGeometry args={[4.8, 0.055, 0.08]} />
          <meshStandardMaterial color={GOLD} emissive="#6b4c20" emissiveIntensity={0.32} metalness={0.8} roughness={0.3} />
        </mesh>
      </group>

      <group position={[previewX, 0, z]} rotation={[0, side < 0 ? -Math.PI / 2 : Math.PI / 2, 0]}>
        <mesh position={[0, 2.85, -2.8]} receiveShadow>
          <boxGeometry args={[7.2, 5.7, 0.2]} />
          <meshStandardMaterial {...plaster} color={modern ? '#d7d0c7' : '#eadfce'} roughness={0.7} />
        </mesh>
        <mesh position={[0, -0.03, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[7.2, 6.6]} />
          <meshStandardMaterial {...(modern ? wood : marble)} color={modern ? '#756556' : '#c8b9a6'} roughness={modern ? 0.62 : 0.36} />
        </mesh>
        <PreviewFurniture room={room} modern={modern} />
        <pointLight position={[0, 3.6, 0.4]} intensity={modern ? 5.5 : 7.2} distance={8} decay={2} color={modern ? '#ffd9a8' : '#ffd291'} />
        <mesh position={[0, 5.25, -2.65]}>
          <boxGeometry args={[2.2, 0.05, 0.05]} />
          <meshStandardMaterial color={GOLD} emissive="#725322" emissiveIntensity={0.25} />
        </mesh>
      </group>

      <mesh position={[side * 6.72, 5.75, z + 0.02]} rotation={[0, rotationY, 0]}>
        <boxGeometry args={[1.05, 0.06, 0.08]} />
        <meshStandardMaterial color={GOLD} emissive="#8a632a" emissiveIntensity={0.35} />
      </mesh>

      <pointLight position={[side * 5.7, 3.6, z]} intensity={3 + index * 0.35} distance={7} decay={2} color="#ffd6a0" />
    </group>
  );
}

export function WingHall({ department }: { department: Department }) {
  const { marble, plaster, wood, metal } = useArchitecturalTextures();
  const modern = department === 'modern';
  const rooms: RoomKey[] = department === 'modern'
    ? ['living', 'dining', 'bedroom', 'kids']
    : ['living', 'dining', 'bedroom'];

  return (
    <group position={[department === 'modern' ? -25 : 25, 0, -24]}>
      <mesh position={[0, -0.08, -20]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[14.8, 54]} />
        <meshStandardMaterial {...(modern ? wood : marble)} color={modern ? '#6f6256' : '#c8b9a6'} roughness={modern ? 0.58 : 0.34} />
      </mesh>

      <mesh position={[0, 8.3, -20]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[14.8, 54]} />
        <meshStandardMaterial {...plaster} color={modern ? '#e8e1d8' : '#f0e7da'} roughness={0.78} side={2} />
      </mesh>

      {[-7.35, 7.35].map((x) => (
        <mesh key={x} position={[x, 4.05, -20]} receiveShadow>
          <boxGeometry args={[0.34, 8.1, 54]} />
          <meshStandardMaterial {...plaster} color={modern ? '#ddd6cc' : '#eee3d5'} roughness={0.7} />
        </mesh>
      ))}

      {Array.from({ length: 8 }, (_, i) => -1.8 - i * 7.1).map((z) => (
        <group key={z} position={[0, 0, z]}>
          <mesh position={[0, 8.02, 0]} receiveShadow>
            <boxGeometry args={[14.4, 0.26, 0.42]} />
            <meshStandardMaterial {...(modern ? wood : metal)} color={modern ? '#5f5146' : '#b08b4c'} metalness={modern ? 0.05 : 0.74} roughness={0.4} />
          </mesh>
          <mesh position={[0, 7.78, 0]}>
            <boxGeometry args={[9.2, 0.035, 0.12]} />
            <meshStandardMaterial color="#f2cb88" emissive="#d7963d" emissiveIntensity={0.52} />
          </mesh>
        </group>
      ))}

      {rooms.map((room, index) => {
        const side: -1 | 1 = index % 2 === 0 ? -1 : 1;
        const z = -8 - index * 11.6;
        return <PortalBay key={room} side={side} z={z} room={room} department={department} index={index} />;
      })}

      <group position={[0, 0, -48.5]}>
        <mesh position={[0, 4.1, 0]} castShadow receiveShadow>
          <boxGeometry args={[13.7, 8.2, 0.55]} />
          <meshStandardMaterial {...plaster} color={modern ? '#cfc7bd' : '#dfd2c0'} roughness={0.68} />
        </mesh>
        <RoundedBox args={[5.2, 2.1, 0.9]} radius={0.32} smoothness={4} position={[0, 1.18, 0.5]} castShadow receiveShadow>
          <meshStandardMaterial {...wood} color={modern ? '#3b322c' : '#4a3829'} roughness={0.48} />
        </RoundedBox>
        <mesh position={[0, 6.15, 0.48]}>
          <boxGeometry args={[6.6, 0.08, 0.08]} />
          <meshStandardMaterial color={GOLD} emissive="#704f20" emissiveIntensity={0.38} metalness={0.8} roughness={0.3} />
        </mesh>
      </group>

      <ambientLight intensity={modern ? 0.15 : 0.2} color="#ffe8cb" />
      <pointLight position={[0, 6.8, -22]} intensity={10} distance={23} decay={2} color="#ffd8a6" />
    </group>
  );
}

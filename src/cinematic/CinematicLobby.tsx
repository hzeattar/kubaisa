import { Image, RoundedBox } from '@react-three/drei';
import { useArchitecturalTextures } from '../components/3d/Materials';

const gold = '#c7a45b';
const stone = '#eee7dc';

function LobbyColumn({ x, z }: { x: number; z: number }) {
  const { plaster, marble, metal } = useArchitecturalTextures();
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, 0.22, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.72, 0.84, 0.44, 24]} />
        <meshStandardMaterial {...marble} color="#d8cfc1" roughness={0.42} />
      </mesh>
      <mesh position={[0, 4.2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.46, 0.54, 7.95, 28]} />
        <meshStandardMaterial {...plaster} color="#f2ece2" roughness={0.68} />
      </mesh>
      <mesh position={[0, 8.28, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.78, 0.55, 0.52, 24]} />
        <meshStandardMaterial {...plaster} color="#e8dfd2" roughness={0.64} />
      </mesh>
      <mesh position={[0, 8.54, 0]} castShadow>
        <cylinderGeometry args={[0.9, 0.9, 0.12, 24]} />
        <meshStandardMaterial {...metal} color={gold} roughness={0.36} metalness={0.88} />
      </mesh>
    </group>
  );
}

function StairFlight({ side }: { side: -1 | 1 }) {
  const { marble, metal } = useArchitecturalTextures();
  return (
    <group position={[side * 5.3, 0, -27.5]} rotation={[0, side * -0.16, 0]}>
      {Array.from({ length: 16 }, (_, i) => {
        const y = 0.12 + i * 0.19;
        const z = i * -0.36;
        const width = 5.2 - i * 0.05;
        return (
          <mesh key={i} position={[0, y, z]} castShadow receiveShadow>
            <boxGeometry args={[width, 0.2, 0.74]} />
            <meshStandardMaterial {...marble} color="#e8e0d5" roughness={0.3} />
          </mesh>
        );
      })}
      <mesh position={[side * -2.45, 2.0, -2.8]} rotation={[Math.PI / 2.66, 0, 0]} castShadow>
        <cylinderGeometry args={[0.055, 0.055, 6.9, 14]} />
        <meshStandardMaterial {...metal} color={gold} metalness={0.9} roughness={0.32} />
      </mesh>
    </group>
  );
}

function Chandelier() {
  const { metal } = useArchitecturalTextures();
  return (
    <group position={[0, 7.65, -19.5]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.035, 0.035, 2.4, 12]} />
        <meshStandardMaterial {...metal} color="#9d7d42" metalness={0.9} roughness={0.3} />
      </mesh>
      {[2.5, 1.75, 1.1].map((radius, index) => (
        <mesh key={radius} position={[0, -1.0 - index * 0.58, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <torusGeometry args={[radius, 0.075, 16, 72]} />
          <meshStandardMaterial
            {...metal}
            color={index === 0 ? '#d5b66c' : '#c39d52'}
            metalness={0.92}
            roughness={0.28}
            emissive="#8f6727"
            emissiveIntensity={0.18}
          />
        </mesh>
      ))}
      <pointLight position={[0, -2.0, 0]} intensity={16} distance={18} decay={2} color="#ffd9a0" />
    </group>
  );
}

function HeroConsole() {
  const { marble, wood, metal } = useArchitecturalTextures();
  return (
    <group position={[0, 0, -18.5]}>
      <RoundedBox args={[6.4, 1.3, 1.2]} radius={0.28} smoothness={5} position={[0, 0.78, 0]} castShadow receiveShadow>
        <meshStandardMaterial {...wood} color="#30251f" roughness={0.48} />
      </RoundedBox>
      <RoundedBox args={[6.7, 0.13, 1.38]} radius={0.18} smoothness={4} position={[0, 1.5, 0]} castShadow receiveShadow>
        <meshStandardMaterial {...marble} color="#f1e9df" roughness={0.18} />
      </RoundedBox>
      <mesh position={[0, 0.2, 0.66]} castShadow>
        <boxGeometry args={[5.4, 0.08, 0.08]} />
        <meshStandardMaterial {...metal} color={gold} metalness={0.9} roughness={0.32} />
      </mesh>
    </group>
  );
}

export function CinematicLobby() {
  const { marble, plaster, wood, metal } = useArchitecturalTextures();

  return (
    <group>
      <mesh position={[0, -0.08, -19.5]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[31, 43]} />
        <meshStandardMaterial {...marble} color="#d8d0c5" roughness={0.3} />
      </mesh>

      <mesh position={[0, -0.015, -16.2]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[7.2, 31]} />
        <meshStandardMaterial {...wood} color="#2d261f" roughness={0.52} />
      </mesh>

      {[-1, 1].map((side) => (
        <group key={side} position={[side * 14.5, 0, -19.5]}>
          <mesh position={[0, 4.6, 0]} receiveShadow>
            <boxGeometry args={[0.65, 9.2, 42]} />
            <meshStandardMaterial {...plaster} color="#e9e2d8" roughness={0.68} />
          </mesh>
          {[-31, -23, -15, -7].map((z) => (
            <group key={z} position={[side * -0.4, 0, z + 19.5]}>
              <mesh position={[0, 3.9, 0]} castShadow receiveShadow>
                <boxGeometry args={[0.24, 5.9, 5.4]} />
                <meshStandardMaterial {...plaster} color="#f5efe7" roughness={0.66} />
              </mesh>
              <mesh position={[side * -0.15, 3.9, 0]}>
                <boxGeometry args={[0.12, 4.7, 4.2]} />
                <meshStandardMaterial color="#18212a" roughness={0.32} metalness={0.2} />
              </mesh>
            </group>
          ))}
        </group>
      ))}

      <group position={[0, 0, -39.7]}>
        <mesh position={[0, 4.65, 0]} receiveShadow>
          <boxGeometry args={[29.4, 9.3, 0.8]} />
          <meshStandardMaterial {...plaster} color="#111820" roughness={0.72} />
        </mesh>
        <mesh position={[0, 4.6, 0.5]} castShadow receiveShadow>
          <boxGeometry args={[9.6, 8.0, 0.28]} />
          <meshStandardMaterial {...marble} color="#d8ccbc" roughness={0.3} />
        </mesh>
        <mesh position={[0, 2.85, 0.68]} castShadow>
          <boxGeometry args={[4.25, 5.7, 0.12]} />
          <meshStandardMaterial {...metal} color="#6e5a3f" metalness={0.88} roughness={0.28} />
        </mesh>
        <mesh position={[0, 2.85, 0.76]}>
          <boxGeometry args={[0.035, 5.65, 0.12]} />
          <meshStandardMaterial color="#17130f" />
        </mesh>
      </group>

      <Image
        url="/brand/qubaisa-logo.webp"
        position={[0, 6.6, -39.15]}
        scale={[4.6, 1.55]}
        toneMapped={false}
        transparent
      />

      <LobbyColumn x={-8.6} z={-12.5} />
      <LobbyColumn x={8.6} z={-12.5} />
      <LobbyColumn x={-8.6} z={-27.2} />
      <LobbyColumn x={8.6} z={-27.2} />

      <StairFlight side={-1} />
      <StairFlight side={1} />
      <Chandelier />
      <HeroConsole />

      {[-10, -5, 5, 10].map((x) => (
        <pointLight
          key={x}
          position={[x, 6.7, -18]}
          intensity={9}
          distance={12}
          decay={2}
          color="#ffd8a3"
        />
      ))}

      <rectAreaLight width={12} height={2.8} intensity={7} color="#ffe0ad" position={[0, 7.2, -34]} rotation={[0, 0, 0]} />

      <mesh position={[0, 9.2, -20]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[30, 40]} />
        <meshStandardMaterial {...plaster} color={stone} roughness={0.78} side={2} />
      </mesh>
    </group>
  );
}

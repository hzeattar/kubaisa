import { Instance, Instances } from '@react-three/drei';
import {
  useMarbleTexture,
  useMetalTexture,
  usePlasterTexture,
} from '../components/3d/Materials';

const gold = '#c6a15b';

function EntranceLantern({ x }: { x: number }) {
  const metal = useMetalTexture();

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
  const marble = useMarbleTexture();
  const metal = useMetalTexture();

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

function WingCornice({ x }: { x: number }) {
  const marble = useMarbleTexture();
  const plaster = usePlasterTexture();

  return (
    <group position={[x, 0, -11.82]}>
      <mesh position={[0, 6.32, 0]} castShadow receiveShadow>
        <boxGeometry args={[17.9, 0.22, 0.46]} />
        <meshPhysicalMaterial {...marble} color="#d8cec0" roughness={0.42} clearcoat={0.04} />
      </mesh>
      <mesh position={[0, 6.58, 0.02]} castShadow receiveShadow>
        <boxGeometry args={[18.35, 0.18, 0.58]} />
        <meshStandardMaterial {...plaster} color="#eee7dd" roughness={0.62} />
      </mesh>
      <mesh position={[0, 11.72, -0.02]} castShadow receiveShadow>
        <boxGeometry args={[18.8, 0.22, 0.58]} />
        <meshPhysicalMaterial {...marble} color="#d5cabb" roughness={0.4} clearcoat={0.04} />
      </mesh>
      <mesh position={[0, 12.02, -0.04]} castShadow receiveShadow>
        <boxGeometry args={[19.15, 0.2, 0.72]} />
        <meshStandardMaterial {...plaster} color="#e9e1d6" roughness={0.62} />
      </mesh>
    </group>
  );
}

function CornerQuoins() {
  const marble = useMarbleTexture();
  const rows = Array.from({ length: 9 }, (_, index) => index);

  return (
    <Instances limit={rows.length * 4} castShadow receiveShadow>
      <boxGeometry args={[1.0, 0.48, 0.34]} />
      <meshPhysicalMaterial {...marble} color="#d6ccbe" roughness={0.46} clearcoat={0.03} />
      {[-25.4, 25.4].flatMap((x) =>
        rows.flatMap((row) => {
          const y = 0.7 + row * 0.62;
          const offset = row % 2 === 0 ? 0.12 : -0.12;
          return [
            <Instance key={`${x}-${row}-a`} position={[x + offset, y, -11.79]} />,
            <Instance key={`${x}-${row}-b`} position={[x - offset, y + 6.25, -11.79]} />,
          ];
        }),
      )}
    </Instances>
  );
}

function CentralPediment() {
  const marble = useMarbleTexture();
  const plaster = usePlasterTexture();
  const metal = useMetalTexture();

  return (
    <group position={[0, 13.6, -11.52]}>
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[12.6, 0.26, 0.68]} />
        <meshPhysicalMaterial {...marble} color="#d8cfc1" roughness={0.4} clearcoat={0.04} />
      </mesh>
      <mesh position={[-2.95, 1.04, 0]} rotation={[0, 0, 0.34]} castShadow receiveShadow>
        <boxGeometry args={[6.3, 0.28, 0.62]} />
        <meshStandardMaterial {...plaster} color="#eee6da" roughness={0.6} />
      </mesh>
      <mesh position={[2.95, 1.04, 0]} rotation={[0, 0, -0.34]} castShadow receiveShadow>
        <boxGeometry args={[6.3, 0.28, 0.62]} />
        <meshStandardMaterial {...plaster} color="#eee6da" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.3, 0.35]} castShadow>
        <boxGeometry args={[9.4, 0.055, 0.08]} />
        <meshStandardMaterial {...metal} color={gold} metalness={0.9} roughness={0.32} />
      </mesh>
    </group>
  );
}

export function FacadeDetails() {
  const marble = useMarbleTexture();
  const plaster = usePlasterTexture();
  const metal = useMetalTexture();

  return (
    <group>
      {/* Layered entrance arch creates a deep stone reveal instead of a painted-on portal. */}
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

      {/* Projecting balcony/portico gives the centre facade real parallax and shadow depth. */}
      <mesh position={[0, 10.22, -10.78]} castShadow receiveShadow>
        <boxGeometry args={[12.65, 0.3, 1.46]} />
        <meshPhysicalMaterial {...marble} color="#d9d0c2" roughness={0.34} clearcoat={0.07} />
      </mesh>
      <mesh position={[0, 10.04, -10.78]} castShadow>
        <boxGeometry args={[13.05, 0.12, 1.62]} />
        <meshStandardMaterial {...plaster} color="#ece4d9" roughness={0.58} />
      </mesh>
      <Instances limit={5} castShadow>
        <boxGeometry args={[0.42, 0.82, 0.72]} />
        <meshStandardMaterial {...plaster} color="#e4dbcf" roughness={0.62} />
        {[-4.7, -2.35, 0, 2.35, 4.7].map((x) => (
          <Instance key={x} position={[x, 9.6, -11.0]} rotation={[0.2, 0, 0]} />
        ))}
      </Instances>

      <EntranceLantern x={-8.2} />
      <EntranceLantern x={8.2} />
      <EntranceLantern x={-5.9} />
      <EntranceLantern x={5.9} />
      <EntrancePlanter x={-7.4} />
      <EntrancePlanter x={7.4} />

      <rectAreaLight
        width={13}
        height={4.8}
        intensity={3.6}
        color="#ffd7a1"
        position={[0, 4.2, -10.6]}
        rotation={[0, Math.PI, 0]}
      />

      {/* Railing sits on the projecting balcony edge, so it silhouettes against the facade. */}
      <group position={[0, 10.82, -10.12]}>
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

      <WingCornice x={-17.1} />
      <WingCornice x={17.1} />
      <CornerQuoins />
      <CentralPediment />

      {/* Fine vertical joints are intentionally shallow: shadow detail without heavy geometry. */}
      <Instances limit={8}>
        <boxGeometry args={[0.035, 4.4, 0.035]} />
        <meshStandardMaterial color="#8e877d" roughness={0.86} />
        {[-13.4, -10.2, -7, -3.8, 3.8, 7, 10.2, 13.4].map((x) => (
          <Instance key={x} position={[x, 8.9, -11.03]} />
        ))}
      </Instances>
    </group>
  );
}

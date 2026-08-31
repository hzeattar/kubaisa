import { Instance, Instances } from '@react-three/drei';
import {
  useMarbleTexture,
  useMetalTexture,
  usePlasterTexture,
} from '../components/3d/Materials';

const gold = '#c6a15b';

function SideWallMouldings() {
  const plaster = usePlasterTexture();
  const metal = useMetalTexture();
  const zs = [-13.3, -20.8, -28.3, -35.4];

  return (
    <>
      {/* Vertical frames share one geometry/material draw call per side family. */}
      <Instances limit={zs.length * 4} castShadow>
        <boxGeometry args={[0.055, 4.65, 0.13]} />
        <meshStandardMaterial {...plaster} color="#f0e9df" roughness={0.62} />
        {[-14.12, 14.12].flatMap((x) =>
          zs.flatMap((z) => [
            <Instance key={`${x}-${z}-v1`} position={[x, 4.25, z - 2.15]} rotation={[0, Math.PI / 2, 0]} />,
            <Instance key={`${x}-${z}-v2`} position={[x, 4.25, z + 2.15]} rotation={[0, Math.PI / 2, 0]} />,
          ]),
        )}
      </Instances>

      <Instances limit={zs.length * 4} castShadow>
        <boxGeometry args={[0.055, 4.3, 0.13]} />
        <meshStandardMaterial {...plaster} color="#f0e9df" roughness={0.62} />
        {[-14.12, 14.12].flatMap((x) =>
          zs.flatMap((z) => [
            <Instance key={`${x}-${z}-h1`} position={[x, 6.55, z]} rotation={[Math.PI / 2, Math.PI / 2, 0]} />,
            <Instance key={`${x}-${z}-h2`} position={[x, 1.95, z]} rotation={[Math.PI / 2, Math.PI / 2, 0]} />,
          ]),
        )}
      </Instances>

      {/* A thin champagne line catches the warm lobby light without turning the walls gold. */}
      <Instances limit={zs.length * 2}>
        <boxGeometry args={[0.035, 3.55, 0.055]} />
        <meshStandardMaterial {...metal} color={gold} metalness={0.9} roughness={0.34} />
        {[-14.02, 14.02].flatMap((x) =>
          zs.map((z) => (
            <Instance key={`${x}-${z}-gold`} position={[x, 4.25, z]} rotation={[0, Math.PI / 2, 0]} />
          )),
        )}
      </Instances>
    </>
  );
}

function CeilingCoffers() {
  const plaster = usePlasterTexture();
  const metal = useMetalTexture();
  const cells = [
    [-5.2, -14.6],
    [0, -14.6],
    [5.2, -14.6],
    [-5.2, -23.3],
    [0, -23.3],
    [5.2, -23.3],
    [-5.2, -32.0],
    [0, -32.0],
    [5.2, -32.0],
  ] as const;

  return (
    <>
      <Instances limit={cells.length}>
        <boxGeometry args={[4.25, 0.075, 6.8]} />
        <meshStandardMaterial {...plaster} color="#d9d0c4" roughness={0.72} />
        {cells.map(([x, z]) => (
          <Instance key={`${x}-${z}`} position={[x, 9.02, z]} />
        ))}
      </Instances>
      <Instances limit={cells.length}>
        <boxGeometry args={[3.72, 0.045, 6.25]} />
        <meshStandardMaterial color="#ece3d7" roughness={0.76} />
        {cells.map(([x, z]) => (
          <Instance key={`inner-${x}-${z}`} position={[x, 8.965, z]} />
        ))}
      </Instances>
      <Instances limit={cells.length}>
        <boxGeometry args={[3.55, 0.026, 0.055]} />
        <meshStandardMaterial {...metal} color="#a98648" metalness={0.82} roughness={0.42} />
        {cells.map(([x, z]) => (
          <Instance key={`accent-${x}-${z}`} position={[x, 8.935, z - 2.85]} />
        ))}
      </Instances>
    </>
  );
}

function FloorInlay() {
  const marble = useMarbleTexture();
  const metal = useMetalTexture();

  return (
    <group>
      <mesh position={[0, -0.012, -21.2]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <ringGeometry args={[3.55, 4.05, 64]} />
        <meshPhysicalMaterial {...marble} color="#b7aa9b" roughness={0.3} clearcoat={0.06} />
      </mesh>
      <mesh position={[0, -0.006, -21.2]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <ringGeometry args={[3.93, 4.03, 64]} />
        <meshStandardMaterial {...metal} color={gold} metalness={0.9} roughness={0.33} />
      </mesh>

      <mesh position={[0, 0.012, -20.2]} receiveShadow>
        <boxGeometry args={[9.5, 0.025, 0.055]} />
        <meshStandardMaterial {...metal} color="#a88448" metalness={0.84} roughness={0.42} />
      </mesh>
      <mesh position={[0, 0.012, -30.8]} receiveShadow>
        <boxGeometry args={[9.5, 0.025, 0.055]} />
        <meshStandardMaterial {...metal} color="#a88448" metalness={0.84} roughness={0.42} />
      </mesh>
      <mesh position={[-4.72, 0.012, -25.5]} receiveShadow>
        <boxGeometry args={[0.055, 0.025, 10.65]} />
        <meshStandardMaterial {...metal} color="#a88448" metalness={0.84} roughness={0.42} />
      </mesh>
      <mesh position={[4.72, 0.012, -25.5]} receiveShadow>
        <boxGeometry args={[0.055, 0.025, 10.65]} />
        <meshStandardMaterial {...metal} color="#a88448" metalness={0.84} roughness={0.42} />
      </mesh>
    </group>
  );
}

export function LobbyArchitectureDetails() {
  return (
    <group>
      <SideWallMouldings />
      <CeilingCoffers />
      <FloorInlay />

      {/* Broad cove washes: cheap, soft and more architectural than many point lights. */}
      <rectAreaLight
        width={11.5}
        height={1.0}
        intensity={2.4}
        color="#ffd7a0"
        position={[0, 8.55, -12.8]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <rectAreaLight
        width={11.5}
        height={1.0}
        intensity={2.1}
        color="#ffd7a0"
        position={[0, 8.55, -30.8]}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  );
}

import type { ComponentProps } from 'react';
import {
  useMarbleTexture,
  useMetalTexture,
  usePlasterTexture,
  useWoodTexture,
} from '../components/3d/Materials';

const gold = '#c6a15b';
type TextureSet = ComponentProps<'meshStandardMaterial'>;

function PortalFrame({
  x,
  accent,
  marble,
  plaster,
  metal,
}: {
  x: number;
  accent: string;
  marble: TextureSet;
  plaster: TextureSet;
  metal: TextureSet;
}) {
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
        <meshStandardMaterial
          {...metal}
          color={accent}
          metalness={0.9}
          roughness={0.3}
          emissive={accent}
          emissiveIntensity={0.28}
        />
      </mesh>
      {[-2.7, 2.7].map((side) => (
        <mesh key={side} position={[side, 3.15, 0.38]} castShadow receiveShadow>
          <boxGeometry args={[0.38, 6.35, 0.45]} />
          <meshPhysicalMaterial
            {...marble}
            color="#ddd4c6"
            roughness={0.3}
            clearcoat={0.06}
            clearcoatRoughness={0.5}
          />
        </mesh>
      ))}
    </group>
  );
}

export function EntranceThreshold() {
  const marble = useMarbleTexture();
  const plaster = usePlasterTexture();
  const wood = useWoodTexture();
  const metal = useMetalTexture();

  return (
    <group>
      {/* Arrival runner begins directly behind the opening so exterior and interior read as one building. */}
      <mesh position={[0, 0.015, -13.9]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[7.4, 8.8]} />
        <meshPhysicalMaterial
          {...marble}
          color="#cfc6b9"
          roughness={0.22}
          clearcoat={0.12}
          clearcoatRoughness={0.32}
        />
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
              <meshPhysicalMaterial
                {...marble}
                color={portalIndex === 0 ? '#e7ded0' : '#ddd3c4'}
                roughness={0.32}
                clearcoat={0.05}
              />
            </mesh>
          ))}
          <mesh position={[0, 6.95, 0]} castShadow receiveShadow>
            <boxGeometry args={[8.6, 0.7, 0.8]} />
            <meshStandardMaterial {...plaster} color="#eee7dc" roughness={0.64} />
          </mesh>
          <mesh position={[0, 6.48, 0.46]} castShadow>
            <boxGeometry args={[7.8, 0.08, 0.08]} />
            <meshStandardMaterial
              {...metal}
              color={gold}
              metalness={0.9}
              roughness={0.28}
              emissive="#8a642b"
              emissiveIntensity={0.24}
            />
          </mesh>
        </group>
      ))}

      {/* Concealed ceiling panels provide a broad soft architectural wash. */}
      <mesh position={[0, 7.15, -14.2]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[6.8, 6.8]} />
        <meshStandardMaterial color="#f0d7ae" emissive="#f0c783" emissiveIntensity={1.45} side={2} toneMapped={false} />
      </mesh>
      <rectAreaLight width={6.5} height={5} intensity={5.2} color="#ffd59d" position={[0, 5.7, -15]} rotation={[-Math.PI / 2, 0, 0]} />

      {/* Decision portals become visible before UI asks for Modern / Neo-Classical. */}
      <PortalFrame x={-7.15} accent="#d7bf8b" marble={marble} plaster={plaster} metal={metal} />
      <PortalFrame x={7.15} accent="#c99a55" marble={marble} plaster={plaster} metal={metal} />
      <rectAreaLight width={13.5} height={5} intensity={3.7} color="#e8c687" position={[0, 4, -29.3]} rotation={[0, 0, 0]} />

      <mesh position={[0, 0.02, -27.5]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[6.1, 64]} />
        <meshPhysicalMaterial {...marble} color="#e2d9cd" roughness={0.23} clearcoat={0.12} clearcoatRoughness={0.3} />
      </mesh>
      <mesh position={[0, 0.045, -27.5]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <ringGeometry args={[4.75, 4.92, 64]} />
        <meshStandardMaterial {...metal} color={gold} metalness={0.84} roughness={0.34} />
      </mesh>
    </group>
  );
}

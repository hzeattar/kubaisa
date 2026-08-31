import {
  useMarbleTexture,
  useMetalTexture,
  usePlasterTexture,
  useWoodTexture,
} from '../components/3d/Materials';

const gold = '#c6a15b';
type TextureSet = ReturnType<typeof useMarbleTexture>;

type PortalMaterials = {
  marble: TextureSet;
  plaster: TextureSet;
  metal: TextureSet;
};

function ModernPortal({ x, marble, plaster, metal }: { x: number } & PortalMaterials) {
  return (
    <group position={[x, 0, -31.6]}>
      <mesh position={[0, 3.15, 0.12]} receiveShadow castShadow>
        <boxGeometry args={[5.9, 6.35, 0.5]} />
        <meshStandardMaterial {...plaster} color="#e5e1da" roughness={0.68} />
      </mesh>
      <mesh position={[0, 3.02, 0.41]}>
        <boxGeometry args={[4.5, 5.3, 0.18]} />
        <meshStandardMaterial color="#0a1620" roughness={0.24} metalness={0.22} emissive="#14293b" emissiveIntensity={0.18} />
      </mesh>
      <mesh position={[0, 5.95, 0.47]} castShadow>
        <boxGeometry args={[5.2, 0.13, 0.18]} />
        <meshStandardMaterial {...metal} color="#b7b19c" metalness={0.9} roughness={0.28} emissive="#7d8c91" emissiveIntensity={0.12} />
      </mesh>
      {[-2.55, 2.55].map((side) => (
        <mesh key={side} position={[side, 3.15, 0.39]} castShadow receiveShadow>
          <boxGeometry args={[0.24, 6.0, 0.38]} />
          <meshPhysicalMaterial {...marble} color="#d8d4cc" roughness={0.34} clearcoat={0.04} />
        </mesh>
      ))}
      {[-1.45, 1.45].map((side) => (
        <mesh key={`line-${side}`} position={[side, 3.05, 0.53]}>
          <boxGeometry args={[0.045, 4.85, 0.06]} />
          <meshStandardMaterial color="#9fb5c0" metalness={0.78} roughness={0.34} emissive="#5f7f91" emissiveIntensity={0.2} />
        </mesh>
      ))}
      <mesh position={[0, 0.13, 0.55]}>
        <boxGeometry args={[4.45, 0.07, 0.08]} />
        <meshStandardMaterial {...metal} color="#aeb5b3" metalness={0.82} roughness={0.34} />
      </mesh>
    </group>
  );
}

function ClassicPortal({ x, marble, plaster, metal }: { x: number } & PortalMaterials) {
  const radius = 2.18;

  return (
    <group position={[x, 0, -31.6]}>
      <mesh position={[0, 3.15, 0.1]} receiveShadow castShadow>
        <boxGeometry args={[6.2, 6.4, 0.54]} />
        <meshStandardMaterial {...plaster} color="#e9e1d5" roughness={0.64} />
      </mesh>

      <mesh position={[0, 2.15, 0.42]}>
        <boxGeometry args={[4.38, 4.25, 0.18]} />
        <meshStandardMaterial color="#17130f" roughness={0.32} metalness={0.14} emissive="#402719" emissiveIntensity={0.18} />
      </mesh>
      <mesh position={[0, 4.25, 0.42]}>
        <circleGeometry args={[radius, 40, 0, Math.PI]} />
        <meshStandardMaterial color="#17130f" roughness={0.32} metalness={0.14} emissive="#402719" emissiveIntensity={0.18} side={2} />
      </mesh>

      {[-2.72, 2.72].map((side) => (
        <group key={side} position={[side, 0, 0.4]}>
          <mesh position={[0, 3.05, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.5, 5.9, 0.44]} />
            <meshPhysicalMaterial {...marble} color="#ddd2c3" roughness={0.29} clearcoat={0.07} />
          </mesh>
          <mesh position={[0, 0.28, 0.04]} castShadow>
            <boxGeometry args={[0.78, 0.24, 0.6]} />
            <meshPhysicalMaterial {...marble} color="#d4c7b6" roughness={0.3} />
          </mesh>
          <mesh position={[0, 5.92, 0.04]} castShadow>
            <boxGeometry args={[0.82, 0.25, 0.62]} />
            <meshPhysicalMaterial {...marble} color="#d4c7b6" roughness={0.3} />
          </mesh>
        </group>
      ))}

      <mesh position={[0, 4.27, 0.52]} castShadow>
        <torusGeometry args={[radius + 0.17, 0.13, 12, 48, Math.PI]} />
        <meshPhysicalMaterial {...marble} color="#dccfbd" roughness={0.28} clearcoat={0.06} />
      </mesh>
      <mesh position={[0, 4.28, 0.59]} castShadow>
        <torusGeometry args={[radius + 0.02, 0.045, 8, 48, Math.PI]} />
        <meshStandardMaterial {...metal} color="#c99a55" metalness={0.92} roughness={0.26} emissive="#77501d" emissiveIntensity={0.18} />
      </mesh>
      <mesh position={[0, 6.12, 0.48]} castShadow>
        <boxGeometry args={[5.45, 0.17, 0.2]} />
        <meshStandardMaterial {...metal} color="#b88b4e" metalness={0.88} roughness={0.32} />
      </mesh>
    </group>
  );
}

function FloorGuide({ side, color }: { side: -1 | 1; color: string }) {
  return (
    <group>
      <mesh position={[side * 3.55, 0.075, -29.52]} rotation={[0, side * 0.82, 0]} receiveShadow>
        <boxGeometry args={[0.055, 0.022, 6.4]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.38} emissive={color} emissiveIntensity={0.08} />
      </mesh>
      <mesh position={[side * 7.1, 0.085, -29.05]} receiveShadow>
        <boxGeometry args={[2.0, 0.025, 0.07]} />
        <meshStandardMaterial color={color} metalness={0.84} roughness={0.34} emissive={color} emissiveIntensity={0.12} />
      </mesh>
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

      <mesh position={[0, 7.15, -14.2]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[6.8, 6.8]} />
        <meshStandardMaterial color="#f0d7ae" emissive="#f0c783" emissiveIntensity={1.45} side={2} toneMapped={false} />
      </mesh>
      <rectAreaLight width={6.5} height={5} intensity={5.2} color="#ffd59d" position={[0, 5.7, -15]} rotation={[-Math.PI / 2, 0, 0]} />

      {/* Spatial decision point: clean Modern portal left, richer Neo-Classical portal right. */}
      <ModernPortal x={-7.15} marble={marble} plaster={plaster} metal={metal} />
      <ClassicPortal x={7.15} marble={marble} plaster={plaster} metal={metal} />
      <FloorGuide side={-1} color="#93aebc" />
      <FloorGuide side={1} color="#c99a55" />
      <rectAreaLight width={5.4} height={5.2} intensity={2.55} color="#a9c3cf" position={[-7.1, 4, -29.25]} rotation={[0, 0, 0]} />
      <rectAreaLight width={5.6} height={5.2} intensity={3.15} color="#e0b76d" position={[7.1, 4, -29.25]} rotation={[0, 0, 0]} />

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

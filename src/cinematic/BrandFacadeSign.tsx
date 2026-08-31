import { Image } from '@react-three/drei';
import { useMarbleTexture, useMetalTexture } from '../components/3d/Materials';

/**
 * Architectural brand plaque for the hero facade.
 * The supplied artwork remains the source of truth for the Arabic/English mark,
 * while the surrounding geometry provides physical depth, metal edges and a
 * restrained backlit halo instead of reading as a flat billboard.
 */
export function BrandFacadeSign() {
  const marble = useMarbleTexture();
  const metal = useMetalTexture();

  return (
    <group position={[0, 12.34, -11.08]}>
      {/* Stone recess tied to the central facade rather than a floating black screen. */}
      <mesh position={[0, 0, -0.18]} castShadow receiveShadow>
        <boxGeometry args={[10.35, 2.18, 0.34]} />
        <meshPhysicalMaterial
          {...marble}
          color="#d8cfc2"
          roughness={0.38}
          clearcoat={0.04}
          clearcoatRoughness={0.58}
        />
      </mesh>

      {/* Dark navy inlay gives the logo contrast while keeping a furniture-showroom material feel. */}
      <mesh position={[0, 0, 0.025]} castShadow receiveShadow>
        <boxGeometry args={[9.45, 1.62, 0.12]} />
        <meshStandardMaterial
          color="#07101b"
          metalness={0.46}
          roughness={0.28}
          emissive="#0c1420"
          emissiveIntensity={0.16}
        />
      </mesh>

      {/* Four separate metal strips create a dimensional champagne-gold frame. */}
      <mesh position={[0, 0.88, 0.11]} castShadow>
        <boxGeometry args={[9.82, 0.07, 0.09]} />
        <meshStandardMaterial {...metal} color="#c6a15b" metalness={0.92} roughness={0.27} />
      </mesh>
      <mesh position={[0, -0.88, 0.11]} castShadow>
        <boxGeometry args={[9.82, 0.07, 0.09]} />
        <meshStandardMaterial {...metal} color="#c6a15b" metalness={0.92} roughness={0.27} />
      </mesh>
      <mesh position={[-4.88, 0, 0.11]} castShadow>
        <boxGeometry args={[0.07, 1.82, 0.09]} />
        <meshStandardMaterial {...metal} color="#c6a15b" metalness={0.92} roughness={0.27} />
      </mesh>
      <mesh position={[4.88, 0, 0.11]} castShadow>
        <boxGeometry args={[0.07, 1.82, 0.09]} />
        <meshStandardMaterial {...metal} color="#c6a15b" metalness={0.92} roughness={0.27} />
      </mesh>

      <Image
        url="/brand/qubaisa-logo.webp"
        scale={[5.05, 1.52]}
        position={[0, 0, 0.11]}
        toneMapped={false}
        transparent
      />

      {/* Soft perimeter halo; intentionally restrained so the sign looks backlit, not neon. */}
      <rectAreaLight
        width={8.9}
        height={1.55}
        intensity={2.45}
        color="#d8b56f"
        position={[0, 0, 0.48]}
        rotation={[0, Math.PI, 0]}
      />
      <mesh position={[0, -1.12, -0.02]} castShadow receiveShadow>
        <boxGeometry args={[10.85, 0.13, 0.46]} />
        <meshPhysicalMaterial {...marble} color="#d4cabd" roughness={0.4} clearcoat={0.04} />
      </mesh>
    </group>
  );
}

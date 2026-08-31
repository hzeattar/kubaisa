import { Image } from '@react-three/drei';

/**
 * Brand-led facade treatment used by the cinematic experience.
 * It deliberately overlays the older text fallback so the hero shot uses the
 * actual supplied Qubaisa artwork rather than approximating the Arabic mark.
 */
export function BrandFacadeSign() {
  return (
    <group position={[0, 12.75, -11.62]}>
      <mesh position={[0, 0, -0.06]} castShadow receiveShadow>
        <boxGeometry args={[10.7, 2.28, 0.16]} />
        <meshStandardMaterial
          color="#030813"
          metalness={0.55}
          roughness={0.26}
          emissive="#080b10"
          emissiveIntensity={0.14}
        />
      </mesh>
      <Image
        url="/brand/qubaisa-logo.webp"
        scale={[5.65, 1.9]}
        position={[0, 0, 0.055]}
        toneMapped={false}
        transparent
      />
      <rectAreaLight
        width={9.6}
        height={1.8}
        intensity={2.2}
        color="#d5b46d"
        position={[0, 0, 0.5]}
        rotation={[0, Math.PI, 0]}
      />
    </group>
  );
}

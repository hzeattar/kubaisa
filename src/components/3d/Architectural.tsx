import React from 'react';
import {
  useMetalTexture,
  usePlasterTexture,
} from './Materials';

export const Pillar: React.FC<{ position: [number, number, number]; height?: number; radius?: number }> = ({
  position,
  height = 4,
  radius = 0.3,
}) => {
  const plaster = usePlasterTexture();
  const shaftHeight = Math.max(1.4, height - 1.35);

  return (
    <group position={position}>
      <mesh position={[0, -height / 2 + 0.14, 0]} castShadow receiveShadow>
        <boxGeometry args={[radius * 3.25, 0.28, radius * 3.25]} />
        <meshStandardMaterial {...plaster} color="#ded8cf" roughness={0.62} />
      </mesh>
      <mesh position={[0, -height / 2 + 0.36, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[radius * 1.48, radius * 1.7, 0.22, 24]} />
        <meshStandardMaterial {...plaster} color="#e8e1d7" roughness={0.58} />
      </mesh>
      <mesh position={[0, -height / 2 + 0.52, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <torusGeometry args={[radius * 1.28, radius * 0.12, 8, 28]} />
        <meshStandardMaterial {...plaster} color="#eee8df" roughness={0.56} />
      </mesh>

      {/* Slight taper gives the shaft a classical entasis-like silhouette without dense geometry. */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[radius * 0.9, radius, shaftHeight, 24]} />
        <meshStandardMaterial {...plaster} color="#eee8df" roughness={0.64} />
      </mesh>

      <mesh position={[0, height / 2 - 0.55, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <torusGeometry args={[radius * 1.2, radius * 0.1, 8, 28]} />
        <meshStandardMaterial {...plaster} color="#f0eae1" roughness={0.56} />
      </mesh>
      <mesh position={[0, height / 2 - 0.37, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[radius * 1.58, radius * 1.18, 0.28, 24]} />
        <meshStandardMaterial {...plaster} color="#e8e1d7" roughness={0.58} />
      </mesh>
      <mesh position={[0, height / 2 - 0.14, 0]} castShadow receiveShadow>
        <boxGeometry args={[radius * 3.35, 0.28, radius * 3.35]} />
        <meshStandardMaterial {...plaster} color="#ded8cf" roughness={0.6} />
      </mesh>
    </group>
  );
};

function WarmInterior({ width, height, y = 0 }: { width: number; height: number; y?: number }) {
  return (
    <mesh position={[0, y, -0.035]}>
      <planeGeometry args={[width * 0.92, height * 0.92]} />
      <meshStandardMaterial
        color="#8d6748"
        emissive="#d58f4c"
        emissiveIntensity={0.36}
        roughness={0.9}
        toneMapped
      />
    </mesh>
  );
}

function ExteriorGlass({ width, height, y = 0 }: { width: number; height: number; y?: number }) {
  return (
    <mesh position={[0, y, 0.1]}>
      <planeGeometry args={[width, height]} />
      <meshPhysicalMaterial
        color="#07121a"
        roughness={0.08}
        metalness={0.06}
        clearcoat={0.92}
        clearcoatRoughness={0.12}
        transparent
        opacity={0.82}
        envMapIntensity={1.35}
      />
    </mesh>
  );
}

export const Window: React.FC<{
  position: [number, number, number];
  width?: number;
  height?: number;
  arched?: boolean;
}> = ({ position, width = 2, height = 4, arched = false }) => {
  const metal = useMetalTexture();
  const plaster = usePlasterTexture();

  if (arched) {
    const radius = width / 2;
    const rectHeight = Math.max(0.8, height - radius);
    const archCenterY = rectHeight / 2;
    const rectCenterY = -radius / 2;

    return (
      <group position={position}>
        {/* Recessed stone surround creates real facade depth and self-shadow. */}
        <mesh position={[0, 0, -0.18]} castShadow receiveShadow>
          <boxGeometry args={[width + 0.82, height + 0.72, 0.58]} />
          <meshStandardMaterial {...plaster} color="#d9d1c5" roughness={0.68} />
        </mesh>

        <mesh position={[0, rectCenterY, 0.025]} castShadow receiveShadow>
          <boxGeometry args={[width + 0.22, rectHeight + 0.18, 0.14]} />
          <meshStandardMaterial {...metal} color="#28231e" roughness={0.42} metalness={0.8} />
        </mesh>
        <WarmInterior width={width} height={rectHeight} y={rectCenterY} />
        <ExteriorGlass width={width} height={rectHeight} y={rectCenterY} />

        <mesh position={[0, archCenterY, -0.035]}>
          <circleGeometry args={[radius * 0.94, 36, 0, Math.PI]} />
          <meshStandardMaterial color="#8d6748" emissive="#d58f4c" emissiveIntensity={0.3} side={2} />
        </mesh>
        <mesh position={[0, archCenterY, 0.095]}>
          <circleGeometry args={[radius, 40, 0, Math.PI]} />
          <meshPhysicalMaterial
            color="#07121a"
            roughness={0.08}
            metalness={0.06}
            clearcoat={0.92}
            clearcoatRoughness={0.12}
            transparent
            opacity={0.82}
            envMapIntensity={1.35}
            side={2}
          />
        </mesh>
        <mesh position={[0, archCenterY, 0.13]} castShadow>
          <torusGeometry args={[radius + 0.11, 0.095, 10, 42, Math.PI]} />
          <meshStandardMaterial {...metal} color="#9f7e44" roughness={0.34} metalness={0.88} />
        </mesh>

        <mesh position={[0, rectCenterY, 0.145]} castShadow>
          <boxGeometry args={[0.058, rectHeight, 0.11]} />
          <meshStandardMaterial color="#26211d" roughness={0.48} metalness={0.84} />
        </mesh>
        <mesh position={[0, rectCenterY + rectHeight * 0.18, 0.145]} castShadow>
          <boxGeometry args={[width, 0.052, 0.11]} />
          <meshStandardMaterial color="#26211d" roughness={0.48} metalness={0.84} />
        </mesh>
        <mesh position={[0, rectCenterY - rectHeight * 0.22, 0.145]} castShadow>
          <boxGeometry args={[width, 0.052, 0.11]} />
          <meshStandardMaterial color="#26211d" roughness={0.48} metalness={0.84} />
        </mesh>

        <mesh position={[0, -height / 2 - 0.28, 0.13]} castShadow receiveShadow>
          <boxGeometry args={[width + 0.92, 0.18, 0.72]} />
          <meshStandardMaterial {...plaster} color="#d7cec1" roughness={0.56} />
        </mesh>
      </group>
    );
  }

  return (
    <group position={position}>
      <mesh position={[0, 0, -0.17]} castShadow receiveShadow>
        <boxGeometry args={[width + 0.76, height + 0.72, 0.56]} />
        <meshStandardMaterial {...plaster} color="#d9d3ca" roughness={0.68} />
      </mesh>
      <mesh position={[0, 0, 0.025]} castShadow receiveShadow>
        <boxGeometry args={[width + 0.18, height + 0.18, 0.14]} />
        <meshStandardMaterial {...metal} color="#28231e" roughness={0.46} metalness={0.82} />
      </mesh>

      <WarmInterior width={width} height={height} />
      <ExteriorGlass width={width} height={height} />

      <mesh position={[0, 0, 0.145]} castShadow receiveShadow>
        <boxGeometry args={[0.052, height, 0.11]} />
        <meshStandardMaterial color="#26211d" roughness={0.48} metalness={0.84} />
      </mesh>
      <mesh position={[0, height / 4, 0.145]} castShadow receiveShadow>
        <boxGeometry args={[width, 0.052, 0.11]} />
        <meshStandardMaterial color="#26211d" roughness={0.48} metalness={0.84} />
      </mesh>
      <mesh position={[0, -height / 4, 0.145]} castShadow receiveShadow>
        <boxGeometry args={[width, 0.052, 0.11]} />
        <meshStandardMaterial color="#26211d" roughness={0.48} metalness={0.84} />
      </mesh>
      <mesh position={[0, -height / 2 - 0.28, 0.12]} castShadow receiveShadow>
        <boxGeometry args={[width + 0.88, 0.18, 0.68]} />
        <meshStandardMaterial {...plaster} color="#d5ccbe" roughness={0.56} />
      </mesh>
    </group>
  );
};

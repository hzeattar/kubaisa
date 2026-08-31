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
  return (
    <group position={position}>
      <mesh position={[0, -height / 2 + 0.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[radius * 2.8, 0.4, radius * 2.8]} />
        <meshStandardMaterial {...plaster} color="#e5e0d8" />
      </mesh>
      <mesh position={[0, -height / 2 + 0.5, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[radius * 1.2, radius * 1.4, 0.2, 32]} />
        <meshStandardMaterial {...plaster} color="#e5e0d8" />
      </mesh>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[radius, radius, height - 1.2, 32]} />
        <meshStandardMaterial {...plaster} color="#e5e0d8" />
      </mesh>
      <mesh position={[0, height / 2 - 0.5, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[radius * 1.4, radius * 1.2, 0.2, 32]} />
        <meshStandardMaterial {...plaster} color="#e5e0d8" />
      </mesh>
      <mesh position={[0, height / 2 - 0.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[radius * 2.8, 0.4, radius * 2.8]} />
        <meshStandardMaterial {...plaster} color="#e5e0d8" />
      </mesh>
    </group>
  );
};

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
        <mesh position={[0, 0, -0.12]} castShadow receiveShadow>
          <boxGeometry args={[width + 0.68, height + 0.56, 0.42]} />
          <meshStandardMaterial {...plaster} color="#ddd6cb" roughness={0.7} />
        </mesh>

        <mesh position={[0, rectCenterY, 0.055]} castShadow receiveShadow>
          <boxGeometry args={[width + 0.16, rectHeight + 0.12, 0.1]} />
          <meshStandardMaterial {...metal} color="#24201c" roughness={0.46} metalness={0.78} />
        </mesh>
        <mesh position={[0, rectCenterY, 0.09]}>
          <planeGeometry args={[width, rectHeight]} />
          <meshStandardMaterial color="#071019" roughness={0.14} metalness={0.5} transparent opacity={0.9} />
        </mesh>

        <mesh position={[0, archCenterY, 0.09]}>
          <circleGeometry args={[radius, 40, 0, Math.PI]} />
          <meshStandardMaterial color="#071019" roughness={0.14} metalness={0.5} transparent opacity={0.9} side={2} />
        </mesh>
        <mesh position={[0, archCenterY, 0.12]} castShadow>
          <torusGeometry args={[radius + 0.09, 0.09, 12, 48, Math.PI]} />
          <meshStandardMaterial {...metal} color="#9f7e44" roughness={0.36} metalness={0.86} />
        </mesh>

        <mesh position={[0, rectCenterY, 0.13]} castShadow>
          <boxGeometry args={[0.055, rectHeight, 0.1]} />
          <meshStandardMaterial color="#26211d" roughness={0.5} metalness={0.82} />
        </mesh>
        <mesh position={[0, rectCenterY + rectHeight * 0.18, 0.13]} castShadow>
          <boxGeometry args={[width, 0.05, 0.1]} />
          <meshStandardMaterial color="#26211d" roughness={0.5} metalness={0.82} />
        </mesh>
        <mesh position={[0, rectCenterY - rectHeight * 0.22, 0.13]} castShadow>
          <boxGeometry args={[width, 0.05, 0.1]} />
          <meshStandardMaterial color="#26211d" roughness={0.5} metalness={0.82} />
        </mesh>
      </group>
    );
  }

  return (
    <group position={position}>
      <mesh position={[0, 0, -0.1]} castShadow receiveShadow>
        <boxGeometry args={[width + 0.6, height + 0.6, 0.4]} />
        <meshStandardMaterial {...plaster} color="#dcd7cf" />
      </mesh>
      <mesh position={[0, 0, 0.05]} castShadow receiveShadow>
        <boxGeometry args={[width + 0.15, height + 0.15, 0.1]} />
        <meshStandardMaterial {...metal} color="#222" roughness={0.6} metalness={0.8} />
      </mesh>
      <mesh position={[0, 0, 0.08]} castShadow receiveShadow>
        <boxGeometry args={[0.05, height, 0.12]} />
        <meshStandardMaterial color="#222" roughness={0.6} metalness={0.8} />
      </mesh>
      <mesh position={[0, height / 4, 0.08]} castShadow receiveShadow>
        <boxGeometry args={[width, 0.05, 0.12]} />
        <meshStandardMaterial color="#222" roughness={0.6} metalness={0.8} />
      </mesh>
      <mesh position={[0, -height / 4, 0.08]} castShadow receiveShadow>
        <boxGeometry args={[width, 0.05, 0.12]} />
        <meshStandardMaterial color="#222" roughness={0.6} metalness={0.8} />
      </mesh>
      <mesh position={[0, 0, 0.1]}>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial color="#02050a" roughness={0.1} metalness={0.9} transparent opacity={0.85} />
      </mesh>
    </group>
  );
};

import React from 'react';
import { useAppStore } from '../../../stores/useAppStore';

export const ModernLiving: React.FC = () => {
  const { setSelectedProduct } = useAppStore();

  return (
    <group position={[-15, 0, -25]}>
      {/* Floor area */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#c4baa8" roughness={0.9} /> {/* Carpet / Rug */}
      </mesh>

      {/* Placeholder Sofa - Modern Curved */}
      <mesh 
        position={[0, 0.4, -2]} 
        castShadow 
        receiveShadow
        onClick={() => setSelectedProduct('sofa-modern-01')}
        onPointerOver={() => document.body.style.cursor = 'pointer'}
        onPointerOut={() => document.body.style.cursor = 'auto'}
      >
        <boxGeometry args={[3, 0.8, 1]} />
        <meshStandardMaterial color="#e8e5df" roughness={0.8} /> {/* Boucle fabric feel */}
      </mesh>

      {/* Coffee Table */}
      <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.6, 0.6, 0.4, 32]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.2} metalness={0.8} />
      </mesh>
    </group>
  );
};

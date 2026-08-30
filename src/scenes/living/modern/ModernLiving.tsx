import React from 'react';
import { useAppStore } from '../../../stores/useAppStore';
import { Hotspot } from '../../../components/3d/Hotspot';

export const ModernLiving: React.FC = () => {
  const { setSelectedProduct } = useAppStore();

  return (
    <group position={[-15, 0, -25]}>
      {/* Floor area */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#c4baa8" roughness={0.9} /> {/* Carpet / Rug */}
      </mesh>

      {/* Walls */}
      <mesh position={[0, 2.5, -5]} receiveShadow>
        <boxGeometry args={[10, 5, 0.2]} />
        <meshStandardMaterial color="#fdfbf7" roughness={0.9} />
      </mesh>
      <mesh position={[-5, 2.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[10, 5, 0.2]} />
        <meshStandardMaterial color="#050a15" roughness={0.7} /> {/* Accent Wall */}
      </mesh>
      
      {/* Hotspot pointing to the product */}
      <Hotspot 
        position={[0, 1.8, -2]} 
        productId="sofa-modern-01" 
        labelAr="طقم انتريه مودرن" 
        labelEn="Modern Sofa Set" 
      />

      {/* Placeholder Sofa - Modern Curved */}
      <mesh 
        position={[0, 0.4, -2]} 
        castShadow 
        receiveShadow
        onClick={(e) => {
          e.stopPropagation();
          setSelectedProduct('sofa-modern-01');
        }}
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

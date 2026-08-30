import React from 'react';
import { useAppStore } from '../../../stores/useAppStore';
import { Hotspot } from '../../../components/3d/Hotspot';

export const NeoClassicLiving: React.FC = () => {
  const { setSelectedProduct } = useAppStore();

  return (
    <group position={[15, 0, -25]}>
      {/* Floor area */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#8a7969" roughness={0.9} /> {/* Classical Rug */}
      </mesh>

      {/* Walls */}
      <mesh position={[0, 2.5, -5]} receiveShadow>
        <boxGeometry args={[10, 5, 0.2]} />
        <meshStandardMaterial color="#fdfbf7" roughness={0.8} />
      </mesh>
      <mesh position={[5, 2.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[10, 5, 0.2]} />
        <meshStandardMaterial color="#e5e0d8" roughness={0.9} />
      </mesh>

      {/* Hotspot pointing to the product */}
      <Hotspot 
        position={[0, 1.8, -2]} 
        productId="salon-classic-01" 
        labelAr="صالون نيو كلاسيك" 
        labelEn="Neo-Classic Salon" 
      />

      {/* Placeholder Sofa - Neo-Classic */}
      <mesh 
        position={[0, 0.5, -2]} 
        castShadow 
        receiveShadow
        onClick={(e) => {
          e.stopPropagation();
          setSelectedProduct('salon-classic-01');
        }}
        onPointerOver={() => document.body.style.cursor = 'pointer'}
        onPointerOut={() => document.body.style.cursor = 'auto'}
      >
        <boxGeometry args={[2.8, 1, 0.9]} />
        <meshStandardMaterial color="#d1c6b1" roughness={0.6} />
      </mesh>

      {/* Gilded Frame Placeholder (Back of sofa) */}
      <mesh position={[0, 1.1, -2.4]} castShadow>
        <boxGeometry args={[2.9, 0.2, 0.1]} />
        <meshStandardMaterial color="#d4af37" roughness={0.3} metalness={0.9} />
      </mesh>

      {/* Coffee Table - Marble */}
      <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 0.5, 1]} />
        <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.1} />
      </mesh>
    </group>
  );
};

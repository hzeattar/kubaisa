import React from 'react';
import { useAppStore } from '../../../stores/useAppStore';
import { Hotspot } from '../../../components/3d/Hotspot';
import { Window } from '../../../components/3d/Architectural';

export const NeoClassicLiving: React.FC = () => {
  const { setSelectedProduct } = useAppStore();

  return (
    <group>
      {/* Floor - Parquet style */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 28]} />
        <meshStandardMaterial color="#3a2a1a" roughness={0.6} /> 
      </mesh>

      {/* Carpet */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[14, 18]} />
        <meshStandardMaterial color="#8a7969" roughness={0.9} /> {/* Classical Rug */}
      </mesh>

      {/* Walls */}
      <mesh position={[0, 4, -13.5]} receiveShadow>
        <boxGeometry args={[20, 8, 1]} />
        <meshStandardMaterial color="#fdfbf7" roughness={0.8} />
      </mesh>
      <mesh position={[9.5, 4, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[26, 8, 1]} />
        <meshStandardMaterial color="#e5e0d8" roughness={0.9} />
      </mesh>

      {/* Windows on back wall */}
      <Window position={[-5, 3, -12.9]} width={2.5} height={6} />
      <Window position={[5, 3, -12.9]} width={2.5} height={6} />

      {/* Hotspot pointing to the product */}
      <Hotspot 
        position={[0, 2.2, -2]} 
        productId="salon-classic-01" 
        labelAr="صالون نيو كلاسيك" 
        labelEn="Neo-Classic Salon" 
      />

      {/* Placeholder Sofa - Neo-Classic Composition */}
      <group
        position={[0, 0, -2]}
        onClick={(e) => {
          e.stopPropagation();
          setSelectedProduct('salon-classic-01');
        }}
        onPointerOver={() => document.body.style.cursor = 'pointer'}
        onPointerOut={() => document.body.style.cursor = 'auto'}
      >
        {/* Main 3-Seater Sofa */}
        <group position={[0, 0, -3]}>
          <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
            <boxGeometry args={[3, 0.4, 1]} />
            <meshStandardMaterial color="#d1c6b1" roughness={0.6} />
          </mesh>
          <mesh position={[0, 1.2, -0.4]} castShadow receiveShadow>
            <boxGeometry args={[3, 1, 0.2]} />
            <meshStandardMaterial color="#d1c6b1" roughness={0.6} />
          </mesh>
          {/* Gilded Wood Frame Accent */}
          <mesh position={[0, 1.7, -0.45]} castShadow>
            <boxGeometry args={[3.1, 0.2, 0.2]} />
            <meshStandardMaterial color="#d4af37" roughness={0.3} metalness={0.9} />
          </mesh>
        </group>

        {/* 2-Seater Sofa */}
        <group position={[-4, 0, 0]} rotation={[0, Math.PI/2, 0]}>
          <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
            <boxGeometry args={[2, 0.4, 1]} />
            <meshStandardMaterial color="#d1c6b1" roughness={0.6} />
          </mesh>
          <mesh position={[0, 1.2, -0.4]} castShadow receiveShadow>
            <boxGeometry args={[2, 1, 0.2]} />
            <meshStandardMaterial color="#d1c6b1" roughness={0.6} />
          </mesh>
          <mesh position={[0, 1.7, -0.45]} castShadow>
            <boxGeometry args={[2.1, 0.2, 0.2]} />
            <meshStandardMaterial color="#d4af37" roughness={0.3} metalness={0.9} />
          </mesh>
        </group>

        {/* 2 Armchairs */}
        <group position={[4, 0, 1]} rotation={[0, -Math.PI/2.5, 0]}>
          <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
            <boxGeometry args={[1, 0.4, 1]} />
            <meshStandardMaterial color="#8a7969" roughness={0.6} />
          </mesh>
          <mesh position={[0, 1.2, -0.4]} castShadow receiveShadow>
            <boxGeometry args={[1, 1, 0.2]} />
            <meshStandardMaterial color="#8a7969" roughness={0.6} />
          </mesh>
        </group>
        
        <group position={[3, 0, -2]} rotation={[0, -Math.PI/3.5, 0]}>
          <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
            <boxGeometry args={[1, 0.4, 1]} />
            <meshStandardMaterial color="#8a7969" roughness={0.6} />
          </mesh>
          <mesh position={[0, 1.2, -0.4]} castShadow receiveShadow>
            <boxGeometry args={[1, 1, 0.2]} />
            <meshStandardMaterial color="#8a7969" roughness={0.6} />
          </mesh>
        </group>

        {/* Coffee Table - Classic Marble & Gold */}
        <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
          <boxGeometry args={[2, 0.1, 1.2]} />
          <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.1} />
        </mesh>
        <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.8, 0.3, 1]} />
          <meshStandardMaterial color="#d4af37" roughness={0.3} metalness={0.9} />
        </mesh>
      </group>
    </group>
  );
};

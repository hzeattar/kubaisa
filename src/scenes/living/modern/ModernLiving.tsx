import React from 'react';
import { useAppStore } from '../../../stores/useAppStore';
import { Hotspot } from '../../../components/3d/Hotspot';
import { Window } from '../../../components/3d/Architectural';

export const ModernLiving: React.FC = () => {
  const { setSelectedProduct } = useAppStore();

  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 28]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.7} />
      </mesh>
      
      {/* Carpet */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[12, 16]} />
        <meshStandardMaterial color="#c4baa8" roughness={0.9} />
      </mesh>

      {/* Walls */}
      <mesh position={[0, 4, -13.5]} receiveShadow>
        <boxGeometry args={[20, 8, 1]} />
        <meshStandardMaterial color="#fdfbf7" roughness={0.9} />
      </mesh>
      <mesh position={[-9.5, 4, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[26, 8, 1]} />
        <meshStandardMaterial color="#050a15" roughness={0.7} /> {/* Accent Wall */}
      </mesh>
      
      {/* Windows on back wall */}
      <Window position={[-5, 3, -12.9]} width={3} height={5} />
      <Window position={[5, 3, -12.9]} width={3} height={5} />

      {/* Hotspot pointing to the product */}
      <Hotspot 
        position={[0, 1.8, -2]} 
        productId="sofa-modern-01" 
        labelAr="طقم انتريه مودرن" 
        labelEn="Modern Sofa Set" 
      />

      {/* Placeholder Sofa - Modern Curved (More believable composition) */}
      <group 
        position={[0, 0, -2]} 
        onClick={(e) => {
          e.stopPropagation();
          setSelectedProduct('sofa-modern-01');
        }}
        onPointerOver={() => document.body.style.cursor = 'pointer'}
        onPointerOut={() => document.body.style.cursor = 'auto'}
      >
        {/* Main curved sofa body */}
        <mesh position={[0, 0.4, -2]} castShadow receiveShadow>
          <capsuleGeometry args={[0.5, 3, 4, 16]} />
          <meshStandardMaterial color="#e8e5df" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.8, -2.3]} castShadow receiveShadow>
          <capsuleGeometry args={[0.4, 3, 4, 16]} />
          <meshStandardMaterial color="#e8e5df" roughness={0.8} />
        </mesh>
        
        {/* Armchairs */}
        <mesh position={[-2.5, 0.4, 0.5]} rotation={[0, Math.PI/4, 0]} castShadow receiveShadow>
          <boxGeometry args={[1, 0.8, 1]} />
          <meshStandardMaterial color="#c0b5a3" roughness={0.9} />
        </mesh>
        <mesh position={[2.5, 0.4, 0.5]} rotation={[0, -Math.PI/4, 0]} castShadow receiveShadow>
          <boxGeometry args={[1, 0.8, 1]} />
          <meshStandardMaterial color="#c0b5a3" roughness={0.9} />
        </mesh>

        {/* Modern Coffee Table */}
        <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[1.5, 1.5, 0.1, 32]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.2} metalness={0.8} />
        </mesh>
        <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.8, 0.8, 0.2, 32]} />
          <meshStandardMaterial color="#d4af37" roughness={0.3} metalness={0.9} />
        </mesh>
      </group>
    </group>
  );
};

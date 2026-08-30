import React, { Suspense } from 'react';
import { useAppStore } from '../../../stores/useAppStore';
import { Hotspot } from '../../../components/3d/Hotspot';
import { Window } from '../../../components/3d/Architectural';
import { useSharedTextures } from '../../../components/3d/Materials';
import { useGLTF } from '@react-three/drei';

const ModernSofaGLB: React.FC<{position: [number, number, number], rotation?: [number, number, number], scale?: number}> = ({position, rotation = [0,0,0], scale = 1}) => {
  const { scene } = useGLTF('/models/modern_sofa.glb');
  const cloned = scene.clone();
  
  // Enable shadows
  cloned.traverse((child: any) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return <primitive object={cloned} position={position} rotation={rotation} scale={scale} />;
}

export const ModernLiving: React.FC = () => {
  const { setSelectedProduct } = useAppStore();
  const { wood, plaster, marble, metal } = useSharedTextures();

  return (
    <group>
      {/* Floor - Light Wood */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 28]} />
        <meshStandardMaterial {...wood} color="#d4ccb8" roughness={0.5} />
      </mesh>
      
      {/* Carpet */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[12, 16]} />
        <meshStandardMaterial color="#c4baa8" roughness={0.9} />
      </mesh>

      {/* Walls */}
      <mesh position={[0, 4.5, -13.5]} receiveShadow>
        <boxGeometry args={[20, 9, 1]} />
        <meshStandardMaterial {...plaster} color="#fdfbf7" />
      </mesh>
      <mesh position={[-9.5, 4.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[26, 9, 1]} />
        <meshStandardMaterial {...wood} color="#222" roughness={0.6} /> {/* Modern Wood Accent Wall */}
      </mesh>
      
      {/* Windows on back wall */}
      <Window position={[-5, 4, -12.9]} width={4} height={6} />
      <Window position={[5, 4, -12.9]} width={4} height={6} />

      {/* Hotspot */}
      <Hotspot 
        position={[0, 2.2, -2]} 
        productId="sofa-modern-01" 
        labelAr="طقم انتريه مودرن" 
        labelEn="Modern Sofa Set" 
      />

      {/* Real GLB Furniture */}
      <group 
        position={[0, 0, -2]} 
        onClick={(e) => {
          e.stopPropagation();
          setSelectedProduct('sofa-modern-01');
        }}
        onPointerOver={() => document.body.style.cursor = 'pointer'}
        onPointerOut={() => document.body.style.cursor = 'auto'}
      >
        <Suspense fallback={
          <mesh position={[0, 0.5, 0]}><boxGeometry args={[2,1,1]}/><meshStandardMaterial color="#ccc"/></mesh>
        }>
          {/* Main Sofa (Scaled up chair) */}
          <ModernSofaGLB position={[0, 0, -2]} scale={3} />
          {/* Two Armchairs */}
          <ModernSofaGLB position={[-3, 0, 1]} rotation={[0, Math.PI/4, 0]} scale={2} />
          <ModernSofaGLB position={[3, 0, 1]} rotation={[0, -Math.PI/4, 0]} scale={2} />
        </Suspense>

        {/* Modern Marble Coffee Table */}
        <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[1.5, 1.5, 0.1, 32]} />
          <meshStandardMaterial {...marble} color="#ffffff" roughness={0.1} metalness={0.1} />
        </mesh>
        <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.8, 0.8, 0.4, 32]} />
          <meshStandardMaterial {...metal} color="#222" roughness={0.3} metalness={0.8} />
        </mesh>
      </group>
    </group>
  );
};

useGLTF.preload('/models/modern_sofa.glb');

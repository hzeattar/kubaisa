import React from 'react';
import { useAppStore } from '../../../stores/useAppStore';
import { Hotspot } from '../../../components/3d/Hotspot';
import { Window } from '../../../components/3d/Architectural';
import { useSharedTextures } from '../../../components/3d/Materials';

export const NeoClassicLiving: React.FC = () => {
  const { setSelectedProduct } = useAppStore();
  const { wood, plaster, marble, metal } = useSharedTextures();

  return (
    <group>
      {/* Floor - Classic Dark Parquet */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 28]} />
        <meshStandardMaterial {...wood} color="#3a2a1a" roughness={0.4} /> 
      </mesh>

      {/* Carpet */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[14, 18]} />
        <meshStandardMaterial color="#8a7969" roughness={0.9} />
      </mesh>

      {/* Walls */}
      <mesh position={[0, 4.5, -13.5]} receiveShadow>
        <boxGeometry args={[20, 9, 1]} />
        <meshStandardMaterial {...plaster} color="#fdfbf7" />
      </mesh>
      {/* Right Wall - Classic Molding representation */}
      <group position={[9.5, 4.5, 0]} rotation={[0, Math.PI / 2, 0]}>
        <mesh receiveShadow>
          <boxGeometry args={[26, 9, 1]} />
          <meshStandardMaterial {...plaster} color="#e5e0d8" />
        </mesh>
        <mesh position={[0, 0, -0.6]} castShadow receiveShadow>
          <boxGeometry args={[22, 6, 0.1]} />
          <meshStandardMaterial {...plaster} color="#f0ede6" />
        </mesh>
      </group>

      {/* Windows on back wall (Arched for classical feel) */}
      <Window position={[-5, 4, -12.9]} width={3} height={6} arched />
      <Window position={[5, 4, -12.9]} width={3} height={6} arched />

      {/* Hotspot */}
      <Hotspot 
        position={[0, 2.5, -2]} 
        productId="salon-classic-01" 
        labelAr="صالون نيو كلاسيك" 
        labelEn="Neo-Classic Salon" 
      />

      {/* High-Quality Procedural Proxy (Given we couldn't download a CC0 GLB in this container) */}
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
          {/* Base / Cushion */}
          <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.5, 0.5, 3.2, 16, 1, false, 0, Math.PI]} rotation={[0,0,Math.PI/2]}/>
            <meshStandardMaterial color="#d1c6b1" roughness={0.8} />
          </mesh>
          {/* Backrest */}
          <mesh position={[0, 1.1, -0.4]} castShadow receiveShadow>
            <cylinderGeometry args={[0.4, 0.4, 3, 16, 1, false, 0, Math.PI]} rotation={[0,0,Math.PI/2]}/>
            <meshStandardMaterial color="#d1c6b1" roughness={0.8} />
          </mesh>
          {/* Gilded Wood Frame Accent (Curved) */}
          <mesh position={[0, 1.5, -0.45]} castShadow>
            <cylinderGeometry args={[0.45, 0.45, 3.2, 16, 1, false, 0, Math.PI]} rotation={[0,0,Math.PI/2]}/>
            <meshStandardMaterial {...metal} color="#d4af37" roughness={0.4} metalness={0.9} />
          </mesh>
          {/* Base Frame */}
          <mesh position={[0, 0.15, 0]} castShadow>
            <boxGeometry args={[3.2, 0.2, 1.2]} />
            <meshStandardMaterial {...wood} color="#2a1a0a" roughness={0.6} />
          </mesh>
        </group>

        {/* 2-Seater Sofa */}
        <group position={[-4, 0, 0]} rotation={[0, Math.PI/2, 0]}>
          <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.5, 0.5, 2.2, 16, 1, false, 0, Math.PI]} rotation={[0,0,Math.PI/2]}/>
            <meshStandardMaterial color="#d1c6b1" roughness={0.8} />
          </mesh>
          <mesh position={[0, 1.1, -0.4]} castShadow receiveShadow>
            <cylinderGeometry args={[0.4, 0.4, 2, 16, 1, false, 0, Math.PI]} rotation={[0,0,Math.PI/2]}/>
            <meshStandardMaterial color="#d1c6b1" roughness={0.8} />
          </mesh>
          <mesh position={[0, 1.5, -0.45]} castShadow>
            <cylinderGeometry args={[0.45, 0.45, 2.2, 16, 1, false, 0, Math.PI]} rotation={[0,0,Math.PI/2]}/>
            <meshStandardMaterial {...metal} color="#d4af37" roughness={0.4} metalness={0.9} />
          </mesh>
          <mesh position={[0, 0.15, 0]} castShadow>
            <boxGeometry args={[2.2, 0.2, 1.2]} />
            <meshStandardMaterial {...wood} color="#2a1a0a" roughness={0.6} />
          </mesh>
        </group>

        {/* 2 Armchairs */}
        {[ 
          { pos: [4, 0, 1], rot: [0, -Math.PI/2.5, 0] },
          { pos: [3, 0, -2], rot: [0, -Math.PI/3.5, 0] }
        ].map((chair, idx) => (
          <group key={idx} position={chair.pos as any} rotation={chair.rot as any}>
            <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.5, 0.5, 1, 16, 1, false, 0, Math.PI]} rotation={[0,0,Math.PI/2]}/>
              <meshStandardMaterial color="#8a7969" roughness={0.8} />
            </mesh>
            <mesh position={[0, 1.1, -0.4]} castShadow receiveShadow>
              <cylinderGeometry args={[0.4, 0.4, 1, 16, 1, false, 0, Math.PI]} rotation={[0,0,Math.PI/2]}/>
              <meshStandardMaterial color="#8a7969" roughness={0.8} />
            </mesh>
            <mesh position={[0, 1.5, -0.45]} castShadow>
              <cylinderGeometry args={[0.45, 0.45, 1.2, 16, 1, false, 0, Math.PI]} rotation={[0,0,Math.PI/2]}/>
              <meshStandardMaterial {...metal} color="#d4af37" roughness={0.4} metalness={0.9} />
            </mesh>
            <mesh position={[0, 0.15, 0]} castShadow>
              <boxGeometry args={[1.2, 0.2, 1.2]} />
              <meshStandardMaterial {...wood} color="#2a1a0a" roughness={0.6} />
            </mesh>
          </group>
        ))}

        {/* Coffee Table - Classic Marble & Gold */}
        <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.4, 0.1, 1.4]} />
          <meshStandardMaterial {...marble} color="#ffffff" roughness={0.1} metalness={0.1} />
        </mesh>
        <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.3, 0.1, 1.3]} />
          <meshStandardMaterial {...metal} color="#d4af37" roughness={0.3} metalness={0.9} />
        </mesh>
        {/* Legs */}
        {[-1.1, 1.1].map(x => [-0.6, 0.6].map(z => (
          <mesh key={`${x}-${z}`} position={[x, 0.2, z]} castShadow>
            <cylinderGeometry args={[0.05, 0.02, 0.4]} />
            <meshStandardMaterial {...metal} color="#d4af37" roughness={0.3} metalness={0.9} />
          </mesh>
        )))}
      </group>
    </group>
  );
};

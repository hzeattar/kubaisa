import React from 'react';
import { RoundedBox } from '@react-three/drei';
import { useAppStore } from '../../../stores/useAppStore';
import { Hotspot } from '../../../components/3d/Hotspot';
import { Window } from '../../../components/3d/Architectural';
import { useSharedTextures } from '../../../components/3d/Materials';

type ClassicSeatProps = {
  position: [number, number, number];
  rotationY?: number;
  width?: number;
  accent?: string;
};

const ClassicSeat: React.FC<ClassicSeatProps> = ({ position, rotationY = 0, width = 3.8, accent = '#d8c8b8' }) => {
  const { fabricClassic, wood, metal } = useSharedTextures();
  const halfWidth = width / 2;

  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <RoundedBox args={[width, 0.5, 1.35]} radius={0.16} smoothness={4} position={[0, 0.55, 0]} castShadow receiveShadow>
        <meshStandardMaterial {...fabricClassic} color={accent} roughness={0.78} />
      </RoundedBox>
      <RoundedBox args={[width - 0.25, 1.15, 0.34]} radius={0.18} smoothness={4} position={[0, 1.25, -0.52]} rotation={[-0.06, 0, 0]} castShadow receiveShadow>
        <meshStandardMaterial {...fabricClassic} color={accent} roughness={0.8} />
      </RoundedBox>

      <mesh position={[0, 0.22, 0.05]} castShadow>
        <boxGeometry args={[width + 0.2, 0.13, 1.2]} />
        <meshStandardMaterial {...metal} color="#c7a45b" roughness={0.34} metalness={0.88} />
      </mesh>
      <mesh position={[0, 1.88, -0.58]} castShadow>
        <boxGeometry args={[width - 0.15, 0.12, 0.16]} />
        <meshStandardMaterial {...metal} color="#d0ad66" roughness={0.3} metalness={0.9} />
      </mesh>
      <mesh position={[0, 1.96, -0.58]} rotation={[0, 0, Math.PI]} scale={[1.55, 1, 1]} castShadow>
        <torusGeometry args={[0.62, 0.055, 10, 36, Math.PI]} />
        <meshStandardMaterial {...metal} color="#d0ad66" roughness={0.3} metalness={0.9} />
      </mesh>

      {[-1, 1].map(side => (
        <group key={side} position={[side * (halfWidth + 0.13), 0, 0]}>
          <RoundedBox args={[0.34, 0.86, 1.28]} radius={0.15} smoothness={4} position={[0, 0.82, 0]} castShadow receiveShadow>
            <meshStandardMaterial {...fabricClassic} color={accent} roughness={0.8} />
          </RoundedBox>
          <mesh position={[0, 1.28, -0.05]} castShadow>
            <sphereGeometry args={[0.18, 14, 10]} />
            <meshStandardMaterial {...metal} color="#c7a45b" roughness={0.32} metalness={0.9} />
          </mesh>
        </group>
      ))}

      {[-1, 1].flatMap(side => [-1, 1].map(depth => (
        <mesh key={`${side}-${depth}`} position={[side * (halfWidth - 0.35), 0.12, depth * 0.38]} castShadow>
          <cylinderGeometry args={[0.055, 0.085, 0.32, 12]} />
          <meshStandardMaterial {...wood} color="#402a1d" roughness={0.55} />
        </mesh>
      )))}
    </group>
  );
};

const ClassicCoffeeTable = () => {
  const { marble, metal } = useSharedTextures();
  return (
    <group position={[0, 0, 0.7]}>
      <RoundedBox args={[2.8, 0.13, 1.65]} radius={0.2} smoothness={4} position={[0, 0.62, 0]} castShadow receiveShadow>
        <meshStandardMaterial {...marble} color="#f0e7db" roughness={0.15} metalness={0.03} />
      </RoundedBox>
      <RoundedBox args={[2.62, 0.12, 1.48]} radius={0.18} smoothness={4} position={[0, 0.52, 0]} castShadow>
        <meshStandardMaterial {...metal} color="#c7a45b" roughness={0.3} metalness={0.9} />
      </RoundedBox>
      {[-1.1, 1.1].flatMap(x => [-0.58, 0.58].map(z => (
        <mesh key={`${x}-${z}`} position={[x, 0.26, z]} castShadow>
          <cylinderGeometry args={[0.055, 0.035, 0.5, 12]} />
          <meshStandardMaterial {...metal} color="#b9954e" roughness={0.34} metalness={0.88} />
        </mesh>
      )))}
    </group>
  );
};

export const NeoClassicLiving: React.FC = () => {
  const { setSelectedProduct } = useAppStore();
  const { wood, plaster, marble, metal } = useSharedTextures();

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 28]} />
        <meshStandardMaterial {...wood} color="#3a2a1a" roughness={0.42} />
      </mesh>

      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[14, 18]} />
        <meshStandardMaterial color="#8a7969" roughness={0.92} />
      </mesh>

      <mesh position={[0, 4.5, -13.5]} receiveShadow>
        <boxGeometry args={[20, 9, 1]} />
        <meshStandardMaterial {...plaster} color="#fdfbf7" />
      </mesh>
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

      <Window position={[-5, 4, -12.9]} width={3} height={6} arched />
      <Window position={[5, 4, -12.9]} width={3} height={6} arched />

      <Hotspot
        position={[0, 2.6, -4.2]}
        productId="salon-classic-01"
        labelAr="صالون نيو كلاسيك"
        labelEn="Neo-Classic Salon"
      />

      <group
        position={[0, 0, -3]}
        onClick={event => {
          event.stopPropagation();
          setSelectedProduct('salon-classic-01');
        }}
        onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { document.body.style.cursor = 'auto'; }}
      >
        <ClassicSeat position={[0, 0, -2.4]} width={4.2} accent="#d8c9b7" />
        <ClassicSeat position={[-4.7, 0, 1]} rotationY={Math.PI / 2.25} width={2.2} accent="#cbb7a1" />
        <ClassicSeat position={[4.7, 0, 1]} rotationY={-Math.PI / 2.25} width={2.2} accent="#cbb7a1" />
        <ClassicCoffeeTable />
      </group>

      <group position={[0, 0, 7.5]}>
        <mesh position={[0, 0.8, 0]} castShadow receiveShadow>
          <boxGeometry args={[5, 1.35, 0.55]} />
          <meshStandardMaterial {...wood} color="#553a29" roughness={0.48} />
        </mesh>
        <mesh position={[0, 1.52, 0]} castShadow receiveShadow>
          <boxGeometry args={[5.2, 0.1, 0.68]} />
          <meshStandardMaterial {...marble} color="#eee4d6" roughness={0.16} />
        </mesh>
        <mesh position={[0, 3.5, -0.15]} castShadow>
          <torusGeometry args={[1.45, 0.09, 14, 48]} />
          <meshStandardMaterial {...metal} color="#c7a45b" roughness={0.32} metalness={0.9} />
        </mesh>
        <mesh position={[0, 3.5, -0.18]}>
          <circleGeometry args={[1.32, 48]} />
          <meshPhysicalMaterial color="#9ca6a9" roughness={0.08} metalness={0.72} envMapIntensity={1.4} />
        </mesh>
      </group>
    </group>
  );
};

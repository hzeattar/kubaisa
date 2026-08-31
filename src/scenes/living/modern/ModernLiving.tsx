import React from 'react';
import { RoundedBox } from '@react-three/drei';
import { Window } from '../../../components/3d/Architectural';
import {
  useModernFabricTexture,
  useModernRoomTextures,
  useWoodTexture,
} from '../../../components/3d/Materials';

type SeatModuleProps = { position: [number, number, number]; rotationY?: number; width?: number; armLeft?: boolean; armRight?: boolean };

const SeatModule: React.FC<SeatModuleProps> = ({ position, rotationY = 0, width = 1.75, armLeft = false, armRight = false }) => {
  const fabricModern = useModernFabricTexture();
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <RoundedBox args={[width, 0.42, 1.45]} radius={0.18} smoothness={4} position={[0, 0.48, 0]} castShadow receiveShadow><meshStandardMaterial {...fabricModern} color="#e7dfd2" roughness={0.84} /></RoundedBox>
      <RoundedBox args={[width, 0.95, 0.34]} radius={0.16} smoothness={4} position={[0, 1.06, -0.57]} rotation={[-0.08, 0, 0]} castShadow receiveShadow><meshStandardMaterial {...fabricModern} color="#e4dccf" roughness={0.86} /></RoundedBox>
      {armLeft && <RoundedBox args={[0.34, 0.72, 1.42]} radius={0.15} smoothness={4} position={[-width / 2 - 0.12, 0.76, 0]} castShadow receiveShadow><meshStandardMaterial {...fabricModern} color="#e2d9cb" roughness={0.86} /></RoundedBox>}
      {armRight && <RoundedBox args={[0.34, 0.72, 1.42]} radius={0.15} smoothness={4} position={[width / 2 + 0.12, 0.76, 0]} castShadow receiveShadow><meshStandardMaterial {...fabricModern} color="#e2d9cb" roughness={0.86} /></RoundedBox>}
    </group>
  );
};

const LoungeChair: React.FC<{ position: [number, number, number]; rotationY: number }> = ({ position, rotationY }) => {
  const fabricModern = useModernFabricTexture();
  const wood = useWoodTexture();
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <RoundedBox args={[1.55, 0.46, 1.55]} radius={0.22} smoothness={4} position={[0, 0.5, 0]} castShadow receiveShadow><meshStandardMaterial {...fabricModern} color="#d9cfc1" roughness={0.84} /></RoundedBox>
      <RoundedBox args={[1.5, 1.08, 0.34]} radius={0.2} smoothness={4} position={[0, 1.1, -0.57]} rotation={[-0.1, 0, 0]} castShadow receiveShadow><meshStandardMaterial {...fabricModern} color="#d9cfc1" roughness={0.84} /></RoundedBox>
      {[-0.56, 0.56].map(x => <mesh key={x} position={[x, 0.18, 0.25]} castShadow><cylinderGeometry args={[0.05, 0.06, 0.36, 12]} /><meshStandardMaterial {...wood} color="#3a2a20" roughness={0.6} /></mesh>)}
    </group>
  );
};

export const ModernLiving: React.FC = () => {
  const { wood, plaster, marble, metal, fabricModern } = useModernRoomTextures();
  return (
    <group>
      <rectAreaLight position={[0, 5.8, 1]} rotation={[-Math.PI / 2, 0, 0]} width={8} height={6} intensity={4.2} color="#ffe7c7" />
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow><planeGeometry args={[20, 28]} /><meshStandardMaterial {...wood} color="#d4ccb8" roughness={0.5} /></mesh>
      <mesh position={[0, 0.025, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow><planeGeometry args={[12, 16]} /><meshStandardMaterial color="#c4baa8" roughness={0.94} /></mesh>
      <mesh position={[0, 4.5, -13.5]} receiveShadow><boxGeometry args={[20, 9, 1]} /><meshStandardMaterial {...plaster} color="#f7f3ec" /></mesh>
      <mesh position={[-9.5, 4.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow><boxGeometry args={[26, 9, 1]} /><meshStandardMaterial {...wood} color="#322a25" roughness={0.58} /></mesh>
      <Window position={[-5, 4, -12.9]} width={4} height={6} />
      <Window position={[5, 4, -12.9]} width={4} height={6} />

      <group position={[0, 0, -3]}>
        <SeatModule position={[-1.65, 0, -1.2]} rotationY={0.13} armLeft />
        <SeatModule position={[0, 0, -1.45]} width={1.8} />
        <SeatModule position={[1.65, 0, -1.2]} rotationY={-0.13} armRight />
        <LoungeChair position={[-4.25, 0, 1.65]} rotationY={0.72} />
        <LoungeChair position={[4.25, 0, 1.65]} rotationY={-0.72} />
        {[-1.45, 0, 1.45].map((x, index) => <RoundedBox key={x} args={[0.72, 0.72, 0.18]} radius={0.12} smoothness={4} position={[x, 1.15, -1.85]} rotation={[0.04, index === 1 ? 0 : (index === 0 ? 0.12 : -0.12), 0]} castShadow><meshStandardMaterial {...fabricModern} color={index === 1 ? '#c5b5a0' : '#f2ece2'} roughness={0.88} /></RoundedBox>)}
        <mesh position={[0, 0.42, 1]} castShadow receiveShadow><cylinderGeometry args={[1.55, 1.55, 0.1, 48]} /><meshStandardMaterial {...marble} color="#f7f3eb" roughness={0.15} metalness={0.04} /></mesh>
        <mesh position={[0, 0.22, 1]} castShadow receiveShadow><cylinderGeometry args={[0.74, 0.9, 0.42, 32]} /><meshStandardMaterial {...metal} color="#242424" roughness={0.34} metalness={0.78} /></mesh>
      </group>

      <group position={[6.9, 0, 5.8]}>
        <mesh position={[0, 0.48, 0]} castShadow receiveShadow><boxGeometry args={[4.4, 0.8, 0.45]} /><meshStandardMaterial {...wood} color="#46392e" roughness={0.55} /></mesh>
        <mesh position={[0, 1.05, -0.1]} receiveShadow><boxGeometry args={[4.6, 0.12, 0.55]} /><meshStandardMaterial {...marble} color="#e9e3d9" roughness={0.2} /></mesh>
      </group>
    </group>
  );
};

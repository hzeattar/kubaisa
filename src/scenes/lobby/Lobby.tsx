import React from 'react';
import { useSharedTextures } from '../../components/3d/Materials';
import { Pillar } from '../../components/3d/Architectural';

export const Lobby: React.FC = () => {
  const { marble, plaster, metal, wood } = useSharedTextures();

  return (
    <group>
      {/* Lobby occupies z=0 .. -40. Keep the floor centered on the actual room depth. */}
      <mesh position={[0, 0, -20]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[30, 40]} />
        <meshStandardMaterial {...marble} color="#e5e0d8" roughness={0.16} metalness={0.05} />
      </mesh>

      <mesh position={[0, 9, -20]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[30, 40]} />
        <meshStandardMaterial {...plaster} color="#f7f3ec" />
      </mesh>

      {/* Side walls */}
      <mesh position={[-15, 4.5, -20]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[40, 9, 1]} />
        <meshStandardMaterial {...plaster} color="#f5f2eb" />
      </mesh>
      <mesh position={[15, 4.5, -20]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[40, 9, 1]} />
        <meshStandardMaterial {...plaster} color="#f5f2eb" />
      </mesh>

      {/* Front wall with a true entrance opening rather than a solid wall. */}
      <mesh position={[-10.5, 4.5, -0.5]} receiveShadow>
        <boxGeometry args={[9, 9, 1]} />
        <meshStandardMaterial {...plaster} color="#f5f2eb" />
      </mesh>
      <mesh position={[10.5, 4.5, -0.5]} receiveShadow>
        <boxGeometry args={[9, 9, 1]} />
        <meshStandardMaterial {...plaster} color="#f5f2eb" />
      </mesh>
      <mesh position={[0, 7.5, -0.5]} receiveShadow>
        <boxGeometry args={[12, 3, 1]} />
        <meshStandardMaterial {...plaster} color="#f5f2eb" />
      </mesh>

      {/* Back feature wall / elevator */}
      <group position={[0, 0, -39.5]}>
        <mesh position={[0, 4.5, 0]} receiveShadow>
          <boxGeometry args={[30, 9, 1]} />
          <meshStandardMaterial {...plaster} color="#11151c" />
        </mesh>

        <mesh position={[0, 4.5, 0.6]} castShadow receiveShadow>
          <boxGeometry args={[6, 9, 0.2]} />
          <meshStandardMaterial {...marble} color="#d4ccb8" roughness={0.22} />
        </mesh>

        <mesh position={[0, 2.5, 0.72]} castShadow>
          <boxGeometry args={[3, 5, 0.1]} />
          <meshStandardMaterial {...metal} color="#cba135" roughness={0.3} metalness={0.9} />
        </mesh>
        <mesh position={[0, 2.5, 0.73]}>
          <boxGeometry args={[0.02, 5, 0.12]} />
          <meshStandardMaterial color="#111" />
        </mesh>
      </group>

      {/* Grand staircase */}
      <group position={[0, 0, -36]}>
        {Array.from({ length: 15 }).map((_, i) => (
          <mesh key={`stair-${i}`} position={[0, i * 0.2 + 0.1, i * 0.3]} castShadow receiveShadow>
            <boxGeometry args={[10 + (15 - i) * 0.2, 0.2, 0.4]} />
            <meshStandardMaterial {...marble} color="#fff8ee" roughness={0.22} />
          </mesh>
        ))}
        <mesh position={[-6, 2, 2.5]} rotation={[Math.PI / 6, 0, 0]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 10, 8]} />
          <meshStandardMaterial {...metal} color="#cba135" roughness={0.3} metalness={0.9} />
        </mesh>
        <mesh position={[6, 2, 2.5]} rotation={[Math.PI / 6, 0, 0]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 10, 8]} />
          <meshStandardMaterial {...metal} color="#cba135" roughness={0.3} metalness={0.9} />
        </mesh>
      </group>

      <Pillar position={[-8, 4.5, -15]} height={9} radius={0.5} />
      <Pillar position={[8, 4.5, -15]} height={9} radius={0.5} />
      <Pillar position={[-8, 4.5, -28]} height={9} radius={0.5} />
      <Pillar position={[8, 4.5, -28]} height={9} radius={0.5} />

      {/* Reception */}
      <group position={[0, 0, -20]}>
        <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[3, 3, 1.2, 32, 1, false, 0, Math.PI]} />
          <meshStandardMaterial {...wood} color="#3d2a1d" />
        </mesh>
        <mesh position={[0, 1.25, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[3.2, 3.2, 0.1, 32, 1, false, 0, Math.PI]} />
          <meshStandardMaterial {...marble} color="#ffffff" roughness={0.12} metalness={0.05} />
        </mesh>
      </group>

      {/* Chandelier: one non-shadow-casting local light keeps mobile cost under control. */}
      <group position={[0, 7, -20]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.02, 0.02, 4]} />
          <meshStandardMaterial {...metal} color="#d4af37" metalness={1} />
        </mesh>
        <mesh position={[0, -1, 0]}>
          <cylinderGeometry args={[2, 1, 0.5, 32]} />
          <meshPhysicalMaterial color="#fff" transparent opacity={0.55} transmission={0.75} roughness={0.14} />
        </mesh>
        <mesh position={[0, -1.6, 0]}>
          <cylinderGeometry args={[1, 0.2, 0.5, 32]} />
          <meshPhysicalMaterial color="#fff" transparent opacity={0.55} transmission={0.75} roughness={0.14} />
        </mesh>
        <pointLight position={[0, -1.2, 0]} intensity={1.6} distance={14} color="#ffe5b4" />
      </group>

      {/* Portal frames leave the actual passage open at z≈-20. */}
      <mesh position={[-14.5, 7.5, -20]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 3, 7]} />
        <meshStandardMaterial {...plaster} color="#f5f2eb" />
      </mesh>
      <mesh position={[14.5, 7.5, -20]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 3, 7]} />
        <meshStandardMaterial {...plaster} color="#f5f2eb" />
      </mesh>
    </group>
  );
};

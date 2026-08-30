import React from 'react';

export const Lobby: React.FC = () => {
  return (
    <group position={[0, 0, -25]}>
      {/* Lobby Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[28, 18]} />
        <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.1} /> {/* Marble */}
      </mesh>

      {/* Back Wall */}
      <mesh position={[0, 3, -9]} receiveShadow>
        <boxGeometry args={[28, 6, 0.5]} />
        <meshStandardMaterial color="#f3e5ab" roughness={0.8} /> 
      </mesh>

      {/* Left Wall (Separating from Modern) */}
      <mesh position={[-14, 3, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[18, 6, 0.5]} />
        <meshStandardMaterial color="#e5e0d8" roughness={0.8} /> 
      </mesh>
      
      {/* Right Wall (Separating from NeoClassic) */}
      <mesh position={[14, 3, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[18, 6, 0.5]} />
        <meshStandardMaterial color="#e5e0d8" roughness={0.8} /> 
      </mesh>

      {/* Front Wall (Entrance with wide opening) */}
      <mesh position={[-9.5, 3, 9]} receiveShadow>
        <boxGeometry args={[9, 6, 0.5]} />
        <meshStandardMaterial color="#e5e0d8" roughness={0.8} /> 
      </mesh>
      <mesh position={[9.5, 3, 9]} receiveShadow>
        <boxGeometry args={[9, 6, 0.5]} />
        <meshStandardMaterial color="#e5e0d8" roughness={0.8} /> 
      </mesh>
      <mesh position={[0, 5, 9]} receiveShadow>
        <boxGeometry args={[10, 2, 0.5]} />
        <meshStandardMaterial color="#e5e0d8" roughness={0.8} /> 
      </mesh>

      {/* Reception Desk */}
      <mesh position={[0, 0.6, -6]} castShadow receiveShadow>
        <boxGeometry args={[4, 1.2, 1]} />
        <meshStandardMaterial color="#050a15" roughness={0.3} />
      </mesh>
      
      {/* Decorative Chandelier placeholder */}
      <mesh position={[0, 4, 0]}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial color="#f3e5ab" emissive="#f3e5ab" emissiveIntensity={1} />
        <pointLight intensity={2} color="#f3e5ab" distance={15} />
      </mesh>
    </group>
  );
};

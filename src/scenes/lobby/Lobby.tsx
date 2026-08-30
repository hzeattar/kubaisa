import React from 'react';

export const Lobby: React.FC = () => {
  return (
    <group position={[0, 0, -25]}>
      {/* Lobby Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[28, 18]} />
        <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.1} /> {/* Marble */}
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
        <pointLight intensity={2} color="#f3e5ab" distance={10} />
      </mesh>
    </group>
  );
};

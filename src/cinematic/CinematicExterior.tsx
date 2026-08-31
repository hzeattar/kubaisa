import React, { useRef } from 'react';
import { Sky } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Pillar, Window } from '../components/3d/Architectural';
import {
  useMarbleTexture,
  useMetalTexture,
  usePlasterTexture,
} from '../components/3d/Materials';
import { cinematicScroll } from './scrollState';

const Wing: React.FC<{ x: number; mirror?: boolean }> = ({ x, mirror = false }) => {
  const plaster = usePlasterTexture();
  const marble = useMarbleTexture();
  const metal = useMetalTexture();
  const sign = mirror ? -1 : 1;

  return (
    <group position={[x, 0, -14]}>
      <mesh position={[0, 3.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[15.5, 6.4, 3.6]} />
        <meshStandardMaterial {...plaster} color="#d9d1c4" roughness={0.72} />
      </mesh>
      <mesh position={[sign * 1.1, 9.1, -0.15]} castShadow receiveShadow>
        <boxGeometry args={[17.7, 5.4, 3.3]} />
        <meshStandardMaterial {...plaster} color="#eee7dc" roughness={0.68} />
      </mesh>
      <mesh position={[sign * 1.1, 12.05, 0.3]} castShadow receiveShadow>
        <boxGeometry args={[18.4, 0.52, 4.15]} />
        <meshStandardMaterial {...marble} color="#ddd4c6" roughness={0.48} />
      </mesh>
      <mesh position={[sign * 1.1, 6.35, 0.38]} castShadow receiveShadow>
        <boxGeometry args={[18.1, 0.34, 4]} />
        <meshStandardMaterial {...marble} color="#d6ccbd" roughness={0.5} />
      </mesh>

      {[-5.2, 0, 5.2].map((localX) => (
        <group key={`bay-${localX}`} position={[localX, 0, 1.96]}>
          <Window position={[0, 3.25, 0]} width={2.65} height={4.15} />
          <Window position={[0, 9.15, 0]} width={2.55} height={3.75} arched />
          <mesh position={[0, 6.3, 0.05]} castShadow>
            <boxGeometry args={[3.3, 0.12, 0.18]} />
            <meshStandardMaterial {...metal} color="#aa884b" metalness={0.78} roughness={0.42} />
          </mesh>
        </group>
      ))}

      {[-7.2, -2.6, 2.6, 7.2].map((localX) => (
        <mesh key={`pilaster-${localX}`} position={[localX, 8.95, 1.94]} castShadow receiveShadow>
          <boxGeometry args={[0.72, 5.25, 0.34]} />
          <meshStandardMaterial {...plaster} color="#f2ece3" roughness={0.68} />
        </mesh>
      ))}
    </group>
  );
};

const Tree: React.FC<{ position: [number, number, number]; scale?: number }> = ({ position, scale = 1 }) => (
  <group position={position} scale={scale}>
    <mesh position={[0, 1.35, 0]} castShadow>
      <cylinderGeometry args={[0.12, 0.18, 2.7, 10]} />
      <meshStandardMaterial color="#4d3527" roughness={0.9} />
    </mesh>
    <mesh position={[0, 3.25, 0]} castShadow>
      <icosahedronGeometry args={[1.25, 2]} />
      <meshStandardMaterial color="#243a2a" roughness={0.96} />
    </mesh>
    <mesh position={[0.72, 3.0, 0.18]} castShadow>
      <icosahedronGeometry args={[0.8, 2]} />
      <meshStandardMaterial color="#2e4934" roughness={0.96} />
    </mesh>
  </group>
);

function EntranceDoors() {
  const leftDoor = useRef<THREE.Group>(null);
  const rightDoor = useRef<THREE.Group>(null);
  const metal = useMetalTexture();

  useFrame(() => {
    const openness = THREE.MathUtils.smoothstep(cinematicScroll.progress, 0.3, 0.47);
    if (leftDoor.current) leftDoor.current.position.x = -1.02 - openness * 1.62;
    if (rightDoor.current) rightDoor.current.position.x = 1.02 + openness * 1.62;
  });

  const DoorLeaf = ({ side }: { side: -1 | 1 }) => (
    <group ref={side === -1 ? leftDoor : rightDoor} position={[side * 1.02, 0, 0]}>
      <mesh position={[0, 3.08, 0.37]} castShadow receiveShadow>
        <boxGeometry args={[1.92, 5.75, 0.11]} />
        <meshPhysicalMaterial
          color="#17242c"
          roughness={0.08}
          metalness={0.12}
          transparent
          opacity={0.5}
          transmission={0.18}
          thickness={0.05}
        />
      </mesh>
      <mesh position={[side * -0.82, 3.08, 0.44]} castShadow>
        <boxGeometry args={[0.065, 5.72, 0.08]} />
        <meshStandardMaterial {...metal} color="#b99452" metalness={0.9} roughness={0.3} />
      </mesh>
      <mesh position={[side * -0.68, 2.9, 0.5]} castShadow>
        <boxGeometry args={[0.045, 1.2, 0.09]} />
        <meshStandardMaterial {...metal} color="#cfac65" metalness={0.94} roughness={0.24} />
      </mesh>
    </group>
  );

  return (
    <group>
      <mesh position={[-3.08, 3.08, 0.35]} castShadow receiveShadow>
        <boxGeometry args={[1.72, 5.75, 0.09]} />
        <meshPhysicalMaterial color="#16232b" roughness={0.1} metalness={0.14} transparent opacity={0.42} />
      </mesh>
      <mesh position={[3.08, 3.08, 0.35]} castShadow receiveShadow>
        <boxGeometry args={[1.72, 5.75, 0.09]} />
        <meshPhysicalMaterial color="#16232b" roughness={0.1} metalness={0.14} transparent opacity={0.42} />
      </mesh>
      <DoorLeaf side={-1} />
      <DoorLeaf side={1} />
      <mesh position={[0, 0.2, 0.46]} castShadow receiveShadow>
        <boxGeometry args={[7.8, 0.16, 0.46]} />
        <meshStandardMaterial {...metal} color="#9d7d42" metalness={0.88} roughness={0.34} />
      </mesh>
    </group>
  );
}

export const CinematicExterior: React.FC = () => {
  const plaster = usePlasterTexture();
  const marble = useMarbleTexture();
  const metal = useMetalTexture();

  return (
    <group>
      <Sky
        distance={450000}
        sunPosition={[4, 1.1, -3]}
        turbidity={7.2}
        rayleigh={1.35}
        mieCoefficient={0.008}
        mieDirectionalG={0.86}
      />

      <mesh position={[0, -0.08, -4]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[130, 95]} />
        <meshStandardMaterial color="#17191c" roughness={0.92} />
      </mesh>
      <mesh position={[0, -0.02, -4]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[54, 34]} />
        <meshStandardMaterial {...marble} color="#777064" roughness={0.78} />
      </mesh>

      <group position={[0, 0, -14]}>
        <mesh position={[-6.45, 5.4, -0.25]} castShadow receiveShadow>
          <boxGeometry args={[5.1, 10.8, 4.7]} />
          <meshStandardMaterial {...plaster} color="#eee7dc" roughness={0.66} />
        </mesh>
        <mesh position={[6.45, 5.4, -0.25]} castShadow receiveShadow>
          <boxGeometry args={[5.1, 10.8, 4.7]} />
          <meshStandardMaterial {...plaster} color="#eee7dc" roughness={0.66} />
        </mesh>
        <mesh position={[0, 9.2, -0.25]} castShadow receiveShadow>
          <boxGeometry args={[7.9, 3.2, 4.7]} />
          <meshStandardMaterial {...plaster} color="#eee7dc" roughness={0.66} />
        </mesh>
        <mesh position={[0, 11.65, -0.2]} castShadow receiveShadow>
          <boxGeometry args={[20.4, 1.35, 5.15]} />
          <meshStandardMaterial {...marble} color="#d9d0c2" roughness={0.48} />
        </mesh>
        <mesh position={[0, 13.2, -0.3]} castShadow receiveShadow>
          <boxGeometry args={[16.4, 1.45, 4.45]} />
          <meshStandardMaterial {...plaster} color="#e7dfd3" roughness={0.65} />
        </mesh>

        <group position={[0, 0, 2.55]}>
          <EntranceDoors />
          <mesh position={[0, 6.85, -0.02]} castShadow receiveShadow>
            <boxGeometry args={[12.8, 0.7, 1.55]} />
            <meshStandardMaterial {...marble} color="#e6ded1" roughness={0.46} />
          </mesh>
          <Pillar position={[-5.1, 3.55, -0.05]} height={7.1} radius={0.43} />
          <Pillar position={[5.1, 3.55, -0.05]} height={7.1} radius={0.43} />
          <Pillar position={[-7.0, 3.55, -0.55]} height={7.1} radius={0.32} />
          <Pillar position={[7.0, 3.55, -0.55]} height={7.1} radius={0.32} />
          <mesh position={[0, 8.1, -0.38]} castShadow receiveShadow>
            <boxGeometry args={[14.9, 1.5, 1.7]} />
            <meshStandardMaterial {...plaster} color="#f3ece1" roughness={0.62} />
          </mesh>
          <mesh position={[0, 8.45, 0.52]} castShadow receiveShadow>
            <boxGeometry args={[11.3, 0.12, 0.14]} />
            <meshStandardMaterial {...metal} color="#b49455" metalness={0.88} roughness={0.36} />
          </mesh>
        </group>
      </group>

      <pointLight position={[0, 3.8, -14.9]} intensity={14} distance={15} decay={2} color="#ffd5a0" />
      <pointLight position={[0, 2.4, -10.7]} intensity={5} distance={9} decay={2} color="#f4c985" />

      <Wing x={-16.7} />
      <Wing x={16.7} mirror />

      {[0, 1, 2, 3].map((step) => (
        <mesh key={step} position={[0, 0.1 + step * 0.13, -9.25 - step * 0.72]} castShadow receiveShadow>
          <boxGeometry args={[15.5 - step * 0.65, 0.2, 0.72]} />
          <meshStandardMaterial {...marble} color="#cfc6b8" roughness={0.42} />
        </mesh>
      ))}

      <group position={[0, 0, 6.5]}>
        <mesh position={[0, 0.14, 0]} receiveShadow>
          <cylinderGeometry args={[6.4, 6.4, 0.28, 64]} />
          <meshStandardMaterial {...marble} color="#6b655d" roughness={0.58} />
        </mesh>
        <mesh position={[0, 0.29, 0]}>
          <cylinderGeometry args={[5.45, 5.45, 0.12, 64]} />
          <meshPhysicalMaterial color="#23323b" roughness={0.08} metalness={0.18} transparent opacity={0.82} />
        </mesh>
        <mesh position={[0, 0.52, 0]} castShadow>
          <cylinderGeometry args={[0.82, 1.12, 0.6, 40]} />
          <meshStandardMaterial {...marble} color="#bbb1a3" roughness={0.42} />
        </mesh>
      </group>

      {([[-20, 0, 6], [-27, 0, -2], [20, 0, 6], [27, 0, -2]] as [number, number, number][]).map((p, i) => (
        <Tree key={i} position={p} scale={i % 2 === 0 ? 1.05 : 0.86} />
      ))}

      {[-12, -8, -4, 4, 8, 12].map((x) => (
        <group key={x} position={[x, 0, 12]}>
          <mesh position={[0, 0.45, 0]} castShadow>
            <cylinderGeometry args={[0.07, 0.1, 0.9, 12]} />
            <meshStandardMaterial color="#282725" metalness={0.7} roughness={0.42} />
          </mesh>
          <pointLight position={[0, 0.95, 0]} intensity={1.4} distance={4.2} color="#ffd89a" />
        </group>
      ))}
    </group>
  );
};

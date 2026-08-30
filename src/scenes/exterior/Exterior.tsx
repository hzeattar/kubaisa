import React, { useEffect } from 'react';
import { Environment, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { Pillar, Window } from '../../components/3d/Architectural';
import { useSharedTextures } from '../../components/3d/Materials';
import { ArrivalLandscape } from './ArrivalLandscape';

export const Exterior: React.FC = () => {
  const { plaster, marble, metal } = useSharedTextures();
  const logoTexture = useTexture('/brand/qubaisa-logo.webp');

  useEffect(() => {
    logoTexture.colorSpace = THREE.SRGBColorSpace;
    logoTexture.anisotropy = 4;
    logoTexture.needsUpdate = true;
  }, [logoTexture]);

  return (
    <group>
      <Environment files="/hdri/sunset.hdr" background={true} blur={0.05} />

      <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[120, 120]} />
        <meshStandardMaterial color="#111" roughness={0.9} />
      </mesh>

      <mesh position={[0, 0, -5]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[50, 30]} />
        <meshStandardMaterial {...marble} color="#444" roughness={0.8} />
      </mesh>

      <group position={[-18, 0, -6]}>
        <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
          <boxGeometry args={[8, 0.8, 6]} />
          <meshStandardMaterial {...marble} color="#222" />
        </mesh>
        <mesh position={[0, 1, 0]} castShadow receiveShadow>
          <boxGeometry args={[7.5, 0.4, 5.5]} />
          <meshStandardMaterial color="#0a1205" roughness={0.9} />
        </mesh>
      </group>

      <group position={[18, 0, -6]}>
        <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
          <boxGeometry args={[8, 0.8, 6]} />
          <meshStandardMaterial {...marble} color="#222" />
        </mesh>
        <mesh position={[0, 1, 0]} castShadow receiveShadow>
          <boxGeometry args={[7.5, 0.4, 5.5]} />
          <meshStandardMaterial color="#0a1205" roughness={0.9} />
        </mesh>
      </group>

      <ArrivalLandscape />

      <group position={[0, 0, -10]}>
        {[0, 1, 2, 3, 4].map(i => (
          <mesh key={i} position={[0, i * 0.15 + 0.075, -i * 0.6]} receiveShadow castShadow>
            <boxGeometry args={[14, 0.15, 0.6]} />
            <meshStandardMaterial {...marble} color="#d4ccb8" roughness={0.4} />
          </mesh>
        ))}
      </group>

      <group position={[0, 0.75, -13.5]}>
        <group position={[0, 0, 1]}>
          <mesh position={[0, 5, -0.5]} castShadow receiveShadow>
            <boxGeometry args={[16, 10, 2]} />
            <meshStandardMaterial {...plaster} color="#e6dfd3" />
          </mesh>
          <mesh position={[0, 12, -0.5]} castShadow receiveShadow>
            <boxGeometry args={[16, 4, 2]} />
            <meshStandardMaterial {...plaster} color="#e0d9cc" />
          </mesh>
          <mesh position={[0, 3, 0.1]} castShadow receiveShadow>
            <boxGeometry args={[8, 6, 1]} />
            <meshStandardMaterial color="#050a15" />
          </mesh>
          <mesh position={[-2, 3, 0.5]} castShadow receiveShadow>
            <boxGeometry args={[4, 6, 0.1]} />
            <meshStandardMaterial color="#02050a" roughness={0.1} metalness={0.9} envMapIntensity={2} transparent opacity={0.8} />
          </mesh>
          <mesh position={[2, 3, 0.5]} castShadow receiveShadow>
            <boxGeometry args={[4, 6, 0.1]} />
            <meshStandardMaterial color="#02050a" roughness={0.1} metalness={0.9} envMapIntensity={2} transparent opacity={0.8} />
          </mesh>
          <mesh position={[-0.2, 3, 0.6]} castShadow receiveShadow>
            <cylinderGeometry args={[0.04, 0.04, 1.2]} />
            <meshStandardMaterial {...metal} color="#d4af37" roughness={0.3} metalness={1} />
          </mesh>
          <mesh position={[0.2, 3, 0.6]} castShadow receiveShadow>
            <cylinderGeometry args={[0.04, 0.04, 1.2]} />
            <meshStandardMaterial {...metal} color="#d4af37" roughness={0.3} metalness={1} />
          </mesh>

          <Pillar position={[-5, 5, 1]} height={10} radius={0.4} />
          <Pillar position={[5, 5, 1]} height={10} radius={0.4} />

          <mesh position={[0, 10.4, 1]} castShadow receiveShadow>
            <boxGeometry args={[12, 0.8, 1.5]} />
            <meshStandardMaterial {...plaster} color="#f0ede6" />
          </mesh>

          {/* Real supplied Qubaisa brand artwork on a physically-mounted, backlit cladding sign. */}
          <group position={[0, 12, 0.6]}>
            <mesh castShadow receiveShadow>
              <boxGeometry args={[7.1, 3.25, 0.34]} />
              <meshStandardMaterial {...metal} color="#b99249" roughness={0.28} metalness={0.92} />
            </mesh>
            <mesh position={[0, 0, 0.19]} castShadow receiveShadow>
              <boxGeometry args={[6.72, 2.87, 0.12]} />
              <meshStandardMaterial color="#050c1c" roughness={0.3} metalness={0.45} />
            </mesh>
            <mesh position={[0, 0, 0.27]}>
              <planeGeometry args={[2.66, 2.66]} />
              <meshStandardMaterial
                map={logoTexture}
                emissive="#c79b45"
                emissiveMap={logoTexture}
                emissiveIntensity={0.14}
                roughness={0.38}
                metalness={0.1}
                toneMapped
              />
            </mesh>
            <pointLight position={[0, 0, 0.45]} color="#d8ad5c" intensity={0.18} distance={4.8} />
          </group>
        </group>

        <mesh position={[0, 3, 0]} castShadow receiveShadow>
          <boxGeometry args={[50, 6, 2]} />
          <meshStandardMaterial {...plaster} color="#ccc5b8" />
        </mesh>

        <mesh position={[0, 10, 0]} castShadow receiveShadow>
          <boxGeometry args={[50, 8, 2]} />
          <meshStandardMaterial {...plaster} color="#e6dfd3" />
        </mesh>

        <mesh position={[0, 14.4, 0.2]} castShadow receiveShadow>
          <boxGeometry args={[51, 1, 2.4]} />
          <meshStandardMaterial {...plaster} color="#d6cfc2" />
        </mesh>

        <mesh position={[0, 6.2, 0.2]} castShadow receiveShadow>
          <boxGeometry args={[50.5, 0.4, 2.4]} />
          <meshStandardMaterial {...plaster} color="#d6cfc2" />
        </mesh>

        {[-20, -14, 14, 20].map(x => (
          <Window key={`g-${x}`} position={[x, 3, 1.1]} width={2.5} height={4.5} />
        ))}
        {[-20, -14, -8, 8, 14, 20].map(x => (
          <Window key={`s-${x}`} position={[x, 10, 1.1]} width={2.5} height={5} arched />
        ))}

        {[-23, -17, -11, 11, 17, 23].map(x => (
          <mesh key={`pilaster-${x}`} position={[x, 10, 1.2]} castShadow receiveShadow>
            <boxGeometry args={[1.2, 8, 0.3]} />
            <meshStandardMaterial {...plaster} color="#f0ede6" />
          </mesh>
        ))}
      </group>
    </group>
  );
};

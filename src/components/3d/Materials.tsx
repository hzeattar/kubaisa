import { useEffect } from 'react';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

type TextureSet = Partial<Record<'map' | 'normalMap' | 'roughnessMap', THREE.Texture>>;

const configureTextureSet = (textures: TextureSet, repeatX: number, repeatY: number) => {
  Object.entries(textures).forEach(([key, texture]) => {
    if (!texture) return;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(repeatX, repeatY);
    texture.colorSpace = key === 'map' ? THREE.SRGBColorSpace : THREE.NoColorSpace;
    texture.needsUpdate = true;
  });
};

export const useSharedTextures = () => {
  const marble = useTexture({
    map: '/textures/marble/Marble012_1K-JPG_Color.jpg',
    normalMap: '/textures/marble/Marble012_1K-JPG_NormalGL.jpg',
    roughnessMap: '/textures/marble/Marble012_1K-JPG_Roughness.jpg',
  });
  const plaster = useTexture({
    map: '/textures/plaster/Plaster001_1K-JPG_Color.jpg',
    normalMap: '/textures/plaster/Plaster001_1K-JPG_NormalGL.jpg',
    roughnessMap: '/textures/plaster/Plaster001_1K-JPG_Roughness.jpg',
  });
  const wood = useTexture({
    map: '/textures/wood/Wood062_1K-JPG_Color.jpg',
    normalMap: '/textures/wood/Wood062_1K-JPG_NormalGL.jpg',
    roughnessMap: '/textures/wood/Wood062_1K-JPG_Roughness.jpg',
  });
  const metal = useTexture({
    map: '/textures/metal/Metal034_1K-JPG_Color.jpg',
    normalMap: '/textures/metal/Metal034_1K-JPG_NormalGL.jpg',
    roughnessMap: '/textures/metal/Metal034_1K-JPG_Roughness.jpg',
  });
  const fabricModern = useTexture({
    map: '/textures/fabric_modern/Fabric030_1K-JPG_Color.jpg',
    normalMap: '/textures/fabric_modern/Fabric030_1K-JPG_NormalGL.jpg',
    roughnessMap: '/textures/fabric_modern/Fabric030_1K-JPG_Roughness.jpg',
  });
  const fabricClassic = useTexture({
    map: '/textures/fabric_classic/Fabric042_1K-JPG_Color.jpg',
    normalMap: '/textures/fabric_classic/Fabric042_1K-JPG_NormalGL.jpg',
    roughnessMap: '/textures/fabric_classic/Fabric042_1K-JPG_Roughness.jpg',
  });

  useEffect(() => {
    configureTextureSet(marble, 4, 4);
    configureTextureSet(plaster, 8, 8);
    configureTextureSet(wood, 3, 3);
    configureTextureSet(metal, 2, 2);
    configureTextureSet(fabricModern, 2, 2);
    configureTextureSet(fabricClassic, 2, 2);
  }, [marble, plaster, wood, metal, fabricModern, fabricClassic]);

  return { marble, plaster, wood, metal, fabricModern, fabricClassic };
};

import React, { useMemo } from 'react';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

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

  useMemo(() => {
    const config = (texGroup, repeatX, repeatY) => {
      if (texGroup.map) {
        texGroup.map.colorSpace = THREE.SRGBColorSpace;
      }
      Object.entries(texGroup).forEach(([key, tex]) => {
        if (tex) {
          tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
          tex.repeat.set(repeatX, repeatY);
          if (key !== 'map') tex.colorSpace = THREE.NoColorSpace; // Linear for data textures
        }
      });
    };

    config(marble, 4, 4);
    config(plaster, 8, 8);
    config(wood, 3, 3);
    config(metal, 2, 2);
  }, [marble, plaster, wood, metal]);

  return { marble, plaster, wood, metal };
};

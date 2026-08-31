import { useEffect } from 'react';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

type TextureSet = Partial<Record<'map' | 'normalMap' | 'roughnessMap', THREE.Texture>>;
type TexturePaths = Record<'map' | 'normalMap' | 'roughnessMap', string>;

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

function usePbrTextureSet(paths: TexturePaths, repeatX: number, repeatY: number) {
  const textures = useTexture(paths) as TextureSet;
  useEffect(() => configureTextureSet(textures, repeatX, repeatY), [textures, repeatX, repeatY]);
  return textures;
}

const marblePaths: TexturePaths = {
  map: '/textures/marble/Marble012_1K-JPG_Color.jpg',
  normalMap: '/textures/marble/Marble012_1K-JPG_NormalGL.jpg',
  roughnessMap: '/textures/marble/Marble012_1K-JPG_Roughness.jpg',
};
const plasterPaths: TexturePaths = {
  map: '/textures/plaster/Plaster001_1K-JPG_Color.jpg',
  normalMap: '/textures/plaster/Plaster001_1K-JPG_NormalGL.jpg',
  roughnessMap: '/textures/plaster/Plaster001_1K-JPG_Roughness.jpg',
};
const woodPaths: TexturePaths = {
  map: '/textures/wood/Wood062_1K-JPG_Color.jpg',
  normalMap: '/textures/wood/Wood062_1K-JPG_NormalGL.jpg',
  roughnessMap: '/textures/wood/Wood062_1K-JPG_Roughness.jpg',
};
const metalPaths: TexturePaths = {
  map: '/textures/metal/Metal034_1K-JPG_Color.jpg',
  normalMap: '/textures/metal/Metal034_1K-JPG_NormalGL.jpg',
  roughnessMap: '/textures/metal/Metal034_1K-JPG_Roughness.jpg',
};
const modernFabricPaths: TexturePaths = {
  map: '/textures/fabric_modern/Fabric030_1K-JPG_Color.jpg',
  normalMap: '/textures/fabric_modern/Fabric030_1K-JPG_NormalGL.jpg',
  roughnessMap: '/textures/fabric_modern/Fabric030_1K-JPG_Roughness.jpg',
};
const classicFabricPaths: TexturePaths = {
  map: '/textures/fabric_classic/Fabric042_1K-JPG_Color.jpg',
  normalMap: '/textures/fabric_classic/Fabric042_1K-JPG_NormalGL.jpg',
  roughnessMap: '/textures/fabric_classic/Fabric042_1K-JPG_Roughness.jpg',
};

export const useMarbleTexture = () => usePbrTextureSet(marblePaths, 4, 4);
export const usePlasterTexture = () => usePbrTextureSet(plasterPaths, 8, 8);
export const useWoodTexture = () => usePbrTextureSet(woodPaths, 3, 3);
export const useMetalTexture = () => usePbrTextureSet(metalPaths, 2, 2);
export const useModernFabricTexture = () => usePbrTextureSet(modernFabricPaths, 2, 2);
export const useClassicFabricTexture = () => usePbrTextureSet(classicFabricPaths, 2, 2);

export const useArchitecturalTextures = () => ({
  marble: useMarbleTexture(),
  plaster: usePlasterTexture(),
  wood: useWoodTexture(),
  metal: useMetalTexture(),
});

export const useModernRoomTextures = () => ({
  ...useArchitecturalTextures(),
  fabricModern: useModernFabricTexture(),
});

export const useClassicRoomTextures = () => ({
  ...useArchitecturalTextures(),
  fabricClassic: useClassicFabricTexture(),
});

// Backwards-compatible escape hatch for legacy components. New cinematic code
// should prefer the smaller hooks above so distant room fabrics are not part of
// the exterior's first-load dependency graph.
export const useSharedTextures = () => ({
  ...useArchitecturalTextures(),
  fabricModern: useModernFabricTexture(),
  fabricClassic: useClassicFabricTexture(),
});

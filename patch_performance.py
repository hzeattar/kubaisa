import os
import glob

def patch_room(filepath):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Replace MeshReflectorMaterial with a highly polished standard material
    content = content.replace("import { MeshReflectorMaterial, Float, Text } from '@react-three/drei';", "import { Float, Text, RoundedBox, ContactShadows } from '@react-three/drei';")
    content = content.replace("<MeshReflectorMaterial\n          blur={[400, 100]}\n          resolution={1024}\n          mixBlur={1}\n          mixStrength={100}\n          roughness={0.1}\n          depthScale={1.2}\n          minDepthThreshold={0.4}\n          maxDepthThreshold={1.4}\n          color=\"#151515\"\n          metalness={0.8}\n        />", "<meshStandardMaterial color=\"#111111\" roughness={0.05} metalness={0.9} />")
    content = content.replace("<MeshReflectorMaterial\n          blur={[400, 100]}\n          resolution={1024}\n          mixBlur={1}\n          mixStrength={60}\n          roughness={0.15}\n          depthScale={1.2}\n          minDepthThreshold={0.4}\n          maxDepthThreshold={1.4}\n          color=\"#22201d\"\n          metalness={0.6}\n        />", "<meshStandardMaterial color=\"#1a1815\" roughness={0.1} metalness={0.8} />")
    
    # Replace MeshTransmissionMaterial with high-transmission standard material
    content = content.replace("import { MeshTransmissionMaterial } from '@react-three/drei';", "")
    content = content.replace("<MeshTransmissionMaterial\n                backside\n                samples={4}\n                thickness={2}\n                chromaticAberration={0.025}\n                anisotropy={0.1}\n                distortion={0.1}\n                distortionScale={0.1}\n                temporalDistortion={0.0}\n                clearcoat={1}\n                attenuationDistance={0.5}\n                attenuationColor=\"#ffffff\"\n                color=\"#ffffff\"\n              />", "<meshPhysicalMaterial transmission={1} ior={1.5} roughness={0.05} thickness={0.5} color=\"#ffffff\" clearcoat={1} clearcoatRoughness={0} />")
    
    content = content.replace("<MeshTransmissionMaterial\n                backside\n                samples={4}\n                thickness={2}\n                chromaticAberration={0.05}\n                anisotropy={0.2}\n                distortion={0.2}\n                distortionScale={0.2}\n                temporalDistortion={0.0}\n                clearcoat={1}\n                attenuationDistance={0.5}\n                attenuationColor=\"#f8e5c0\"\n                color=\"#f8e5c0\"\n              />", "<meshPhysicalMaterial transmission={1} ior={1.5} roughness={0.08} thickness={0.5} color=\"#f8e5c0\" clearcoat={1} clearcoatRoughness={0} />")

    # Make ContactShadows single frame (there are different spacing variations so just use regex or general replace)
    content = content.replace("<ContactShadows", "<ContactShadows frames={1} resolution={256}")

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

for filepath in glob.glob("src/scenes/**/*.tsx", recursive=True):
    patch_room(filepath)

for filepath in glob.glob("src/cinematic/*.tsx", recursive=True):
    patch_room(filepath)

print("Patched all rooms and cinematic components")

import React, { useEffect, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { PointerLockControls } from '@react-three/drei';
import * as THREE from 'three';
import { useAppStore } from '../../stores/useAppStore';

const keys = {
  KeyW: false,
  KeyA: false,
  KeyS: false,
  KeyD: false,
  ArrowUp: false,
  ArrowLeft: false,
  ArrowDown: false,
  ArrowRight: false,
};

export const mobileInput = { moveX: 0, moveY: 0, lookX: 0, lookY: 0 };

type Rect = { minX: number; maxX: number; minZ: number; maxZ: number };

const WALKABLE_REGIONS: Rect[] = [
  // Arrival court / exterior.
  { minX: -25, maxX: 25, minZ: -12.8, maxZ: 20 },
  // Lobby.
  { minX: -14, maxX: 14, minZ: -39, maxZ: -0.7 },
  // Main entrance opening.
  { minX: -5.8, maxX: 5.8, minZ: -14, maxZ: 0.2 },
  // Modern showroom and its portal.
  { minX: -34.2, maxX: -15.8, minZ: -33.2, maxZ: -6.8 },
  { minX: -16.2, maxX: -13.8, minZ: -23.4, maxZ: -16.6 },
  // Neo-classical showroom and its portal.
  { minX: 15.8, maxX: 34.2, minZ: -33.2, maxZ: -6.8 },
  { minX: 13.8, maxX: 16.2, minZ: -23.4, maxZ: -16.6 },
];

const STATIC_OBSTACLES: Rect[] = [
  // Lobby front wall segments, leaving the 12m central doorway clear.
  { minX: -15, maxX: -6, minZ: -1.15, maxZ: 0.15 },
  { minX: 6, maxX: 15, minZ: -1.15, maxZ: 0.15 },
  // Reception desk.
  { minX: -3.5, maxX: 3.5, minZ: -21.8, maxZ: -18.2 },
  // Grand staircase is visual-only until a real upper floor exists.
  { minX: -7.2, maxX: 7.2, minZ: -36.7, maxZ: -31.0 },
  // Lobby pillars.
  { minX: -9, maxX: -7, minZ: -16, maxZ: -14 },
  { minX: 7, maxX: 9, minZ: -16, maxZ: -14 },
  { minX: -9, maxX: -7, minZ: -29, maxZ: -27 },
  { minX: 7, maxX: 9, minZ: -29, maxZ: -27 },
  // Hero furniture collision proxies.
  { minX: -30.5, maxX: -19.5, minZ: -27.5, maxZ: -19.0 },
  { minX: 19.5, maxX: 30.5, minZ: -27.5, maxZ: -18.0 },
];

const PLAYER_RADIUS = 0.42;

const pointInRect = (x: number, z: number, rect: Rect, padding = 0) =>
  x >= rect.minX - padding &&
  x <= rect.maxX + padding &&
  z >= rect.minZ - padding &&
  z <= rect.maxZ + padding;

const isWalkable = (x: number, z: number) => {
  const inNavigableArea = WALKABLE_REGIONS.some(rect => pointInRect(x, z, rect));
  if (!inNavigableArea) return false;

  return !STATIC_OBSTACLES.some(rect => pointInRect(x, z, rect, PLAYER_RADIUS));
};

const getZone = (x: number, z: number): 'exterior' | 'lobby' | 'living-modern' | 'living-neoclassic' => {
  if (x < -14.5 && z < -6) return 'living-modern';
  if (x > 14.5 && z < -6) return 'living-neoclassic';
  if (z < -0.7) return 'lobby';
  return 'exterior';
};

export const FirstPersonCamera: React.FC = () => {
  const { camera, gl } = useThree();
  const velocity = useRef(new THREE.Vector2());
  const direction = useRef(new THREE.Vector2());
  const [isDesktop, setIsDesktop] = useState(true);

  const teleportTarget = useAppStore(state => state.teleportTarget);
  const setTeleportTarget = useAppStore(state => state.setTeleportTarget);
  const setActiveZone = useAppStore(state => state.setActiveZone);
  const mode = useAppStore(state => state.mode);
  const selectedProduct = useAppStore(state => state.selectedProduct);
  const showFloorSelector = useAppStore(state => state.showFloorSelector);
  const showIntro = useAppStore(state => state.showIntro);

  useEffect(() => {
    if (!teleportTarget) return;
    camera.position.set(teleportTarget[0], teleportTarget[1], teleportTarget[2]);
    velocity.current.set(0, 0);
    setActiveZone(getZone(teleportTarget[0], teleportTarget[2]));
    setTeleportTarget(null);
  }, [teleportTarget, camera, setActiveZone, setTeleportTarget]);

  useEffect(() => {
    const checkMobile = () => setIsDesktop(!window.matchMedia('(pointer: coarse)').matches && window.innerWidth > 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (Object.prototype.hasOwnProperty.call(keys, event.code)) {
        keys[event.code as keyof typeof keys] = true;
      }
    };
    const handleKeyUp = (event: KeyboardEvent) => {
      if (Object.prototype.hasOwnProperty.call(keys, event.code)) {
        keys[event.code as keyof typeof keys] = false;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('resize', checkMobile);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    if (isDesktop || mode === 'guided-tour' || selectedProduct || showFloorSelector || showIntro) return;

    const canvas = gl.domElement;
    const euler = new THREE.Euler(0, 0, 0, 'YXZ');
    let lookPointerId: number | null = null;
    let previousX = 0;
    let previousY = 0;

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType !== 'touch' || event.clientX <= window.innerWidth / 2 || lookPointerId !== null) return;
      lookPointerId = event.pointerId;
      previousX = event.clientX;
      previousY = event.clientY;
      canvas.setPointerCapture?.(event.pointerId);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerId !== lookPointerId) return;

      euler.setFromQuaternion(camera.quaternion);
      const deltaX = event.clientX - previousX;
      const deltaY = event.clientY - previousY;
      const lookSpeed = 0.0045;

      euler.y -= deltaX * lookSpeed;
      euler.x -= deltaY * lookSpeed;
      euler.x = Math.max(-1.35, Math.min(1.35, euler.x));
      camera.quaternion.setFromEuler(euler);

      previousX = event.clientX;
      previousY = event.clientY;
    };

    const releasePointer = (event: PointerEvent) => {
      if (event.pointerId !== lookPointerId) return;
      if (canvas.hasPointerCapture?.(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
      lookPointerId = null;
    };

    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerup', releasePointer);
    canvas.addEventListener('pointercancel', releasePointer);

    return () => {
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerup', releasePointer);
      canvas.removeEventListener('pointercancel', releasePointer);
    };
  }, [isDesktop, camera, gl, mode, selectedProduct, showFloorSelector, showIntro]);

  useFrame((_, delta) => {
    if (showIntro || mode === 'guided-tour' || selectedProduct || showFloorSelector) return;

    const dt = Math.min(delta, 0.05);
    const speed = 4.4;
    const damping = Math.exp(-9 * dt);

    velocity.current.multiplyScalar(damping);

    direction.current.set(
      Number(keys.KeyD || keys.ArrowRight) - Number(keys.KeyA || keys.ArrowLeft) + mobileInput.moveX,
      Number(keys.KeyW || keys.ArrowUp) - Number(keys.KeyS || keys.ArrowDown) - mobileInput.moveY,
    );

    if (direction.current.lengthSq() > 1) direction.current.normalize();

    velocity.current.x += direction.current.x * speed * dt;
    velocity.current.y += direction.current.y * speed * dt;

    const forward = new THREE.Vector3();
    camera.getWorldDirection(forward);
    forward.y = 0;
    forward.normalize();

    const right = new THREE.Vector3().crossVectors(forward, camera.up).normalize();
    const move = new THREE.Vector3()
      .addScaledVector(right, velocity.current.x)
      .addScaledVector(forward, velocity.current.y);

    const nextX = camera.position.x + move.x;
    if (isWalkable(nextX, camera.position.z)) {
      camera.position.x = nextX;
    } else {
      velocity.current.x *= 0.25;
    }

    const nextZ = camera.position.z + move.z;
    if (isWalkable(camera.position.x, nextZ)) {
      camera.position.z = nextZ;
    } else {
      velocity.current.y *= 0.25;
    }

    // The current vertical slice is a single navigable level. The grand staircase is blocked
    // until a real upper-floor scene exists, avoiding the previous "walk on furniture/roof" raycast bug.
    camera.position.y += (1.7 - camera.position.y) * Math.min(1, 10 * dt);

    setActiveZone(getZone(camera.position.x, camera.position.z));
  });

  const shouldLock = isDesktop && !showIntro && mode === 'explore' && !selectedProduct && !showFloorSelector;
  return shouldLock ? <PointerLockControls /> : null;
};

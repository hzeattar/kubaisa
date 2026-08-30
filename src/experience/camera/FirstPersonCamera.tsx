import React, { useEffect, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { PointerLockControls } from '@react-three/drei';
import * as THREE from 'three';
import { useAppStore } from '../../stores/useAppStore';

const keys = {
  KeyW: false, KeyA: false, KeyS: false, KeyD: false,
  ArrowUp: false, ArrowLeft: false, ArrowDown: false, ArrowRight: false,
};

export const mobileInput = { moveX: 0, moveY: 0, lookX: 0, lookY: 0 };

// Improved bounding box check for X/Z (Simplified BVH)
const checkCollision = (position: THREE.Vector3) => {
  const x = position.x;
  const z = position.z;

  // Exterior bounds (driveway)
  if (z > -12) {
    if (x < -25 || x > 25) return true;
    if (z > 20) return true;
  }
  
  // Lobby bounds
  if (z <= -12 && z > -40) {
    // Inside Lobby area
    if (x >= -14 && x <= 14) {
      if (z < -39.5) return true; // Back wall of lobby
    }
    // Inside Modern
    else if (x < -14 && x > -34) {
      if (z < -38 || z > -14) return true;
    }
    // Inside NeoClassic
    else if (x > 14 && x < 34) {
      if (z < -38 || z > -14) return true;
    }
    else {
      return true; // Solid walls
    }
  }

  if (z <= -40) return true;
  return false;
};

const getZone = (x: number, z: number): 'exterior' | 'lobby' | 'living-modern' | 'living-neoclassic' => {
  if (z > -12) return 'exterior';
  if (x >= -13 && x <= 13) return 'lobby';
  if (x < -13) return 'living-modern';
  if (x > 13) return 'living-neoclassic';
  return 'exterior';
};

export const FirstPersonCamera: React.FC = () => {
  const { camera, gl, scene } = useThree();
  const velocity = useRef(new THREE.Vector3());
  const direction = useRef(new THREE.Vector3());
  const [isDesktop, setIsDesktop] = useState(true);
  
  const teleportTarget = useAppStore(state => state.teleportTarget);
  const setTeleportTarget = useAppStore(state => state.setTeleportTarget);
  const setActiveZone = useAppStore(state => state.setActiveZone);
  const activeZone = useAppStore(state => state.activeZone);
  const mode = useAppStore(state => state.mode);
  const selectedProduct = useAppStore(state => state.selectedProduct);
  const showFloorSelector = useAppStore(state => state.showFloorSelector);

  // Raycaster for floor height detection
  const raycaster = useRef(new THREE.Raycaster());

  useEffect(() => {
    const interval = setInterval(() => {
      const newZone = getZone(camera.position.x, camera.position.z);
      if (newZone !== activeZone) setActiveZone(newZone);
    }, 500);
    return () => clearInterval(interval);
  }, [camera, activeZone, setActiveZone]);

  useEffect(() => {
    if (teleportTarget) {
      camera.position.set(teleportTarget[0], teleportTarget[1], teleportTarget[2]);
      setTeleportTarget(null);
    }
  }, [teleportTarget, camera, setTeleportTarget]);

  useEffect(() => {
    const checkMobile = () => setIsDesktop(!('ontouchstart' in window) && window.innerWidth > 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleKeyDown = (e: KeyboardEvent) => { if (keys.hasOwnProperty(e.code)) (keys as any)[e.code] = true; };
    const handleKeyUp = (e: KeyboardEvent) => { if (keys.hasOwnProperty(e.code)) (keys as any)[e.code] = false; };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('resize', checkMobile);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Mobile touch look
  useEffect(() => {
    if (isDesktop || mode === 'guided-tour' || selectedProduct || showFloorSelector) return;
    
    let touchStartX = 0;
    let touchStartY = 0;
    const euler = new THREE.Euler(0, 0, 0, 'YXZ');
    euler.setFromQuaternion(camera.quaternion);

    const handleTouchStart = (e: TouchEvent) => {
      const touch = Array.from(e.touches).find(t => t.clientX > window.innerWidth / 2);
      if (touch) {
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = Array.from(e.touches).find(t => t.clientX > window.innerWidth / 2);
      if (!touch || touchStartX === 0) return;

      const deltaX = touch.clientX - touchStartX;
      const deltaY = touch.clientY - touchStartY;
      
      const lookSpeed = 0.005;
      euler.y -= deltaX * lookSpeed;
      euler.x -= deltaY * lookSpeed;
      
      euler.x = Math.max(-Math.PI / 2 + 0.1, Math.min(Math.PI / 2 - 0.1, euler.x));
      
      camera.quaternion.setFromEuler(euler);
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
    };

    const handleTouchEnd = () => { touchStartX = 0; touchStartY = 0; };

    const canvas = gl.domElement;
    canvas.addEventListener('touchstart', handleTouchStart, { passive: true });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true });
    canvas.addEventListener('touchend', handleTouchEnd);
    canvas.addEventListener('touchcancel', handleTouchEnd);

    return () => {
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
      canvas.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, [isDesktop, camera, gl, mode, selectedProduct, showFloorSelector]);

  useFrame((state, delta) => {
    if (mode === 'guided-tour') return;
    if (selectedProduct || showFloorSelector) return;

    const speed = 15.0;
    
    velocity.current.x -= velocity.current.x * 10.0 * delta;
    velocity.current.z -= velocity.current.z * 10.0 * delta;

    direction.current.z = Number(keys.KeyW || keys.ArrowUp) - Number(keys.KeyS || keys.ArrowDown) + mobileInput.moveY;
    direction.current.x = Number(keys.KeyD || keys.ArrowRight) - Number(keys.KeyA || keys.ArrowLeft) + mobileInput.moveX;
    
    if (direction.current.lengthSq() > 1) direction.current.normalize();

    if (keys.KeyW || keys.ArrowUp || keys.KeyS || keys.ArrowDown || mobileInput.moveY !== 0) {
      velocity.current.z -= direction.current.z * speed * delta;
    }
    if (keys.KeyA || keys.ArrowLeft || keys.KeyD || keys.ArrowRight || mobileInput.moveX !== 0) {
      velocity.current.x -= direction.current.x * speed * delta;
    }

    const prevPosition = camera.position.clone();

    camera.translateX(-velocity.current.x);
    camera.translateZ(velocity.current.z);
    
    if (checkCollision(camera.position)) {
      camera.position.x = prevPosition.x;
      camera.position.z = prevPosition.z;
      velocity.current.set(0,0,0);
    }
    
    // Y-Axis Floor Following (Allows climbing stairs)
    // We cast a ray from 10 meters above current position downwards
    const rayOrigin = new THREE.Vector3(camera.position.x, 10, camera.position.z);
    raycaster.current.set(rayOrigin, new THREE.Vector3(0, -1, 0));
    
    // Intersect only with elements that should act as ground. 
    // In our simplified scene, we just intersect all meshes.
    const intersects = raycaster.current.intersectObjects(scene.children, true);
    let floorHeight = 0;
    
    if (intersects.length > 0) {
      // Find the highest point that is below the camera's general area
      // We assume the first hit from top is the floor/roof. 
      // To prevent walking on roofs, we only accept floor if it's within a step height of current
      for(let i=0; i<intersects.length; i++) {
         if (intersects[i].point.y < prevPosition.y + 1.0) {
           floorHeight = intersects[i].point.y;
           break;
         }
      }
    }

    // Smoothly interpolate Y to avoid sudden snapping on stairs
    const targetY = floorHeight + 1.7; // 1.7m eye level
    camera.position.y += (targetY - camera.position.y) * 10 * delta;
  });

  const shouldLock = isDesktop && mode === 'explore' && !selectedProduct && !showFloorSelector;
  return shouldLock ? <PointerLockControls selector="#root" /> : null;
};

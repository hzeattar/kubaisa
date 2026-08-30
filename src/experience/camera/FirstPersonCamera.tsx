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

export const mobileInput = {
  moveX: 0,
  moveY: 0,
  lookX: 0,
  lookY: 0,
};

// Simplified AABB collision for the current palace layout
const checkCollision = (position: THREE.Vector3) => {
  const x = position.x;
  const z = position.z;

  // Exterior bounds
  if (z > -13.5 && z < 15) {
    if (x < -20 || x > 20) return true;
  }
  
  // Lobby bounds
  if (z <= -13.5 && z > -33) {
    // If we are in the lobby
    if (x >= -13 && x <= 13) {
      // Lobby walls
      if (z < -32.5) return true; // Back wall
    }
    // If we are in Modern
    else if (x < -14 && x > -34) {
      if (z < -32.5 || z > -14) return true;
    }
    // If we are in NeoClassic
    else if (x > 14 && x < 34) {
      if (z < -32.5 || z > -14) return true;
    }
    else {
      return true; // Walls between rooms
    }
  }

  if (z <= -33) return true;
  if (z >= 15) return true;

  return false;
};

// Determine zone based on position
const getZone = (x: number, z: number): 'exterior' | 'lobby' | 'living-modern' | 'living-neoclassic' => {
  if (z > -13.5) return 'exterior';
  if (x >= -13 && x <= 13) return 'lobby';
  if (x < -13) return 'living-modern';
  if (x > 13) return 'living-neoclassic';
  return 'exterior';
};

export const FirstPersonCamera: React.FC = () => {
  const { camera, gl } = useThree();
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

  // Auto-detect zone
  useEffect(() => {
    const interval = setInterval(() => {
      const newZone = getZone(camera.position.x, camera.position.z);
      if (newZone !== activeZone) {
        setActiveZone(newZone);
      }
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
    const checkMobile = () => {
      setIsDesktop(!('ontouchstart' in window) && window.innerWidth > 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (keys.hasOwnProperty(e.code)) {
        (keys as any)[e.code] = true;
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (keys.hasOwnProperty(e.code)) {
        (keys as any)[e.code] = false;
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

  // Mobile touch look
  useEffect(() => {
    if (isDesktop || mode === 'guided-tour' || selectedProduct || showFloorSelector) return;
    
    let touchStartX = 0;
    let touchStartY = 0;
    const euler = new THREE.Euler(0, 0, 0, 'YXZ');
    euler.setFromQuaternion(camera.quaternion);

    const handleTouchStart = (e: TouchEvent) => {
      // Only process touch look if it's on the right half of the screen
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

    const handleTouchEnd = () => {
      touchStartX = 0;
      touchStartY = 0;
    };

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
    if (mode === 'guided-tour') return; // Handled by tour system
    if (selectedProduct || showFloorSelector) return; // Paused

    const speed = 10.0;
    
    velocity.current.x -= velocity.current.x * 10.0 * delta;
    velocity.current.z -= velocity.current.z * 10.0 * delta;

    direction.current.z = Number(keys.KeyW || keys.ArrowUp) - Number(keys.KeyS || keys.ArrowDown) + mobileInput.moveY;
    direction.current.x = Number(keys.KeyD || keys.ArrowRight) - Number(keys.KeyA || keys.ArrowLeft) + mobileInput.moveX;
    
    if (direction.current.lengthSq() > 1) {
      direction.current.normalize();
    }

    if (keys.KeyW || keys.ArrowUp || keys.KeyS || keys.ArrowDown || mobileInput.moveY !== 0) {
      velocity.current.z -= direction.current.z * speed * delta;
    }
    if (keys.KeyA || keys.ArrowLeft || keys.KeyD || keys.ArrowRight || mobileInput.moveX !== 0) {
      velocity.current.x -= direction.current.x * speed * delta;
    }

    // Save previous position
    const prevPosition = camera.position.clone();

    // Apply movement
    camera.translateX(-velocity.current.x);
    camera.translateZ(velocity.current.z);
    
    // Check collision
    if (checkCollision(camera.position)) {
      // Revert if collision
      camera.position.copy(prevPosition);
      velocity.current.set(0,0,0);
    }
    
    // Lock Y to eye level
    camera.position.y = 1.7;
  });

  // Only enable pointer lock if desktop, explore mode, and no overlay is open
  const shouldLock = isDesktop && mode === 'explore' && !selectedProduct && !showFloorSelector;

  return shouldLock ? (
    <PointerLockControls selector="#root" />
  ) : null;
};

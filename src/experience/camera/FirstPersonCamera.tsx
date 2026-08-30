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

// Global object to receive joystick state from UI
export const mobileInput = {
  moveX: 0,
  moveY: 0,
  lookX: 0,
  lookY: 0,
};

export const FirstPersonCamera: React.FC = () => {
  const { camera, gl } = useThree();
  const velocity = useRef(new THREE.Vector3());
  const direction = useRef(new THREE.Vector3());
  const [isDesktop, setIsDesktop] = useState(true);
  const teleportTarget = useAppStore(state => state.teleportTarget);
  const setTeleportTarget = useAppStore(state => state.setTeleportTarget);

  useEffect(() => {
    if (teleportTarget) {
      camera.position.set(teleportTarget[0], teleportTarget[1], teleportTarget[2]);
      setTeleportTarget(null);
    }
  }, [teleportTarget, camera, setTeleportTarget]);

  useEffect(() => {
    // Basic mobile detection
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

  // For mobile touch look
  useEffect(() => {
    if (isDesktop) return;

    let touchStartX = 0;
    let touchStartY = 0;
    const euler = new THREE.Euler(0, 0, 0, 'YXZ');
    euler.setFromQuaternion(camera.quaternion);

    const handleTouchStart = (e: TouchEvent) => {
      // Only process touch look if it's on the right half of the screen
      const touch = e.touches[0];
      if (touch.clientX > window.innerWidth / 2) {
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      // Find the touch on the right side
      const touch = Array.from(e.touches).find(t => t.clientX > window.innerWidth / 2);
      if (!touch || touchStartX === 0) return;

      const deltaX = touch.clientX - touchStartX;
      const deltaY = touch.clientY - touchStartY;
      
      const lookSpeed = 0.005;
      euler.y -= deltaX * lookSpeed;
      euler.x -= deltaY * lookSpeed;
      
      // Clamp vertical look
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

    return () => {
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDesktop, camera, gl]);

  useFrame((state, delta) => {
    // Movement speed
    const speed = 5.0;
    
    velocity.current.x -= velocity.current.x * 10.0 * delta;
    velocity.current.z -= velocity.current.z * 10.0 * delta;

    direction.current.z = Number(keys.KeyW || keys.ArrowUp) - Number(keys.KeyS || keys.ArrowDown) + mobileInput.moveY;
    direction.current.x = Number(keys.KeyD || keys.ArrowRight) - Number(keys.KeyA || keys.ArrowLeft) + mobileInput.moveX;
    
    // Normalize if length > 1
    if (direction.current.lengthSq() > 1) {
      direction.current.normalize();
    }

    if (keys.KeyW || keys.ArrowUp || keys.KeyS || keys.ArrowDown || mobileInput.moveY !== 0) {
      velocity.current.z -= direction.current.z * speed * delta;
    }
    if (keys.KeyA || keys.ArrowLeft || keys.KeyD || keys.ArrowRight || mobileInput.moveX !== 0) {
      velocity.current.x -= direction.current.x * speed * delta;
    }

    // Apply movement relative to camera rotation
    camera.translateX(-velocity.current.x);
    camera.translateZ(velocity.current.z);
    
    // Lock Y to eye level
    camera.position.y = 1.7;
    
    // Very simple boundary constraint (mocking walls)
    if (camera.position.x < -20) camera.position.x = -20;
    if (camera.position.x > 20) camera.position.x = 20;
    if (camera.position.z < -30) camera.position.z = -30;
    if (camera.position.z > 12) camera.position.z = 12;
  });

  return isDesktop ? (
    <PointerLockControls selector="#root" />
  ) : null;
};


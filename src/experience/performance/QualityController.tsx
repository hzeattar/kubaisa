import React, { useEffect, useMemo, useState } from 'react';
import { PerformanceMonitor } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useAppStore } from '../../stores/useAppStore';

const tierDpr = {
  low: 0.8,
  medium: 1.1,
  high: 1.5,
} as const;

export const QualityController: React.FC = () => {
  const quality = useAppStore(state => state.quality);
  const { setDpr } = useThree();
  const maxDeviceDpr = useMemo(() => Math.min(window.devicePixelRatio || 1, 1.75), []);
  const [autoDpr, setAutoDpr] = useState(Math.min(maxDeviceDpr, 1.25));

  useEffect(() => {
    if (quality === 'auto') {
      setDpr(autoDpr);
      return;
    }

    setDpr(Math.min(maxDeviceDpr, tierDpr[quality]));
  }, [quality, autoDpr, maxDeviceDpr, setDpr]);

  if (quality !== 'auto') return null;

  return (
    <PerformanceMonitor
      flipflops={3}
      onIncline={() => setAutoDpr(current => Math.min(maxDeviceDpr, current + 0.1))}
      onDecline={() => setAutoDpr(current => Math.max(0.7, current - 0.15))}
      onFallback={() => setAutoDpr(0.7)}
    />
  );
};

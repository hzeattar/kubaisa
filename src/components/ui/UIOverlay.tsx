import React from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { useTranslation } from '../../hooks/useTranslation';
import { NavigationHUD } from './NavigationHUD';
import { ProductPanel } from './ProductPanel';
import { FloorSelector } from './FloorSelector';

export const UIOverlay: React.FC = () => {
  const { showIntro } = useAppStore();

  if (showIntro) return null;

  return (
    <div className="w-full h-full relative pointer-events-none">
      {/* HUD Elements */}
      <NavigationHUD />
      
      {/* Modals / Panels */}
      <ProductPanel />
      <FloorSelector />
    </div>
  );
};

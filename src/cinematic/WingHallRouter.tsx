import type { Department } from '../journey/journeyModel';
import { ModernWingHall } from './ModernWingHall';
import { NeoClassicWingHall } from './NeoClassicWingHall';

/**
 * Keeps each collection's technical-art direction isolated so each wing can
 * evolve independently without sharing a generic placeholder hall.
 */
export function WingHallRouter({ department }: { department: Department }) {
  if (department === 'modern') return <ModernWingHall />;
  return <NeoClassicWingHall />;
}

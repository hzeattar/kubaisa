import type { Department } from '../journey/journeyModel';
import { ModernWingHall } from './ModernWingHall';
import { WingHall as LegacyWingHall } from './WingHall';

/**
 * Keeps each collection's technical-art direction isolated.
 * Modern uses the new focused hall; Neo-Classical remains on the existing hall
 * until its own dedicated realism pass is implemented.
 */
export function WingHallRouter({ department }: { department: Department }) {
  if (department === 'modern') return <ModernWingHall />;
  return <LegacyWingHall department="classic" />;
}

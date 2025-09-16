import type { BuildingDef } from './types';

// Ayuda a que TS te marque cualquier propiedad mal escrita, y mantiene autocompletado.
export const defineBuilding = <T extends BuildingDef>(b: T) => b;

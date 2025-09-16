import type { BuildingDef } from './types';

export function validateBuildings(list: BuildingDef[]): BuildingDef[] {
  if (__DEV__ !== false) { // Metro define __DEV__ en RN
    const ids = new Set<string>();
    for (const b of list) {
      if (ids.has(b.id)) throw new Error(`ID de edificio duplicado: ${b.id}`);
      ids.add(b.id);
      if (!b.polygon || b.polygon.length < 3) {
        throw new Error(`Polígono inválido para ${b.id} (se requieren ≥3 puntos)`);
      }
    }
  }
  return list;
}

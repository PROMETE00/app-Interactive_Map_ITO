// Exporta tipos para el resto de la app
export * from './types';

import type { BuildingDef } from './types';
import { validateBuildings } from './validate';

// 👉 importa solo los edificios que quieras incluir en este build
import Biblioteca from './defs/ito-Gimnasio';


// Puedes agrupar por zonas/campus si lo necesitas
export const campusPrincipal = [
  Biblioteca,
] satisfies BuildingDef[];

// Este es el arreglo que pasas a htmlPage()
export const customBuildings: BuildingDef[] = validateBuildings([
  ...campusPrincipal,
]);
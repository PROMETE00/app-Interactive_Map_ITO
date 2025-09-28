// components/buildings/defs/ito-honguito.ts
import { defineBuilding } from '../define';
import type { BuildingDef } from '../types';

const ExtraEscolares: BuildingDef = defineBuilding({
  id: 'ito-extraescolares',
  name: 'Extraescolares',
  polygon: [
    [-96.74332941425133, 17.077876023596172],  // p1
    [-96.74320849251355, 17.07787719231272],   // p2
    [-96.74320704024097, 17.077772830561067],  // p3 (mitad de altura)
    [-96.74332796197876, 17.077771661844523],  // p4 (mitad de altura)
  ],
  levels: 1,
  color: '#a6f88a',
  pois: [
    // entradas
  ],
});

export default ExtraEscolares;

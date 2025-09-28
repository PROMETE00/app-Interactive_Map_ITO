// components/buildings/defs/ito-honguito.ts
import { defineBuilding } from '../define';
import type { BuildingDef } from '../types';

const AulaSUM: BuildingDef = defineBuilding({
  id: 'ito-aula-sum',
  name: 'Aula SUM',
  polygon: [
    [-96.74586104780022 , 17.07811609888834],// p1
    [-96.74572090238298 , 17.078073152927985],// p2
    [-96.74575107723358 , 17.077994952795674],// p3
    [-96.7458912226508 , 17.07803789875603],// p4

  ],
  levels: 1,
  color: '#8af1f8',
  pois: [
    // entradas
  ],
});

export default AulaSUM;

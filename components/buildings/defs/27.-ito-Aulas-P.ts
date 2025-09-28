// components/buildings/defs/ito-honguito.ts
import { defineBuilding } from '../define';
import type { BuildingDef } from '../types';

const AulasP: BuildingDef = defineBuilding({
  id: 'ito-aulas-p',
  name: 'Aulas P',
  polygon: [
    [-96.74336421916689 , 17.078055772586936],// p1
    [-96.74322206209294, 17.078009621688846],// p2
    [-96.74325827191366, 17.077903218185845],// p3
    [-96.74340177009209, 17.077949369110268],// p4

  ],
  levels: 1,
  color: '#a6f88a',
  pois: [
    // entradas
  ],
});

export default AulasP;

// components/buildings/defs/ito-honguito.ts
import { defineBuilding } from '../define';
import type { BuildingDef } from '../types';

const LaboratorioCivil: BuildingDef = defineBuilding({
  id: 'ito-laboratorio-civil',
  name: 'Laboratorio de Civil',
  // OJO: formato [lng, lat] y ordenado CCW
  polygon: [
    [-96.74436231312401, 17.07859701408327], // p3
    [-96.7441189026447 , 17.078526505966778],// p3
    [-96.74404447134111 , 17.07873995318311], // p2
    [-96.7442885523654 , 17.078814948095502],// p1
  ],
  levels: 1,
  color: '#d97706',
  pois: [
    // entradas
  ],
});

export default LaboratorioCivil;

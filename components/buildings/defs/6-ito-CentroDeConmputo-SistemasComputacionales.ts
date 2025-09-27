// components/buildings/defs/ito-honguito.ts
import { defineBuilding } from '../define';
import type { BuildingDef } from '../types';

const CentroComputo: BuildingDef = defineBuilding({
  id: 'ito-centro-de-computo',
  name: 'Centro de Cómputo',
  polygon: [

    [-96.74441694181161, 17.079299775401974], // p1
    [-96.74416661639846 , 17.079222877381614],// p2
    [-96.74424834626649 , 17.07896829026252],// p3
    [-96.74449867167962, 17.07904518828288],// p4
  ],
  levels: 2,
  height: 6,
  color: '#06a2a7',
  pois: [
    // entradas
  ],
});

export default CentroComputo;

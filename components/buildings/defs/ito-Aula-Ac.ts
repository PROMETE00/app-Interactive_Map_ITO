// components/buildings/defs/ito-honguito.ts
import { defineBuilding } from '../define';
import type { BuildingDef } from '../types';

const AulaAC: BuildingDef = defineBuilding({
  id: 'ito-aula-ac',
  name: 'Aula A-C',
  polygon: [

    [-96.74404447134111 , 17.07873995318311], // p1
    [-96.74407636818246 , 17.078651424071005],// p2
    [-96.7440082692588 , 17.078629864199672],// p3
    [-96.74397597863732, 17.07871948586675],// p4
  ],
  levels: 1,
  color: '#a77806',
  pois: [
    // entradas
  ],
});

export default AulaAC;

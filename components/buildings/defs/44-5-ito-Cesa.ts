// components/buildings/defs/ito-honguito.ts
import { defineBuilding } from '../define';
import type { BuildingDef } from '../types';

const Cesa: BuildingDef = defineBuilding({
  id: 'ito-cesa',
  name: 'CESA',
  polygon: [

    [-96.74451432919979 , 17.076721872124025], // p1
    [-96.7444419095569 , 17.076700719478804],// p2
    [-96.7444792837249 , 17.076591562178116],// p3
    [-96.74454852736375 , 17.076611621948906],// p4
  ],
  levels: 1,
  color: '#95f88a',
  pois: [
    // entradas
  ],
});

export default Cesa;

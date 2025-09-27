// components/buildings/defs/ito-honguito.ts
import { defineBuilding } from '../define';
import type { BuildingDef } from '../types';

const EdificioH: BuildingDef = defineBuilding({
  id: 'ito-edificio-h',
  name: 'Edificio H',
  polygon: [

    [-96.74472720494363 , 17.076786110947232], // p1
    [-96.74458674884112 , 17.076744306744697],// p2
    [-96.74462094700507 , 17.076633415593335],// p3
    [-96.74476410990825 , 17.07667572089585],// p4
  ],
  levels: 1,
  color: '#c77806',
  pois: [
    // entradas
  ],
});

export default EdificioH;

// components/buildings/defs/ito-honguito.ts
import { defineBuilding } from '../define';
import type { BuildingDef } from '../types';

const CoordinacionLenguas: BuildingDef = defineBuilding({
  id: 'ito-coordinacion-lenguas',
  name: 'Coordinación de Lenguas',
  polygon: [

    [-96.74458674884112 , 17.076744306744697], // p1
    [-96.74451432919979 , 17.076721872124025],// p2
    [-96.74454852736375 , 17.076611621948906],// p3
    [-96.74462094700507 , 17.076633415593335],// p4
  ],
  levels: 1,
  color: '#m77806',
  pois: [
    // entradas
  ],
});

export default CoordinacionLenguas;

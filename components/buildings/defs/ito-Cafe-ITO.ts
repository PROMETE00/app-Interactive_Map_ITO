// components/buildings/defs/ito-honguito.ts
import { defineBuilding } from '../define';
import type { BuildingDef } from '../types';

const CafeITO: BuildingDef = defineBuilding({
  id: 'ito-cafe-ito',
  name: 'Café ITO',
  polygon: [

    [-96.74408200117065 , 17.077403791989813], // p1
    [-96.74390765758857 , 17.077347385137845],// p2
    [-96.74396800729006 , 17.077171754603167],// p3
    [-96.74406523736468 , 17.077203162995605],// p4
    [-96.74406121405126 , 17.07721213682105],// p5
    [-96.74413966866321 , 17.077237776319922],// p6
  ],
  levels: 1,
  color: '#a77806',
  pois: [
    // entradas
  ],
});

export default CafeITO;

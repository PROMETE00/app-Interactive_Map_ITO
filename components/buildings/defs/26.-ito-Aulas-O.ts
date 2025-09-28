// components/buildings/defs/ito-honguito.ts
import { defineBuilding } from '../define';
import type { BuildingDef } from '../types';

const AulasO: BuildingDef = defineBuilding({
  id: 'ito-aulas-o',
  name: 'Aulas O',
  polygon: [
    [-96.74333605597299 , 17.07817755962428],// p1
    [-96.7432609541226, 17.078151920254605],// p2
    [-96.74329582283886, 17.07805064470993],// p3
    [-96.74337226579372, 17.078076284093523],// p4

  ],
  levels: 1,
  color: '#a6f88a',
  pois: [
    // entradas
  ],
});

export default AulasO;

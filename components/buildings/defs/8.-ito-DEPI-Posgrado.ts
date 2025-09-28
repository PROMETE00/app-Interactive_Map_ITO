// components/buildings/defs/ito-honguito.ts
import { defineBuilding } from '../define';
import type { BuildingDef } from '../types';

const DEPIPosgrado: BuildingDef = defineBuilding({
  id: 'ito-depi-posgrado',
  name: 'DEPI Posgrado',
  polygon: [

    [-96.74361072383911 , 17.07907823428314],// p1
    [-96.74337200724324 , 17.07900323947911],// p2
    [-96.74342363976538 , 17.078855813708067],// p3
    [-96.74366302691348 , 17.07893080857137],// p4
  ],
  levels: 1,
  color: '#8af1f8',
  pois: [
    // entradas
  ],
});

export default DEPIPosgrado;
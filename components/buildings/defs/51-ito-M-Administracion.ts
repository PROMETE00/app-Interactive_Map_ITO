// components/buildings/defs/ito-honguito.ts
import { defineBuilding } from '../define';
import type { BuildingDef } from '../types';

const MAdministracion: BuildingDef = defineBuilding({
  id: 'ito-m-administracion',
  name: 'M Administracion',
  polygon: [

    [-96.74409675332197 , 17.07635385254141], // p1
    [-96.74392509194884 , 17.07629744537191],// p2
    [-96.7439485612772 , 17.07621091161282],// p3
    [-96.74412558706824, 17.076264113854638],// p4
  ],
  levels: 1,
  color: '#a77806',
  pois: [
    // entradas
  ],
});

export default MAdministracion;

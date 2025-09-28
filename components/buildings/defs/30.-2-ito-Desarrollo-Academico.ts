// components/buildings/defs/ito-honguito.ts
import { defineBuilding } from '../define';
import type { BuildingDef } from '../types';

const DesarrolloAcademico: BuildingDef = defineBuilding({
  id: 'ito-desarrollo-academico',
  name: 'Desarrollo Academico',
  polygon: [
    [-96.74558478027917 , 17.07802636104948],// p1
    [-96.74535679251906 , 17.077948801882535],// p2
    [-96.74539970786213 , 17.077836629476604],// p3
    [-96.74562367230882 , 17.077911624749756],// p4

  ],
  levels: 1,
  color: '#8af1f8',
  pois: [
    // entradas
  ],
});

export default DesarrolloAcademico;

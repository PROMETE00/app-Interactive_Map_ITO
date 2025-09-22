import { defineBuilding } from '../define';
import type { BuildingDef } from '../types';

const AulaNN: BuildingDef = defineBuilding({
  id: 'ito-aula-n',
  name: 'Aula Ñ',
  polygon: [
    [-96.743684, 17.079345], // p1
    [-96.743539, 17.0793016], // p2
    [-96.743581, 17.079173], // p3
    [-96.743726, 17.079216], //p4
  ],
  levels: 1,
  height: 1,
  color: '#06a2a7',
  pois: [
    // entradas
  ],
});

export default AulaNN;

// components/buildings/defs/ito-doctorado.ts
import { defineBuilding } from '../define';
import type { BuildingDef } from '../types';

const EdificioB: BuildingDef = defineBuilding({
  id: 'ito-edificio-b',
  name: 'Edificio B',
  // Formato [lng, lat]; recorrido en sentido horario.
  polygon: [
  [-96.7449480857425, 17.078373779481268], // p1
  [-96.74457049838804,  17.078241550570256], // p2
  [-96.74462943308723, 17.078086747078716],  // p3
  [-96.74500702044169, 17.078218975989728], // p4
],

  levels: 2,
  color: '#f59e0b', // naranja
  pois: [],
});

export default EdificioB;
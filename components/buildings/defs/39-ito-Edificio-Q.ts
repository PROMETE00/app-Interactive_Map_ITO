// components/buildings/defs/ito-doctorado.ts
import { defineBuilding } from '../define';
import type { BuildingDef } from '../types';

const EdificioQ: BuildingDef = defineBuilding({
  id: 'ito-edificio-q',
  name: 'Edificio Q',
  // Formato [lng, lat]; recorrido en sentido horario.
  polygon: [
  [-96.74349037359246, 17.077492189915855], // p1
  [-96.74329993675296, 17.077286433118726], // p2
  [-96.74358626256483, 17.077022346177397], // p3
  [-96.74376387224383, 17.077192458875288],     // p4
],

  levels: 3,
  height: 2,
  base: 0,
  color: '#f59e0b', // naranja
  pois: [],
});

export default EdificioQ;
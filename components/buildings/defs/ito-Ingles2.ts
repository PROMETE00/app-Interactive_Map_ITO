// components/buildings/defs/ito-doctorado.ts
import { defineBuilding } from '../define';
import type { BuildingDef } from '../types';

const Ingles2: BuildingDef = defineBuilding({
  id: 'ito-ingles2',
  name: 'Inglés 2',
  // Formato [lng, lat]; recorrido en sentido horario.
  polygon: [
  [-96.74368654317715, 17.07819372325284], // p1
  [-96.74352091677093,  17.078149495341776], // p2
  [-96.74354975051776, 17.07805334767285], // p3
  [-96.7437147063717, 17.078098216591187],     // p4
],

  levels: 3,
  height: 2,
  base: 0,
  color: '#f59e0b', // naranja
  pois: [],
});

export default Ingles2;
// components/buildings/defs/ito-doctorado.ts
import { defineBuilding } from '../define';
import type { BuildingDef } from '../types';

const Ingles1: BuildingDef = defineBuilding({
  id: 'ito-ingles1',
  name: 'Inglés 1',
  // Formato [lng, lat]; recorrido en sentido horario.
  polygon: [
  [-96.74378714250412, 17.078056663577268], // p1
  [-96.74371902881418,  17.078036369022065], // p2
  [-96.74374556277441, 17.07794982875291], // p3
  [-96.74381395910407, 17.07797034027117],     // p4
],

  levels: 3,
  height: 2,
  base: 0,
  color: '#f59e0b', // naranja
  pois: [],
});

export default Ingles1;
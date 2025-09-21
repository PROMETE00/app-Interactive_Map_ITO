// components/buildings/defs/ito-doctorado.ts
import { defineBuilding } from '../define';
import type { BuildingDef } from '../types';

const Doctorado: BuildingDef = defineBuilding({
  id: 'ito-doctorado',
  name: 'Doctorado',
  // Formato [lng, lat]; recorrido en sentido horario.
  polygon: [
  [-96.743985, 17.079161], // p1
  [-96.7437042,  17.079078], // p2
  [-96.7437552, 17.078900], // p3
  [-96.744036, 17.078983],     // p4
],

  levels: 1,
  color: '#f59e0b', // naranja
  pois: [],
});

export default Doctorado;

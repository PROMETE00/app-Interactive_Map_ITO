// components/buildings/defs/ito-doctorado.ts
import { defineBuilding } from '../define';
import type { BuildingDef } from '../types';

const EdificioI: BuildingDef = defineBuilding({
  id: 'ito-edificio-i',
  name: 'Edificio I',
  polygon: [
  [-96.7448013648353, 17.076289687891986], // p1
  [-96.74475777893892, 17.07621597394853], // p2
  [-96.74477051943171, 17.076209564039022], // p3
  [-96.74469608813178, 17.076084570759665],     // p4
  [-96.7446719482507, 17.07609867256973],     // p5
  [-96.74458678811467, 17.07595637243565],     // p6
  [-96.74475643783438, 17.07586214661261],     // p7
  [-96.7449602857189, 17.076202513136547],     // p8
],

  levels: 3,
  height: 2,
  base: 0,
  color: '#f59e0b', // naranja
  pois: [],
});

export default EdificioI;
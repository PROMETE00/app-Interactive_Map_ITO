// components/buildings/defs/ito-honguito.ts
import { defineBuilding } from '../define';
import type { BuildingDef } from '../types';

const Caldera: BuildingDef = defineBuilding({
  id: 'ito-caldera',
  name: 'Caldera',
  polygon: [

    [-96.74466981155437 , 17.079123476704666],// p1
    [-96.74459001583833 , 17.079097196484007],// p2
    [-96.74462622565905 , 17.07899784439681],// p3
    [-96.74470602137509 , 17.07902412461747],// p4
  ],
  levels: 1,
  color: '#8af1f8',
  pois: [
    // entradas
  ],
});

export default Caldera;
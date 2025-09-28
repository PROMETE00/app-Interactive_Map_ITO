// components/buildings/defs/ito-honguito.ts
import { defineBuilding } from '../define';
import type { BuildingDef } from '../types';

const Direccion: BuildingDef = defineBuilding({
  id: 'ito-direccion',
  name: 'Dirección',
  polygon: [
    [-96.74524985194128 , 17.07754597015385],// p1
    [-96.74495749116856 , 17.077451104147176],// p2
    [-96.7450252169439 , 17.0772671408751],// p3
    [-96.74531623661214 , 17.077363288949346],// p4

  ],
  levels: 1,
  color: '#8af1f8',
  pois: [
    // entradas
  ],
});

export default Direccion;

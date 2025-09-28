// components/buildings/defs/ito-honguito.ts
import { defineBuilding } from '../define';
import type { BuildingDef } from '../types';

const CubiculosMaestros: BuildingDef = defineBuilding({
  id: 'ito-cubiculos-maestros',
  name: 'Cubículos de Maestros',
  polygon: [
    [-96.7446331800341 , 17.077805753007024],// p1
    [-96.74447425915535, 17.077752551204945],// p2
    [-96.74450912787137, 17.07764678854131],// p3
    [-96.74458087696009, 17.07766730009287],// p4
    [-96.74458087696009 , 17.077672427980424],// p5
    [-96.74467073095903 , 17.077704477274352],// p6

  ],
  levels: 1,
  color: '#a6f88a',
  pois: [
    // entradas
  ],
});

export default CubiculosMaestros;
// components/buildings/defs/ito-honguito.ts
import { defineBuilding } from '../define';
import type { BuildingDef } from '../types';

const Conacyt: BuildingDef = defineBuilding({
  id: 'ito-conacyt',
  name: 'Conacyt',
  polygon: [

    [-96.74609197165015 , 17.07879310715705],// p1
    [-96.7460530796205 , 17.078810413672468],// p2
    [-96.74602223421765 , 17.078754007245944],// p3
    [-96.7460611262473 , 17.078736059743015],// p4

  ],
  levels: 1,
  color: '#8af1f8',
  pois: [
    // entradas
  ],
});

export default Conacyt;
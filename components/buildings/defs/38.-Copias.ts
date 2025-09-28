// components/buildings/defs/ito-honguito.ts
import { defineBuilding } from '../define';
import type { BuildingDef } from '../types';

const Copias: BuildingDef = defineBuilding({
  id: 'ito-copias',
  name: 'Copias',
  polygon: [
    [-96.74391427315024 , 17.077330965680876],// p1
    [-96.7438552645539 , 17.077310454092302],// p2
    [-96.74387806332976, 17.077243791421207],// p3
    [-96.7439370719261 , 17.07726430300978],// p4

  ],
  levels: 1,
  color: '#8af1f8',
  pois: [
    // entradas
  ],
});

export default Copias;

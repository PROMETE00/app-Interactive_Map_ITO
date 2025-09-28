// components/buildings/defs/ito-honguito.ts
import { defineBuilding } from '../define';
import type { BuildingDef } from '../types';

const AulaAM: BuildingDef = defineBuilding({
  id: 'ito-aula-am',
  name: 'Aula AM',
  polygon: [

    [-96.7456739637265 , 17.078057128313382], // p1
    [-96.74558478027917 , 17.07802636104948],// p2
    [-96.74562367230882 , 17.077911624749756],// p3
    [-96.74571687906958 , 17.077943033017593],// p4
  ],
  levels: 1,
  color: '#95f88a',
  pois: [
    // entradas
  ],
});

export default AulaAM;

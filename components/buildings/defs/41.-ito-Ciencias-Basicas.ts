// components/buildings/defs/ito-honguito.ts
import { defineBuilding } from '../define';
import type { BuildingDef } from '../types';

const CienciasBasicas: BuildingDef = defineBuilding({
  id: 'ito-ciencias-basicas',
  name: 'Ciencias Básicas',
  polygon: [
    [-96.74459448045174 , 17.077022330603953],// p1
    [-96.74433363563385 , 17.076921054445876],// p2
    [-96.74433832949948, 17.076910157640786],// p3
    [-96.74427797979868 , 17.07688580007416],// p4
    [-96.74430949575354 , 17.076812086366278],// p5
    [-96.7446306902722 , 17.07693579718117],// p6

  ],
  levels: 1,
  color: '#8af1f8',
  pois: [
    // entradas
  ],
});

export default CienciasBasicas;

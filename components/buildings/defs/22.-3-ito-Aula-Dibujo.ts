// components/buildings/defs/ito-honguito.ts
import { defineBuilding } from '../define';
import type { BuildingDef } from '../types';

const AulaDibujo: BuildingDef = defineBuilding({
  id: 'ito-aula-dibujo',
  name: 'Aula de Dibujo',
  polygon: [
    [-96.74533527721006 , 17.078190465308875],// p1
    [-96.7452260532093 , 17.078155065196995],// p2
    [-96.74526674057643 , 17.078032134510284],// p3
    [-96.7453759645772, 17.078067534622164],// p4

  ],
  levels: 1,
  color: '#a6f88a',
  pois: [
    // entradas
  ],
});

export default AulaDibujo;

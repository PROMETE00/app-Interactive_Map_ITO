// components/buildings/defs/ito-honguito.ts
import { defineBuilding } from '../define';
import type { BuildingDef } from '../types';

const IntermedioServiciosEscolares: BuildingDef = defineBuilding({
  id: 'ito-intermedio-servicios-escolares',
  name: 'Intermedio Servicios Escolares',
  polygon: [
    [-96.7451398813754 , 17.077585070318236],// p1
    [-96.74501784086937 , 17.07754597015385],// p2
    [-96.74504332185413,  17.0774793075596],// p3
    [-96.74516469180794 , 17.077518407737962],// p4

  ],
  levels: 1,
  color: '#def88a',
  pois: [
    // entradas
  ],
});

export default IntermedioServiciosEscolares;

// components/buildings/defs/ito-honguito.ts
import { defineBuilding } from '../define';
import type { BuildingDef } from '../types';

const DivisionEstudiosProfesionales: BuildingDef = defineBuilding({
  id: 'ito-division-estudios-profesionales',
  name: 'División de Estudios Profesionales',
  polygon: [
    [-96.74501247645149 , 17.07774211187948],// p1
    [-96.74486696661737 , 17.077694678932065],// p2
    [-96.7449299985271,  17.077515202851266],// p3
    [-96.74507550836121 , 17.077562635798678],// p4

  ],
  levels: 1,
  color: '#a6f88a',
  pois: [
    // entradas
  ],
});

export default DivisionEstudiosProfesionales;

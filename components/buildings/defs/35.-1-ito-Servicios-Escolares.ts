// components/buildings/defs/ito-honguito.ts
import { defineBuilding } from '../define';
import type { BuildingDef } from '../types';

const ServiciosEscolares: BuildingDef = defineBuilding({
  id: 'ito-servicios-escolares',
  name: 'Servicios Escolares',
  polygon: [
    [-96.74516133904679 , 17.077793390727994],// p1
    [-96.74501247645149 , 17.07774211187948],// p2
    [-96.74507550836121 , 17.077562635798678],// p3
    [-96.74522772371765 , 17.077615196668802],// p4

  ],
  levels: 1,
  color: '#8af1f8',
  pois: [
    // entradas
  ],
});

export default ServiciosEscolares;

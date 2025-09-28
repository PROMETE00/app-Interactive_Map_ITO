// components/buildings/defs/ito-honguito.ts
import { defineBuilding } from '../define';
import type { BuildingDef } from '../types';

const SalaTitulacion: BuildingDef = defineBuilding({
  id: 'ito-sala-titulacion',
  name: 'Sala de Titulación',
  polygon: [
    [-96.7452864029105 , 17.078325566936225],// p1
    [-96.74517717890974 , 17.078290166824349],// p2
    [-96.7452260532093 , 17.078155065196995],// p3
    [-96.74533527721006 , 17.078190465308875],// p4


  ],
  levels: 1,
  color: '#db8af8',
  pois: [
    // entradas
  ],
});

export default SalaTitulacion;

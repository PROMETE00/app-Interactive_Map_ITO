// components/buildings/defs/ito-honguito.ts
import { defineBuilding } from '../define';
import type { BuildingDef } from '../types';

const LaboratorioElectrica: BuildingDef = defineBuilding({
  id: 'ito-laboratorio-electrica',
  name: 'Laboratorio de Electrica',
  polygon: [

    [-96.7450519310016 , 17.07916639600813],// p1
    [-96.74487959907707 , 17.079120245384896],// p2
    [-96.74490440950977 , 17.07903307195426],// p3
    [-96.74482863710715 , 17.079011919571577],// p4
    [-96.74486149416668 , 17.078896542896477],// p5
    [-96.74511161015056 , 17.078963845965628],// p6
  ],
  levels: 1,
  color: '#8af1f8',
  pois: [
    // entradas
  ],
});

export default LaboratorioElectrica;
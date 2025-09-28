// components/buildings/defs/ito-honguito.ts
import { defineBuilding } from '../define';
import type { BuildingDef } from '../types';

const LaboratorioSimulacion: BuildingDef = defineBuilding({
  id: 'ito-laboratorio-simulacion',
  name: 'Laboratorio de Simulación',
  polygon: [

    [-96.74483648319071 , 17.079351745913566],// p1
    [-96.74470170219136 , 17.079312005139275],// p2
    [-96.74474461753442 , 17.079183168054755],// p3
    [-96.74488006908602 , 17.07922226787588],// p4
  ],
  levels: 1,
  color: '#8af1f8',
  pois: [
    // entradas
  ],
});

export default LaboratorioSimulacion;
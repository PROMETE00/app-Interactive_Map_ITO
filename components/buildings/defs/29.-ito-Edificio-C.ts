// components/buildings/defs/ito-honguito.ts
import { defineBuilding } from '../define';
import type { BuildingDef } from '../types';

const EdificioC: BuildingDef = defineBuilding({
  id: 'ito-edificio-c',
  name: 'Edificio C',
  polygon: [
    [-96.74505736280133 , 17.07816544549788],// p1
    [-96.74467380692258, 17.078032761713114],// p2
    [-96.74471269895224, 17.077928922163544],// p3
    [-96.74509692538322, 17.078058401099177],// p4

  ],
  levels: 1,
  color: '#a6f88a',
  pois: [
    // entradas
  ],
});

export default EdificioC;

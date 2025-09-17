import { defineBuilding } from '../define';
import type { BuildingDef } from '../types';

const Biblioteca: BuildingDef = defineBuilding({
  id: 'ito-biblioteca',
  name: 'Biblioteca',
  polygon: [
    [-96.7442539593679, 17.07792921830881], // p1
    [-96.74393166124641, 17.077841147586613], // p2
    [-96.74405740273566, 17.07743184080943], // p3
    [-96.74437970085717, 17.077519911531628], //p4
  ],
  levels: 1,
  color: '#06a2a7',
  pois: [
    // entradas
  ],
});

export default Biblioteca;
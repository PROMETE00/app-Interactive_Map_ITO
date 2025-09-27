// components/buildings/defs/ito-honguito.ts
import { defineBuilding } from '../define';
import type { BuildingDef } from '../types';

const EdificioF: BuildingDef = defineBuilding({
  id: 'ito-edificio-f',
  name: 'Edificio F',
  polygon: [

    [-96.74425969751705 , 17.07681600610454], // p1
    [-96.74391570421852 , 17.076712806866755],// p2
    [-96.7439599606663 , 17.076573712151554],// p3
    [-96.74430663617377, 17.07667947542372],// p4
  ],
  levels: 1,
  color: '#a77806',
  pois: [
    // entradas
  ],
});

export default EdificioF;

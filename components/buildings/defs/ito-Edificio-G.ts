// components/buildings/defs/ito-honguito.ts
import { defineBuilding } from '../define';
import type { BuildingDef } from '../types';

const EdificioG: BuildingDef = defineBuilding({
  id: 'ito-edificio-g',
  name: 'Edificio G',
  polygon: [

    [-96.74428651960768 , 17.076569225218858], // p1
    [-96.74402701589126 , 17.076490383465963],// p2
    [-96.74406188460766 , 17.07638077414438],// p3
    [-96.74432474108531, 17.076460256933697],// p4
  ],
  levels: 1,
  color: '#a77806',
  pois: [
    // entradas
  ],
});

export default EdificioG;

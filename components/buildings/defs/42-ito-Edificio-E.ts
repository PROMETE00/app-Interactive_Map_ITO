// components/buildings/defs/ito-honguito.ts
import { defineBuilding } from '../define';
import type { BuildingDef } from '../types';

const EdificioE: BuildingDef = defineBuilding({
  id: 'ito-edificio-e',
  name: 'Edificio E',
  polygon: [

    [-96.74422348769515 , 17.077091631123412], // p1
    [-96.74388418826229 , 17.076989073026407],// p2
    [-96.74392173918767 , 17.076877541031905],// p3
    [-96.74425969751604 , 17.07698009919024],// p4
  ],
  levels: 1,
  color: '#a77806',
  pois: [
    // entradas
  ],
});

export default EdificioE;

// components/buildings/defs/ito-doctorado.ts
import { defineBuilding } from '../define';
import type { BuildingDef } from '../types';

const EdificioJ: BuildingDef = defineBuilding({
  id: 'ito-edificio-j',
  name: 'Edificio J',
  polygon: [
  [-96.74464043229412, 17.07634673605647], // p1
  [-96.74454800784893, 17.07631565446349], // p2
  [-96.74458308721934, 17.07620834810073], // p3
  [-96.74467865377245, 17.07623840863221],     // p4
],

  levels: 3,
  height: 2,
  base: 0,
  color: '#f59e0b', // naranja
  pois: [],
});

export default EdificioJ;

// components/buildings/defs/ito-doctorado.ts
import { defineBuilding } from '../define';
import type { BuildingDef } from '../types';

const EdificioElectronica: BuildingDef = defineBuilding({
  id: 'ito-edificio-electronica',
  name: 'Edificio de Electrónica',
  polygon: [
  [-96.74383479154031, 17.078847912196164], // p1
  [-96.74362926282512,  17.07878463018982], // p2
  [-96.74370444904517, 17.078553959135014], // p3
  [-96.74391171239525, 17.078616164866006],     // p4
],

  levels: 3,
  height: 2,
  base: 0,
  color: '#f59e0b', // naranja
  pois: [],
});

export default EdificioElectronica;
// components/buildings/defs/ito-doctorado.ts
import { defineBuilding } from '../define';
import type { BuildingDef } from '../types';

const AudiovisualLicenciatura: BuildingDef = defineBuilding({
  id: 'ito-audiovisual-Licenciatura',
  name: 'Audiovisual Licenciatura',
  polygon: [
  [-96.74478881636371, 17.07661259887016], // p1
  [-96.74449377337294, 17.076523501297768], // p2
  [-96.74453132429903, 17.076410046054047], // p3
  [-96.74483508446907, 17.076500425660562], // p4
],

  levels: 3,
  height: 2,
  base: 0,
  color: '#f59e0b', // naranja
  pois: [],
});

export default AudiovisualLicenciatura;
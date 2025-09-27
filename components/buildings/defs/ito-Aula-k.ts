// components/buildings/defs/ito-doctorado.ts
import { defineBuilding } from '../define';
import type { BuildingDef } from '../types';

const AulaK: BuildingDef = defineBuilding({
  id: 'ito-aula-k',
  name: 'Aula K',
  polygon: [
  [-96.74376741557302, 17.07663251752987], // p1
  [-96.74365433625718, 17.076594365364983], // p2
  [-96.74373949639327, 17.076350148151448], // p3
  [-96.74374687246805, 17.076350148151448],     // p4
  [-96.74378241173741, 17.07625335856412],     // p5
  [-96.74388366512741, 17.076289895036766],     // p6
  [-96.7438561724851, 17.076350148151448],     // p7
  [-96.74386447305058, 17.0763508805265],     // p8
],

  levels: 3,
  height: 2,
  base: 0,
  color: '#f59e0b', // naranja
  pois: [],
});

export default AulaK;
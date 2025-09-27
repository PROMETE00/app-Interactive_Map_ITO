// components/buildings/defs/ito-doctorado.ts
import { defineBuilding } from '../define';
import type { BuildingDef } from '../types';

const LaboratorioIndustrial: BuildingDef = defineBuilding({
  id: 'ito-laboratorio-industrial',
  name: 'Laboratorio Industrial',
  // Formato [lng, lat]; recorrido en sentido horario.
  polygon: [
  [-96.74344369423484, 17.07695011087689], // p1
  [-96.74325862181335, 17.076889857956008], // p2
  [-96.74326398623138, 17.076830886993335], // p3
  [-96.74333506477005, 17.076611668685963],     // p4
  [-96.74369112801574, 17.076723200839456],     // p5
  [-96.7436155100602, 17.07695211148651],     // p6
  [-96.74346329469905, 17.07690339636102],     // p7
],

  levels: 3,
  height: 2,
  base: 0,
  color: '#f59e0b', // naranja
  pois: [],
});

export default LaboratorioIndustrial;
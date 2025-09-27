import { defineBuilding } from '../define';
import type { BuildingDef } from '../types';

const LaboratorioDepartamentoMecanica: BuildingDef = defineBuilding({
  id: 'ito-Laboratorio-Departamento-Mecanica',
  name: 'Laboratorio de Departamento de Mecánica',
  // [lng, lat] siempre
  polygon: [
    [-96.744706, 17.078923],//p1
    [-96.744390, 17.078831],//p2
    [-96.744457, 17.078617],//p3
    [-96.744773, 17.078709],//p4
  ],
  levels: 2,
  color: '#e08af8',
  pois: [
  //entradas
  ],
});

export default LaboratorioDepartamentoMecanica;
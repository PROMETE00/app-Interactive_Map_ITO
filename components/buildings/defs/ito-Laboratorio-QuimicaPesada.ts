import { defineBuilding } from '../define';
import type { BuildingDef } from '../types';

const LaboratorioQuimicaPesada: BuildingDef = defineBuilding({
  id: 'ito-Laboratorio-Quimica',
  name: 'Laboratorio de Química',
  // [lng, lat] siempre
  polygon: [
    [-96.744773, 17.078709],//p1
    [-96.744457, 17.078617],//p2
    [-96.744524, 17.078402],//p3
    [-96.744840, 17.078494],//p4
  ],
  levels: 2,
  color: '#1c3e73',
  pois: [
  //entradas
  ],
});

export default LaboratorioQuimicaPesada;
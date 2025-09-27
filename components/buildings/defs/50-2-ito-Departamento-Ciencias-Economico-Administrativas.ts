// components/buildings/defs/ito-doctorado.ts
import { defineBuilding } from '../define';
import type { BuildingDef } from '../types';

const DepartamentoCienciasEconomicoAdministrativas: BuildingDef = defineBuilding({
  id: 'ito-departamento-ciencias-economico-administrativas',
  name: 'Departamento de Ciencias Economico Administrativas',
  polygon: [
  [-96.74454866427348, 17.076316493577615], // p1
  [-96.7443334311285, 17.076250273410203], // p2
  [-96.74437031150164, 17.0761419459299], // p3
  [-96.74458308721934, 17.07620834810073], // p4
],

  levels: 3,
  height: 2,
  base: 0,
  color: '#g59e0b', // naranja
  pois: [],
});

export default DepartamentoCienciasEconomicoAdministrativas;
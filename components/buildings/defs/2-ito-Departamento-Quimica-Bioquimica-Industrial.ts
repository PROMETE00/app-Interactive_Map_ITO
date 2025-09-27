// components/buildings/defs/ito-honguito.ts
import { defineBuilding } from '../define';
import type { BuildingDef } from '../types';

const DepartamentoQuimicaBioquimicaIndustrial: BuildingDef = defineBuilding({
  id: 'ito-dpto-quimica-bioquimica-industrial',
  name: 'Departamento de Química y Bioquímica e Ingeniería Industrial',
  polygon: [

    [-96.74401102405442 , 17.07959377506376], // p1
    [-96.74373853066878 , 17.079503642141194],// p2
    [-96.74380266401577 , 17.07930841393673],// p3
    [-96.74407515740141 , 17.07939854685929],// p4
  ],
  levels: 1,
  color: '#06a2a7',
  pois: [
    // entradas
  ],
});

export default DepartamentoQuimicaBioquimicaIndustrial;

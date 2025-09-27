import { defineBuilding } from '../define';
import type { BuildingDef } from '../types';

const LabFisicoQuimica: BuildingDef = defineBuilding({
  id: 'ito-lab-fisicoquimica',
  name: 'Laboratorio de Físico Química',
  polygon: [
    [-96.74441255132017, 17.0782929738088214], // p1
    [-96.744264055132017, 17.0782519738088214], // p2
    [-96.74438251473999, 17.077815963463469], //p3
    [-96.744597023983071, 17.077864386083714], //p4
    [-96.7445737023983071, 17.0779644386083714], //p5
    [-96.7445077023983071, 17.07795144386083714], //p6
  ],
  levels: 1,
  color: '#06a2a7',
  pois: [
    // entradas
  ],
});

export default LabFisicoQuimica;
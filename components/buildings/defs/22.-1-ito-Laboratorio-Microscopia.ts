// components/buildings/defs/ito-honguito.ts
import { defineBuilding } from '../define';
import type { BuildingDef } from '../types';

const LaboratorioMicroscopia: BuildingDef = defineBuilding({
  id: 'ito-laboratorio-microscopia',
  name: 'Laboratorio de Microscopia',
  polygon: [
    [-96.74523975368037 , 17.0784496621964],// p1
    [-96.74513246532268 , 17.07841376713024],// p2
    [-96.74517717890974 , 17.078290166824349],// p3
    [-96.7452864029105 , 17.078325566936225],// p4

  ],
  levels: 1,
  color: '#8af1f8',
  pois: [
    // entradas
  ],
});

export default LaboratorioMicroscopia;

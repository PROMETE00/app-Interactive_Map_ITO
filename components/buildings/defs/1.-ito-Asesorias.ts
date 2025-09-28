// components/buildings/defs/ito-honguito.ts
import { defineBuilding } from '../define';
import type { BuildingDef } from '../types';

const Asesorias: BuildingDef = defineBuilding({
  id: 'ito-asesorias',
  name: 'Asesorías',
  polygon: [

    [-96.7440942216957 , 17.07970864306136],// p1
    [-96.74399966648285 , 17.079682354111963],// p2
    [-96.74402849288136 , 17.07959389018672],// p3
    [-96.7441230480942 , 17.07962017913612],// p4
  ],
  levels: 1,
  color: '#8af1f8',
  pois: [
    // entradas
  ],
});

export default Asesorias;
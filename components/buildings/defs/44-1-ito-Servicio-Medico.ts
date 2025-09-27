// components/buildings/defs/ito-honguito.ts
import { defineBuilding } from '../define';
import type { BuildingDef } from '../types';

const ServicioMedico: BuildingDef = defineBuilding({
  id: 'ito-servicio-medico',
  name: 'Servicio Médico',
  polygon: [

    [-96.74479964917711 , 17.076809046634956], // p1
    [-96.74472720494363 , 17.076786110947232],// p2
    [-96.74476410990825 , 17.07667572089585],// p3
    [-96.74483585899824 , 17.07669815552209],// p4
  ],
  levels: 1,
  color: '#a77806',
  pois: [
    // entradas
  ],
});

export default ServicioMedico;

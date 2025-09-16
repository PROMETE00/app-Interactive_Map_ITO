import { defineBuilding } from '../define';
import type { BuildingDef } from '../types';

const Gimnasio: BuildingDef = defineBuilding({
  id: 'ito-Gimnasio',
  name: 'Gimnasio',
  // [lng, lat] siempre
  polygon: [
    [-96.743743, 17.077945],
    [-96.743445, 17.077853],
    [-96.743577, 17.077452],
    [-96.743876, 17.077546],
  ],
  levels: 2,
  color: '#1c3e73', // color del edificio (extrusión y 2D)
  pois: [
    // Entrada principal como POLÍGONO (color verde propio)
    {
      id: 'gim-entr-1',
      name: 'Entrada principal',
      type: 'entrada',
      polygon: [
        [-96.743710, 17.077910],
        [-96.743670, 17.077900],
        [-96.743680, 17.077860],
        [-96.743720, 17.077870],
      ],
      color: '#22c55e'
    },
    // Otra entrada, con otro color
    {
      id: 'gim-entr-2',
      name: 'Entrada lateral',
      type: 'entrada',
      polygon: [
        [-96.743600, 17.077750],
        [-96.743560, 17.077740],
        [-96.743570, 17.077700],
        [-96.743610, 17.077710],
      ],
      color: '#16a34a'
    },

    // Si quieres seguir usando puntos para otros POIs, también funciona:
    // { id:'gim-escaleras-1', name:'Escaleras', type:'escaleras', coord:[-96.743650, 17.077820] },
  ],
});

export default Gimnasio;
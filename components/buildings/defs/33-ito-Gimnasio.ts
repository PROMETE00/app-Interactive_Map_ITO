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
      [-96.743812, 17.077545], // (oeste + norte)
      [-96.743746, 17.077524], // (este + norte)
      [-96.743752, 17.077507], // (este + sur)
      [-96.743818, 17.077528], // (oeste + sur)
    ],
    color: '#22c55e'
  },
    // Otra entrada, con otro color
    {
      id: 'gim-entr-2',
      name: 'Entrada lateral',
      type: 'entrada',
      polygon: [
        [-96.743716, 17.0779367], // (oeste + norte)
        [-96.743682, 17.0779263], // (este + norte)
        [-96.743685, 17.077919], // (este + sur)
        [-96.7437187, 17.077929], // (oeste + sur)
      ],
      color: '#16a34a'
    },

    // Si quieres seguir usando puntos para otros POIs, también funciona:
    // { id:'gim-escaleras-1', name:'Escaleras', type:'escaleras', coord:[-96.743650, 17.077820] },
  ],
});

export default Gimnasio;
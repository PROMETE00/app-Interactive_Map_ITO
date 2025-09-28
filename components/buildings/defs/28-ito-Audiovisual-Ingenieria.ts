// components/buildings/defs/21.-itoEdificio-A.ts
import { defineBuilding } from '../define';
import type { BuildingDef } from '../types';

const AudiovisualIngenieria: BuildingDef = defineBuilding({
  id: 'ito-audiovisual-ingenieria',
  name: 'Audiovisual Ingenieria',
  polygon: [

    [-96.74597349665873 , 17.078359089852967],// p1
    [-96.7456670542871 , 17.078261660324284],// p2
    [-96.7457086285257 , 17.07814051432618],// p3
    [-96.74601507089736 , 17.078237302934152],// p4

  ],
  levels: 1,
  color: '#8af1f8',
  pois: [
    // entradas
  ],
});

export default AudiovisualIngenieria;
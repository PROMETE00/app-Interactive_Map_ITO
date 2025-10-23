// components/buildings/ito-campus-mask.ts
// (opcional) instala tipos:  npm i -D @types/geojson
export const ITO_CAMPUS_FC: GeoJSON.FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        name: 'Instituto Tecnológico de Oaxaca',
        // colores/estilos que usaremos en las capas:
        fill: '#1F77B4',          // color de relleno
        'fill-opacity': 0.4,      // opacidad del relleno
        stroke: '#1F77B4',        // color del borde
        'stroke-width': 2         // grosor del borde
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-96.743629, 17.079964],
          [-96.742086, 17.076864],
          [-96.744916, 17.075521],
          [-96.746584, 17.078572],
          [-96.743688, 17.079933] // anillo cerrado
        ]]
      }
    }
  ]
};
// components/buildings/ito-campus-mask.ts
export const ITO_CAMPUS_POLYGON: GeoJSON.Feature = {
  type: 'Feature',
  properties: {},
  geometry: {
    type: 'Polygon',
    coordinates: [[
      // <<< REEMPLAZA por tu perímetro real del ITO >>>
      [-96.74550, 17.07960],
      [-96.74290, 17.07960],
      [-96.74290, 17.07780],
      [-96.74550, 17.07780],
      [-96.74550, 17.07960]
    ]]
  }
};

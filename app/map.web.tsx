import React, { useState, useMemo } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import MapWeb from '@/components/MapWeb';
import MapNavbar from '@/components/MapNavbar';
import campus from '@/assets/geo/campus.json';
import {
  allCategories,
  defaultVisibility,
  mergeBuildings,
  type BuildingCategory,
} from '@/components/buildings';

function getGeojsonCenter(fc: any) {
  let minX = 180, minY = 90, maxX = -180, maxY = -90;
  const push = (x: number, y: number) => {
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  };
  for (const f of fc.features || []) {
    const g = f.geometry; if (!g) continue;
    if (g.type === 'Polygon') for (const r of g.coordinates) for (const [x, y] of r) push(x, y);
    if (g.type === 'MultiPolygon')
      for (const p of g.coordinates) for (const r of p) for (const [x, y] of r) push(x, y);
  }
  return { lng: (minX + maxX) / 2, lat: (minY + maxY) / 2 };
}

export default function MapScreenWeb() {
  const campusCenter = useMemo(() => getGeojsonCenter(campus), []);
  
  const [pitch, setPitch] = useState(0);
  const [bearing, setBearing] = useState(0);
  const [maskOutside, setMaskOutside] = useState(false);
  const [catVis, setCatVis] = useState<Record<BuildingCategory, boolean>>(defaultVisibility);
  const [arrowColor, setArrowColor] = useState('#2563eb');

  const visibleBuildings = useMemo(() => mergeBuildings(catVis), [catVis]);

  return (
    <View style={styles.container}>
      <MapWeb
        center={campusCenter}
        buildings={visibleBuildings}
        pitch={pitch}
        bearing={bearing}
        maskOutside={maskOutside}
        arrowColor={arrowColor}
      />
      
      <MapNavbar
        initialView={pitch > 0 ? 'oblique' : 'topdown'}
        onChangeInitialView={(view) => setPitch(view === 'topdown' ? 0 : 60)}
        pitchValue={pitch}
        onChangePitch={setPitch}
        bearingValue={bearing}
        onChangeBearing={setBearing}
        arrowColor={arrowColor}
        onChangeArrowColor={setArrowColor}
        maskOutside={maskOutside}
        onToggleMaskOutside={setMaskOutside}
        categories={allCategories}
        categoryVisibility={catVis}
        onToggleCategory={(c, v) => setCatVis(prev => ({ ...prev, [c]: v }))}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

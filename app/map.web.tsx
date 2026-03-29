import React, { useState, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import MapWeb from '@/components/MapWeb';
import SidebarWeb from '@/components/SidebarWeb';
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
  
  const [selectedBuildingId, setSelectedBuildingId] = useState<string | null>(null);
  const [catVis, setCatVis] = useState<Record<BuildingCategory, boolean>>(defaultVisibility);

  const visibleBuildings = useMemo(() => mergeBuildings(catVis), [catVis]);

  return (
    <View style={styles.container}>
      {/* Sidebar para PC */}
      <SidebarWeb 
        onSelectBuilding={(id) => setSelectedBuildingId(id)}
        categoryVisibility={catVis}
        onToggleCategory={(cat, visible) => setCatVis(prev => ({ ...prev, [cat]: visible }))}
      />
      
      {/* Área del mapa */}
      <View style={styles.mapArea}>
        <MapWeb
          center={campusCenter}
          buildings={visibleBuildings}
          selectedBuildingId={selectedBuildingId}
          pitch={selectedBuildingId ? 65 : 0}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row', // Layout horizontal para PC
  },
  mapArea: {
    flex: 1,
  },
});

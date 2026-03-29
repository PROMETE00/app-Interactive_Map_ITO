import React, { useEffect, useRef, useMemo } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import * as turf from '@turf/turf';
import { BuildingDef } from './buildings/types';
import { ITO_CAMPUS_FC } from './buildings/ito-campus-mask';

interface MapWebProps {
  center: { lng: number; lat: number };
  buildings: BuildingDef[];
  pitch?: number;
  bearing?: number;
  maskOutside?: boolean;
  arrowColor?: string;
  onMapReady?: (map: maplibregl.Map) => void;
}

export default function MapWeb({
  center,
  buildings,
  pitch = 0,
  bearing = 0,
  maskOutside = false,
  arrowColor = '#2563eb',
  onMapReady,
}: MapWebProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const playerMarkerRef = useRef<maplibregl.Marker | null>(null);

  // Normalizar el campus una sola vez
  const campusNorm = useMemo(() => {
    const fc = ITO_CAMPUS_FC;
    if (!fc || !Array.isArray(fc.features)) return fc;
    return {
      type: 'FeatureCollection',
      features: fc.features.map((f: any) => ({
        ...f,
        geometry: f.geometry.type === 'Polygon' 
          ? { ...f.geometry, coordinates: f.geometry.coordinates.map((r: any) => [...r]) }
          : f.geometry
      }))
    };
  }, []);

  const campusUnion = useMemo(() => {
    const feats = (campusNorm.features || []).filter((f: any) => f && f.geometry);
    if (!feats.length) return null;
    let u = feats[0];
    for (let i = 1; i < feats.length; i++) {
      try {
        u = turf.union(u, feats[i]) || u;
      } catch (e) {}
    }
    return u;
  }, [campusNorm]);

  // Inicializar el mapa
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: {
        version: 8,
        sources: {
          'osm': {
            type: 'raster',
            tiles: ['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'],
            tileSize: 256,
            attribution: '&copy; OpenStreetMap contributors'
          }
        },
        layers: [{ id: 'osm', type: 'raster', source: 'osm' }],
        glyphs: 'https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf',
      },
      center: [center.lng, center.lat],
      zoom: 17,
      pitch,
      bearing,
      maxPitch: 85,
    });

    map.addControl(new maplibregl.NavigationControl(), 'top-right');

    map.on('load', () => {
      mapRef.current = map;
      
      // Añadir fuentes de edificios y campus
      map.addSource('campus', { type: 'geojson', data: campusNorm });
      
      if (maskOutside) {
        map.addLayer({
          id: 'mask-campus-fill',
          type: 'fill',
          source: 'campus',
          paint: { 'fill-color': '#F4F1EA', 'fill-opacity': 1.0 },
        });
      }

      updateBuildingsLayer(map, buildings);
      
      if (onMapReady) onMapReady(map);
    });

    return () => {
      map.remove();
    };
  }, []);

  // Actualizar edificios cuando cambien las categorías
  useEffect(() => {
    if (mapRef.current && mapRef.current.isStyleLoaded()) {
      updateBuildingsLayer(mapRef.current, buildings);
    }
  }, [buildings]);

  // Actualizar Pitch/Bearing reactivamente
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.easeTo({ pitch, bearing, duration: 200 });
    }
  }, [pitch, bearing]);

  const updateBuildingsLayer = (map: maplibregl.Map, defs: BuildingDef[]) => {
    const fcBuild: any = { type: 'FeatureCollection', features: [] };

    for (const b of defs) {
      if (!b.polygon || !b.polygon.length) continue;
      
      const feat: any = {
        type: 'Feature',
        properties: {
          id: b.id,
          name: b.name,
          height: b.height || (b.levels ? b.levels * 3.5 : 4),
          base: b.base || 0,
          color: b.color || '#9ca3af',
        },
        geometry: {
          type: 'Polygon',
          coordinates: [b.polygon.map(p => [p[0], p[1]])]
        }
      };
      fcBuild.features.push(feat);
    }

    if (map.getSource('custom-buildings')) {
      (map.getSource('custom-buildings') as maplibregl.GeoJSONSource).setData(fcBuild);
    } else {
      map.addSource('custom-buildings', { type: 'geojson', data: fcBuild });
      map.addLayer({
        id: 'custom-3d',
        type: 'fill-extrusion',
        source: 'custom-buildings',
        paint: {
          'fill-extrusion-color': ['get', 'color'],
          'fill-extrusion-opacity': 0.9,
          'fill-extrusion-height': ['get', 'height'],
          'fill-extrusion-base': ['get', 'base'],
        }
      });
    }
  };

  return (
    <View style={styles.container}>
      <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

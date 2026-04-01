import React, { useEffect, useRef, useMemo, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import * as turf from '@turf/turf';
import { BuildingDef } from './buildings/types';
import { ITO_CAMPUS_FC } from './buildings/ito-campus-mask';
import { getBasemapStyle, type Basemap } from '@/constants/mapStyles';

interface MapWebProps {
  center: { lng: number; lat: number };
  buildings: BuildingDef[];
  pitch?: number;
  bearing?: number;
  zoom?: number;
  basemap?: Basemap;
  showLabels?: boolean;
  maskOutside?: boolean;
  selectedBuildingId?: string | null;
  userLocation?: { lng: number; lat: number } | null;
  userHeading?: number;
  followUser?: boolean;
  isFirstPerson?: boolean;
  onMapReady?: (map: maplibregl.Map) => void;
}

export default function MapWeb({
  center, buildings, pitch = 0, bearing = 0, zoom = 17,
  basemap = 'voyager', showLabels = true, maskOutside = false,
  selectedBuildingId = null, userLocation = null, userHeading = 0,
  followUser = false, isFirstPerson = false, onMapReady,
}: MapWebProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const playerMarkerRef = useRef<maplibregl.Marker | null>(null);
  const lastSafeCenter = useRef<[number, number]>([center.lng, center.lat]);
  const isInternalMove = useRef(false);
  const [isStyleLoaded, setIsStyleLoaded] = useState(false);

  const styleJSON = useMemo(() => getBasemapStyle(basemap, { labels: showLabels }), [basemap, showLabels]);

  const buildingPolygons = useMemo(() => {
    return buildings.map(b => {
      if (!b.polygon || b.polygon.length < 3) return null;
      const coords = b.polygon.map(p => [p[0], p[1]]);
      if (coords[0][0] !== coords[coords.length-1][0] || coords[0][1] !== coords[coords.length-1][1]) {
        coords.push(coords[0]);
      }
      return { id: b.id, poly: turf.polygon([coords]) };
    }).filter(Boolean);
  }, [buildings]);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: styleJSON,
      center: [center.lng, center.lat],
      zoom: isFirstPerson ? 22.5 : zoom,
      pitch: isFirstPerson ? 85 : pitch,
      bearing,
      maxPitch: 85,
      antialias: true,
      maxZoom: 24,
    });

    map.on('style.load', () => {
      setIsStyleLoaded(true);
      if (!map.getSource('campus')) {
        map.addSource('campus', { type: 'geojson', data: ITO_CAMPUS_FC as any });
      }
      renderBuildings(map, buildings);
    });

    map.on('load', () => {
      mapRef.current = map;
      
      const el = document.createElement('div');
      el.style.width = '24px'; el.style.height = '24px';
      el.style.borderRadius = '50%'; el.style.backgroundColor = '#2563eb';
      el.style.border = '3px solid white';
      el.style.boxShadow = '0 0 10px rgba(0,0,0,0.3)';
      el.style.display = 'flex'; el.style.alignItems = 'center'; el.style.justifyContent = 'center';
      
      const arrow = document.createElement('div');
      arrow.style.width = '0'; arrow.style.height = '0';
      arrow.style.borderLeft = '6px solid transparent';
      arrow.style.borderRight = '6px solid transparent';
      arrow.style.borderBottom = '10px solid white';
      arrow.style.marginTop = '-4px';
      el.appendChild(arrow);
      
      playerMarkerRef.current = new maplibregl.Marker({ element: el })
        .setLngLat([center.lng, center.lat])
        .addTo(map);

      renderBuildings(map, buildings);

      // --- MOTOR DE FÍSICAS (SIN RECURSIÓN) ---
      map.on('move', () => {
        if (isInternalMove.current) return;

        const currentCenter = map.getCenter();
        
        if (!isFirstPerson) {
          lastSafeCenter.current = [currentCenter.lng, currentCenter.lat];
          return;
        }

        const point = turf.point([currentCenter.lng, currentCenter.lat]);
        let isColliding = false;
        
        for (const b of (buildingPolygons as any[])) {
          if (b && turf.booleanPointInPolygon(point, b.poly)) {
            isColliding = true;
            break;
          }
        }

        if (isColliding) {
          isInternalMove.current = true;
          map.jumpTo({ center: lastSafeCenter.current });
          isInternalMove.current = false;
        } else {
          lastSafeCenter.current = [currentCenter.lng, currentCenter.lat];
        }
      });

      if (onMapReady) onMapReady(map);
    });

    return () => { if (mapRef.current) mapRef.current.remove(); };
  }, [isFirstPerson, buildings]); // Escuchar cambios en modo y edificios para re-bind de colisiones

  // Sincronización de Edificios
  useEffect(() => {
    const map = mapRef.current;
    if (map && isStyleLoaded) {
      renderBuildings(map, buildings);
    }
  }, [buildings, isStyleLoaded]);

  // Sincronización de Estilo
  useEffect(() => {
    const map = mapRef.current;
    if (map) {
      setIsStyleLoaded(false);
      map.setStyle(styleJSON);
    }
  }, [styleJSON]);

  // Cámara Fluida
  useEffect(() => {
    const map = mapRef.current;
    if (map && isStyleLoaded) {
      const options: any = { 
        pitch: isFirstPerson ? 85 : pitch, 
        bearing, 
        zoom: isFirstPerson ? 22.5 : zoom, 
        duration: 1200,
        easing: (t: number) => t * (2 - t)
      };
      if (followUser && userLocation) {
        options.center = [userLocation.lng, userLocation.lat];
      }
      map.easeTo(options);
    }
  }, [pitch, bearing, zoom, isFirstPerson, followUser, isStyleLoaded]);

  // GPS y Rotación
  useEffect(() => {
    if (playerMarkerRef.current && userLocation) {
      playerMarkerRef.current.setLngLat([userLocation.lng, userLocation.lat]);
      if (followUser && mapRef.current && isStyleLoaded) {
        mapRef.current.easeTo({ 
          center: [userLocation.lng, userLocation.lat], 
          duration: 800,
          zoom: isFirstPerson ? 22.5 : mapRef.current.getZoom()
        });
      }
    }
  }, [userLocation, followUser, isStyleLoaded, isFirstPerson]);

  useEffect(() => {
    if (playerMarkerRef.current && userHeading !== undefined) {
      playerMarkerRef.current.getElement().style.transform = `rotate(${userHeading}deg)`;
      if (isFirstPerson && followUser && mapRef.current) {
        mapRef.current.setBearing(userHeading);
      }
    }
  }, [userHeading, isFirstPerson, followUser]);

  function renderBuildings(map: maplibregl.Map, defs: BuildingDef[]) {
    if (!map.isStyleLoaded()) return;
    const fc: any = { type: 'FeatureCollection', features: defs.map(b => ({
      type: 'Feature',
      properties: {
        id: b.id, name: b.name,
        height: b.height || (b.levels ? b.levels * 3.5 : 4),
        base: b.base || 0, color: b.color || '#9ca3af',
      },
      geometry: { type: 'Polygon', coordinates: [b.polygon.map(p => [p[0], p[1]]).concat([b.polygon[0]])] }
    }))};

    if (map.getSource('custom-buildings')) {
      (map.getSource('custom-buildings') as maplibregl.GeoJSONSource).setData(fc);
    } else {
      map.addSource('custom-buildings', { type: 'geojson', data: fc });
      map.addLayer({
        id: 'custom-3d', type: 'fill-extrusion', source: 'custom-buildings',
        paint: {
          'fill-extrusion-color': ['get', 'color'],
          'fill-extrusion-opacity': 0.98,
          'fill-extrusion-height': ['get', 'height'],
          'fill-extrusion-base': ['get', 'base'],
        }
      });
    }
  }

  return (
    <View style={styles.container}>
      <div ref={mapContainerRef} style={{ width: '100%', height: '100%', position: 'relative' }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, width: '100%', height: '100%', backgroundColor: '#f3f4f6' }
});

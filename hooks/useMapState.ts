import { useState, useMemo, useCallback } from 'react';
import {
  allCategories,
  defaultVisibility,
  mergeBuildings,
  type BuildingCategory,
  type BuildingDef,
} from '@/components/buildings';
import campus from '@/assets/geo/campus.json';

type InitialView = 'topdown' | 'oblique';

function getGeojsonCenter(fc: any) {
  let minX = 180, minY = 90, maxX = -180, maxY = -90;
  let found = false;
  const push = (x: number, y: number) => {
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
    found = true;
  };
  for (const f of fc.features || []) {
    const g = f.geometry; if (!g) continue;
    if (g.type === 'Polygon') for (const r of g.coordinates) for (const [x, y] of r) push(x, y);
    if (g.type === 'MultiPolygon')
      for (const p of g.coordinates) for (const r of p) for (const [x, y] of r) push(x, y);
  }
  if (!found) return { lng: -96.7436, lat: 17.0778 }; // Fallback exacto al ITO
  return { lng: (minX + maxX) / 2, lat: (minY + maxY) / 2 };
}

export function useMapState() {
  const campusCenter = useMemo(() => getGeojsonCenter(campus), []);
  
  const [selectedBuildingId, setSelectedBuildingId] = useState<string | null>(null);
  const [catVis, setCatVis] = useState<Record<BuildingCategory, boolean>>(defaultVisibility);
  
  // Parámetros de cámara
  const [pitch, setPitch] = useState(0);
  const [bearing, setBearing] = useState(0);
  const [zoom, setZoom] = useState(17);
  const [initialView, setInitialView] = useState<InitialView>('topdown');

  // Configuración adicional
  const [arrowColor, setArrowColor] = useState('#2563eb');
  const [maskOutside, setMaskOutside] = useState(false);
  
  // Seguimiento de usuario y Primera Persona
  const [followUser, setFollowUser] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lng: number; lat: number } | null>(null);
  const [userHeading, setUserHeading] = useState(0);
  const [isFirstPerson, setIsFirstPerson] = useState(false);

  // Edificios visibles filtrados por categoría
  const visibleBuildings = useMemo(() => mergeBuildings(catVis), [catVis]);

  const toggleCategory = useCallback((category: BuildingCategory, visible: boolean) => {
    setCatVis(prev => ({ ...prev, [category]: visible }));
  }, []);

  const selectBuilding = useCallback((id: string | null) => {
    setSelectedBuildingId(id);
    if (id) {
      setInitialView('oblique');
      setFollowUser(false);
      if (isFirstPerson) {
        setPitch(80);
        setZoom(20);
      } else {
        setPitch(65);
        setZoom(19);
      }
    } else {
      setPitch(0);
      setZoom(17);
      setInitialView('topdown');
    }
  }, [isFirstPerson]);

  const updateCamera = useCallback((p: number, b: number, z: number) => {
    setPitch(p);
    setBearing(b);
    setZoom(z);
  }, []);

  const changeInitialView = useCallback((view: InitialView) => {
    setInitialView(view);
    if (view === 'topdown') {
      setPitch(0);
      setIsFirstPerson(false);
    } else {
      setPitch(isFirstPerson ? 80 : 60);
    }
  }, [isFirstPerson]);

  const toggleFirstPerson = useCallback(() => {
    const newState = !isFirstPerson;
    setIsFirstPerson(newState);
    if (newState) {
      setPitch(80);
      setZoom(20);
      setInitialView('oblique');
      // Si entramos en primera persona, activamos seguimiento automáticamente si hay ubicación
      if (userLocation) {
        setFollowUser(true);
      }
    } else {
      setPitch(60);
      setZoom(18);
    }
  }, [isFirstPerson, userLocation]);

  return {
    center: campusCenter,
    visibleBuildings,
    selectedBuildingId,
    categoryVisibility: catVis,
    allCategories,
    pitch,
    bearing,
    zoom,
    initialView,
    arrowColor,
    maskOutside,
    followUser,
    userLocation,
    userHeading,
    isFirstPerson,
    toggleCategory,
    selectBuilding,
    updateCamera,
    setInitialView: changeInitialView,
    setArrowColor,
    setMaskOutside,
    setPitch,
    setBearing,
    setZoom,
    setFollowUser,
    setUserLocation,
    setUserHeading,
    toggleFirstPerson,
  };
}

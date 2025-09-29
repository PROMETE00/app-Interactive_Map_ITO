// app/map.tsx
import * as Location from 'expo-location';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import type { WebView as WebViewType } from 'react-native-webview';
import { WebView } from 'react-native-webview';

import { ITO_CAMPUS_FC } from '@/components/buildings/ito-campus-mask'; // Polígono del campus para la máscara
import campus from '../assets/geo/campus.json'; // Solo para center de respaldo

// === NUEVO: catálogo y utilidades de categorías ===
import {
  allCategories,
  defaultVisibility,
  mergeBuildings,
  type BuildingCategory,
} from '../components/buildings';

import MapNavbar from '../components/MapNavbar';
import { htmlPage } from '../lib/htmlPage';

type Center = { lng: number; lat: number };
type Basemap = 'positron' | 'voyager' | 'dark' | 'osm';
type PanMode = 'free' | 'locked' | 'soft';
type InitialView = 'topdown' | 'oblique';

function getGeojsonCenter(fc: any): Center {
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

function withTimeout<T>(p: Promise<T>, ms: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const id = setTimeout(() => reject(new Error('timeout')), ms);
    p.then((v) => { clearTimeout(id); resolve(v); })
     .catch((e) => { clearTimeout(id); reject(e); });
  });
}

export default function MapScreen() {
  // Centro de respaldo desde campus.json
  const campusCenter = useMemo(() => getGeojsonCenter(campus), []);
  const [center, setCenter] = useState<Center | null>(null);
  const webRef = useRef<WebViewType>(null);

  // ====== Config inicial (sólo para el primer render del mapa) ======
  const BASEMAP: Basemap = 'voyager';
  const PANORAMICMODE_INIT: PanMode = 'free';
  const INITIAL_VIEW_INIT: InitialView = 'topdown';

  // switches iniciales
  const SHOW_OSM_INIT = false;     // false => basemap sin edificios OSM
  const MASK_OUTSIDE_INIT = false; // true => enmascara fuera del campus

  const ARROW_COLOR_INIT = '#2563eb';

  // ====== Estado controlado por la navbar (cambios en vivo) ======
  const [panMode, setPanMode] = useState<PanMode>(PANORAMICMODE_INIT);
  const [initialView, setInitialView] = useState<InitialView>(INITIAL_VIEW_INIT);
  const [arrowColor, setArrowColor] = useState<string>(ARROW_COLOR_INIT);

  // switches en vivo
  const [showOsmBuildings, setShowOsmBuildings] = useState<boolean>(SHOW_OSM_INIT);
  const [maskOutside, setMaskOutside] = useState<boolean>(MASK_OUTSIDE_INIT);

  // ====== NUEVO: visibilidad por categorías ======
  const [catVis, setCatVis] = useState<Record<BuildingCategory, boolean>>(defaultVisibility);
  const categories = allCategories;

  // Edificios visibles (resultado de mezclar categorías encendidas)
  const visibleBuildings = useMemo(
    () => mergeBuildings(catVis),
    [catVis]
  );

  // ====== Permisos + ubicación usuario ======
  useEffect(() => {
    let cancelled = false;
    let sub: Location.LocationSubscription | null = null;

    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
          const last = await Location.getLastKnownPositionAsync({ maxAge: 15000 });
          const pos = last ?? await withTimeout(
            Location.getCurrentPositionAsync({
              accuracy: Location.Accuracy.High,
              mayShowUserSettingsDialog: true,
            }),
            10000
          );

          const c = pos
            ? { lng: pos.coords.longitude, lat: pos.coords.latitude }
            : campusCenter;

          if (!cancelled) setCenter(c);

          sub = await Location.watchPositionAsync(
            { accuracy: Location.Accuracy.Balanced, timeInterval: 1500, distanceInterval: 2 },
            (loc) => {
              const lng = loc.coords.longitude;
              const lat = loc.coords.latitude;
              const h = Number.isFinite(loc.coords.heading) ? (loc.coords.heading as number) : undefined;

              const js = `
                (function(){
                  if (window.__MAP_READY__ && window.updatePlayer) {
                    window.updatePlayer(${lng.toFixed(6)}, ${lat.toFixed(6)}, ${Number.isFinite(h as number) ? (h as number).toFixed(1) : 'undefined'});
                  }
                })();
                true;`;
              webRef.current?.injectJavaScript(js);
            }
          );
          return;
        }
      } catch {
        // fallback abajo
      }
      if (!cancelled) setCenter(campusCenter);
    })();

    return () => { cancelled = true; sub?.remove(); };
  }, [campusCenter]);

  // ====== HTML inicial del WebView (se inyecta una vez) ======
const initialHtml = useMemo(() => {
  if (!center) return '<html></html>';
  return htmlPage(
    center,
    ITO_CAMPUS_FC,
    {
      bufferM: 250,
      basemap: 'voyager',
      panMode: 'free',
      softExtraM: 150,
      maskOutside: false,
      initialView: 'topdown',
      obliquePitch: 60,
      showOsmBuildings: false,
      arrowColor: '#2563eb',
      vertexOrder: 'cw',
      floorHeightM: 3.2,
      // 🔻 nuevos flags
      showBasemapLabels: false,
      showCampusLabel: false,
    },
    visibleBuildings
  );
}, [center]);


  const webSource = useMemo(() => ({ html: initialHtml }), [initialHtml]);

  // ====== Push dinámico de datos al WebView (sin recargar) ======

  // 1) Enviar edificios visibles cuando cambien las categorías
  useEffect(() => {
    const msg = JSON.stringify({ type: 'set-buildings', payload: visibleBuildings });
    webRef.current?.postMessage(msg);
  }, [visibleBuildings]);

  // 2) Enviar flags (OSM y máscara) cuando cambien
  useEffect(() => {
    const flags = { showOsmBuildings, maskOutside };
    webRef.current?.postMessage(JSON.stringify({ type: 'set-flags', payload: flags }));

    // Compatibilidad si tu HTML expone funciones imperativas:
    webRef.current?.injectJavaScript(
      `try{
        if(window.setShowOsmBuildings) window.setShowOsmBuildings(${showOsmBuildings});
        if(window.setMaskOutside) window.setMaskOutside(${maskOutside});
      }catch(e){}; true;`
    );
  }, [showOsmBuildings, maskOutside]);

  // ====== Handlers Navbar → funciones (además de setState) ======
  const handleChangePanMode = (mode: PanMode) => {
    setPanMode(mode);
    webRef.current?.injectJavaScript(`window.setPanMode && window.setPanMode(${JSON.stringify(mode)}); true;`);
  };

  const handleChangeInitialView = (view: InitialView) => {
    setInitialView(view);
    webRef.current?.injectJavaScript(`window.setInitialView && window.setInitialView(${JSON.stringify(view)}); true;`);
  };

  const handleChangeArrowColor = (hex: string) => {
    setArrowColor(hex);
    webRef.current?.injectJavaScript(`window.setArrowColor && window.setArrowColor(${JSON.stringify(hex)}); true;`);
  };

  const handleToggleOsmBuildings = (value: boolean) => {
    setShowOsmBuildings(value);
    // postMessage ya se dispara por el useEffect de flags
  };

  const handleToggleMaskOutside = (value: boolean) => {
    setMaskOutside(value);
    // postMessage ya se dispara por el useEffect de flags
  };

  if (!center) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <>
      <WebView
        ref={webRef}
        style={{ flex: 1 }}
        originWhitelist={['*']}
        setSupportMultipleWindows={false}
        javaScriptEnabled
        domStorageEnabled
        allowFileAccess
        allowUniversalAccessFromFileURLs
        source={webSource}
        // Si tu html manda mensajes (clicks, etc.), maneja aquí:
        // onMessage={(e) => { const msg = JSON.parse(e.nativeEvent.data); ... }}
      />

<MapNavbar
  initialView={initialView}
  onChangeInitialView={handleChangeInitialView}
  arrowColor={arrowColor}
  onChangeArrowColor={handleChangeArrowColor}
  maskOutside={maskOutside}
  onToggleMaskOutside={handleToggleMaskOutside}
  categories={categories}
  categoryVisibility={catVis}
  onToggleCategory={(c: BuildingCategory, v: boolean) =>
    setCatVis(prev => ({ ...prev, [c]: v }))
  }
/>
    </>
  );
}
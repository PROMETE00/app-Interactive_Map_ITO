// app/map.tsx
import * as Location from 'expo-location';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import type { WebView as WebViewType } from 'react-native-webview';
import { WebView } from 'react-native-webview';

import { ITO_CAMPUS_FC } from '@/components/buildings/ito-campus-mask'; // <– NUEVO: tu polígono para pintar la capa
import campus from '../assets/geo/campus.json'; // <– se conserva (solo para center de fallback)
import { customBuildings } from '../components/buildings';
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
  // Usamos el campus.json SOLO para calcular centro de respaldo
  const campusCenter = useMemo(() => getGeojsonCenter(campus), []);
  const [center, setCenter] = useState<Center | null>(null);
  const webRef = useRef<WebViewType>(null);

  // ====== Config inicial (sólo para el primer render del mapa) ======
  const BASEMAP: Basemap = 'voyager';
  const PANORAMICMODE_INIT: PanMode = 'locked';
  const INITIAL_VIEW_INIT: InitialView = 'topdown';

  // switches iniciales
  const SHOW_OSM_INIT = false;     // false => basemap sin edificios
  const MASK_OUTSIDE_INIT = false; // true => enmascara fuera del campus

  const ARROW_COLOR_INIT = '#2563eb';

  // ====== Estado controlado por la navbar (cambios en vivo) ======
  const [panMode, setPanMode] = useState<PanMode>(PANORAMICMODE_INIT);
  const [initialView, setInitialView] = useState<InitialView>(INITIAL_VIEW_INIT);
  const [arrowColor, setArrowColor] = useState<string>(ARROW_COLOR_INIT);

  // switches en vivo
  const [showOsmBuildings, setShowOsmBuildings] = useState<boolean>(SHOW_OSM_INIT);
  const [maskOutside, setMaskOutside] = useState<boolean>(MASK_OUTSIDE_INIT);

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

  // ====== HTML inicial del WebView (no depende del estado vivo) ======
  const initialHtml = useMemo(() => {
    if (!center) return '<html></html>';
    return htmlPage(
      center,
      ITO_CAMPUS_FC, // 👈 AHORA la capa del campus usa tu polígono local, NO el assets/geo/campus.json
      {
        bufferM: 250,
        basemap: BASEMAP,
        panMode: PANORAMICMODE_INIT, // sólo valor inicial
        softExtraM: 150,
        maskOutside: MASK_OUTSIDE_INIT,   // sólo valor inicial
        initialView: INITIAL_VIEW_INIT,   // sólo valor inicial
        obliquePitch: 60,
        showOsmBuildings: SHOW_OSM_INIT,  // sólo valor inicial
        arrowColor: ARROW_COLOR_INIT,     // sólo valor inicial
        vertexOrder: 'cw',
        floorHeightM: 3.2
      },
      customBuildings
    );
  }, [center]);

  const webSource = useMemo(() => ({ html: initialHtml }), [initialHtml]);

  // ====== Handlers Navbar → inyección JS (sin recargar WebView) ======
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

  // ==== NUEVO: switches de edificios OSM y máscara ====
  const handleToggleOsmBuildings = (value: boolean) => {
    setShowOsmBuildings(value);
    webRef.current?.injectJavaScript(
      `window.setShowOsmBuildings && window.setShowOsmBuildings(${value}); true;`
    );
  };

  const handleToggleMaskOutside = (value: boolean) => {
    setMaskOutside(value);
    webRef.current?.injectJavaScript(
      `window.setMaskOutside && window.setMaskOutside(${value}); true;`
    );
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
      />

      <MapNavbar
        panMode={panMode}
        onChangePanMode={handleChangePanMode}
        initialView={initialView}
        onChangeInitialView={handleChangeInitialView}
        arrowColor={arrowColor}
        onChangeArrowColor={handleChangeArrowColor}

        // ===== NUEVOS props para los switches =====
        showOsmBuildings={showOsmBuildings}
        onToggleOsmBuildings={handleToggleOsmBuildings}
        maskOutside={maskOutside}
        onToggleMaskOutside={handleToggleMaskOutside}
      />
    </>
  );
}
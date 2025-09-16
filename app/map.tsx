// app/map.tsx
import * as Location from 'expo-location';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import type { WebView as WebViewType } from 'react-native-webview';
import { WebView } from 'react-native-webview';

import campus from '../assets/geo/campus.json';
import { customBuildings } from '../components/buildings';
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
  const campusCenter = useMemo(() => getGeojsonCenter(campus), []);
  const [center, setCenter] = useState<Center | null>(null);
  const webRef = useRef<WebViewType>(null);

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

  if (!center) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  // ====== Toggles fáciles ======
  const BASEMAP: Basemap = 'voyager';      // 'positron' | 'voyager' | 'dark' | 'osm'
  const PANORAMICMODE: PanMode = 'free';   // 'free' | 'locked' | 'soft'
  const INITIAL_VIEW: InitialView = 'topdown'; // 'topdown' | 'oblique'
  const SHOW_OSM = false;                  // pintar edificios OSM dentro del campus

  // === Color de la flecha (configurable desde aquí) ===
  const ARROW_COLOR = '#2563eb';           // cambia a tu gusto (ej. '#00A884')

  return (
    <WebView
      ref={webRef}
      style={{ flex: 1 }}
      originWhitelist={['*']}
      setSupportMultipleWindows={false}
      javaScriptEnabled
      domStorageEnabled
      allowFileAccess
      allowUniversalAccessFromFileURLs
      source={{
        html: htmlPage(
          center,
          campus,
          {
            bufferM: 250,
            basemap: BASEMAP,
            panMode: PANORAMICMODE,
            softExtraM: 150,        // usado solo si panMode === 'soft'
            maskOutside: false,
            initialView: INITIAL_VIEW,
            obliquePitch: 60,
            showOsmBuildings: SHOW_OSM,
            arrowColor: ARROW_COLOR,
          } as any,                  // cast temporal hasta actualizar tipos en htmlPage.ts
          customBuildings
        )
      }}
    />
  );
}
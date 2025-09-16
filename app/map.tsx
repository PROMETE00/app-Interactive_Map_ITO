import * as Location from 'expo-location';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import type { WebView as WebViewType } from 'react-native-webview';
import { WebView } from 'react-native-webview';

import campus from '../assets/geo/campus.json';
import { customBuildings } from '../components/buildings'; // usa '@/components/buildings' si tienes alias
import { htmlPage } from '../lib/htmlPage';

type Center = { lng: number; lat: number };

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
          let pos =
            (await Location.getLastKnownPositionAsync({ maxAge: 15000 })) ||
            (await withTimeout(
              Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.High,
                mayShowUserSettingsDialog: true,
              }),
              10000
            ));

          const c = pos
            ? { lng: pos.coords.longitude, lat: pos.coords.latitude }
            : campusCenter;

          if (!cancelled) setCenter(c);

          sub = await Location.watchPositionAsync(
            {
              accuracy: Location.Accuracy.Balanced,
              timeInterval: 1500,
              distanceInterval: 2,
            },
            (loc) => {
              const lng = loc.coords.longitude;
              const lat = loc.coords.latitude;
              const headingDeg =
                typeof loc.coords.heading === 'number' && !Number.isNaN(loc.coords.heading)
                  ? loc.coords.heading
                  : undefined;

              const js =
                `window.__MAP_READY__ && window.updatePlayer && window.updatePlayer(${lng.toFixed(
                  6
                )}, ${lat.toFixed(6)}, ${headingDeg ?? 'undefined'});`;
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

    return () => {
      cancelled = true;
      sub?.remove();
    };
  }, [campusCenter]);

  if (!center) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  // Basemap similar a geojson.io
  const BASEMAP: 'positron' | 'voyager' | 'osm' = 'voyager';
  const PANORAMICMODE: 'free' | 'locked' = 'locked';

  return (
    <WebView
      ref={webRef}
      originWhitelist={['*']}
      setSupportMultipleWindows={false}
      source={{
        html: htmlPage(center, campus, {
        bufferM: 250,
        basemap: BASEMAP,
        panMode: PANORAMICMODE,
        softExtraM: 150,     // cuánto más allá del buffer se permite (solo en 'soft')
        maskOutside: false,  // true si quieres tapar lo de fuera
        initialView: 'topdown', // vista vertical
        obliquePitch: 60,    // si usas 'oblique'
        showOsmBuildings: false,
        hideBaseBuildings: true,
      }, customBuildings)
      }}
    />
  );
}
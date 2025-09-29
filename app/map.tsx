// app/map.tsx
import * as Location from 'expo-location';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import type { WebView as WebViewType } from 'react-native-webview';
import { WebView } from 'react-native-webview';

import { ITO_CAMPUS_FC } from '@/components/buildings/ito-campus-mask'; // Polígono del campus para la máscara
import campus from '../assets/geo/campus.json'; // Solo para center de respaldo

// Catálogo y utilidades de categorías
import {
  allCategories,
  defaultVisibility,
  mergeBuildings,
  type BuildingCategory,
} from '../components/buildings';

import MapNavbar from '../components/MapNavbar';
import { htmlPage } from '../lib/htmlPage';

type Center = { lng: number; lat: number };
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

  // ====== Config inicial (solo primer render del mapa) ======
  const INITIAL_VIEW_INIT: InitialView = 'topdown';
  const MASK_OUTSIDE_INIT = false;
  const ARROW_COLOR_INIT = '#2563eb';

  // ====== Estado controlado por la navbar ======
  const [initialView, setInitialView] = useState<InitialView>(INITIAL_VIEW_INIT);
  const [arrowColor, setArrowColor] = useState<string>(ARROW_COLOR_INIT);
  const [maskOutside, setMaskOutside] = useState<boolean>(MASK_OUTSIDE_INIT);

  // ====== NUEVO: pitch / bearing ======
  const [pitch, setPitch] = useState<number>(0);      // 0–85
  const [bearing, setBearing] = useState<number>(0);  // 0–360

  // ====== Visibilidad por categorías ======
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
        // flags de estilo y labels
        showBasemapLabels: false,
        showCampusLabel: false,
      },
      visibleBuildings
    );
  }, [center, visibleBuildings]);

  const webSource = useMemo(() => ({ html: initialHtml }), [initialHtml]);

  // ====== Push dinámico de datos al WebView (sin recargar) ======

  // 1) Enviar edificios visibles cuando cambien las categorías
  useEffect(() => {
    const msg = JSON.stringify({ type: 'set-buildings', payload: visibleBuildings });
    webRef.current?.postMessage(msg);
  }, [visibleBuildings]);

  // 2) Enviar flags cuando cambien
  useEffect(() => {
    const flags = { maskOutside };
    webRef.current?.postMessage(JSON.stringify({ type: 'set-flags', payload: flags }));
    webRef.current?.injectJavaScript(
      `try{ if(window.setMaskOutside) window.setMaskOutside(${maskOutside}); }catch(e){}; true;`
    );
  }, [maskOutside]);

  // ====== Handlers ======
  const handleChangeArrowColor = (hex: string) => {
    setArrowColor(hex);
    webRef.current?.injectJavaScript(`try{ if(window.setArrowColor) window.setArrowColor(${JSON.stringify(hex)}); }catch(e){}; true;`);
  };

  const handleToggleMaskOutside = (value: boolean) => {
    setMaskOutside(value);
  };

  // NUEVO: handlers pitch/bearing (como pediste)
  const handleChangePitch = (v: number) => {
    setPitch(v);
    webRef.current?.injectJavaScript(`try{ if(window.setPitch) window.setPitch(${Math.round(v)}); }catch(e){}; true;`);
  };

  const handleChangeBearing = (v: number) => {
    setBearing(v);
    webRef.current?.injectJavaScript(`try{ if(window.setBearing) window.setBearing(${Math.round(v)}); }catch(e){}; true;`);
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
        // Vista (con inyección inline como solicitaste)
        initialView={initialView}
        onChangeInitialView={(view) => {
          setInitialView(view);
          webRef.current?.injectJavaScript(
            `try{ if(window.setInitialView) window.setInitialView(${JSON.stringify(view)}); }catch(e){}; true;`
          );
        }}

        // Sliders de vista
        pitchValue={pitch}
        onChangePitch={handleChangePitch}
        bearingValue={bearing}
        onChangeBearing={handleChangeBearing}

        // Flecha
        arrowColor={arrowColor}
        onChangeArrowColor={handleChangeArrowColor}

        // Visibilidad
        maskOutside={maskOutside}
        onToggleMaskOutside={handleToggleMaskOutside}

        // Categorías
        categories={categories}
        categoryVisibility={catVis}
        onToggleCategory={(c: BuildingCategory, v: boolean) =>
          setCatVis(prev => ({ ...prev, [c]: v }))
        }
      />
    </>
  );
}
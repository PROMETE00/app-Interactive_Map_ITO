import * as Location from 'expo-location';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, View, StyleSheet, TouchableOpacity } from 'react-native';
import type { WebView as WebViewType } from 'react-native-webview';
import { WebView } from 'react-native-webview';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { ITO_CAMPUS_FC } from '@/components/buildings/ito-campus-mask';
import MapNavbar from '@/components/MapNavbar';
import WelcomeModal from '@/components/WelcomeModal';
import { htmlPage } from '@/lib/htmlPage';
import { useMapState } from '@/hooks/useMapState';

function withTimeout<T>(p: Promise<T>, ms: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const id = setTimeout(() => reject(new Error('timeout')), ms);
    p.then((v) => { clearTimeout(id); resolve(v); })
     .catch((e) => { clearTimeout(id); reject(e); });
  });
}

export default function MapScreen() {
  const { selectedId } = useLocalSearchParams<{ selectedId: string }>();
  const webRef = useRef<WebViewType>(null);

  const {
    center,
    visibleBuildings,
    selectedBuildingId,
    categoryVisibility,
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
    setInitialView,
    setPitch,
    setBearing,
    setZoom,
    setArrowColor,
    setMaskOutside,
    setFollowUser,
    setUserLocation,
    setUserHeading,
    toggleFirstPerson,
  } = useMapState();

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

          if (pos && !cancelled) {
            setUserLocation({ lng: pos.coords.longitude, lat: pos.coords.latitude });
            if (pos.coords.heading !== null) setUserHeading(pos.coords.heading);
          }

          sub = await Location.watchPositionAsync(
            { accuracy: Location.Accuracy.BestForNavigation, timeInterval: 1000, distanceInterval: 1 },
            (loc) => {
              const lng = loc.coords.longitude;
              const lat = loc.coords.latitude;
              const h = Number.isFinite(loc.coords.heading) ? (loc.coords.heading as number) : 0;

              setUserLocation({ lng, lat });
              setUserHeading(h);

              const js = `
                (function(){
                  if (window.__MAP_READY__ && window.updatePlayer) {
                    window.updatePlayer(${lng.toFixed(6)}, ${lat.toFixed(6)}, ${h.toFixed(1)});
                  }
                })();
                true;`;
              webRef.current?.injectJavaScript(js);
            }
          );
        }
      } catch (e) {
        console.warn('Location error:', e);
      }
    })();

    return () => { cancelled = true; sub?.remove(); };
  }, []);

  // Seleccionar edificio si viene por query params
  useEffect(() => {
    if (selectedId) {
      selectBuilding(selectedId);
    }
  }, [selectedId, selectBuilding]);

  // HTML inicial del WebView
  const initialHtml = useMemo(() => {
    return htmlPage(
      center,
      ITO_CAMPUS_FC,
      {
        bufferM: 250,
        basemap: 'voyager',
        panMode: 'soft',
        softExtraM: 500,
        maskOutside: maskOutside,
        initialView: initialView,
        obliquePitch: isFirstPerson ? 80 : 60,
        showOsmBuildings: false,
        arrowColor: arrowColor,
        vertexOrder: 'cw',
        floorHeightM: 3.2,
        showBasemapLabels: false,
        showCampusLabel: false,
      },
      visibleBuildings
    );
  }, [center]);

  const webSource = useMemo(() => ({ html: initialHtml }), [initialHtml]);

  // Push dinámico de datos al WebView
  useEffect(() => {
    webRef.current?.postMessage(JSON.stringify({ type: 'set-buildings', payload: visibleBuildings }));
  }, [visibleBuildings]);

  useEffect(() => {
    webRef.current?.injectJavaScript(`try{ if(window.setMaskOutside) window.setMaskOutside(${maskOutside}); }catch(e){}; true;`);
  }, [maskOutside]);

  useEffect(() => {
    webRef.current?.injectJavaScript(`try{ if(window.setArrowColor) window.setArrowColor(${JSON.stringify(arrowColor)}); }catch(e){}; true;`);
  }, [arrowColor]);

  useEffect(() => {
    webRef.current?.injectJavaScript(`try{ if(window.setPitch) window.setPitch(${Math.round(pitch)}); }catch(e){}; true;`);
  }, [pitch]);

  useEffect(() => {
    webRef.current?.injectJavaScript(`try{ if(window.setBearing) window.setBearing(${Math.round(bearing)}); }catch(e){}; true;`);
  }, [bearing]);

  useEffect(() => {
    webRef.current?.injectJavaScript(`try{ if(window.setInitialView) window.setInitialView(${JSON.stringify(initialView)}); }catch(e){}; true;`);
  }, [initialView]);

  useEffect(() => {
    webRef.current?.injectJavaScript(`try{ if(window.setFollowUser) window.setFollowUser(${followUser}); }catch(e){}; true;`);
  }, [followUser]);

  // Sincronizar selección de edificio con el WebView y Ruta
  useEffect(() => {
    if (selectedBuildingId) {
      const b = visibleBuildings.find(b => b.id === selectedBuildingId);
      if (b && b.polygon && b.polygon.length > 0) {
        const lng = b.polygon[0][0];
        const lat = b.polygon[0][1];
        const targetZoom = isFirstPerson ? 20 : 19;
        const targetPitch = isFirstPerson ? 80 : 65;
        
        webRef.current?.injectJavaScript(`
          try {
            if (window.flyTo) {
              window.flyTo(${Number(lng)}, ${Number(lat)}, ${targetZoom}, ${targetPitch}, 0);
            }
            if (window.updateRouteLine && ${!!userLocation}) {
              window.updateRouteLine(${Number(userLocation?.lng)}, ${Number(userLocation?.lat)}, ${Number(lng)}, ${Number(lat)});
            }
          } catch(e) {}
          true;
        `);
      }
    } else {
      webRef.current?.injectJavaScript(`try{ if(window.clearRouteLine) window.clearRouteLine(); }catch(e){}; true;`);
    }
  }, [selectedBuildingId, isFirstPerson, userLocation]);

  return (
    <View style={{ flex: 1 }}>
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

      {/* Botones de ajuste rápidos Nativo */}
      <View style={styles.floatingControls}>
        <TouchableOpacity 
          style={StyleSheet.flatten([styles.floatingButton, followUser && styles.buttonActive])}
          onPress={() => setFollowUser(!followUser)}
        >
          <Ionicons name="locate" size={24} color={followUser ? "#fff" : "#1f2937"} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={StyleSheet.flatten([styles.floatingButton, isFirstPerson && styles.buttonActive])}
          onPress={toggleFirstPerson}
        >
          <Ionicons name="person" size={24} color={isFirstPerson ? "#fff" : "#1f2937"} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.floatingButton}
          onPress={() => { setPitch(0); setBearing(0); }}
        >
          <Ionicons name="compass" size={24} color="#1f2937" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.floatingButton}
          onPress={() => setInitialView(initialView === 'topdown' ? 'oblique' : 'topdown')}
        >
          <Ionicons name={initialView === 'topdown' ? 'cube-outline' : 'map-outline'} size={24} color="#1f2937" />
        </TouchableOpacity>
      </View>

      <MapNavbar
        initialView={initialView}
        onChangeInitialView={setInitialView}
        pitchValue={pitch}
        onChangePitch={setPitch}
        bearingValue={bearing}
        onChangeBearing={setBearing}
        arrowColor={arrowColor}
        onChangeArrowColor={setArrowColor}
        maskOutside={maskOutside}
        onToggleMaskOutside={setMaskOutside}
        categories={allCategories}
        categoryVisibility={categoryVisibility}
        onToggleCategory={toggleCategory}
      />

      <WelcomeModal />
    </View>
  );
}

const styles = StyleSheet.create({
  floatingControls: {
    position: 'absolute',
    right: 12,
    top: 60,
    zIndex: 100,
    gap: 10,
  },
  floatingButton: {
    width: 48,
    height: 48,
    backgroundColor: '#fff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonActive: {
    backgroundColor: '#2563eb',
  }
});

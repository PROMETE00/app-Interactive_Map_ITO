import React, { useEffect } from 'react';
import { View, StyleSheet, useWindowDimensions, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import MapWeb from '@/components/MapWeb';
import SidebarWeb from '@/components/SidebarWeb';
import MapNavbar from '@/components/MapNavbar';
import MobileSearch from '@/components/MobileSearch';
import WelcomeModal from '@/components/WelcomeModal';
import { useMapState } from '@/hooks/useMapState';
import { Ionicons } from '@expo/vector-icons';

export default function MapScreenWeb() {
  const { width, height } = useWindowDimensions();
  const isMobile = width < 768;
  const { selectedId } = useLocalSearchParams<{ selectedId: string }>();
  
  const {
    center, visibleBuildings, selectedBuildingId, categoryVisibility,
    allCategories, pitch, bearing, zoom, initialView, arrowColor,
    maskOutside, followUser, userLocation, userHeading, isFirstPerson,
    toggleCategory, selectBuilding, setInitialView, setPitch, setBearing,
    setZoom, setArrowColor, setMaskOutside, setFollowUser, setUserLocation,
    setUserHeading, toggleFirstPerson,
  } = useMapState();

  // Geolocalización en Navegador
  useEffect(() => {
    if (typeof window !== 'undefined' && navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (pos) => {
          setUserLocation({ lng: pos.coords.longitude, lat: pos.coords.latitude });
          if (pos.coords.heading !== null) setUserHeading(pos.coords.heading);
        },
        (err) => console.warn(err),
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, []);

  useEffect(() => {
    if (selectedId) selectBuilding(selectedId);
  }, [selectedId, selectBuilding]);

  // Si estamos en primera persona, OCULTAMOS el sidebar para inmersión total (quitar botones izquierda)
  const showSidebar = !isMobile && !isFirstPerson;

  return (
    <View style={[styles.container, { height, width }]}>
      <WelcomeModal />
      
      {showSidebar && (
        <SidebarWeb 
          onSelectBuilding={selectBuilding}
          selectedBuildingId={selectedBuildingId}
          categoryVisibility={categoryVisibility}
          onToggleCategory={toggleCategory}
        />
      )}
      
      <View style={styles.mapArea}>
        {isMobile && !isFirstPerson && <MobileSearch onSelectBuilding={selectBuilding} />}
        
        {/* Botones de ajuste rápidos - Pulidos */}
        <View style={styles.floatingControls}>
          <TouchableOpacity 
            style={[styles.floatingButton, followUser && styles.buttonActive]}
            onPress={() => setFollowUser(!followUser)}
          >
            <Ionicons name="locate" size={24} color={followUser ? "#fff" : "#1f2937"} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.floatingButton, isFirstPerson && styles.buttonActive]}
            onPress={toggleFirstPerson}
          >
            <Ionicons name="person" size={24} color={isFirstPerson ? "#fff" : "#1f2937"} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.floatingButton}
            onPress={() => { 
              setPitch(0); 
              setBearing(0); 
              if(isFirstPerson) toggleFirstPerson(); 
            }}
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

        <MapWeb
          center={center}
          buildings={visibleBuildings}
          selectedBuildingId={selectedBuildingId}
          pitch={pitch}
          bearing={bearing}
          zoom={zoom}
          maskOutside={maskOutside}
          userLocation={userLocation}
          userHeading={userHeading}
          followUser={followUser}
          isFirstPerson={isFirstPerson}
        />
        
        {isMobile && !isFirstPerson && (
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
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#fff', flexDirection: 'row', overflow: 'hidden' },
  mapArea: { flex: 1, height: '100%', position: 'relative' },
  floatingControls: { position: 'absolute', right: 12, top: '20%', zIndex: 1000, gap: 10 },
  floatingButton: {
    width: 48, height: 48, backgroundColor: '#fff', borderRadius: 12,
    justifyContent: 'center', alignItems: 'center',
    shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 8, elevation: 5
  },
  buttonActive: { backgroundColor: '#2563eb' }
});

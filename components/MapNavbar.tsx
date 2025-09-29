// components/MapNavbar.tsx
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Pressable, ScrollView, Switch, Text, View } from 'react-native';
import type { BuildingCategory } from './buildings';

type Basemap = 'positron' | 'voyager' | 'dark' | 'osm';
type InitialView = 'topdown' | 'oblique';

type Props = {
  // Vista topdown/oblique
  initialView: InitialView;
  onChangeInitialView: (v: InitialView) => void;

  // Sliders (vertical/horizontal)
  pitchValue: number;                 // grados 0–85
  onChangePitch: (v: number) => void;
  bearingValue: number;               // grados 0–360
  onChangeBearing: (v: number) => void;

  // Color de flecha
  arrowColor: string;
  onChangeArrowColor: (hex: string) => void;

  // opcionales
  basemap?: Basemap;
  onChangeBasemap?: (b: Basemap) => void;

  // máscara exterior
  maskOutside: boolean;
  onToggleMaskOutside: (v: boolean) => void;

  // categorías
  categories: BuildingCategory[];
  categoryVisibility: Record<BuildingCategory, boolean>;
  onToggleCategory: (c: BuildingCategory, v: boolean) => void;
};

const DARK_BG = '#111827';
const DARK_PANEL = '#1f2937';
const TEXT = '#e5e7eb';
const ACCENT = '#60a5fa';
const MUTED = '#374151';

const ARROW_PALETTE = ['#2563eb','#22c55e','#ef4444','#f59e0b','#06b6d4','#a855f7','#111827'];
const VIEWS: InitialView[] = ['topdown','oblique'];

export default function MapNavbar({
  initialView, onChangeInitialView,
  pitchValue, onChangePitch,
  bearingValue, onChangeBearing,
  arrowColor, onChangeArrowColor,
  maskOutside, onToggleMaskOutside,
  categories, categoryVisibility, onToggleCategory,
}: Props) {
  const [panel, setPanel] = useState<null | 'view' | 'color' | 'visibility'>(null);
  const visScrollRef = useRef<ScrollView>(null);

  // ====== Icon button ======
  const IconBtn = ({
    onPress,
    active,
    children,
    label,
  }: {
    onPress: () => void;
    active?: boolean;
    children: React.ReactNode;
    label: string;
  }) => (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => ({
        width: 44, height: 44, borderRadius: 12,
        alignItems: 'center', justifyContent: 'center',
        backgroundColor: pressed ? '#0b1220' : 'rgba(255,255,255,0.06)',
        borderWidth: active ? 2 : 1,
        borderColor: active ? ACCENT : 'rgba(255,255,255,0.08)',
        marginLeft: 8,
      })}
    >
      {children}
    </Pressable>
  );

  // ====== Color chip ======
  const ColorDot = ({ color, active, onPress }: { color: string; active: boolean; onPress: () => void }) => (
    <Pressable
      onPress={onPress}
      style={{
        width: 28, height: 28, borderRadius: 999, marginRight: 10,
        backgroundColor: color, borderWidth: active ? 3 : 1,
        borderColor: active ? ACCENT : 'rgba(255,255,255,0.25)',
      }}
    />
  );

  // ====== Switch row ======
  const SwitchRow = ({
    label, value, onValueChange,
  }: { label: string; value: boolean; onValueChange: (v: boolean) => void }) => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 6,
        marginBottom: 6,
      }}
    >
      <Text style={{ color: TEXT, fontWeight: '700', marginRight: 10 }}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: MUTED, true: ACCENT }}
        thumbColor={value ? '#0b1220' : '#9ca3af'}
      />
    </View>
  );

  // ====== Segmented toggle (Topdown / Oblique) con animación ======
  const segWidth = 180;
  const segHeight = 36;
  const segmentAnim = useRef(new Animated.Value(initialView === 'oblique' ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(segmentAnim, {
      toValue: initialView === 'oblique' ? 1 : 0,
      duration: 180,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [initialView, segmentAnim]);

  const thumbTranslate = segmentAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [2, segWidth / 2 + 2], // 2px de padding interno
  });

  const SegmentedToggle = () => (
    <View
      style={{
        width: segWidth, height: segHeight, borderRadius: 999,
        backgroundColor: MUTED, position: 'relative', overflow: 'hidden',
        borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)',
      }}
    >
      <Animated.View
        style={{
          position: 'absolute',
          top: 2,
          left: 0,
          width: segWidth / 2 - 4,
          height: segHeight - 4,
          borderRadius: 999,
          backgroundColor: ACCENT,
          transform: [{ translateX: thumbTranslate }],
          shadowColor: '#000',
          shadowOpacity: 0.25,
          shadowRadius: 6,
          shadowOffset: { width: 0, height: 3 },
        }}
      />
      <View style={{ flexDirection: 'row', width: '100%', height: '100%' }}>
        <Pressable
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          onPress={() => onChangeInitialView('topdown')}
        >
          <Text
            style={{
              color: initialView === 'topdown' ? '#0b1220' : TEXT,
              fontWeight: '800',
            }}
          >
            topdown
          </Text>
        </Pressable>
        <Pressable
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          onPress={() => onChangeInitialView('oblique')}
        >
          <Text
            style={{
              color: initialView === 'oblique' ? '#0b1220' : TEXT,
              fontWeight: '800',
            }}
          >
            oblique
          </Text>
        </Pressable>
      </View>
    </View>
  );

  // ====== Etiqueta pequeña para sliders ======
  const Tiny = ({ children }: { children: React.ReactNode }) => (
    <Text style={{ color: '#cbd5e1', fontSize: 12, marginBottom: 4 }}>{children}</Text>
  );

  return (
    <View
      style={{
        position: 'absolute',
        left: 0, right: 0, bottom: 0,
        pointerEvents: 'box-none',
      }}
    >
      {/* PANEL inline */}
      {panel && (
        <>
          <Pressable
            onPress={() => setPanel(null)}
            style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 72 }}
          />
          <View
            style={{
              position: 'absolute',
              right: 12,
              bottom: 72 + 8,
              minWidth: 280,
              maxWidth: 380,
              borderRadius: 14,
              backgroundColor: DARK_PANEL,
              padding: 12,
              shadowColor: '#000',
              shadowOpacity: 0.3,
              shadowRadius: 12,
              shadowOffset: { width: 0, height: 6 },
              elevation: 10,
            }}
          >
            {panel === 'view' && (
              <View>
                <Text style={{ color: TEXT, fontWeight: '800', marginBottom: 10 }}>Vista</Text>

                {/* Toggle topdown/oblique */}
                <View style={{ alignItems: 'center', marginBottom: 14 }}>
                  <SegmentedToggle />
                </View>

                {/* Sliders */}
                <View style={{ marginBottom: 12 }}>
                  <Tiny>Inclinación (vertical / pitch): {Math.round(pitchValue)}°</Tiny>
                  <Slider
                    minimumValue={0}
                    maximumValue={85}
                    step={1}
                    value={pitchValue}
                    onValueChange={(v: number) => onChangePitch(v)}
                    minimumTrackTintColor={ACCENT}
                    maximumTrackTintColor="#4b5563"
                    thumbTintColor="#0b1220"
                  />
                </View>

                <View style={{ marginBottom: 4 }}>
                  <Tiny>Giro (horizontal / bearing): {Math.round(bearingValue)}°</Tiny>
                  <Slider
                    minimumValue={0}
                    maximumValue={360}
                    step={1}
                    value={bearingValue}
                    onValueChange={(v: number) => onChangeBearing(v)}
                    minimumTrackTintColor={ACCENT}
                    maximumTrackTintColor="#4b5563"
                    thumbTintColor="#0b1220"
                  />
                </View>
              </View>
            )}

            {panel === 'color' && (
              <>
                <Text style={{ color: TEXT, fontWeight: '800', marginBottom: 8 }}>Color de flecha</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {ARROW_PALETTE.map((c) => (
                    <ColorDot
                      key={c}
                      color={c}
                      active={arrowColor.toLowerCase() === c.toLowerCase()}
                      onPress={() => { onChangeArrowColor(c); setPanel(null); }}
                    />
                  ))}
                </ScrollView>
              </>
            )}

            {panel === 'visibility' && (
              <ScrollView
                ref={visScrollRef}
                showsVerticalScrollIndicator={true}
                style={{ maxHeight: 360 }}
                contentContainerStyle={{ paddingBottom: 6 }}
              >
                <Text style={{ color: TEXT, fontWeight: '800', marginBottom: 12 }}>Visibilidad</Text>

                {/* Máscara del exterior */}
                <SwitchRow
                  label="Enmascarar fuera del campus"
                  value={maskOutside}
                  onValueChange={(v) => onToggleMaskOutside(v)}
                />

                <View style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.08)', marginVertical: 10 }} />

                {/* Categorías con Switch */}
                {categories.map((cat: BuildingCategory) => {
                  const on = !!categoryVisibility[cat];
                  return (
                    <SwitchRow
                      key={String(cat)}
                      label={String(cat)}
                      value={on}
                      onValueChange={(v) => onToggleCategory(cat, v)}
                    />
                  );
                })}
              </ScrollView>
            )}
          </View>
        </>
      )}

      {/* BARRA */}
      <View
        pointerEvents="auto"
        style={{
          margin: 12,
          height: 56,
          borderRadius: 16,
          backgroundColor: DARK_BG,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 8,
          justifyContent: 'flex-end',
          shadowColor: '#000',
          shadowOpacity: 0.25,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 6 },
          elevation: 8,
        }}
      >
        <IconBtn
          label="Vista"
          active={panel === 'view'}
          onPress={() => setPanel(panel === 'view' ? null : 'view')}
        >
          {/* Cambiado a brújula */}
          <Ionicons name="compass-outline" size={24} color={panel === 'view' ? ACCENT : TEXT} />
        </IconBtn>

        <IconBtn
          label="Color de flecha"
          active={panel === 'color'}
          onPress={() => setPanel(panel === 'color' ? null : 'color')}
        >
          <Ionicons name="navigate-outline" size={24} color={panel === 'color' ? ACCENT : TEXT} />
        </IconBtn>

        <IconBtn
          label="Visibilidad"
          active={panel === 'visibility'}
          onPress={() => setPanel(panel === 'visibility' ? null : 'visibility')}
        >
          <Ionicons name="eye-outline" size={24} color={panel === 'visibility' ? ACCENT : TEXT} />
        </IconBtn>
      </View>
    </View>
  );
}
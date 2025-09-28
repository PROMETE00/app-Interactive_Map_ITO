import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import type { BuildingCategory } from './buildings'; // ajusta la ruta si tu index está en otro lado

type Basemap = 'positron' | 'voyager' | 'dark' | 'osm';
type PanMode = 'free' | 'locked' | 'soft';
type InitialView = 'topdown' | 'oblique';

type Props = {
  panMode: PanMode;
  onChangePanMode: (v: PanMode) => void;

  initialView: InitialView;
  onChangeInitialView: (v: InitialView) => void;

  arrowColor: string;
  onChangeArrowColor: (hex: string) => void;

  // opcionales ya existentes por si luego los usas
  basemap?: Basemap;
  onChangeBasemap?: (b: Basemap) => void;

  // switches existentes
  showOsmBuildings: boolean;
  onToggleOsmBuildings: (v: boolean) => void;

  maskOutside: boolean;
  onToggleMaskOutside: (v: boolean) => void;

  // NUEVO: control de categorías
  categories: BuildingCategory[];
  categoryVisibility: Record<BuildingCategory, boolean>;
  onToggleCategory: (c: BuildingCategory, v: boolean) => void;
  onSoloCategory: (c: BuildingCategory) => void;
  onShowAll: () => void;
  onHideAll: () => void;
};

const DARK_BG = '#111827'; // gris muy oscuro
const DARK_PANEL = '#1f2937'; // panel un pelín más claro
const TEXT = '#e5e7eb';
const ACCENT = '#60a5fa';

const ARROW_PALETTE = ['#2563eb','#22c55e','#ef4444','#f59e0b','#06b6d4','#a855f7','#111827'];
const PAN_MODES: PanMode[] = ['free','soft','locked'];
const VIEWS: InitialView[] = ['topdown','oblique'];

export default function MapNavbar({
  panMode, onChangePanMode,
  initialView, onChangeInitialView,
  arrowColor, onChangeArrowColor,
  showOsmBuildings, onToggleOsmBuildings,
  maskOutside, onToggleMaskOutside,
  categories, categoryVisibility, onToggleCategory,
  onSoloCategory, onShowAll, onHideAll,
}: Props) {
  const [panel, setPanel] = useState<null | 'pan' | 'view' | 'color' | 'layers'>(null);

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

  const Pill = ({
    label, active, onPress,
  }: { label: string; active: boolean; onPress: () => void }) => (
    <Pressable
      onPress={onPress}
      style={{
        paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999,
        backgroundColor: active ? ACCENT : '#374151',
        marginRight: 8,
      }}
    >
      <Text style={{ color: active ? '#0b1220' : TEXT, fontWeight: '700' }}>{label}</Text>
    </Pressable>
  );

  const SmallBtn = ({ label, onPress }: { label: string; onPress: () => void }) => (
    <Pressable
      onPress={onPress}
      style={{
        paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999,
        backgroundColor: '#374151', marginLeft: 6,
        borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)',
      }}
    >
      <Text style={{ color: TEXT, fontWeight: '700' }}>{label}</Text>
    </Pressable>
  );

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

  // Dos opciones ON/OFF en fila
  const ToggleRow = ({
    label, value, onChange,
  }: { label: string; value: boolean; onChange: (v: boolean) => void }) => (
    <View style={{ marginBottom: 12 }}>
      <Text style={{ color: TEXT, fontWeight: '800', marginBottom: 8 }}>{label}</Text>
      <View style={{ flexDirection: 'row' }}>
        <Pill label="ON" active={value === true} onPress={() => onChange(true)} />
        <Pill label="OFF" active={value === false} onPress={() => onChange(false)} />
      </View>
    </View>
  );

  // Panel flotante
  const Panel = () => {
    if (!panel) return null;

    return (
      <>
        {/* Cierra al tocar fuera del panel */}
        <Pressable
          onPress={() => setPanel(null)}
          style={{
            position: 'absolute', left: 0, right: 0,
            top: 0, bottom: 72,
          }}
        />

        <View
          style={{
            position: 'absolute',
            right: 12,
            bottom: 72 + 8,
            minWidth: 260,
            maxWidth: 360,
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
          {panel === 'pan' && (
            <>
              <Text style={{ color: TEXT, fontWeight: '800', marginBottom: 8 }}>Modo panorámico</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {PAN_MODES.map(m => (
                  <Pill
                    key={m}
                    label={m}
                    active={panMode === m}
                    onPress={() => { onChangePanMode(m); setPanel(null); }}
                  />
                ))}
              </ScrollView>
            </>
          )}

          {panel === 'view' && (
            <>
              <Text style={{ color: TEXT, fontWeight: '800', marginBottom: 8 }}>Vista</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {VIEWS.map(v => (
                  <Pill
                    key={v}
                    label={v}
                    active={initialView === v}
                    onPress={() => { onChangeInitialView(v); setPanel(null); }}
                  />
                ))}
              </ScrollView>
            </>
          )}

          {panel === 'color' && (
            <>
              <Text style={{ color: TEXT, fontWeight: '800', marginBottom: 8 }}>Color de flecha</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {ARROW_PALETTE.map(c => (
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

          {panel === 'layers' && (
            <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 360 }}>
              <Text style={{ color: TEXT, fontWeight: '800', marginBottom: 12 }}>Capas</Text>

              {/* Toggles del mapa base */}
              <ToggleRow
                label="Edificios OSM"
                value={showOsmBuildings}
                onChange={(v) => { onToggleOsmBuildings(v); }}
              />
              <ToggleRow
                label="Enmascarar fuera del campus"
                value={maskOutside}
                onChange={(v) => { onToggleMaskOutside(v); }}
              />

              {/* Categorías personalizadas */}
              <View style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.08)', marginVertical: 10 }} />
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8, flexWrap: 'wrap' }}>
                <Text style={{ color: TEXT, fontWeight: '800', marginRight: 8 }}>Categorías</Text>
                <SmallBtn label="Todos" onPress={onShowAll} />
                <SmallBtn label="Ninguno" onPress={onHideAll} />
              </View>

              {categories.map(cat => {
                const on = !!categoryVisibility[cat];
                return (
                  <View
                    key={cat}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingVertical: 6,
                    }}
                  >
                    <Text style={{ color: TEXT, fontWeight: '700', marginRight: 10 }}>{cat}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Pill label="ON" active={on} onPress={() => onToggleCategory(cat, true)} />
                      <Pill label="OFF" active={!on} onPress={() => onToggleCategory(cat, false)} />
                      <SmallBtn label="SOLO" onPress={() => onSoloCategory(cat)} />
                    </View>
                  </View>
                );
              })}
            </ScrollView>
          )}
        </View>
      </>
    );
  };

  return (
    <View
      style={{
        position: 'absolute',
        left: 0, right: 0, bottom: 0,
        pointerEvents: 'box-none',
      }}
    >
      <Panel />

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
          label="Modo panorámico"
          active={panel === 'pan'}
          onPress={() => setPanel(panel === 'pan' ? null : 'pan')}
        >
          <MaterialCommunityIcons name="cursor-move" size={24} color={panel === 'pan' ? ACCENT : TEXT} />
        </IconBtn>

        <IconBtn
          label="Vista"
          active={panel === 'view'}
          onPress={() => setPanel(panel === 'view' ? null : 'view')}
        >
          <Ionicons name="cube-outline" size={24} color={panel === 'view' ? ACCENT : TEXT} />
        </IconBtn>

        <IconBtn
          label="Color de flecha"
          active={panel === 'color'}
          onPress={() => setPanel(panel === 'color' ? null : 'color')}
        >
          <Ionicons name="color-palette-outline" size={24} color={panel === 'color' ? ACCENT : TEXT} />
        </IconBtn>

        <IconBtn
          label="Capas"
          active={panel === 'layers'}
          onPress={() => setPanel(panel === 'layers' ? null : 'layers')}
        >
          <MaterialCommunityIcons name="layers-outline" size={24} color={panel === 'layers' ? ACCENT : TEXT} />
        </IconBtn>
      </View>
    </View>
  );
}
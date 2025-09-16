// components/MapNavbar.tsx
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

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

  basemap?: Basemap;
  onChangeBasemap?: (b: Basemap) => void;
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
}: Props) {
  const [panel, setPanel] = useState<null | 'pan' | 'view' | 'color'>(null);

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

  // Panel flotante (aparece pegado arriba a la derecha de la barra)
  const Panel = () => {
    if (!panel) return null;

    return (
      <>
        {/* Cierra al tocar fuera del panel */}
        <Pressable
          onPress={() => setPanel(null)}
          style={{
            position: 'absolute', left: 0, right: 0,
            top: 0, bottom: 72, // evita tapar la barra
          }}
        />

        <View
          style={{
            position: 'absolute',
            right: 12,
            bottom: 72 + 8, // 8px de separación por encima de la barra
            minWidth: 220,
            maxWidth: 320,
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
        </View>
      </>
    );
  };

  return (
    <View
      style={{
        position: 'absolute',
        left: 0, right: 0, bottom: 0,
        // contenedor deja pasar taps salvo en sus hijos
        pointerEvents: 'box-none',
      }}
    >
      <Panel />

      <View
        // la barra sí recibe los toques
        pointerEvents="auto"
        style={{
          margin: 12,
          height: 56,
          borderRadius: 16,
          backgroundColor: DARK_BG,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 8,
          // alinear iconos a la derecha para que el panel quede coherente
          justifyContent: 'flex-end',
          shadowColor: '#000',
          shadowOpacity: 0.25,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 6 },
          elevation: 8,
        }}
      >
        {/* Iconos: solo iconos, sin texto */}
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
      </View>
    </View>
  );
}
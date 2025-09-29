// components/MapNavbar.tsx
import { Ionicons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import { Pressable, ScrollView, Switch, Text, View } from 'react-native';
import type { BuildingCategory } from './buildings'; // ajusta la ruta si aplica

type Basemap = 'positron' | 'voyager' | 'dark' | 'osm';
type InitialView = 'topdown' | 'oblique';

type Props = {
  // (Se eliminó el control de "modo panorámico")

  initialView: InitialView;
  onChangeInitialView: (v: InitialView) => void;

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

const ARROW_PALETTE = ['#2563eb','#22c55e','#ef4444','#f59e0b','#06b6d4','#a855f7','#111827'];
const VIEWS: InitialView[] = ['topdown','oblique'];

export default function MapNavbar({
  initialView, onChangeInitialView,
  arrowColor, onChangeArrowColor,
  maskOutside, onToggleMaskOutside,
  categories, categoryVisibility, onToggleCategory,
}: Props) {
  const [panel, setPanel] = useState<null | 'view' | 'color' | 'visibility'>(null);
  const visScrollRef = useRef<ScrollView>(null);

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
        trackColor={{ false: '#374151', true: ACCENT }}
        thumbColor={value ? '#0b1220' : '#9ca3af'}
      />
    </View>
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
                {categories.map(cat => {
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
          <Ionicons name="cube-outline" size={24} color={panel === 'view' ? ACCENT : TEXT} />
        </IconBtn>

        {/* Icono de flecha para el color de flecha */}
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
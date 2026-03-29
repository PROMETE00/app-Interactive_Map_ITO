import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { BuildingDef } from './buildings/types';
import { BuildingCategory, buildingCatalog, allCategories } from './buildings';

interface SidebarWebProps {
  onSelectBuilding: (id: string) => void;
  categoryVisibility: Record<BuildingCategory, boolean>;
  onToggleCategory: (category: BuildingCategory, visible: boolean) => void;
}

export default function SidebarWeb({
  onSelectBuilding,
  categoryVisibility,
  onToggleCategory,
}: SidebarWebProps) {
  const [search, setSearch] = useState('');

  // Obtener todos los edificios para la búsqueda
  const allBuildings = useMemo(() => {
    const list: BuildingDef[] = [];
    Object.values(buildingCatalog).forEach(buildings => {
      list.push(...buildings);
    });
    // Eliminar duplicados por ID
    return Array.from(new Map(list.map(b => [b.id, b])).values());
  }, []);

  const filteredBuildings = useMemo(() => {
    if (!search) return [];
    return allBuildings.filter(b => 
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.id.toLowerCase().includes(search.toLowerCase())
    ).slice(0, 10); // Limitar a 10 resultados
  }, [search, allBuildings]);

  return (
    <View style={styles.sidebar}>
      <Text style={styles.title}>Mapa ITO</Text>
      
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar edificio..."
          value={search}
          onChangeText={setSearch}
        />
        {filteredBuildings.length > 0 && (
          <View style={styles.resultsContainer}>
            {filteredBuildings.map(b => (
              <TouchableOpacity 
                key={b.id} 
                style={styles.resultItem}
                onPress={() => {
                  onSelectBuilding(b.id);
                  setSearch('');
                }}
              >
                <Text style={styles.resultText}>{b.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <Text style={styles.sectionTitle}>Categorías</Text>
      <ScrollView style={styles.categoriesList}>
        {allCategories.map(cat => (
          <TouchableOpacity 
            key={cat} 
            style={[
              styles.categoryItem,
              categoryVisibility[cat] && styles.categoryItemActive
            ]}
            onPress={() => onToggleCategory(cat, !categoryVisibility[cat])}
          >
            <Text style={[
              styles.categoryText,
              categoryVisibility[cat] && styles.categoryTextActive
            ]}>
              {cat.replace('Building', '')}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Interactúa con el mapa usando el mouse</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    width: 300,
    height: '100%',
    backgroundColor: '#fff',
    borderRightWidth: 1,
    borderRightColor: '#e5e7eb',
    padding: 20,
    zIndex: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e40af',
    marginBottom: 20,
  },
  searchContainer: {
    marginBottom: 30,
    zIndex: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 10,
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 14,
  },
  resultsContainer: {
    position: 'absolute',
    top: 45,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  resultItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  resultText: {
    fontSize: 14,
    color: '#1f2937',
  },
  categoriesList: {
    flex: 1,
  },
  categoryItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginBottom: 4,
    backgroundColor: '#f9fafb',
  },
  categoryItemActive: {
    backgroundColor: '#dbeafe',
  },
  categoryText: {
    fontSize: 13,
    color: '#4b5563',
  },
  categoryTextActive: {
    color: '#2563eb',
    fontWeight: '600',
  },
  footer: {
    marginTop: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  footerText: {
    fontSize: 12,
    color: '#9ca3af',
    fontStyle: 'italic',
  }
});

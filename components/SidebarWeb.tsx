import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { BuildingDef } from './buildings/types';
import { BuildingCategory, buildingCatalog, categoryGroups } from './buildings';
import { Ionicons } from '@expo/vector-icons';

interface SidebarWebProps {
  onSelectBuilding: (id: string) => void;
  selectedBuildingId?: string | null;
  categoryVisibility: Record<BuildingCategory, boolean>;
  onToggleCategory: (category: BuildingCategory, visible: boolean) => void;
}

export default function SidebarWeb({
  onSelectBuilding,
  selectedBuildingId,
  categoryVisibility,
  onToggleCategory,
}: SidebarWebProps) {
  const [search, setSearch] = useState('');
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    Academico: true,
    Administrativo: true,
    Servicios: true,
    General: false,
  });

  const allBuildings = useMemo(() => {
    const list: BuildingDef[] = [];
    Object.values(buildingCatalog).forEach(buildings => {
      list.push(...buildings);
    });
    return Array.from(new Map(list.map(b => [b.id, b])).values());
  }, []);

  const selectedBuilding = useMemo(() => {
    return allBuildings.find(b => b.id === selectedBuildingId);
  }, [selectedBuildingId, allBuildings]);

  const filteredBuildings = useMemo(() => {
    if (!search) return [];
    return allBuildings.filter(b => 
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.id.toLowerCase().includes(search.toLowerCase())
    ).slice(0, 10);
  }, [search, allBuildings]);

  const toggleGroup = (groupName: string) => {
    setExpandedGroups(prev => ({ ...prev, [groupName]: !prev[groupName] }));
  };

  return (
    <View style={styles.sidebar}>
      <View style={styles.header}>
        <Ionicons name="map" size={28} color="#1e40af" />
        <Text style={styles.title}>Mapa ITO</Text>
      </View>
      
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <Ionicons name="search" size={18} color="#9ca3af" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar área..."
            value={search}
            onChangeText={setSearch}
          />
        </View>
        
        {filteredBuildings.length > 0 && (
          <View style={styles.resultsContainer}>
            {filteredBuildings.map(b => (
              <TouchableOpacity 
                key={b.id} 
                style={StyleSheet.flatten([
                  styles.resultItem,
                  selectedBuildingId === b.id && styles.resultItemActive
                ])}
                onPress={() => {
                  onSelectBuilding(b.id);
                  setSearch('');
                }}
              >
                <Text style={StyleSheet.flatten([
                  styles.resultText,
                  selectedBuildingId === b.id && styles.resultTextActive
                ])}>{b.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {selectedBuilding && (
        <View style={styles.selectionInfo}>
          <View style={styles.selectionHeader}>
            <Ionicons name="location" size={20} color="#2563eb" />
            <Text style={styles.selectionTitle} numberOfLines={1}>{selectedBuilding.name}</Text>
          </View>
          <Text style={styles.selectionDesc}>Sigue la línea punteada azul en el mapa para llegar desde tu ubicación.</Text>
          <TouchableOpacity 
            style={styles.clearButton}
            onPress={() => onSelectBuilding('')}
          >
            <Text style={styles.clearButtonText}>Limpiar Selección</Text>
          </TouchableOpacity>
        </View>
      )}

      <Text style={styles.sectionTitle}>Categorías</Text>
      <ScrollView style={styles.categoriesList} showsVerticalScrollIndicator={false}>
        {Object.entries(categoryGroups).map(([groupName, categories]) => (
          <View key={groupName} style={styles.groupContainer}>
            <TouchableOpacity 
              style={styles.groupHeader}
              onPress={() => toggleGroup(groupName)}
            >
              <Text style={styles.groupTitle}>{groupName}</Text>
              <Ionicons 
                name={expandedGroups[groupName] ? "chevron-down" : "chevron-forward"} 
                size={16} 
                color="#6b7280" 
              />
            </TouchableOpacity>
            
            {expandedGroups[groupName] && (
              <View style={styles.groupContent}>
                {categories.map(cat => (
                  <TouchableOpacity 
                    key={cat} 
                    style={StyleSheet.flatten([
                      styles.categoryItem,
                      categoryVisibility[cat] && styles.categoryItemActive
                    ])}
                    onPress={() => onToggleCategory(cat, !categoryVisibility[cat])}
                  >
                    <Ionicons 
                      name={categoryVisibility[cat] ? "eye" : "eye-off"} 
                      size={14} 
                      color={categoryVisibility[cat] ? "#2563eb" : "#9ca3af"} 
                      style={{ marginRight: 8 }}
                    />
                    <Text style={StyleSheet.flatten([
                      styles.categoryText,
                      categoryVisibility[cat] && styles.categoryTextActive
                    ])}>
                      {cat.replace('Building', '').replace('Buildings', '')}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Tecnológico de Oaxaca</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    width: 320,
    height: '100%',
    backgroundColor: '#fff',
    borderRightWidth: 1,
    borderRightColor: '#e5e7eb',
    padding: 20,
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1e40af',
    marginLeft: 10,
  },
  searchContainer: {
    marginBottom: 20,
    zIndex: 20,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 10,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    height: 44,
    flex: 1,
    fontSize: 14,
    color: '#1f2937',
  },
  selectionInfo: {
    backgroundColor: '#eff6ff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  selectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  selectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1e40af',
    marginLeft: 6,
    flex: 1,
  },
  selectionDesc: {
    fontSize: 12,
    color: '#3b82f6',
    lineHeight: 16,
    marginBottom: 12,
  },
  clearButton: {
    backgroundColor: '#fff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  clearButtonText: {
    fontSize: 12,
    color: '#2563eb',
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#9ca3af',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
  },
  resultsContainer: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    overflow: 'hidden',
  },
  resultItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  resultItemActive: {
    backgroundColor: '#eff6ff',
  },
  resultText: {
    fontSize: 14,
    color: '#1f2937',
  },
  resultTextActive: {
    color: '#2563eb',
    fontWeight: '600',
  },
  categoriesList: {
    flex: 1,
  },
  groupContainer: {
    marginBottom: 12,
  },
  groupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  groupTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4b5563',
  },
  groupContent: {
    paddingTop: 8,
    paddingLeft: 4,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 4,
  },
  categoryItemActive: {
    backgroundColor: '#eff6ff',
  },
  categoryText: {
    fontSize: 13,
    color: '#6b7280',
  },
  categoryTextActive: {
    color: '#1e40af',
    fontWeight: '600',
  },
  footer: {
    marginTop: 10,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 11,
    color: '#d1d5db',
    fontWeight: '500',
  }
});

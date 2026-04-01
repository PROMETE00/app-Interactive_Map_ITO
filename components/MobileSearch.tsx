import React, { useState, useMemo } from 'react';
import { View, TextInput, ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { buildingCatalog } from './buildings';
import { BuildingDef } from './buildings/types';

interface MobileSearchProps {
  onSelectBuilding: (id: string) => void;
}

export default function MobileSearch({ onSelectBuilding }: MobileSearchProps) {
  const [search, setSearch] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const allBuildings = useMemo(() => {
    const list: BuildingDef[] = [];
    Object.values(buildingCatalog).forEach(buildings => {
      list.push(...buildings);
    });
    return Array.from(new Map(list.map(b => [b.id, b])).values());
  }, []);

  const filteredBuildings = useMemo(() => {
    if (!search) return [];
    return allBuildings.filter(b => 
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.id.toLowerCase().includes(search.toLowerCase())
    ).slice(0, 5);
  }, [search, allBuildings]);

  return (
    <View style={styles.container}>
      <View style={StyleSheet.flatten([styles.searchWrapper, isFocused && styles.searchWrapperFocused])}>
        <Ionicons name="search" size={20} color="#9ca3af" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Buscar edificio..."
          value={search}
          onChangeText={setSearch}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Ionicons name="close-circle" size={20} color="#9ca3af" />
          </TouchableOpacity>
        )}
      </View>

      {isFocused && filteredBuildings.length > 0 && (
        <View style={styles.results}>
          <ScrollView keyboardShouldPersistTaps="handled">
            {filteredBuildings.map(b => (
              <TouchableOpacity
                key={b.id}
                style={styles.resultItem}
                onPress={() => {
                  onSelectBuilding(b.id);
                  setSearch('');
                  setIsFocused(false);
                }}
              >
                <Text style={styles.resultText}>{b.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    left: 12,
    right: 12,
    zIndex: 1000,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  searchWrapperFocused: {
    borderWidth: 1,
    borderColor: '#2563eb',
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1f2937',
  },
  results: {
    marginTop: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    maxHeight: 250,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
  },
  resultItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  resultText: {
    fontSize: 15,
    color: '#1f2937',
  },
});

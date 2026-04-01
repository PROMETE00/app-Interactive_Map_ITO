import React, { useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { buildingCatalog } from '@/components/buildings';
import { Ionicons } from '@expo/vector-icons';

export default function Departments() {
  const router = useRouter();

  const departments = useMemo(() => {
    return buildingCatalog.Departamentos;
  }, []);

  const handleSelect = (id: string) => {
    // Aquí podríamos guardar el ID seleccionado en un store global o pasarlo por query params
    // Por simplicidad en Expo Router, lo pasamos por query params
    router.push({
      pathname: '/map',
      params: { selectedId: id }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1e40af" />
        </TouchableOpacity>
        <Text style={styles.title}>Departamentos</Text>
      </View>

      <FlatList
        data={departments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card}
            onPress={() => handleSelect(item.id)}
          >
            <View style={styles.cardContent}>
              <View style={StyleSheet.flatten([styles.colorBadge, { backgroundColor: item.color || '#9ca3af' }])} />
              <View>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text style={styles.cardSubtitle}>Edificio ID: {item.id}</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1e40af',
  },
  list: {
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorBadge: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
});
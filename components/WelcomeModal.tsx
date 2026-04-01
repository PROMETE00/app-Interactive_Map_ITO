import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function WelcomeModal() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.modal}>
        <View style={styles.iconContainer}>
          <Ionicons name="map" size={40} color="#2563eb" />
        </View>
        <Text style={styles.title}>¡Bienvenido al Mapa Interactivo ITO!</Text>
        <Text style={styles.description}>
          Esta herramienta está diseñada para ayudarte a orientarte dentro del Instituto Tecnológico de Oaxaca. 
          {'\n\n'}
          Podrás ubicar fácilmente departamentos, laboratorios, aulas y servicios. ¡Prueba el nuevo modo de **Primera Persona** para una experiencia inmersiva!
        </Text>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => setVisible(false)}
        >
          <Text style={styles.buttonText}>Comenzar a explorar</Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0, bottom: 0, left: 0, right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    padding: 20,
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 30,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#eff6ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1e40af',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 15,
    color: '#4b5563',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#2563eb',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 16,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginRight: 8,
  },
});

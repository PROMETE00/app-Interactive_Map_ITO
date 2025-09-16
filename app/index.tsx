import { Link } from 'expo-router';
import { Text, View } from 'react-native';

export default function Home() {
  return (
    <View style={{ flex: 1, padding: 16, gap: 12, justifyContent: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: '700' }}>Mapa ITO</Text>
      <Link href="/map" style={{ padding: 12, backgroundColor: '#2563eb', borderRadius: 10, color: 'white' }}>
        Ir al mapa
      </Link>
      <Link href="/departments" style={{ padding: 12, backgroundColor: '#334155', borderRadius: 10, color: 'white' }}>
        Departamentos
      </Link>
    </View>
  );
}
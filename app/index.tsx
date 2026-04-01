import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redireccionamiento forzado inmediato
    router.replace('/map');
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
      <ActivityIndicator size="large" color="#2563eb" />
    </View>
  );
}

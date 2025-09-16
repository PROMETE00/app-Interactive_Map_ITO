// 👈 Reanimated SIEMPRE al inicio
import 'react-native-reanimated';

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

import { useColorScheme } from '@/hooks/useColorScheme';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    // Mantén la splash hasta que carguen las fuentes
    return null;
  }

  const theme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;

  return (
    <ThemeProvider value={theme}>
      {/* Si NO usas (tabs), deja un Stack simple */}
      <Stack screenOptions={{ headerShown: false }}>
        {/* No es obligatorio declarar cada pantalla; Expo Router las detecta por archivos */}
        {/* <Stack.Screen name="index" /> */}
        {/* <Stack.Screen name="map" /> */}
        {/* <Stack.Screen name="departments" /> */}
        {/* <Stack.Screen name="+not-found" /> */}
      </Stack>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </ThemeProvider>
  );
}
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import Toast from 'react-native-toast-message'
import { toastConfig } from '@/components/toastConfig';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  const colorScheme = useColorScheme()
  return (
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{headerShown: false}}>
          <Stack.Screen name='(onboarding)'/>
          <Stack.Screen name='(tenantScreens)'/>
          <Stack.Screen name='(landlordScreens)'/>
          <Stack.Screen name='auth'/>
        </Stack>
        <StatusBar style='auto'/>
        <Toast config={toastConfig}/>
      </ThemeProvider>
    </SafeAreaProvider>
  )
}

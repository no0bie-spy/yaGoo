import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from './hooks/useFrameworkReady';
import { useAuthStore } from './app/stores/auth';

export default function RootLayout() {
  useFrameworkReady();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        )}
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
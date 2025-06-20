import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

export default function Layout() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <StatusBar style="dark" />
        {/* Set up stack navigation */}
        <Stack
          screenOptions={{
            headerShown: false, // hide headers globally
            animation: 'slide_from_right', // smooth screen transitions
          }}
        />
      </PaperProvider>
    </SafeAreaProvider>
  );
}

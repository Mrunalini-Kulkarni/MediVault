import { Stack } from "expo-router";

export default function HospitalLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
      <Stack.Screen name="dashboard" options={{ headerShown: false }} />
      <Stack.Screen name="doctorRecords" options={{ headerShown: false }} />
      <Stack.Screen name="specializations" options={{ headerShown: false }} />
      <Stack.Screen name="patientRecords" options={{ headerShown: false }} />
      <Stack.Screen name="settings" options={{ headerShown: false }} />
    </Stack>
  );
} 
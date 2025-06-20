// app/index.tsx
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View } from 'react-native';

export default function AppEntry() {
  const router = useRouter();

  useEffect(() => {
    const checkLogin = async () => {
      const patientData = await AsyncStorage.getItem('patientData');
      if (patientData) {
        const { name } = JSON.parse(patientData);
        router.replace({ pathname: '/patient', params: { name } });
      } else {
        router.replace('/patient/login');
      }
    };

    checkLogin();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#008080" />
    </View>
  );
}

import { View, Button, Text } from 'react-native';
import { useRouter } from 'expo-router';

export default function PatientHome() {
  const router = useRouter();

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Patient Portal</Text>
      <Button title="Login" onPress={() => router.replace('/patient/login')} />
      <Button title="Register" onPress={() => router.replace('/patient/register')} />
    </View>
  );
}

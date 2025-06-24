import { View, Button, Text } from 'react-native';
import { useRouter } from 'expo-router';

export default function DoctorHome() {
  const router = useRouter();

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Doctor Portal</Text>
      <Button title="Login" onPress={() => router.replace('/doctor/login')} />
      <Button title="Register" onPress={() => router.replace('/doctor/register')} />
    </View>
  );
}

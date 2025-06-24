import { View, Button, Text } from 'react-native';
import { useRouter } from 'expo-router';

export default function DoctorHome() {
  const router = useRouter();

  return (
    <View style={{ padding: 20 }}>
      <Text>Welcome to the Doctor Portal</Text>
      <Button title="Login" onPress={() => router.push('/doctor/login')} />
      <Button title="Register" onPress={() => router.push('/doctor/register')} />
    </View>
  );
}

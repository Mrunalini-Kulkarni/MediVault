import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { mockPatients, PatientData } from "../../data/mockData";

export default function Login() {
  const router = useRouter();

  const [username, setUsername] = useState(""); // email or contact
  const [password, setPassword] = useState("");
  const [step, setStep] = useState<1 | 2>(1);
  const [inputOtp, setInputOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [loggedInUser, setLoggedInUser] = useState<PatientData | null>(null);

  const handleLoginStep1 = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Please enter username and password.");
      return;
    }

    // Load users from AsyncStorage or use mockPatients
    const jsonPatients = await AsyncStorage.getItem("patients");
    const patients: PatientData[] = jsonPatients ? JSON.parse(jsonPatients) : mockPatients;

    const user = patients.find(
      (p) => (p.email === username || p.contact === username) && p.password === password
    );

    if (!user) {
      Alert.alert("Error", "Invalid username or password.");
      return;
    }

    setLoggedInUser(user); // Save the user object

    // Generate OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(otp);
    Alert.alert("OTP Verification", `Your OTP is: ${otp}`);
    setStep(2);
  };

  const handleLoginStep2 = async () => {
    if (inputOtp === generatedOtp) {
      if (loggedInUser) {
        // Store data for auto-login
        await AsyncStorage.setItem("patientData", JSON.stringify(loggedInUser));

        router.push({
          pathname: "/patient",
          params: { name: loggedInUser.Name }, // Send actual name to home
        });
      }
    } else {
      Alert.alert("Error", "Incorrect OTP. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Patient Login
      </Text>

      {step === 1 ? (
        <>
          <TextInput
            label="Email or Contact"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />
          <Button mode="contained" onPress={handleLoginStep1} style={styles.button}>
            Login
          </Button>
          <Button
            onPress={() => router.push("/patient/register")}
            mode="text"
            style={styles.registerLink}
          >
            Don't have an account? Register
          </Button>
        </>
      ) : (
        <>
          <TextInput
            label="Enter OTP"
            value={inputOtp}
            onChangeText={setInputOtp}
            keyboardType="numeric"
            style={styles.input}
          />
          <Button mode="contained" onPress={handleLoginStep2} style={styles.button}>
            Verify OTP
          </Button>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#fff" },
  title: { marginBottom: 20, color: "#008080", fontWeight: "bold" },
  input: { marginBottom: 15, backgroundColor: "white" },
  button: { backgroundColor: "#008080" },
  registerLink: {
    marginTop: 10,
    alignSelf: "center",
  },
});

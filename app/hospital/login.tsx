import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { validateHospitalLogin, HospitalData } from "../../data/hospitalData";

export default function HospitalLogin() {
  const router = useRouter();

  const [registrationNumber, setRegistrationNumber] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState<1 | 2>(1);
  const [inputOtp, setInputOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [loggedInHospital, setLoggedInHospital] = useState<HospitalData | null>(null);

  const handleLoginStep1 = async () => {
    if (!registrationNumber || !password) {
      Alert.alert("Error", "Please enter registration number and password.");
      return;
    }

    const hospital = await validateHospitalLogin(registrationNumber, password);

    if (!hospital) {
      Alert.alert("Error", "Invalid registration number or password.");
      return;
    }

    setLoggedInHospital(hospital);

    // Generate OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(otp);
    Alert.alert("OTP Verification", `Your OTP is: ${otp}`);
    setStep(2);
  };

  const handleLoginStep2 = async () => {
    if (inputOtp === generatedOtp) {
      if (loggedInHospital) {
        await AsyncStorage.setItem("hospitalData", JSON.stringify(loggedInHospital));
        router.replace("/hospital/dashboard");
      }
    } else {
      Alert.alert("Error", "Incorrect OTP. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Hospital Login
      </Text>

      {step === 1 ? (
        <>
          <TextInput
            label="Registration Number"
            value={registrationNumber}
            onChangeText={setRegistrationNumber}
            style={styles.input}
            autoCapitalize="none"
            theme={{colors:{text:"black"}}}
          />
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />
          <Button mode="contained" onPress={handleLoginStep1} style={styles.button} textColor="white">
            Login
          </Button>
          <Button
            onPress={() => router.push("/hospital/register")}
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
            theme={{ colors:{text:"black"}}}
          />
          <Button mode="contained" onPress={handleLoginStep2} style={styles.button} textColor="white">
            Verify OTP
          </Button>
        </>
      )}

      <Button
        onPress={() => router.replace("/roleSelect")}
        mode="text"
        style={styles.backLink}
      >
        ← Back to Role Selection
      </Button>
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
  backLink: {
    marginTop: 20,
    alignSelf: "center",
  },
}); 
import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { validateDoctorLogin, DoctorData } from "../../data/doctorData";

export default function DoctorLogin() {
  const router = useRouter();

  const [username, setUsername] = useState(""); // email or contact
  const [password, setPassword] = useState("");
  const [step, setStep] = useState<1 | 2>(1);
  const [inputOtp, setInputOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [loggedInDoctor, setLoggedInDoctor] = useState<DoctorData | null>(null);

  const handleLoginStep1 = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Please enter username and password.");
      return;
    }

    const doctor = await validateDoctorLogin(username, password);

    if (!doctor) {
      Alert.alert("Error", "Invalid username or password.");
      return;
    }

    setLoggedInDoctor(doctor);

    // Generate OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(otp);
    Alert.alert("OTP Verification", `Your OTP is: ${otp}`);
    setStep(2);
  };

  const handleLoginStep2 = async () => {
    if (inputOtp === generatedOtp) {
      if (loggedInDoctor) {
        await AsyncStorage.setItem("doctorData", JSON.stringify(loggedInDoctor));
        router.replace("/doctor/dashboard");
      }
    } else {
      Alert.alert("Error", "Incorrect OTP. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Doctor Login
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
            onPress={() => router.push("/doctor/register")}
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

      {/* 👇 New "Back to Role Selection" Button */}
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

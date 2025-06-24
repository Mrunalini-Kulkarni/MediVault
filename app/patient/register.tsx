import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { PatientData, mockPatients } from "../../data/mockData";

export default function Register() {
  const router = useRouter();

  const [form, setForm] = useState({
    Name: "",
    age: "",
    contact: "",
    email: "",
    bloodGroup: "",
    disabilities: "",
    diseases: "",
    gender: "",
    password: "",
  });

  const handleChange = (key: keyof PatientData, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleRegister = async () => {
    if (!form.Name || !form.email || !form.password) {
      Alert.alert("Error", "Please fill all required fields (Name, Email, Password).");
      return;
    }

    const jsonPatients = await AsyncStorage.getItem("patients");
    let patients: PatientData[] = jsonPatients ? JSON.parse(jsonPatients) : [...mockPatients];

    const exists = patients.find(
      (p) => p.email === form.email || p.contact === form.contact
    );
    if (exists) {
      Alert.alert("Error", "Email or contact already registered.");
      return;
    }

    patients.push(form as PatientData);
    await AsyncStorage.setItem("patients", JSON.stringify(patients));

    Alert.alert("Success", "Registration Successful!");
    router.replace("/patient/login");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Patient Registration
      </Text>

      <TextInput label="Name" value={form.Name} onChangeText={(v) => handleChange("Name", v)} style={styles.input} />
      <TextInput label="Age" value={form.age} onChangeText={(v) => handleChange("age", v)} keyboardType="numeric" style={styles.input} />
      <TextInput label="Contact" value={form.contact} onChangeText={(v) => handleChange("contact", v)} keyboardType="phone-pad" style={styles.input} />
      <TextInput label="Email" value={form.email} onChangeText={(v) => handleChange("email", v)} keyboardType="email-address" autoCapitalize="none" style={styles.input} />
      <TextInput label="Blood Group" value={form.bloodGroup} onChangeText={(v) => handleChange("bloodGroup", v)} style={styles.input} />
      <TextInput label="Disabilities" value={form.disabilities} onChangeText={(v) => handleChange("disabilities", v)} style={styles.input} />
      <TextInput label="Diseases" value={form.diseases} onChangeText={(v) => handleChange("diseases", v)} style={styles.input} />
      <TextInput label="Gender" value={form.gender} onChangeText={(v) => handleChange("gender", v)} style={styles.input} />
      <TextInput label="Password" value={form.password} onChangeText={(v) => handleChange("password", v)} secureTextEntry style={styles.input} />

      <Button mode="contained" onPress={handleRegister} style={styles.button}>
        Register
      </Button>

      <Button
        onPress={() => router.push("/patient/login")}
        mode="text"
        style={styles.link}
      >
        Already have an account? Login
      </Button>

      <Button
        onPress={() => router.replace("/roleSelect")}
        mode="text"
        style={styles.link}
      >
        ← Back to Role Selection
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    marginBottom: 20,
    color: "#008080",
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    marginBottom: 12,
    backgroundColor: "white",
  },
  button: {
    marginTop: 10,
    backgroundColor: "#008080",
  },
  link: {
    marginTop: 10,
    alignSelf: "center",
  },
});

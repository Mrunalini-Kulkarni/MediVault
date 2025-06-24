import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { useRouter } from "expo-router";
import { DoctorData, saveDoctor, fetchDoctors } from "../../data/doctorData";

export default function DoctorRegister() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    specialization: "",
    contact: "",
    email: "",
    password: "",
  });

  const handleChange = (key: keyof DoctorData, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password) {
      Alert.alert("Error", "Please fill all required fields (Name, Email, Password).");
      return;
    }

    const doctors = await fetchDoctors();

    const exists = doctors.find(
      (d) => d.email === form.email || d.contact === form.contact
    );
    if (exists) {
      Alert.alert("Error", "Email or contact already registered.");
      return;
    }

    await saveDoctor(form as DoctorData);
    Alert.alert("Success", "Registration Successful!");
    router.replace("/doctor/login");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Doctor Registration
      </Text>

      <TextInput
        label="Name"
        value={form.name}
        onChangeText={(v) => handleChange("name", v)}
        style={styles.input}
      />
      <TextInput
        label="Specialization"
        value={form.specialization}
        onChangeText={(v) => handleChange("specialization", v)}
        style={styles.input}
      />
      <TextInput
        label="Contact"
        value={form.contact}
        onChangeText={(v) => handleChange("contact", v)}
        keyboardType="phone-pad"
        style={styles.input}
      />
      <TextInput
        label="Email"
        value={form.email}
        onChangeText={(v) => handleChange("email", v)}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={form.password}
        onChangeText={(v) => handleChange("password", v)}
        secureTextEntry
        style={styles.input}
      />

      <Button mode="contained" onPress={handleRegister} style={styles.button}>
        Register
      </Button>

      <Button
        onPress={() => router.push("/doctor/login")}
        mode="text"
        style={styles.link}
      >
        Already have an account? Login
      </Button>

      {/* Back to Role Selection */}
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
    marginBottom: 30,
    color: "#008080",
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    marginBottom: 15,
    backgroundColor: "white",
  },
  button: {
    marginTop: 10,
    backgroundColor: "#008080",
  },
  link: {
    marginTop: 15,
    alignSelf: "center",
  },
});

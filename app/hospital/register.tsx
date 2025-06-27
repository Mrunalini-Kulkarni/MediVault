import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { useRouter } from "expo-router";
import { HospitalData, saveHospital, fetchHospitals } from "../../data/hospitalData";

export default function HospitalRegister() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    registrationNumber: "",
    contact: "",
    email: "",
    password: "",
    address: "",
  });

  const handleChange = (key: keyof HospitalData, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleRegister = async () => {
    if (!form.name || !form.registrationNumber || !form.email || !form.password) {
      Alert.alert("Error", "Please fill all required fields (Name, Registration Number, Email, Password).");
      return;
    }

    const hospitals = await fetchHospitals();

    const exists = hospitals.find(
      (h) => h.registrationNumber.toLowerCase() === form.registrationNumber.toLowerCase() || h.email === form.email
    );
    if (exists) {
      Alert.alert("Error", "Registration number or email already registered.");
      return;
    }

    await saveHospital(form as HospitalData);
    Alert.alert("Success", "Registration Successful!");
    router.replace("/hospital/login");
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text variant="headlineMedium" style={styles.title}>
          Hospital Registration
        </Text>

        <View style={styles.formContainer}>
          <TextInput
            label="Hospital Name"
            value={form.name}
            onChangeText={(v) => handleChange("name", v)}
            style={styles.input}
          />
          <TextInput
            label="Registration Number"
            value={form.registrationNumber}
            onChangeText={(v) => handleChange("registrationNumber", v)}
            style={styles.input}
            autoCapitalize="none"
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
            label="Address"
            value={form.address}
            onChangeText={(v) => handleChange("address", v)}
            style={styles.input}
            multiline
            numberOfLines={3}
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
            onPress={() => router.push("/hospital/login")}
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
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingTop: 50,
    paddingBottom: 50,
  },
  title: {
    marginBottom: 30,
    color: "#008080",
    fontWeight: "bold",
    textAlign: "center",
  },
  formContainer: {
    paddingHorizontal: 20,
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
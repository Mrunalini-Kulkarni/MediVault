import React, { useState } from "react";
import { ScrollView, StyleSheet, Alert } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { savePatient } from "../../data/mockData";
import { useRouter } from "expo-router";

export default function AddPatient() {
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

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleAdd = async () => {
    if (!form.Name || !form.email || !form.password) {
      Alert.alert("Error", "Name, Email, and Password are required.");
      return;
    }

    await savePatient(form);
    Alert.alert("Success", "Patient added successfully!");
    router.back();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Add Patient
      </Text>

      <TextInput label="Name" value={form.Name} onChangeText={(v) => handleChange("Name", v)} style={styles.input} textColor="black" />
      <TextInput label="Age" value={form.age} onChangeText={(v) => handleChange("age", v)} keyboardType="numeric" style={styles.input}textColor="black" />
      <TextInput label="Contact" value={form.contact} onChangeText={(v) => handleChange("contact", v)} keyboardType="phone-pad" style={styles.input} textColor="black"/>
      <TextInput label="Email" value={form.email} onChangeText={(v) => handleChange("email", v)} keyboardType="email-address" style={styles.input} textColor="black"/>
      <TextInput label="Blood Group" value={form.bloodGroup} onChangeText={(v) => handleChange("bloodGroup", v)} style={styles.input} textColor="black"/>
      <TextInput label="Disabilities" value={form.disabilities} onChangeText={(v) => handleChange("disabilities", v)} style={styles.input} textColor="black"/>
      <TextInput label="Diseases" value={form.diseases} onChangeText={(v) => handleChange("diseases", v)} style={styles.input} textColor="black"/>
      <TextInput label="Gender" value={form.gender} onChangeText={(v) => handleChange("gender", v)} style={styles.input} textColor="black"/>
      <TextInput label="Password" value={form.password} onChangeText={(v) => handleChange("password", v)} secureTextEntry style={styles.input} textColor="black" />

      <Button mode="contained" onPress={handleAdd} style={styles.button} textColor="white">
        Add Patient
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    marginTop:60,
    marginBottom: 15,
    color: "#008080",
    fontWeight: "bold",
  },
  input: {
    marginBottom: 12,
    backgroundColor: "white",
  },
  button: {
    marginTop: 10,
    backgroundColor: "#008080",
    padding:7,
  },
});

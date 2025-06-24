import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Alert } from "react-native";
import { TextInput, Button, Text, HelperText, Menu, Divider } from "react-native-paper";
import { fetchPatients, PatientData } from "../../data/mockData";
import { saveRecord } from "../../data/recordsData";


interface MedicalRecord {
  id: string;
  patientName: string;
  date: string;
  type: string;
  description: string;
}

export default function AddRecord() {
  const [patients, setPatients] = useState<PatientData[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [menuVisible, setMenuVisible] = useState<boolean>(false);

  useEffect(() => {
    const loadPatients = async () => {
      const data = await fetchPatients();
      setPatients(data);
    };

    loadPatients();
  }, []);

  const handleAdd = async () => {
    if (!selectedPatient || !type || !description) {
      Alert.alert("Error", "Please fill all fields.");
      return;
    }

    const record: MedicalRecord = {
      id: Date.now().toString(),
      patientName: selectedPatient,
      date: new Date().toLocaleDateString(),
      type,
      description,
    };

    await saveRecord(record);
    Alert.alert("Success", "Medical record added successfully!");
    setSelectedPatient("");
    setType("");
    setDescription("");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Add Medical Record
      </Text>

      <TextInput
        label="Patient Name"
        value={type}
        onChangeText={setType}
        style={styles.input}
        textColor="black"
      />

      <TextInput
        label="Record Type (e.g., Prescription, Lab Report)"
        value={type}
        onChangeText={setType}
        style={styles.input}
        textColor="black"
      />
      <TextInput
        label="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        style={[styles.input, { height: 100 }]}
        textColor="black"
      />

      <Button mode="contained" onPress={handleAdd} style={styles.button} textColor="white">
        Add Record
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
    marginBottom: 20,
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
  },
});

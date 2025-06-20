import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";

interface PatientData {
  name: string;
  age: string;
  contact: string;
  email: string;
  bloodGroup: string;
  disabilities: string;
  diseases: string;
  gender: string;
}

// Mock data to use if AsyncStorage is empty
const mockPatientData: PatientData = {
  name: "Jane Doe",
  age: "29",
  contact: "+1234567890",
  email: "jane.doe@example.com",
  bloodGroup: "A+",
  disabilities: "None",
  diseases: "Asthma",
  gender: "Female",
};

export default function Profile() {
  const [patient, setPatient] = useState<PatientData | null>(null);

  useEffect(() => {
    async function fetchPatientData() {
      const jsonValue = await AsyncStorage.getItem("patientData");
      if (jsonValue) {
        setPatient(JSON.parse(jsonValue));
      } else {
        // If no data in storage, load mock data
        setPatient(mockPatientData);
      }
    }
    fetchPatientData();
  }, []);

  if (!patient) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <MaterialIcons name="account-circle" size={100} color="#008080" />
      <Text style={styles.name}>{patient.name}</Text>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Age:</Text>
        <Text style={styles.value}>{patient.age}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Contact:</Text>
        <Text style={styles.value}>{patient.contact}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{patient.email}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Blood Group:</Text>
        <Text style={styles.value}>{patient.bloodGroup}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Disabilities:</Text>
        <Text style={styles.value}>{patient.disabilities || "None"}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Diseases:</Text>
        <Text style={styles.value}>{patient.diseases || "None"}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Gender:</Text>
        <Text style={styles.value}>{patient.gender}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 100,
    fontSize: 18,
    color: "#008080",
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#008080",
    marginTop: 10,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    paddingVertical: 12,
  },
  label: {
    fontWeight: "600",
    fontSize: 16,
    color: "#008080",
  },
  value: {
    fontSize: 16,
    color: "#333333",
    maxWidth: "65%",
    textAlign: "right",
  },
});

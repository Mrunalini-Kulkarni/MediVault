import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from "react-native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Header from "./Header";
import { medicalRecords } from "../../constants/mockData";
import { mockPatients } from "../../data/mockData";

export default function PatientRecords() {
  const router = useRouter();

  const handlePatientPress = (patient: any) => {
    Alert.alert(
      "Patient Details",
      `Name: ${patient.Name}\n\nAge: ${patient.age} years\nGender: ${patient.gender}\n\nBlood Group: ${patient.bloodGroup}\n\nContact: ${patient.contact}\nEmail: ${patient.email}\n\nMedical History:\n• Diseases: ${patient.diseases}\n• Disabilities: ${patient.disabilities}\n\nLast Visit: 2 weeks ago\nNext Appointment: Next month\n\nEmergency Contact: +91 9876543210`,
      [
        { text: "Close", style: "default" },
        { text: "Contact", style: "default", onPress: () => Alert.alert("Contact", `Call: ${patient.contact}`) }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Patient Records" />

      <FlatList
        data={mockPatients}
        keyExtractor={(item) => item.email}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card} 
            onPress={() => handlePatientPress(item)}
          >
            <View style={styles.patientInfo}>
              <View style={styles.patientHeader}>
                <FontAwesome5 name="user" size={24} color="#008080" />
                <Text style={styles.patientName}>{item.Name}</Text>
              </View>
              <Text style={styles.patientDetails}>Age: {item.age} | Gender: {item.gender}</Text>
              <Text style={styles.patientDetails}>Blood Group: {item.bloodGroup}</Text>
              <Text style={styles.patientContact}>{item.contact}</Text>
              <Text style={styles.patientEmail}>{item.email}</Text>
              <View style={styles.patientStats}>
                <Text style={styles.statText}>Diseases: {item.diseases}</Text>
                <Text style={styles.statText}>Last Visit: 2w ago</Text>
              </View>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#ccc" />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 30,
  },
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: "#e0f2f2",
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    marginVertical: 8,
    borderRadius: 12,
    elevation: 2,
  },
  patientInfo: {
    flex: 1,
  },
  patientHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  patientName: {
    fontSize: 18,
    color: "#006666",
    fontWeight: "bold",
    marginLeft: 10,
  },
  patientDetails: {
    fontSize: 14,
    color: "#008080",
    marginBottom: 4,
    fontWeight: "600",
  },
  patientContact: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  patientEmail: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  patientStats: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statText: {
    fontSize: 12,
    color: "#008080",
    backgroundColor: "#fff",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
}); 
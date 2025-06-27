import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from "react-native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import Header from "./Header";
import { doctors } from "../../constants/mockData";

export default function DoctorRecords() {
  const router = useRouter();
  const { specialization } = useLocalSearchParams<{ specialization: string }>();

  // Filter doctors by specialization
  const filteredDoctors = doctors.filter(doctor => doctor.specialization === specialization);

  const handleDoctorPress = (doctor: any) => {
    Alert.alert(
      "Doctor Details",
      `Name: ${doctor.name}\n\nSpecialization: ${doctor.specialization}\n\nHospital: ${doctor.hospital}\n\nContact: ${doctor.contact}\n\nExperience: 8+ years\n\nEducation: MBBS, MD\n\nLanguages: English, Hindi\n\nAvailable: Mon-Fri (9 AM - 5 PM)`,
      [
        { text: "Close", style: "default" },
        { text: "Contact", style: "default", onPress: () => Alert.alert("Contact", `Call: ${doctor.contact}`) }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Header title={`${specialization} Doctors`} />

      <FlatList
        data={filteredDoctors}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card} 
            onPress={() => handleDoctorPress(item)}
          >
            <View style={styles.doctorInfo}>
              <View style={styles.doctorHeader}>
                <FontAwesome5 name="user-md" size={24} color="#008080" />
                <Text style={styles.doctorName}>{item.name}</Text>
              </View>
              <Text style={styles.doctorSpecialization}>{item.specialization}</Text>
              <Text style={styles.doctorHospital}>{item.hospital}</Text>
              <Text style={styles.doctorContact}>{item.contact}</Text>
              <View style={styles.doctorStats}>
                <Text style={styles.statText}>Experience: 8+ years</Text>
                <Text style={styles.statText}>Patients: 500+</Text>
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
  doctorInfo: {
    flex: 1,
  },
  doctorHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  doctorName: {
    fontSize: 18,
    color: "#006666",
    fontWeight: "bold",
    marginLeft: 10,
  },
  doctorSpecialization: {
    fontSize: 14,
    color: "#008080",
    marginBottom: 4,
    fontWeight: "600",
  },
  doctorHospital: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  doctorContact: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  doctorStats: {
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
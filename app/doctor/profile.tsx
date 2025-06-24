import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface DoctorData {
  name: string;
  specialization: string;
  contact: string;
  email: string;
}

const mockDoctorData: DoctorData = {
  name: "John Doe",
  specialization: "Cardiologist",
  contact: "+1234567890",
  email: "john.doe@hospital.com",
};

export default function DoctorProfile() {
  const [doctor, setDoctor] = useState<DoctorData | null>(null);

  useEffect(() => {
    const fetchDoctorData = async () => {
      const jsonValue = await AsyncStorage.getItem("doctorData");
      if (jsonValue) {
        setDoctor(JSON.parse(jsonValue));
      } else {
        setDoctor(mockDoctorData);
      }
    };

    fetchDoctorData();
  }, []);

  if (!doctor) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <MaterialIcons name="account-circle" size={100} color="#008080" />
      <Text style={styles.name}>{`Dr. ${doctor.name}`}</Text>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Specialization:</Text>
        <Text style={styles.value}>{doctor.specialization}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Contact:</Text>
        <Text style={styles.value}>{doctor.contact}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{doctor.email}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop:50,
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

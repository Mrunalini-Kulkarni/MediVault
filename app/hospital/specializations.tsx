import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { MaterialIcons, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Header from "./Header";
import { doctors } from "../../constants/mockData";

export default function Specializations() {
  const router = useRouter();

  // List of all specializations to display, even if no doctor exists
  const allSpecializations = [
    "Cardiologist",
    "Dermatologist",
    "Orthopedic",
    "Pediatrician",
    "Neurologist",
    "Ophthalmologist",
    "Psychiatrist",
    "Dentist",
    "General Physician",
  ];

  // Map specialization to icon and icon set
  const specializationIcons = {
    Cardiologist: { set: "FontAwesome5", name: "heartbeat" as const },
    Dermatologist: { set: "MaterialIcons", name: "face" as const },
    Orthopedic: { set: "MaterialIcons", name: "accessibility" as const },
    Pediatrician: { set: "Ionicons", name: "happy-outline" as const },
    Neurologist: { set: "FontAwesome5", name: "brain" as const },
    Ophthalmologist: { set: "Ionicons", name: "eye-outline" as const },
    Psychiatrist: { set: "MaterialIcons", name: "psychology" as const },
    Dentist: { set: "FontAwesome5", name: "tooth" as const },
    "General Physician": { set: "MaterialIcons", name: "local-hospital" as const },
  };

  // Get unique specializations from doctors data
  const availableSpecializations = Array.from(new Set(doctors.map(doctor => doctor.specialization)));

  const handleSpecializationPress = (specialization: string) => {
    if (!availableSpecializations.includes(specialization)) return;
    router.push({
      pathname: "/hospital/doctorRecords",
      params: { specialization }
    });
  };

  return (
    <View style={styles.container}>
      <Header title="Doctor Specializations" />

      <FlatList
        data={allSpecializations}
        keyExtractor={(item) => item}
        numColumns={2}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => {
          const iconInfo = specializationIcons[item] || { set: "MaterialIcons", name: "medical-services" as const };
          const isAvailable = availableSpecializations.includes(item);
          return (
            <TouchableOpacity
              style={[styles.card, !isAvailable && { opacity: 0.5 }]}
              onPress={() => handleSpecializationPress(item)}
              disabled={!isAvailable}
            >
              {iconInfo.set === "FontAwesome5" ? (
                <FontAwesome5 name={iconInfo.name} size={40} color="#008080" />
              ) : iconInfo.set === "Ionicons" ? (
                <Ionicons name={iconInfo.name} size={40} color="#008080" />
              ) : (
                <MaterialIcons name={iconInfo.name} size={40} color="#008080" />
              )}
              <Text style={styles.cardTitle}>{item}</Text>
              {!isAvailable && (
                <Text style={{ color: '#888', fontSize: 13, marginTop: 6 }}>No doctor available</Text>
              )}
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 30,
    paddingHorizontal: 14,
  },
  grid: {
    paddingTop: 40,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#e0f2f2",
    flex: 0.48,
    marginVertical: 20,
    height: 160,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  cardTitle: {
    marginTop: 20,
    fontSize: 18,
    color: "#006666",
    fontWeight: "600",
    textAlign: "center",
  },
}); 
import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Header from "./Header";
import { doctors } from "../../constants/mockData";

export default function Specializations() {
  const router = useRouter();

  // Get unique specializations from doctors data
  const specializations = Array.from(new Set(doctors.map(doctor => doctor.specialization)));

  const handleSpecializationPress = (specialization: string) => {
    router.push({
      pathname: "/hospital/doctorRecords",
      params: { specialization }
    });
  };

  return (
    <View style={styles.container}>
      <Header title="Doctor Specializations" />

      <FlatList
        data={specializations}
        keyExtractor={(item) => item}
        numColumns={2}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card} 
            onPress={() => handleSpecializationPress(item)}
          >
            <MaterialIcons name="medical-services" size={40} color="#008080" />
            <Text style={styles.cardTitle}>{item}</Text>
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
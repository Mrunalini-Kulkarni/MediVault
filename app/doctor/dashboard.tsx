import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { MaterialIcons, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Header from "./Header";
import AsyncStorage from "@react-native-async-storage/async-storage";

const cards = [
  {
    id: "1",
    title: "View Patients",
    icon: <FontAwesome5 name="users" size={40} color="#008080" />,
    route: "viewPatients",
  },
  {
    id: "2",
    title: "Add Patient",
    icon: <MaterialIcons name="person-add" size={40} color="#008080" />,
    route: "addPatient",
  },
  {
    id: "3",
    title: "Add Medical Record",
    icon: <MaterialIcons name="post-add" size={40} color="#008080" />,
    route: "addRecord",
  },
  {
    id: "4",
    title: "View Records",
    icon: <Ionicons name="document-text-outline" size={40} color="#008080" />,
    route: "viewRecords",
  },
];

export default function DoctorDashboard() {
  const [doctorName, setDoctorName] = useState<string>("Doctor");
  const router = useRouter();

  useEffect(() => {
    const fetchDoctorData = async () => {
      const jsonDoctor = await AsyncStorage.getItem("doctorData");
      if (jsonDoctor) {
        const doctor = JSON.parse(jsonDoctor);
        setDoctorName(doctor.name);
      }
    };

    fetchDoctorData();
  }, []);

  const handleCardPress = (route: string) => {
    router.push(`/doctor/${route}`);
  };

  return (
    <View style={styles.container}>
      <Header Name={`Dr. ${doctorName}`} />

      <FlatList
        data={cards}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => handleCardPress(item.route)}>
            {item.icon}
            <Text style={styles.cardTitle}>{item.title}</Text>
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
    paddingTop: 50,
    paddingHorizontal: 12,
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

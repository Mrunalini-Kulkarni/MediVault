import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { MaterialIcons, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Header from "./Header";
import AsyncStorage from "@react-native-async-storage/async-storage";

const cards = [
  {
    id: "1",
    title: "Doctor Records",
    icon: <FontAwesome5 name="user-md" size={40} color="#008080" />,
    route: "specializations",
  },
  {
    id: "2",
    title: "Patient Records",
    icon: <MaterialIcons name="people" size={40} color="#008080" />,
    route: "patientRecords",
  },
];

export default function HospitalDashboard() {
  const [hospitalName, setHospitalName] = useState<string>("Hospital");
  const router = useRouter();

  useEffect(() => {
    const fetchHospitalData = async () => {
      const jsonHospital = await AsyncStorage.getItem("hospitalData");
      if (jsonHospital) {
        const hospital = JSON.parse(jsonHospital);
        setHospitalName(hospital.name);
      }
    };

    fetchHospitalData();
  }, []);

  const handleCardPress = (route: string) => {
    router.push(`/hospital/${route}`);
  };

  return (
    <View style={styles.container}>
      <Header Name={hospitalName} />

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
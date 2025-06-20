// app/patient/index.tsx
import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { MaterialIcons, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import Header from "../../components/Header";

const cards = [
  {
    id: "1",
    title: "Medical Records",
    icon: <MaterialIcons name="folder-special" size={40} color="#008080" />,
    route: "records",
  },
  {
    id: "2",
    title: "Doctors",
    icon: <FontAwesome5 name="user-md" size={40} color="#008080" />,
    route: "doctors",
  },
  {
    id: "3",
    title: "Access Requests",
    icon: <MaterialIcons name="request-page" size={40} color="#008080" />,
    route: "access",
  },
  {
    id: "4",
    title: "Emergency Access",
    icon: <Ionicons name="medkit-outline" size={40} color="#008080" />,
    route: "emergency",
  },
];

export default function PatientHomeScreen() {
  const params = useLocalSearchParams();
  const name = (params.name as string) || "Jane Doe";
  const router = useRouter();

  const handleCardPress = (route: string) => {
    router.push(`/patient/${route}`);
  };

  return (
    <View style={styles.container}>
      <Header Name={name} />

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
    paddingTop : 40,
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

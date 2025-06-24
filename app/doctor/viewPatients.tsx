import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Card, Text, Avatar, ActivityIndicator } from "react-native-paper";
import { fetchPatients, PatientData } from "../../data/mockData";

export default function ViewPatients() {
  const [patients, setPatients] = useState<PatientData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadPatients = async () => {
      const data = await fetchPatients();
      setPatients(data);
      setLoading(false);
    };

    loadPatients();
  }, []);

  const renderPatient = ({ item }: { item: PatientData }) => (
  <Card style={styles.card}>
    <View style={styles.row}>
      <Avatar.Text
        label={item.Name.charAt(0).toUpperCase()}
        style={styles.avatar}
        color="#fff"
      />

      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.Name}</Text>
        <Text style={styles.details}>Age: {item.age} | Blood Group: {item.bloodGroup}</Text>
        <Text style={styles.details}>Contact: {item.contact}</Text>
        <Text style={styles.details}>Email: {item.email}</Text>
        <Text style={styles.details}>Gender: {item.gender}</Text>
        <Text style={styles.details}>Diseases: {item.diseases || "None"}</Text>
        <Text style={styles.details}>Disabilities: {item.disabilities || "None"}</Text>
      </View>
    </View>
  </Card>
);


  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator animating size="large" color="#008080" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>
        Registered Patients
      </Text>

      {patients.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          No patients found.
        </Text>
      ) : (
        <FlatList
          data={patients}
          keyExtractor={(item) => item.email}
          renderItem={renderPatient}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    marginTop: 60,
    textAlign: "center",
    marginBottom: 20,
    color: "#008080",
    fontWeight: "bold",
    fontSize: 20,
  },
  card: {
    marginBottom: 15,
    backgroundColor: "#cce6f2",
    borderRadius: 18,
    padding: 12,
    elevation:5
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  avatar: {
    backgroundColor: "#008080",
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#004d4d",
    marginBottom: 4,
  },
  details: {
    fontSize: 14,
    color: "#333",
    marginBottom: 2,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

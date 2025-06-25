import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Card, Text, Avatar, ActivityIndicator } from "react-native-paper";
import { fetchRecords, MedicalRecord } from "../../data/recordsData";

export default function ViewRecords() {
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadRecords = async () => {
      const data = await fetchRecords();
      setRecords(data);
      setLoading(false);
    };

    loadRecords();
  }, []);

  const renderRecord = ({ item }: { item: MedicalRecord }) => (
    <Card style={styles.card} >
      <Card.Title
        title={item.patientName}
        subtitle={`${item.type} | ${item.date}`}
        left={() => (
          <Avatar.Text
            label={item.patientName.charAt(0).toUpperCase()}
            style={{ backgroundColor: "#008080" }}
            color="#fff"
          />
        )}
      />
      <Card.Content>
        <Text variant="bodyMedium">{item.description}</Text>
      </Card.Content>
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
        Medical Records
      </Text>

      {records.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          No records available.
        </Text>
      ) : (
        <FlatList
          data={records}
          keyExtractor={(item) => item.id}
          renderItem={renderRecord}
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
    marginTop:60,
    textAlign: "center",
    marginBottom: 20,
    color: "#008080",
    fontWeight: "bold",
  },
  card: {
    marginBottom: 15,
    backgroundColor: "#e0f7f7",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import Header from './Header';
import { emergencyRequests, emergencyLogs } from '../../constants/mockEmergencyRequests';
import { colors } from '../../constants/colors';

export default function EmergencyScreen() {
  const [requests, setRequests] = useState(emergencyRequests);
  const [logs] = useState(emergencyLogs);

  const approve = (id: string) => {
    setRequests(requests.filter((r) => r.id !== id));
    alert('Emergency access granted.');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
      <Text variant="headlineMedium" style={styles.title}>
              Emergency Access 
            </Text>

      <Text style={styles.sectionTitle}>Pending Requests</Text>
      {requests.length === 0 ? (
        <Text style={styles.noData}>No pending requests.</Text>
      ) : (
        requests.map((req) => (
          <Card key={req.id} style={styles.card} >
            <Card.Content>
              <Text style={styles.nameText}>{req.name}</Text>
              <Text style={styles.detailText}>⏰ Date: {req.date}</Text>
              <Text style={styles.detailText}>👤 Type: {req.type === 'hospital' ? 'Hospital' : 'Doctor'}</Text>
              <Button
                mode="contained"
                style={styles.button}
                onPress={() => approve(req.id)}
                buttonColor={colors.teal}
                textColor="#fff"
              >
                Pre-Approve
              </Button>
            </Card.Content>
          </Card>
        ))
      )}

      <Text style={styles.sectionTitle}>Access Logs</Text>
      {logs.length === 0 ? (
        <Text style={styles.noData}>No access logs available.</Text>
      ) : (
        logs.map((log) => (
          <Card key={log.id} style={styles.card} >
            <Card.Content>
              <Text style={styles.nameText}>{log.accessor}</Text>
              <Text style={styles.detailText}>📅 Date: {log.date}</Text>
              <Text style={styles.detailText}>📄 Accessed: {log.recordAccessed}</Text>
            </Card.Content>
          </Card>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 10,
  },
  title: {
    marginTop:65,
    marginBottom: 20,
    color: "#008080",
    fontWeight: "bold",
  },
  sectionTitle: {
    marginTop: 20,
    marginBottom: 8,
    marginHorizontal: 5,
    fontWeight: 'bold',
    fontSize: 18,
    color: colors.teal,
  },
  card: {
    marginVertical: 8,
    backgroundColor: colors.lightTeal,
    borderRadius: 10,
    padding: 10,
  },
  nameText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.teal,
    marginBottom: 6,
  },
  detailText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  button: {
    marginTop: 10,
    borderRadius: 20,
  },
  noData: {
    marginHorizontal: 10,
    marginVertical: 10,
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
});

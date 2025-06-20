import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import Header from '../../components/Header';
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
    <ScrollView style={styles.container}>
      <Header title="Emergency Access" />

      <Text style={styles.sectionTitle}>Pending Requests</Text>
      {requests.map((req) => (
        <Card key={req.id} style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium">{req.name}</Text>
            <Text>⏰ {req.date}</Text>
            <Text>👤 {req.type === 'hospital' ? 'Hospital' : 'Doctor'}</Text>
            <Button
              mode="contained"
              style={{ marginTop: 10 }}
              onPress={() => approve(req.id)}
              buttonColor={colors.teal}
            >
              Pre-Approve
            </Button>
          </Card.Content>
        </Card>
      ))}

      <Text style={styles.sectionTitle}>Access Logs</Text>
      {logs.map((log) => (
        <Card key={log.id} style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium">{log.accessor}</Text>
            <Text>📅 {log.date}</Text>
            <Text>📄 Accessed: {log.recordAccessed}</Text>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  card: { margin: 10, backgroundColor: colors.lightTeal },
  sectionTitle: {
    marginTop: 15,
    marginHorizontal: 10,
    fontWeight: 'bold',
    fontSize: 18,
    color: colors.teal,
  },
});

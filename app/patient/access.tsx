import React, { useState } from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import { accessRequests } from '../../constants/mockAccessRequests';
import Header from '../../components/Header';
import { colors } from '../../constants/colors';

export default function AccessRequestsScreen() {
  const [requests, setRequests] = useState(accessRequests);

  const handleDecision = (id: string, type: 'accept' | 'reject') => {
    const selected = requests.find((r) => r.id === id);
    setRequests(requests.filter((r) => r.id !== id));
    Alert.alert(
      `${type === 'accept' ? 'Accepted' : 'Rejected'} access for ${selected?.doctorName}`
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Access Requests" />
      <ScrollView>
        {requests.map((req) => (
          <Card key={req.id} style={styles.card}>
            <Card.Content>
              <Text variant="titleMedium">{req.doctorName}</Text>
              <Text variant="bodySmall">Requested on: {req.date}</Text>
              <View style={styles.actions}>
                <Button
                  mode="contained"
                  onPress={() => handleDecision(req.id, 'accept')}
                  buttonColor={colors.teal}
                >
                  Accept
                </Button>
                <Button
                  mode="outlined"
                  onPress={() => handleDecision(req.id, 'reject')}
                  textColor={colors.teal}
                  style={styles.rejectButton}
                >
                  Reject
                </Button>
              </View>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  card: {
    margin: 10,
    backgroundColor: colors.lightTeal,
  },
  actions: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 10,
  },
  rejectButton: {
    borderColor: colors.teal,
  },
});

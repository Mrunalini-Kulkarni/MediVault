import React, { useState } from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import { accessRequests } from '../../constants/mockAccessRequests';


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
     <Text variant="headlineMedium" style={styles.title}>
                   Access Records
                 </Text>
      <ScrollView>
        {requests.map((req) => (
          <Card key={req.id} style={styles.card}>
            <Card.Content>
              <Text variant="titleMedium" style={styles.details}>{req.doctorName}   </Text>
              <Text variant="bodySmall" style={styles.details}>Requested on: {req.date}</Text>
              <View style={styles.actions}>
                <Button
                  mode="contained"
                  onPress={() => handleDecision(req.id, 'accept')}
                  buttonColor={'teal'}
                  textColor='white'
                >
                  Accept
                </Button>
                <Button
                  mode="outlined"
                  onPress={() => handleDecision(req.id, 'reject')}
                  textColor={'teal'}
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
  container: { flex: 1, backgroundColor: 'white' },
  card: {
    margin: 10,
    backgroundColor: '#e0f7f7',
    
  },
  actions: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 10,
  },
  rejectButton: {
    borderColor: 'teal',
  },
  title: {
    marginTop:90,
    marginLeft: 10,
    marginBottom: 20,
    color: "#008080",
    fontWeight: "bold",
  },
  details :{
    color : "black"

  }
});

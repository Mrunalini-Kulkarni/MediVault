import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';
import Header from './Header';
import { doctors } from '../../constants/mockData';
import { colors } from '../../constants/colors';

export default function DoctorsScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        My Doctors
      </Text>
      {doctors.map((doc) => (
        <Card key={doc.id} style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.textBlack}>{doc.name}</Text>
            <Text style={styles.textBlack}>{doc.specialization}</Text>
            <Text style={styles.textBlack}>{doc.hospital}</Text>
            <Text style={styles.textBlack}>📞 {doc.contact}</Text>
          </Card.Content>
        </Card>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: colors.white },
  card: { marginBottom: 10, backgroundColor: colors.lightTeal },
  title: {
    marginTop: 60,
    marginBottom: 20,
    color: '#008080',
    fontWeight: 'bold',
  },
  textBlack: {
    color: 'black',
    marginBottom: 4,
  },
});

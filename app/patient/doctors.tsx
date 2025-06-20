import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';
import Header from '../../components/Header';
import { doctors } from '../../constants/mockData';
import { colors } from '../../constants/colors';

export default function DoctorsScreen() {
  return (
    <View style={styles.container}>
      <Header title="My Doctors" />
      {doctors.map((doc) => (
        <Card key={doc.id} style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium">{doc.name}</Text>
            <Text>{doc.specialization}</Text>
            <Text>{doc.hospital}</Text>
            <Text>📞 {doc.contact}</Text>
          </Card.Content>
        </Card>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: colors.white },
  card: { marginBottom: 10, backgroundColor: colors.lightTeal },
});

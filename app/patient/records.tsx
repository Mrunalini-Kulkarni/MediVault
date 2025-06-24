import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native';
import Header from './Header';
import RecordCard from './RecordCard';
import { medicalRecords } from '../../constants/mockData';
import { colors } from '../../constants/colors';

export default function RecordsScreen() {
  return (
    <View style={styles.container}>
      <Header title="Medical Records" />
      <ScrollView>
        {medicalRecords.map((record) => (
          <RecordCard key={record.id} record={record} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollContainer: {
    padding: 10,
  },
  title: {
    marginTop: 60,
    marginBottom: 20,
    textAlign: 'center',
    color: colors.teal,
    fontWeight: 'bold',
    fontSize: 20,
  },
});

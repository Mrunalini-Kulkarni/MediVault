import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native';
import Header from '../../components/Header';
import RecordCard from '../../components/RecordCard';
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
  container: { flex: 1, backgroundColor: colors.white },
});

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native';
import RecordCard from './RecordCard';
import { medicalRecords } from '../../constants/mockData';
import { Text } from 'react-native-paper';



export default function RecordsScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
                   Medical Records
                 </Text>
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
    backgroundColor: "white",
  },
  scrollContainer: {
    padding: 10,
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

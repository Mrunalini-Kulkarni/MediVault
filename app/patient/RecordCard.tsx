import React from 'react';
import { Card, Text } from 'react-native-paper';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';

export default function RecordCard({ record }: { record: any }) {
  return (
    <Card style={{ margin: 10 ,marginTop:15, backgroundColor:"#e0f7f7"}}>
      <Card.Content>
        <Text style={styles.details}>Date: {record.date}</Text>
        <Text style={styles.details}>Doctor: {record.doctor}</Text>
        <Text style={styles.details}>Summary: {record.summary}</Text>
      </Card.Content>
    </Card>
  );
}
const styles = StyleSheet.create({
 details :{
    color : "black"
  }
})
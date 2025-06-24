import React from 'react';
import { Card, Text } from 'react-native-paper';
import { View } from 'react-native';

export default function RecordCard({ record }: { record: any }) {
  return (
    <Card style={{ margin: 10 ,marginTop:15}}>
      <Card.Content>
        <Text>Date: {record.date}</Text>
        <Text>Doctor: {record.doctor}</Text>
        <Text>Summary: {record.summary}</Text>
      </Card.Content>
    </Card>
  );
}

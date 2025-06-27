import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Text, Button } from "react-native-paper";
import { useRouter } from "expo-router";

export default function HospitalLanding() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text variant="displaySmall" style={styles.title}>
          MediVault
        </Text>
        <Text variant="headlineSmall" style={styles.subtitle}>
          Hospital Portal
        </Text>
        <Text variant="bodyLarge" style={styles.description}>
          Access comprehensive medical records and manage healthcare data securely
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={() => router.push("/hospital/login")}
          style={styles.button}
          textColor="white"
        >
          Login
        </Button>
        <Button
          mode="outlined"
          onPress={() => router.push("/hospital/register")}
          style={styles.button}
        >
          Register
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    padding: 20,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#008080",
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    color: "#006666",
    marginBottom: 20,
  },
  description: {
    textAlign: "center",
    color: "#666",
    lineHeight: 24,
  },
  buttonContainer: {
    paddingBottom: 40,
  },
  button: {
    marginVertical: 10,
    backgroundColor: "#008080",
    borderColor: "#008080",
  },
}); 
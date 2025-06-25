import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from "react-native-reanimated";

export default function RoleSelect() {
  const router = useRouter();

  // Shared values for animation
  const doctorScale = useSharedValue(0);
  const patientScale = useSharedValue(0);

  // Animated styles
  const doctorCardStyle = useAnimatedStyle(() => ({
    transform: [{ scale: doctorScale.value }],
    opacity: doctorScale.value,
  }));

  const patientCardStyle = useAnimatedStyle(() => ({
    transform: [{ scale: patientScale.value }],
    opacity: patientScale.value,
  }));

  // Trigger animation on mount
  useEffect(() => {
    doctorScale.value = withDelay(100, withTiming(1, { duration: 400 }));
    patientScale.value = withDelay(300, withTiming(1, { duration: 400 }));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Role</Text>

      <View style={styles.grid}>
        <Animated.View style={[styles.card, doctorCardStyle]}>
          <TouchableOpacity
            style={styles.touchable}
            onPress={() => router.push("/doctor/login")}
          >
            <FontAwesome5 name="user-md" size={40} color="#008080" />
            <Text style={styles.cardTitle}>Doctor</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={[styles.card, patientCardStyle]}>
          <TouchableOpacity
            style={styles.touchable}
            onPress={() => router.push("/patient/login")}
          >
            <MaterialIcons name="person" size={55} color="#008080" />
            <Text style={styles.cardTitle}>Patient</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  title: {
    marginTop:60,
    fontSize: 26,
    fontWeight: "bold",
    color: "#008080",
    marginBottom: 40,
  },
  grid: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  card: {
    backgroundColor: "#e0f2f2",
    width: "48%",
    height: 150,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  touchable: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: {
    marginTop: 15,
    fontSize: 18,
    color: "#006666",
    fontWeight: "600",
    textAlign: "center",
  },
});

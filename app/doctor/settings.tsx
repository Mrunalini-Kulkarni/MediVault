import React, { useState } from "react";
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { MaterialIcons, Ionicons, Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const router = useRouter();

  const handleToggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  const handleChangePassword = () => {
    Alert.alert("Change Password", "Feature coming soon!");
  };

  const handleHelp = () => {
    Alert.alert("Help", "Contact support@example.com");
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => router.replace("/login"),
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <TouchableOpacity style={styles.option} onPress={handleChangePassword}>
        <Feather name="lock" size={24} color="#008080" />
        <Text style={styles.optionText}>Change Password</Text>
        <MaterialIcons name="chevron-right" size={24} color="#ccc" />
      </TouchableOpacity>

      <View style={styles.option}>
        <Ionicons name="notifications-outline" size={24} color="#008080" />
        <Text style={styles.optionText}>Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={handleToggleNotifications}
        />
      </View>

      <TouchableOpacity style={styles.option} onPress={handleHelp}>
        <Feather name="help-circle" size={24} color="#008080" />
        <Text style={styles.optionText}>Help & Support</Text>
        <MaterialIcons name="chevron-right" size={24} color="#ccc" />
      </TouchableOpacity>

      <TouchableOpacity style={[styles.option, styles.logout]} onPress={handleLogout}>
        <MaterialIcons name="logout" size={24} color="#d32f2f" />
        <Text style={[styles.optionText, { color: "#d32f2f" }]}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#008080",
    marginBottom: 24,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    justifyContent: "space-between",
  },
  optionText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: "#333",
  },
  logout: {
    borderTopWidth: 1,
    borderTopColor: "#eee",
    marginTop: 30,
  },
});

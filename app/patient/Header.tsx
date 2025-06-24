import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, Modal, Pressable } from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface HeaderProps {
  Name?: string;  // for logged-in views
  title?: string; // for generic screens
}

export default function Header({ Name, title }: HeaderProps) {
  const router = useRouter();
  const firstName = Name?.split(" ")[0] ?? title ?? "User";
  const initial = firstName.charAt(0).toUpperCase();

  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <View style={styles.headerContainer}>
      {Name ? (
        <TouchableOpacity style={styles.profileCircle} onPress={() => router.push("/patient/profile")}>
          <Text style={styles.initial}>{initial}</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.profileCircle}>
          <Text style={styles.initial}>{initial}</Text>
        </View>
      )}

      <Text style={styles.welcomeText}>
        {Name ? `Welcome, ${Name}` : title}
      </Text>

      <View style={styles.iconsContainer}>
        {Name && (
          <>
            <TouchableOpacity onPress={() => Alert.alert("Notifications", "No new notifications")}>
              <Ionicons name="notifications-outline" size={24} color="#008080" style={styles.icon} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setMenuVisible(true)}>
              <Entypo name="dots-three-vertical" size={20} color="#008080" style={styles.icon} />
            </TouchableOpacity>
          </>
        )}

        <Modal transparent visible={menuVisible} animationType="fade">
          <Pressable style={styles.modalBackground} onPress={() => setMenuVisible(false)}>
            <View style={styles.menu}>
              <TouchableOpacity onPress={() => { setMenuVisible(false); router.push("/patient/settings"); }}>
                <Text style={styles.menuItem}>Settings</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { setMenuVisible(false); router.replace("/patient/login"); }}>
                <Text style={styles.menuItem}>Logout</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 60,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  profileCircle: {
    backgroundColor: "#b2dfdb",
    width: 40,
    height: 40,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  initial: {
    fontSize: 18,
    color: "#004d40",
    fontWeight: "bold",
  },
  welcomeText: {
    flex: 1,
    fontSize: 18,
    marginLeft: 12,
    color: "#008080",
    fontWeight: "bold",
  },
  iconsContainer: {
    flexDirection: "row",
  },
  icon: {
    marginLeft: 10,
  },
  modalBackground: {
    flex: 1,
    alignItems: "flex-end",
    paddingTop: 60,
    paddingRight: 10,
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  menu: {
    width: 120,
    backgroundColor: "#fff",
    borderRadius: 6,
    padding: 10,
    elevation: 5,
  },
  menuItem: {
    paddingVertical: 8,
    fontSize: 16,
    color: "#008080",
  },
});

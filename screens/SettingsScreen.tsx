import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { RootState } from "@/features/store";
import { deleteLocalItem } from "@/services/secureStorage";
import { useRouter } from "expo-router";

const SettingsScreen = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const [logoutModal, setLogoutModal] = useState(false);
  const router = useRouter();
  const handleLogout = async () => {
    await deleteLocalItem("userToken");
    setLogoutModal(false);
    router.replace("/auth/signin");
    // Optionally, navigate to login screen here
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <View style={{ alignItems: "center" }}>
            <Image
              style={styles.profileImage}
              source={{
                uri:
                  user?.profileImage ||
                  "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?uid=R98797265&ga=GA1.1.921125074.1743352734&semt=ais_hybrid&w=740",
              }}
            />
          </View>
          <View style={{ flex: 1, marginLeft: 10, alignItems: "center" }}>
            <Text style={styles.username}>{user?.name}</Text>
            <Text style={styles.status}>{user?.userName}</Text>
          </View>
        </View>
      </View>

      {/* Options */}
      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.option}>
          <MaterialCommunityIcons
            name="account-circle-outline"
            size={24}
            color="#ff8000"
          />
          <Text style={styles.optionText}>Your Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <MaterialCommunityIcons name="headset" size={24} color="#ff8000" />
          <Text style={styles.optionText}>Support</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <MaterialCommunityIcons
            name="help-circle-outline"
            size={24}
            color="#ff8000"
          />
          <Text style={styles.optionText}>Help</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <MaterialCommunityIcons
            name="file-document-outline"
            size={24}
            color="#ff8000"
          />
          <Text style={styles.optionText}>Terms And Conditions</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.option, { marginTop: 30 }]}
          onPress={() => setLogoutModal(true)}
        >
          <MaterialCommunityIcons name="logout" size={24} color="red" />
          <Text style={[styles.optionText, { color: "red" }]}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Logout Modal */}
      <Modal
        visible={logoutModal}
        transparent
        animationType="fade"
        onRequestClose={() => setLogoutModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text
              style={{ fontWeight: "bold", fontSize: 18, marginBottom: 10 }}
            >
              Confirm Logout
            </Text>
            <Text style={{ color: "#555", marginBottom: 20 }}>
              Are you sure you want to logout?
            </Text>
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <Pressable
                style={styles.modalBtn}
                onPress={() => setLogoutModal(false)}
              >
                <Text style={{ color: "#555" }}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.modalBtn, { marginLeft: 10 }]}
                onPress={handleLogout}
              >
                <Text style={{ color: "red", fontWeight: "bold" }}>Logout</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF", paddingHorizontal: 16 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
    height: 150,
    justifyContent: "center",
  },
  profileImage: {
    height: 80,
    width: 80,
    borderRadius: 25,
  },
  username: { fontWeight: "bold", fontSize: 25 },
  status: { fontSize: 13, color: "gray" },
  optionsContainer: {
    marginTop: 10,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  optionText: {
    marginLeft: 16,
    fontSize: 16,
    color: "#222",
    fontWeight: "500",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 24,
    width: "80%",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  modalBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});

export default SettingsScreen;

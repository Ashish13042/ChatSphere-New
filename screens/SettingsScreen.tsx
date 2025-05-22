import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
  ScrollView,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { RootState } from "@/features/store";
import { deleteLocalItem } from "@/services/secureStorage";
import { useRouter } from "expo-router";
import { MAINURL } from "@/services/APIURL";
import ProfilePage from "@/components/ProfilePage";

const SettingsScreen = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const [logoutModal, setLogoutModal] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    await deleteLocalItem("userToken");
    setLogoutModal(false);
    router.replace("/auth/signin");
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={{ marginBottom: 140 }}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Settings</Text>
          <View style={{ width: 24 }} />
        </View>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.imageWrapper}>
            <ProfilePage />
          </View>
          <Text style={styles.name}>{user?.name}</Text>
          <Text style={styles.email}>{user?.email}</Text>
        </View>
        {/* User Info Fields */}
        <View style={styles.fieldsContainer}>
          <Text style={styles.sectionTitle}>Account Information</Text>

          {(
            [
              { icon: "person-outline", label: "Name", value: user?.name },
              { icon: "mail-outline", label: "Email", value: user?.email },
              {
                icon: "lock-closed-outline",
                label: "Password",
                value: "••••••••",
              },
              {
                icon: "location-outline",
                label: "Location",
                value: user?.location || "Sirajganj, Bangladesh",
              },
            ] as {
              icon: React.ComponentProps<typeof Ionicons>["name"];
              label: string;
              value: string | undefined;
            }[]
          ).map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.inputRow}
              activeOpacity={0.7}
            >
              <View style={styles.fieldLeft}>
                <View style={styles.iconContainer}>
                  <Ionicons name={item.icon} size={18} color="#6c757d" />
                </View>
                <View style={styles.fieldTextContainer}>
                  <Text style={styles.fieldLabel}>{item.label}</Text>
                  <Text style={styles.fieldValue}>{item.value}</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#adb5bd" />
            </TouchableOpacity>
          ))}
        </View>
        {/* Additional Options */}
        <View style={[styles.fieldsContainer, { marginTop: 16 }]}>
          <Text style={styles.sectionTitle}>Preferences</Text>

          <TouchableOpacity style={styles.inputRow} activeOpacity={0.7}>
            <View style={styles.fieldLeft}>
              <View style={styles.iconContainer}>
                <Ionicons
                  name="notifications-outline"
                  size={18}
                  color="#6c757d"
                />
              </View>
              <Text style={styles.inputText}>Notifications</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#adb5bd" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.inputRow} activeOpacity={0.7}>
            <View style={styles.fieldLeft}>
              <View style={styles.iconContainer}>
                <Ionicons name="language-outline" size={18} color="#6c757d" />
              </View>
              <Text style={styles.inputText}>Language</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#adb5bd" />
          </TouchableOpacity>
        </View>
        {/* Support & Logout */}
        <View style={[styles.fieldsContainer, { marginTop: 16 }]}>
          <TouchableOpacity style={styles.inputRow} activeOpacity={0.7}>
            <View style={styles.fieldLeft}>
              <View style={styles.iconContainer}>
                <Ionicons name="headset-outline" size={18} color="#6c757d" />
              </View>
              <Text style={styles.inputText}>Help & Support</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#adb5bd" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.inputRow, { marginTop: 8 }]}
            onPress={() => setLogoutModal(true)}
            activeOpacity={0.7}
          >
            <View style={styles.fieldLeft}>
              <View style={styles.iconContainer}>
                <Ionicons name="log-out-outline" size={18} color="#dc3545" />
              </View>
              <Text style={[styles.inputText, { color: "#dc3545" }]}>
                Log Out
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* Logout Confirmation Modal */}
        <Modal visible={logoutModal} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalIcon}>
                <Ionicons name="log-out-outline" size={32} color="#dc3545" />
              </View>
              <Text style={styles.modalTitle}>Log Out?</Text>
              <Text style={styles.modalText}>
                Are you sure you want to log out of your account?
              </Text>
              <View style={styles.modalActions}>
                <Pressable
                  style={[styles.modalBtn, styles.cancelBtn]}
                  onPress={() => setLogoutModal(false)}
                  android_ripple={{ color: "#f1f1f1" }}
                >
                  <Text style={styles.cancelBtnText}>Cancel</Text>
                </Pressable>
                <Pressable
                  style={[styles.modalBtn, styles.logoutBtn]}
                  onPress={handleLogout}
                  android_ripple={{ color: "#f8d7da" }}
                >
                  <Text style={styles.logoutBtnText}>Log Out</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

// Enhanced Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
    paddingHorizontal: 4,
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#343a40",
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 32,
  },
  imageWrapper: {
    position: "relative",
    marginBottom: 12,
  },
  profileImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#000",
  },
  editImageBtn: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#ff8000",
    borderRadius: 14,
    padding: 6,
    elevation: 2,
  },
  name: {
    fontSize: 22,
    fontWeight: "600",
    color: "#212529",
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: "#6c757d",
  },
  fieldsContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "500",
    color: "#adb5bd",
    paddingVertical: 12,
    paddingHorizontal: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  fieldLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#f1f3f5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  fieldTextContainer: {
    flex: 1,
  },
  fieldLabel: {
    fontSize: 12,
    color: "#6c757d",
    marginBottom: 2,
  },
  fieldValue: {
    fontSize: 15,
    color: "#212529",
    fontWeight: "500",
  },
  inputText: {
    fontSize: 15,
    color: "#212529",
    fontWeight: "500",
    marginLeft: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    width: "100%",
    maxWidth: 340,
    alignItems: "center",
  },
  modalIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(220, 53, 69, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  modalTitle: {
    fontWeight: "600",
    fontSize: 20,
    marginBottom: 8,
    color: "#212529",
    textAlign: "center",
  },
  modalText: {
    color: "#6c757d",
    marginBottom: 24,
    textAlign: "center",
    lineHeight: 20,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  cancelBtn: {
    backgroundColor: "#f8f9fa",
    marginRight: 8,
  },
  cancelBtnText: {
    color: "#495057",
    fontWeight: "500",
  },
  logoutBtn: {
    backgroundColor: "rgba(220, 53, 69, 0.1)",
  },
  logoutBtnText: {
    color: "#dc3545",
    fontWeight: "600",
  },
});

export default SettingsScreen;

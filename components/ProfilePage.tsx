import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { APIURL, MAINURL } from "@/services/APIURL";
import { getLocalItem } from "@/services/secureStorage";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/features/store";
import { fetchUser } from "@/features/userSlice";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";

const ProfilePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);

  const [profilePic, setProfilePic] = useState<{ uri?: string }>({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<any>(null);

  useEffect(() => {
    if (user?.profileImage) {
      setProfilePic({
        uri: `${MAINURL}/uploads/${user.profileImage}`,
      });
    }
  }, [user]);

  const handleProfilePicChange = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permission.granted) {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setSelectedImage(result.assets[0]);
      }
    } else {
      alert("Permission to access media library is required!");
    }
  };

  const uploadNewProfileImage = async () => {
    try {
      if (!selectedImage) return;

      const response = await fetch(selectedImage.uri);
      const blob = await response.blob();
      const userToken = await getLocalItem("userToken");
      const fileName = selectedImage.uri.split("/").pop() || "profile.jpg";
      const match = /\.(\w+)$/.exec(fileName);
      const type = match ? `image/${match[1]}` : `image`;

      const formData = new FormData();
      formData.append("profileImage", {
        uri: selectedImage.uri,
        name: fileName,
        type,
      } as any);

      const uploadResponse = await fetch(`${APIURL}/upload/profile`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
        body: formData,
      });

      const data = await uploadResponse.json();

      if (uploadResponse.ok) {
        dispatch(fetchUser());
        setIsModalVisible(false);
        setSelectedImage(null);
      } else {
        alert("Upload failed: " + data.error);
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Something went wrong while uploading.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <View style={styles.imageWrapper}>
          <Image
            source={{
              uri: profilePic.uri
                ? profilePic.uri
                : "https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-profile-picture-business-profile-woman-suitable-social-media-profiles-icons-screensavers-as-templatex9_719432-1315.jpg?uid=R98797265&ga=GA1.1.921125074.1743352734&semt=ais_hybrid&w=740",
            }}
            style={styles.profilePic}
          />
          <TouchableOpacity
            style={styles.editIcon}
            onPress={() => setIsModalVisible(true)}
            activeOpacity={0.8}
          >
            <MaterialIcons name="edit" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <Modal visible={isModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Update Profile Photo</Text>

            <View style={styles.imageContainer}>
              <Image
                source={{
                  uri: selectedImage
                    ? selectedImage.uri
                    : profilePic.uri ||
                      "https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-profile-picture-business-profile-woman-suitable-social-media-profiles-icons-screensavers-as-templatex9_719432-1315.jpg?uid=R98797265&ga=GA1.1.921125074.1743352734&semt=ais_hybrid&w=740",
                }}
                style={styles.modalImage}
              />
            </View>

            <View style={styles.buttonContainer}>
              <Pressable
                style={[styles.actionButton, styles.selectButton]}
                onPress={handleProfilePicChange}
                android_ripple={{ color: "#f0f0f0" }}
              >
                <Ionicons name="images-outline" size={18} color="#2D9CDB" />
                <Text style={styles.selectButtonText}>
                  {selectedImage ? "Select Different" : "Choose Photo"}
                </Text>
              </Pressable>

              {selectedImage && (
                <Pressable
                  style={[styles.actionButton, styles.updateButton]}
                  onPress={uploadNewProfileImage}
                  android_ripple={{ color: "#e0e0e0" }}
                >
                  <MaterialIcons name="save-alt" size={18} color="#fff" />
                  <Text style={styles.updateButtonText}>Update Photo</Text>
                </Pressable>
              )}

              <Pressable
                style={[styles.actionButton, styles.cancelButton]}
                onPress={() => {
                  setIsModalVisible(false);
                  setSelectedImage(null);
                }}
                android_ripple={{ color: "#f0f0f0" }}
              >
                <Ionicons name="close" size={18} color="#6c757d" />
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  header: {},
  imageWrapper: {
    position: "relative",
  },
  profilePic: {
    height: 100,
    width: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#000",
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#ff8000",
    borderRadius: 50,
    padding: 6,
    elevation: 2,
  },
  name: {
    fontSize: 24,
    fontWeight: "600",
    color: "#343a40",
    marginTop: 8,
  },
  email: {
    fontSize: 16,
    color: "#6c757d",
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 16,
    width: "100%",
    maxWidth: 380,
    padding: 24,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#343a40",
    marginBottom: 20,
  },
  imageContainer: {
    marginBottom: 24,
  },
  modalImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#e9ecef",
  },
  buttonContainer: {
    width: "100%",
    gap: 12,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 10,
    borderWidth: 1,
  },
  selectButton: {
    borderColor: "#2D9CDB",
    backgroundColor: "#fff",
    gap: 8,
  },
  selectButtonText: {
    color: "#2D9CDB",
    fontWeight: "500",
    fontSize: 16,
  },
  updateButton: {
    backgroundColor: "#2D9CDB",
    borderColor: "#2D9CDB",
    gap: 8,
  },
  updateButtonText: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 16,
  },
  cancelButton: {
    borderColor: "#e9ecef",
    backgroundColor: "#f8f9fa",
    gap: 8,
  },
  cancelButtonText: {
    color: "#6c757d",
    fontWeight: "500",
    fontSize: 16,
  },
});

export default ProfilePage;

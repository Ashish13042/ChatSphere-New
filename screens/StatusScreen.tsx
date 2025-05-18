import MessageCard from "@/components/MessageCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { moderateScale } from "react-native-size-matters";
import Ionicons from "react-native-vector-icons/Ionicons";

interface StatusType {
  image: string;
  timestamp: number;
}

const Status = () => {
  const [myStatus, setMyStatus] = useState<StatusType | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const data = [
    {
      image: require("../assets/images/Nishantimage.png"),
      name: "Nishant Kumar Singh",
      message: "Today, 7:29 AM",
    },
    {
      image: require("../assets/images/Sahilimage.png"),
      name: "Sahil Sharma",
      message: "Yesterday, 5:47 PM",
    },
  ];

useEffect(() => {
  const fetchMyStatus = async () => {
    try {
      const res = await fetch("https://vqn6ngc6-5000.inc1.devtunnels.ms/api/status");
      const statuses = await res.json();

      const my = statuses.find((s: any) => s.userId === "6826dde66d13b4030dbcdf1a");
      if (my) {
        setMyStatus(my);
      }
    } catch (err) {
      console.error("Failed to fetch status", err);
    }
  };

  fetchMyStatus();
}, []);



  const handleAddStatus = async () => {
  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!permission.granted) {
    Alert.alert("Permission required", "Enable gallery access to upload status");
    return;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: 0.7,
  });

  if (!result.canceled) {
    const imageUri = result.assets[0].uri;
    const formData = new FormData();
    formData.append("image", {
      uri: imageUri,
      name: "status.jpg",
      type: "image/jpeg",
    });

    formData.append("userId", "6826dde66d13b4030dbcdf1a"); // Replace with real userId from auth later

    try {
      const res = await fetch("https://vqn6ngc6-5000.inc1.devtunnels.ms/api/status/upload", {
        method: "POST",
        body: formData,
        headers: {
          // Don't set 'Content-Type'; let fetch handle it
        },
      });

      const json = await res.json();

      if (json.status) {
        setMyStatus(json.status); // set local view
        Alert.alert("Status added!");
      } else {
        Alert.alert("Upload failed", "Unexpected response from server");
      }
    } catch (err: any) {
      Alert.alert("Upload failed", err.message);
    }
  }
};


  const handleStatusPress = () => {
    if (myStatus) {
      setModalVisible(true); // View status
    } else {
      handleAddStatus(); // upload if not present
    }
  };

  const handleStatusLongPress = () => {
    if (myStatus) {
      setShowDeleteConfirm(true); // Show the delete confirm modal
    }
  };

  return (
    <View style={styles.container}>
      {/* Status Card */}
      <Text style={styles.textStyle}>Status</Text>
      <TouchableOpacity
  onPress={handleStatusPress}
  onLongPress={handleStatusLongPress}
  activeOpacity={0.8}
>
  <View style={styles.statusCardWrapper}>
    <MessageCard
      name="Ashish Rawat"
      message={myStatus ? "Your Status" : "Add your status"}
      image={
        myStatus
          ? { uri: myStatus.image }
          : require("../assets/images/Ashishimage.png")
      }
      logoComponent={
        <TouchableOpacity
          onPress={handleAddStatus}
          style={styles.logoComponentContainer}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons
            name="add-outline"
            size={moderateScale(20)}
            color="black"
          />
        </TouchableOpacity>
      }
      disableNavigation={true}
      onPress={handleStatusPress}
      onLongPress={handleStatusLongPress}
      isStatusCard={true}
      
    />
  </View>
</TouchableOpacity>

      <FlatList
        data={data}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <MessageCard
            name={item.name}
            message={item.message}
            image={item.image}
            disableNavigation={true}
          />
        )}
        style={{ marginTop: 20 }}
      />

      {/* Status View Modal */}
      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <Image source={{ uri: myStatus?.image }} style={styles.fullImage} />
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={styles.closeButton}
          >
            <Ionicons name="close" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal
        visible={showDeleteConfirm}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDeleteConfirm(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.alertBox}>
            <Text style={styles.alertTitle}>Delete Status</Text>
            <Text style={styles.alertMessage}>
              Are you sure you want to delete your status?
            </Text>

            <View style={styles.buttonRow}>
              <TouchableOpacity
                onPress={() => setShowDeleteConfirm(false)}
                style={styles.cancelButton}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={async () => {
                  await AsyncStorage.removeItem("myStatus");
                  setMyStatus(null);
                  setShowDeleteConfirm(false);
                  Alert.alert("Status deleted");
                }}
                style={styles.deleteButton}
              >
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  textStyle:{
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
statusCardWrapper: {
  borderBottomColor: "#eee",
  borderBottomWidth: 1,
},
  logoComponentContainer: {
    backgroundColor: "#ff8000",
    borderRadius: 20,
    padding: 4,
    position: "absolute",
    bottom: 0,
    right: 0,
    zIndex: 1,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(12, 13, 13, 0.85)", // semi-transparent dark overlay
    justifyContent: "center",
    alignItems: "center",
    backdropFilter: "blur(10px)",
  },
  fullImage: {
    width: "100%",
    height: "80%",
    resizeMode: "contain",
    borderRadius: 30,
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  alertBox: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "80%",
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  alertMessage: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  cancelButton: {
    marginRight: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    backgroundColor: "#ddd",
  },
  cancelText: {
    color: "#333",
  },
  deleteButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    backgroundColor: "#e53935",
  },
  deleteText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Status;
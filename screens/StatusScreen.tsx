import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  Modal,
  Text,
} from "react-native";
import React, { useEffect, useState } from "react";
import { BlurView } from "expo-blur";

interface StatusType {
  image: string;
  timestamp: number;
}
import Ionicons from "react-native-vector-icons/Ionicons";
import { moderateScale } from "react-native-size-matters";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MessageCard from "@/components/MessageCard";

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
    const loadStatus = async () => {
      const saved = await AsyncStorage.getItem("myStatus");
      if (saved) {
        const parsedStatus = JSON.parse(saved);
        const currentTime = Date.now();
        const timeDifference = currentTime - parsedStatus.timestamp;

        if (timeDifference < 86400000) {
          // Less than 24 hours
          setMyStatus(parsedStatus);
        } else {
          // Status expired
          await AsyncStorage.removeItem("myStatus");
          setMyStatus(null);
        }
      }
    };

    loadStatus();
  }, []);

  const handleAddStatus = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        "Permission required",
        "Enable gallery access to upload status"
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      const newStatus = {
        image: result.assets[0].uri,
        timestamp: Date.now(),
      };

      await AsyncStorage.setItem("myStatus", JSON.stringify(newStatus));
      setMyStatus(newStatus);
      Alert.alert("Status", "Status added!");
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
statusCardWrapper: {
  borderBottomColor: "#eee",
  borderBottomWidth: 1,
},
  logoComponentContainer: {
    backgroundColor: "white",
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

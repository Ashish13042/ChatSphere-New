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
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale } from "react-native-size-matters";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

interface StatusType {
  image: string;
  timestamp: number;
}

const SERVER_URL = "http://192.168.1.110:5000";

const Status = () => {
  const [myStatus, setMyStatus] = useState<StatusType | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [allStatuses, setAllStatuses] = useState<any[]>([]);
  const navigation = useNavigation<any>();

  const isValidStatus = (status: any): status is StatusType => {
    return status && typeof status.image === "string" && typeof status.timestamp === "number";
  };

  const fetchStatuses = async () => {
    try {
      const res = await fetch("https://vqn6ngc6-5000.inc1.devtunnels.ms/api/status");
      const statuses = await res.json();

      const grouped = statuses.reduce((acc: any, status: any) => {
        if (!acc[status.userId._id]) {
          acc[status.userId._id] = {
            userId: status.userId._id,
            userName: status.userId.userName,
            statuses: [],
          };
        }
        acc[status.userId._id].statuses.push(status);
        return acc;
      }, {});

      const groupedArray = Object.values(grouped);

      const currentUserId = "6826dde66d13b4030dbcdf1a";
      const my = groupedArray.find((g: any) => g.userId === currentUserId);
      const others = groupedArray.filter((g: any) => g.userId !== currentUserId);

      if (my && isValidStatus(my.statuses[0])) {
        setMyStatus(my.statuses[0]);
      } else {
        setMyStatus(null);
      }

      setAllStatuses(others);
    } catch (err) {
      console.error("Failed to fetch status", err);
    }
  };

  useEffect(() => {
    fetchStatuses();
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
      } as any);

      formData.append("userId", "6826dde66d13b4030dbcdf1a");

      try {
        const res = await fetch("https://vqn6ngc6-5000.inc1.devtunnels.ms/api/status/upload", {
          method: "POST",
          body: formData,
        });

        const json = await res.json();
        if (json.status) {
          setMyStatus(json.status);
          Alert.alert("Status added!");
          fetchStatuses();
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
      setModalVisible(true);
    } else {
      handleAddStatus();
    }
  };

  const handleStatusLongPress = () => {
    if (myStatus) {
      setShowDeleteConfirm(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
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
                ? { uri: `${SERVER_URL}${myStatus.image}` }
                : require("../assets/images/Ashishimage.png")
            }
            logoComponent={
              <TouchableOpacity
                onPress={handleAddStatus}
                style={styles.logoComponentContainer}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons name="add-outline" size={moderateScale(20)} color="black" />
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
        data={allStatuses}
        keyExtractor={(item) => item.userId}
        renderItem={({ item }) => (
          <MessageCard
            name={item.userName}
            message={new Date(item.statuses[item.statuses.length - 1].timestamp).toLocaleString()}
            image={{ uri: `${SERVER_URL}${item.statuses[item.statuses.length - 1].image}` }}
            disableNavigation={true}
            onPress={() => navigation.navigate("StatusViewer", { statuses: item.statuses })}
          />
        )}
        contentContainerStyle={{ paddingBottom: 80 }}
      />

      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <Image source={{ uri: `${SERVER_URL}${myStatus?.image}` }} style={styles.fullImage} />
          <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
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
            <Text style={styles.alertMessage}>Are you sure you want to delete your status?</Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity onPress={() => setShowDeleteConfirm(false)} style={styles.cancelButton}>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  textStyle: {
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

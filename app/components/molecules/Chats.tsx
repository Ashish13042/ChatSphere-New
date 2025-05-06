import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import MessageCard from "./MessageCard";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  scale,
  verticalScale,
  moderateScale,
} from "react-native-size-matters";
import { router } from "expo-router";

const Chats = ({ searchQuery = "" }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const data = [
    {
      image: require("../../../assets/images/Ashishimage.png"),
      name: "Ashish Rawat",
      message: "Hi, How r u?",
      time: "5.47 pm",
      messageCount: 2,
    },
    {
      image: require("../../../assets/images/Nishantimage.png"),
      name: "Nishant Kumar Singh",
      message: "Hey there!",
      time: "5.47 pm",
      messageCount: 4,
    },
    {
      image: require("../../../assets/images/Sahilimage.png"),
      name: "Sahil Sharma",
      message: "Hello Bro",
      time: "5.47 pm",
      messageCount: 0,
    },
    {
      image: require("../../../assets/images/Sahilimage.png"),
      name: "Anil Kapoor",
      message: "Hello Bro",
      time: "5.47 pm",
      messageCount: 0,
    },
    
  ];

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleImagePress = (image: any) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={filteredData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <MessageCard
            name={item?.name}
            message={item?.message}
            image={item?.image}
            time={item?.time}
            count={item?.messageCount}
            onImagePress={() => handleImagePress(item?.image)}
          />
        )}
        ListEmptyComponent={
          <View style={{ alignItems: "center", marginTop: 20 }}>
            <Text style={{ fontSize: 16, color: "#999" }}>No chats found</Text>
          </View>
        }
      />

      {/* Modal for enlarged profile image */}
      <Modal
        transparent
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.modalBackground}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.roundWrapper}>
              <Image source={selectedImage} style={styles.fullImage} />
            </View>
          </View>
        </Pressable>
      </Modal>

      {/* Floating New Chat Button */}
      <TouchableOpacity style={styles.newChatButton}>
        <Ionicons name="chatbubble" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default Chats;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    padding: moderateScale(10),
    borderRadius: 20,
  },
  roundWrapper: {
    width: 250,
    height: 250,
    borderRadius: 125,
    overflow: "hidden",
  },
  fullImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  newChatButton: {
    position: "absolute",
    bottom: verticalScale(20),
    right: scale(20),
    backgroundColor: "#3498db",
    padding: scale(15),
    borderRadius: 50,
    elevation: 5,
  },
});

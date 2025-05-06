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
import MessageCard from "./MessageCard"; // Adjust the path
import Ionicons from "react-native-vector-icons/Ionicons";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { Feather, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

const Chats = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const data = [
    {
      image: require("../../../assets/images/Ashishimage.png"),
      name: "Ashish Rawat",
      message: "Today, 5.47 pm",
      rightIcon: <FontAwesome name="video-camera" style={styles.callIcon} />,
      messageLeftIcon: <Feather name="arrow-up-right" style={[styles.messageRigtIcon, {color:"green"}]} />
    },
    {
      image: require("../../../assets/images/Nishantimage.png"),
      name: "Nishant Kumar Singh",
      message: "26 April, 11.47 pm",
      rightIcon: <Ionicons name="call" style={styles.callIcon} />,
      messageLeftIcon: <Feather name="arrow-down-left" style={[styles.messageRigtIcon, {color:"red"}]} />
    },
    {
      image: require("../../../assets/images/Sahilimage.png"),
      name: "Sahil Sharma",
      message: "30 March, 5.10 am",
      rightIcon: <FontAwesome name="video-camera" style={styles.callIcon} />,
      messageLeftIcon: <Feather name="arrow-down-left" style={[styles.messageRigtIcon, {color:"red"}]} />
    },
    
  ];

  const handleImagePress = (image: any) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <MessageCard
            name={item?.name}
            message={item?.message}
            image={item?.image}
            rightIcon={item?.rightIcon}
            onImagePress={() => handleImagePress(item?.image)}
            messageLefticon={item?.messageLeftIcon}
          />
        )}
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

            <View style={styles.iconRow}>
              <View style={styles.iconButtonWrapper}>
                <TouchableOpacity style={styles.iconButton}>
                  <Ionicons name="call" size={28} color="white" />
                </TouchableOpacity>
                <Text style={styles.iconText}>Call</Text>
              </View>

              <View style={styles.iconButtonWrapper}>
                <TouchableOpacity style={styles.iconButton} onPress={() => router.push("./main/ChatScreen")}>
                  <MaterialIcons name="message" size={28} color="white" />
                </TouchableOpacity>
                <Text style={styles.iconText}>Message</Text>
              </View>
            </View>
          </View>
        </Pressable>
      </Modal>

      {/* Floating New Chat Button */}
      <TouchableOpacity style={styles.newChatButton}>
        <MaterialIcons name="add-call" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  newChatButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#3498db",
    padding: 20,
    borderRadius: 25,
    elevation: 5,
  },
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
  iconRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: verticalScale(20),
  },

  iconButton: {
    backgroundColor: "black",
    padding: moderateScale(10),
    borderRadius: 50,
    marginHorizontal: scale(10),
  },
  iconButtonWrapper: {
    alignItems: "center",
    marginHorizontal: scale(10),
  },
  iconText: {
    color: "white",
    alignItems: "center",
  },
  callIcon:{
    color:"#3498db",
    fontSize:moderateScale(25),
  },
  messageRigtIcon:{
    color:"#3498db",
    fontSize:moderateScale(15),
  }
});

export default Chats;

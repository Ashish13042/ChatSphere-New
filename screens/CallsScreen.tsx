import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
  Pressable,
  Alert,
} from "react-native";
import React, { useState } from "react";
import MessageCard from "../components/MessageCard";
import Ionicons from "react-native-vector-icons/Ionicons";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { Feather, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Linking } from "react-native";

const Chats = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const [selectedPhoneNumber, setSelectedPhoneNumber] = useState<string | null>(
    null
  );

  const data = [
    {
      image: require("../assets/images/Ashishimage.png"),
      name: "Ashish Rawat",
      message: "Today, 5.47 pm",
      phoneNumber: "+917011491458",
      rightIcon: <FontAwesome name="video-camera" style={styles.callIcon} />,
      messageLeftIcon: (
        <Feather
          name="arrow-up-right"
          style={[styles.messageRigtIcon, { color: "green" }]}
        />
      ),
    },
    {
      image: require("../assets/images/Nishantimage.png"),
      name: "Nishant Kumar Singh",
      message: "26 April, 11.47 pm",
      phoneNumber: "+917827603933",
      rightIcon: <Ionicons name="call" style={styles.callIcon} />,
      messageLeftIcon: (
        <Feather
          name="arrow-down-left"
          style={[styles.messageRigtIcon, { color: "red" }]}
        />
      ),
    },
    {
      image: require("../assets/images/Sahilimage.png"),
      name: "Sahil Sharma",
      message: "30 March, 5.10 am",
      phoneNumber: "+916396918065",
      rightIcon: <FontAwesome name="video-camera" style={styles.callIcon} />,
      messageLeftIcon: (
        <Feather
          name="arrow-down-left"
          style={[styles.messageRigtIcon, { color: "red" }]}
        />
      ),
    },
  ];

  const handleCall = (phoneNumber: string) => {
    const url = `tel:${phoneNumber}`;
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert("Error", "Your device does not support this feature.");
        }
      })
      .catch((err) => console.error(err));
  };

  const handleImagePress = (contact: any) => {
    setSelectedContact(contact);
    setSelectedImage(contact.image);
    setSelectedPhoneNumber(contact.phoneNumber);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerStyle}>Calls</Text>

      {/* List of messages */}
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <MessageCard
            name={item?.name}
            message={item?.message}
            image={item?.image}
            rightIcon={item?.rightIcon}
            onImagePress={() => handleImagePress(item)}
            messageLefticon={item?.messageLeftIcon}
            disableNavigation={true}
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
                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={() => {
                    if (selectedPhoneNumber) {
                      handleCall(selectedPhoneNumber);
                    }
                  }} // ← Use selected number
                >
                  <Ionicons name="call" size={28} color="white" />
                </TouchableOpacity>

                <Text style={styles.iconText}>Call</Text>
              </View>

              <View style={styles.iconButtonWrapper}>
                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={() =>
                    router.push({
                      pathname: "/chat",
                      params: {
                        name: selectedContact?.name,
                        message: selectedContact?.message,
                      },
                    })
                  }
                >
                  <MaterialIcons name="message" size={28} color="white" />
                </TouchableOpacity>
                <Text style={styles.iconText}>Message</Text>
              </View>
            </View>
          </View>
        </Pressable>
      </Modal>

      {/* Floating New Chat Button */}
      <TouchableOpacity
        style={styles.newChatButton}
        onPress={() => router.push({ pathname: "/chat/new-chat" })}
      >
        <Ionicons name="person-add" size={24} color="white" />
        <Text style={styles.textStyle}>Add Friends</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 16,
    paddingVertical: 50
  },
  headerStyle:{
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  newChatButton: {
    position: "absolute",
    bottom: 120,
    right: 20,
    backgroundColor: "#ff8000",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 30,
    elevation: 5,
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
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
  textStyle: {
    color: "white",
    fontWeight: "bold",
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
  callIcon: {
    color: "#ff8000",
    fontSize: moderateScale(25),
  },
  messageRigtIcon: {
    color: "#3498db",
    fontSize: moderateScale(15),
  },
});

export default Chats;
// HomeScreen.js
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Animated,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { router } from "expo-router";

const { width } = Dimensions.get("window");

const chats = [
  {
    id: "1",
    name: "Ashish Rawat",
    message: "Hey! How's it going?",
    time: "10:30 AM",
    profileImage: require("../../../assets/images/Profilesample.png"),
  },
  {
    id: "2",
    name: "Nishant Kumar Singh",
    message: "What's up?",
    time: "9:45 AM",
    profileImage: require("../../../assets/images/Profilesample.png"),
  },
  {
    id: "3",
    name: "Sahil Sharma",
    message: "Hi there",
    time: "8:15 AM",
    profileImage: require("../../../assets/images/Profilesample.png"),
  },
  {
    id: "4",
    name: "Ashish Rawat",
    message: "Hey! How's it going?",
    time: "10:30 AM",
    profileImage: require("../../../assets/images/Profilesample.png"),
  },
  {
    id: "5",
    name: "Nishant Kumar Singh",
    message: "What's up?",
    time: "9:45 AM",
    profileImage: require("../../../assets/images/Profilesample.png"),
  },
  {
    id: "6",
    name: "Sahil Sharma",
    message: "Hi there",
    time: "8:15 AM",
    profileImage: require("../../../assets/images/Profilesample.png"),
  },
  {
    id: "7",
    name: "Ashish Rawat",
    message: "Hey! How's it going?",
    time: "10:30 AM",
    profileImage: require("../../../assets/images/Profilesample.png"),
  },
  {
    id: "8",
    name: "Nishant Kumar Singh",
    message: "What's up?",
    time: "9:45 AM",
    profileImage: require("../../../assets/images/Profilesample.png"),
  },
  {
    id: "9",
    name: "Sahil Sharma",
    message: "Hi there",
    time: "8:15 AM",
    profileImage: require("../../../assets/images/Profilesample.png"),
  },
];

const HomeScreen = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  

  

  return (
    <View style={styles.container}>

      {/* Chat List */}
      <FlatList
        contentContainerStyle={{ padding: 10 }}
        data={chats}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <BlurView intensity={50} tint="light" style={styles.chatItem}>
            <TouchableOpacity style={styles.chatRow}>
              <Image source={item.profileImage} style={styles.profileImage} />

              <View style={styles.chatInfo}>
                <Text style={styles.chatName}>{item.name}</Text>
                <Text style={styles.chatMessage}>{item.message}</Text>
              </View>
              <Text style={styles.chatTime}>{item.time}</Text>
            </TouchableOpacity>
          </BlurView>
        )}
      />

      {/* Floating New Chat Button */}
      <TouchableOpacity style={styles.newChatButton}>
        <Ionicons name="chatbubble" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f3f4 ",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#f0f3f4", 
  },
  headerText: {
    fontSize: 24,
    fontWeight:"500",
    color: "#3498db",
  },

  profileSection: {
    alignItems: "center",
  },
  profilePic: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  profileName: {
    fontSize: 16,
    color: "#2196f3",
    marginTop: 8,
    fontWeight: "600",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  chatItem: {
    borderRadius: 30,
    marginVertical: 10,
    backgroundColor: "#ecf0f1",
    
    // Android
    elevation: 9, // smaller elevation gives a subtle shadow
  
    // iOS
    shadowColor: "#3498db",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 9,
  },
  
  chatRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eaf2f8 ",
    padding: 15,
    borderRadius: 30,
  },
  chatInfo: {
    flex: 1,
    marginLeft: 10,
  },
  chatName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  chatMessage: {
    color: "#555",
  },
  chatTime: {
    color: "#999",
    fontSize: 12,
  },
  newChatButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#3498db",
    padding: 20,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
    zIndex: 1,
  },
});

export default HomeScreen;

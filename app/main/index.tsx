import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Animated,
  Modal,
  Image,
  Dimensions,
} from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import React, { useState, useRef, useEffect } from "react";
import { AntDesign, Entypo} from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Chats from "../components/molecules/Chats";
import Calls from "../components/molecules/Calls";
import Status from "../components/molecules/Status";


const Index = () => {
  const [currentPage, setCurrentPage] = useState("Chats");
  const [menuVisible, setMenuVisible] = useState(false);

  

  const ActivePage = () => {
    switch (currentPage) {
      case "Chats":
        return <Chats />;
      case "Status":
        return <Status />;
      case "Calls":
        return <Calls />;
      default:
        return <Chats />;
    }
  };

  const ChatSphereHeader = () => {
    return (
      <View style={styles.chatsphereHeaderStyle}>
        <Text style={styles.chatsphereText}>ChatSphere</Text>
        <View style={styles.iconContainer}>
          <AntDesign name="search1" style={styles.HeaderIcon} />
          <Entypo name="dots-three-vertical" style={styles.HeaderIcon} />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#3498db" barStyle="light-content" />
      <ChatSphereHeader />
      <View style={styles.topBarConatiner}>
        {["Chats", "Status", "Calls"].map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setCurrentPage(item)}
            style={[
              styles.topBarButton,
              item === currentPage && { borderColor: "white" },
            ]}
          >
            <Text style={styles.topBarText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {ActivePage()}


      
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBarConatiner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scale(12),
    backgroundColor: '#3498db',
    gap: scale(10),
  },
  topBarButton: {
    flex: 1,
    alignItems: 'center',
    borderBottomWidth: 3,
    paddingBottom: verticalScale(10),
    borderColor: '#3498db',
  },
  topBarText: {
    fontSize: moderateScale(14), // reduced from 16
    fontWeight: 'bold',
    color: 'white',
    textTransform: 'uppercase',
  },
  HeaderIcon: {
    fontSize: moderateScale(18), // reduced from 24
    color: 'white',
  },
  chatsphereHeaderStyle: {
    backgroundColor: '#3498db',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(15),
    paddingBottom: verticalScale(17),
    paddingTop: verticalScale(10),
  },
  iconContainer: {
    flexDirection: 'row',
    gap: scale(10),
  },
  chatsphereText: {
    fontSize: moderateScale(20), 
    fontWeight: 'bold',
    color: 'white',
  },
  // Sidebar styles
  
  
});


export default Index;

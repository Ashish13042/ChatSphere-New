import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Modal,
  Pressable,
  TextInput,
} from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import React, { useState } from "react";
import {
  AntDesign,
  Entypo,
  FontAwesome,
  MaterialIcons,
} from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Chats from "../components/molecules/Chats";
import Calls from "../components/molecules/Calls";
import Status from "../components/molecules/Status";
import { router } from "expo-router";

const Index = () => {
  const [currentPage, setCurrentPage] = useState("Chats");
  const [menuVisible, setMenuVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const ActivePage = () => {
    switch (currentPage) {
      case "Chats":
        return <Chats searchQuery={searchQuery} />;
      case "Status":
        return <Status />;
      case "Calls":
        return <Calls />;
      default:
        return <Chats searchQuery={searchQuery} />;
    }
  };

  const ChatSphereHeader = () => {
    return (
      <View style={styles.chatsphereHeaderStyle}>
        <Text style={styles.chatsphereText}>ChatSphere</Text>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => setSearchVisible(!searchVisible)}>
            <AntDesign name="search1" style={styles.HeaderIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setMenuVisible(true)}>
            <Entypo name="dots-three-vertical" style={styles.HeaderIcon} />
          </TouchableOpacity>
        </View>

        {/* Dropdown Menu Modal */}
        <Modal
          transparent
          visible={menuVisible}
          animationType="fade"
          onRequestClose={() => setMenuVisible(false)}
        >
          <Pressable
            style={styles.menuOverlay}
            onPress={() => setMenuVisible(false)}
          >
            <View style={styles.menuContainer}>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  setMenuVisible(false);
                  router.push("./main/Profile");
                }}
              >
                <FontAwesome name="user-circle" size={20} color="black" />
                <Text style={styles.menuText}>Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem}>
                <MaterialIcons name="settings" size={20} color="black" />
                <Text style={styles.menuText}>Settings</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem}>
                <MaterialIcons name="logout" size={20} color="black" />
                <Text style={styles.menuText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Modal>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#3498db" barStyle="light-content" />
      <ChatSphereHeader />
      {searchVisible && (
        <View style={styles.searchContainer}>
          <AntDesign
            name="search1"
            size={18}
            color="#888"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      )}

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

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBarConatiner: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: scale(12),
    backgroundColor: "#3498db",
    gap: scale(10),
  },
  topBarButton: {
    flex: 1,
    alignItems: "center",
    borderBottomWidth: 3,
    paddingBottom: verticalScale(10),
    borderColor: "#3498db",
  },
  topBarText: {
    fontSize: moderateScale(14),
    fontWeight: "bold",
    color: "white",
    textTransform: "uppercase",
  },
  HeaderIcon: {
    fontSize: moderateScale(18),
    color: "white",
  },
  chatsphereHeaderStyle: {
    backgroundColor: "#3498db",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: scale(15),
    paddingBottom: verticalScale(17),
    paddingTop: verticalScale(10),
  },
  iconContainer: {
    flexDirection: "row",
    gap: scale(10),
  },
  chatsphereText: {
    fontSize: moderateScale(20),
    fontWeight: "bold",
    color: "white",
  },
  menuOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  menuContainer: {
    position: "absolute",
    top: verticalScale(50), // adjust based on header height
    right: scale(10),
    backgroundColor: "white",
    borderRadius: 15,
    elevation: 5,
    paddingVertical: verticalScale(5),
    paddingHorizontal: scale(10),
    zIndex: 10,
    height: verticalScale(130),
    width: scale(150),
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    gap: 10,
  },
  menuText: {
    fontSize: 16,
    color: "black",
  },
  searchInput: {
    flex: 1,
    fontSize: moderateScale(14),
    color: "#3498db",
    paddingVertical: 0,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3498db",
    marginHorizontal: scale(15),

    borderRadius: scale(20),
    paddingHorizontal: scale(10),
    height: verticalScale(36),
  },
  searchIcon: {
    marginRight: scale(5),
  },
});

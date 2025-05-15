import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import ChatsTab from "@/components/tabs/ChatTab";
import RequestsTab from "@/components/tabs/RequestTab";
import GroupsTab from "@/components/tabs/GroupTab";
import ArchiveTab from "@/components/tabs/ArchiveTab";
import { useSelector } from "react-redux";
import { RootState } from "@/features/store";
import { styles } from "@/styles/HomeScreenStyle";
import { useRouter } from "expo-router";
import { MAINURL } from "@/services/APIURL";

const HomeScreen = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "chats", title: "Chats" },
    { key: "requests", title: "Requests" },
    { key: "groups", title: "Groups" },
    { key: "archive", title: "Archive" },
  ]);
  const { user } = useSelector((state: RootState) => state.user);
  const router = useRouter();

  const renderScene = SceneMap({
    chats: ChatsTab,
    requests: RequestsTab,
    groups: GroupsTab,
    archive: ArchiveTab,
  });

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: "#ff8000" }}
      style={{ backgroundColor: "#fff" }}
      activeColor="#000"
      inactiveColor="#aaa"
      labelStyle={{ fontWeight: "bold" }}
    />
  );

  return (
    <View style={styles.container}>
      {/* 🧭 Header Section (static) */}
      <View style={styles.header}>
        <View>
          <Image
            style={styles.profileImage}
            source={{
              uri: `${MAINURL}/uploads/${user?.profileImage}`,
            }}
          />
        </View>
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={styles.username}>{user?.name}</Text>
          <Text style={styles.status}>{user?.userName}</Text>
        </View>
      </View>

      {/* 🧭 Tab View Section */}
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />

      {/* ➕ Floating Button */}
      <TouchableOpacity
        style={styles.newChatBtn}
        onPress={() => router.push({ pathname: "../../chat/new-chat" })}
      >
        <MaterialCommunityIcons
          name="message-text-outline"
          size={24}
          color="#fff"
        />
        <Text style={styles.newChatText}>New chat</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

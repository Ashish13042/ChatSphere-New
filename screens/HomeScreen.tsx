import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  SectionList,
  Pressable,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { RootState } from "@/features/store";
import { useRouter } from "expo-router";

const chats = [
  {
    id: "1",
    name: "Emily",
    message: "Wanna lunch with me?",
    email: "emily321@gmail.com",
    userName: "emily321",
    time: "9:41 AM",
    unread: 2,
    pinned: true,
    avatar:
      "https://img.freepik.com/free-vector/young-man-with-glasses-avatar_1308-175763.jpg?uid=R98797265&ga=GA1.1.921125074.1743352734&semt=ais_hybrid&w=740",
  },
  {
    id: "2",
    name: "Nishant",
    message: "📁 Photo",
    time: "9:34 AM",
    email: "ntih5565@gmail.com",
    userName: "Nishant",
    unread: 1,
    pinned: true,
    avatar:
      "https://img.freepik.com/free-vector/smiling-redhaired-boy-illustration_1308-175803.jpg?uid=R98797265&ga=GA1.1.921125074.1743352734&semt=ais_hybrid&w=740",
  },
  {
    id: "3",
    name: "Farhan",
    message: "You: Okayy",
    email: "farhan712@gmail.com",
    userName: "farhan712",
    time: "7:00 AM",
    unread: 0,
    pinned: false,
    avatar:
      "https://img.freepik.com/free-vector/young-man-glasses-hoodie_1308-174658.jpg?uid=R98797265&ga=GA1.1.921125074.1743352734&semt=ais_hybrid&w=740",
  },
  {
    id: "4",
    name: "Amir",
    message: "📁 Photo",
    email: "amirkuchupuchu@gmail.com",
    userName: "amirkuchupuchu",
    time: "6:45 AM",
    unread: 0,
    pinned: false,
    avatar:
      "https://img.freepik.com/free-vector/young-prince-vector-illustration_1308-174367.jpg?uid=R98797265&ga=GA1.1.921125074.1743352734&semt=ais_hybrid&w=740",
  },
];

interface Chat {
  id: string;
  name: string;
  message: string;
  time: string;
  unread: number;
  pinned?: boolean;
  avatar: string;
  email?: string;
  userName?: string;
}

const HomeScreen = () => {
  const pinnedChats = chats.filter((chat) => chat.pinned);
  const otherChats = chats.filter((chat) => !chat.pinned);
  const router = useRouter();

  const handleChatPress = (chat: Chat) => {
    router.push({
      pathname: "../../chat", // assuming your file is app/chat.tsx or chat/index.tsx
      params: {
        userName: chat.userName,
        image: chat.avatar,
        name: chat.name,
        email: chat.email,
      },
    });
  };

  const { user, status } = useSelector((state: RootState) => state.user);
  const renderChat = ({ item }: { item: Chat }) => (
    <Pressable
      style={[styles.chatItem, {
          opacity: user?.userName === item.userName ? 0 : 1,
      }]}
      onPress={() => handleChatPress(item)}
      key={item.id}
    >
      <Image source={{ uri: item?.avatar }} style={styles.avatar} />
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.message}>{item.message}</Text>
      </View>
      <View style={styles.meta}>
        <Text style={styles.time}>{item.time}</Text>
        {item.unread > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadText}>{item.unread}</Text>
          </View>
        )}
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.profileImage}
          source={{
            uri:
              user?.profileImage ||
              "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?uid=R98797265&ga=GA1.1.921125074.1743352734&semt=ais_hybrid&w=740",
          }}
        />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={styles.username}>{user?.name}</Text>
          <Text style={styles.status}>{user?.userName}</Text>
        </View>
        <Ionicons
          name="search-outline"
          size={24}
          color="#000"
          style={{ marginHorizontal: 8 }}
        />
        <Ionicons name="ellipsis-vertical" size={20} color="#000" />
      </View>

      {/* Title */}
      <View style={styles.titleRow}>
        <Text style={styles.title}>Chat</Text>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>34</Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabBar}>
        {["All", "Office", "Family", "Archive"].map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={index === 0 ? styles.activeTab : styles.inactiveTab}
          >
            <Text
              style={
                index === 0 ? styles.activeTabText : styles.inactiveTabText
              }
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Pinned / Conversation */}
      <SectionList
        sections={[
          { title: "📌 Pinned", data: pinnedChats },
          { title: "💬 Chats", data: otherChats },
        ]}
        keyExtractor={(item) => item.id}
        renderItem={renderChat}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionTitle}>{title}</Text>
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      />

      {/* Floating Button */}
      <TouchableOpacity style={styles.newChatBtn}>
        <MaterialCommunityIcons
          name="message-text-outline"
          size={24}
          color="#fff"
          style={{ marginRight: 8 }}
        />
        <Text style={styles.newChatText}>New chat</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF", paddingHorizontal: 16 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  profileImage: {
    height: 60,
    width: 60,
    borderRadius: 25,
  },
  username: { fontWeight: "bold", fontSize: 20 },
  status: { fontSize: 13, color: "gray" },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  title: { fontSize: 28, fontWeight: "bold" },
  countBadge: {
    backgroundColor: "#eee",
    borderRadius: "100%",
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  countText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  activeTab: {
    backgroundColor: "#fff",
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 20,
    elevation: 2,
  },
  inactiveTab: {
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  activeTabText: {
    color: "#000",
    fontWeight: "bold",
  },
  inactiveTabText: {
    color: "#aaa",
  },
  sectionTitle: {
    marginTop: 20,
    marginBottom: 8,
    fontWeight: "600",
    color: "#333",
  },
  chatItem: {
    flexDirection: "row",
    paddingVertical: 14,
    alignItems: "center",
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  avatar: {
    height: 60,
    width: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  name: { fontWeight: "bold", fontSize: 15 },
  message: { color: "gray", fontSize: 13 },
  meta: {
    alignItems: "flex-end",
  },
  time: {
    fontSize: 12,
    color: "gray",
    marginBottom: 5,
  },
  unreadBadge: {
    backgroundColor: "red",
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  unreadText: {
    color: "#fff",
    fontSize: 10,
  },
  newChatBtn: {
    position: "absolute",
    bottom: 120,
    right: 20,
    backgroundColor: "#ff8000",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 30,
    elevation: 5,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
  },
  newChatText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default HomeScreen;

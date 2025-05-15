import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  SectionList,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { RootState } from "@/features/store";
import { useRouter } from "expo-router";
import axiosInstance from "@/services/GlobalApi";
import { styles } from "@/styles/HomeScreenStyle";

interface Contact {
  _id: string;
  contactId: string;
  name: string;
  userName: string;
  profileImage: string;
  email?: string;
  lastMessage: string;
  lastMessageType: string;
  lastMessageTime: string;
  addedAt: string;
  pinned?: boolean; // You can add logic for pinned if needed
}
const HomeScreen = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await axiosInstance.get("/contacts");
        setContacts(res.data as Contact[]);
      } catch (err) {
        // Handle error as needed
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  // Optionally, implement pinned logic if you want
  const pinnedChats = contacts.filter((c) => c.pinned);
  const otherChats = contacts.filter((c) => !c.pinned);

  const handleChatPress = (chat: Contact) => {
    router.push({
      pathname: "../../chat",
      params: {
        userName: chat.userName,
        image: chat.profileImage,
        name: chat.name,
        email: chat.email,
      },
    });
  };

  const renderChat = ({ item }: { item: Contact }) => (
    <Pressable
      style={[
        styles.chatItem,
        {
          opacity: user?.userName === item.userName ? 0 : 1,
        },
      ]}
      onPress={() => handleChatPress(item)}
      key={item._id}
    >
      <Image source={{ uri: item.profileImage }} style={styles.avatar} />
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.message}>{item.lastMessage}</Text>
      </View>
      <View style={styles.meta}>
        <Text style={styles.time}>
          {item.lastMessageTime
            ? new Date(item.lastMessageTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : ""}
        </Text>
      </View>
    </Pressable>
  );

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color="#ff8000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* ...header and tabs remain unchanged... */}
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

      <View style={styles.titleRow}>
        <Text style={styles.title}>Chat</Text>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{contacts.length}</Text>
        </View>
      </View>

      <View style={styles.tabBar}>
        {["Chats", "Request", "Group", "Archive"].map((tab, index) => (
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

      {contacts.length === 0 ? (
        <View
          style={{
            // marginTop: 20,
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 18, color: "#000" }}>
            No chats available.
          </Text>
          <Text style={{ fontSize: 14, color: "#aaa" }}>
            Start a new chat now!
          </Text>
        </View>
      ) : (
        <SectionList
          sections={[{ title: "💬 Chats", data: contacts }]}
          keyExtractor={(item) => item._id}
          renderItem={renderChat}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.sectionTitle}>{title}</Text>
          )}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* <SectionList
        sections={[
          { title: "📌 Pinned", data: pinnedChats },
          { title: "💬 Chats", data: otherChats },
        ]}
        keyExtractor={(item) => item._id}
        renderItem={renderChat}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionTitle}>{title}</Text>
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      /> */}

      <TouchableOpacity
        style={styles.newChatBtn}
        onPress={() => {
          router.push({
            pathname: "../../chat/new-chat",
          });
        }}
      >
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

export default HomeScreen;

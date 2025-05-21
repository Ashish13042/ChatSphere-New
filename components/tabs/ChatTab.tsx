import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  SectionList,
  Pressable,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "@/features/store";
import axiosInstance from "@/services/GlobalApi";
import { styles } from "@/styles/HomeScreenStyle";
import { useRouter } from "expo-router";
import { MAINURL } from "@/services/APIURL";
import { Ionicons, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import renderModalContent from "../UserDetailModel";
import RenderModalContent from "../UserDetailModel";

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
  pinned?: boolean;
}

const ChatTab = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await axiosInstance.get("/contacts");
        setContacts(res.data as Contact[]);
      } catch (error) {
        console.error("Error loading contacts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

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

  const handleImagePress = (contact: Contact) => {
    setSelectedContact(contact);
    setModalVisible(true);
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
      <Pressable onPress={() => handleImagePress(item)}>
        <Image
          source={{
            uri: `${MAINURL}/uploads/${item.profileImage}`,
          }}
          style={styles.avatar}
        />
      </Pressable>
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
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#4E6E5D" />
      </View>
    );
  }

  return (
    <>
      {contacts.length === 0 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
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
          sections={[{ data: contacts }]}
          keyExtractor={(item) => item._id}
          renderItem={renderChat}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        />
      )}

      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <TouchableOpacity
          style={{ flex: 1 }}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}
        >
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <RenderModalContent
              selectedContact={selectedContact}
              setModalVisible={setModalVisible}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

export default ChatTab;

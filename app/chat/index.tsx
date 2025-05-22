import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import { router, useLocalSearchParams, useRouter } from "expo-router";
import socket from "@/services/socket";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/features/store";
import axiosInstance from "@/services/GlobalApi";
import MessageInput from "@/components/MessageInput";
import TypingIndicator from "@/components/TypingIndicator";
import { getLocalItem } from "@/services/secureStorage";
import styles from "@/styles/ChatScreenStyle";
import MessageList from "@/components/MessageList";
import Header from "@/components/Header";
import { AppDispatch } from "@/features/store";
import { fetchUser } from "@/features/userSlice";
const ChatScreen = () => {
  const { userName, name, image, email } = useLocalSearchParams();
  const router = useRouter();
  interface Message {
    id?: any;
    roomId: any;
    sender: string;
    text?: string;
    type: "text" | "image";
    uri?: string;
  }

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState<string | null>(null);
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = user?.userName;
  const recipientUser = userName?.toString();
  const roomId = [currentUser, recipientUser].sort().join("_");

  const flatListRef = useRef<FlatList>(null);

  //* Join the room when the component mounts
  useEffect(() => {

    if (!currentUser || !recipientUser) return;

    socket.emit("join-room", { roomId });
    socket.on("receive-message", (data: any) => {
      console.log("Message received:", data);
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receive-message");
    };
  }, [roomId]);

  //* Fetch chat history when the component mounts
  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await axiosInstance.get(`/chat/${roomId}`);
        const data = response.data as { messages: Message[] };
        const formattedMessages = data.messages.map((msg) => ({
          ...msg,
          sender: msg.sender === currentUser ? "me" : msg.sender,
        }));
        setMessages(formattedMessages || []);
      } catch (error) {
        console.error("Failed to fetch chat history:", error);
      }
    };

    fetchChatHistory();
  }, [roomId]);

  //* Handle typing indicator
  useEffect(() => {
    socket.on("typing", ({ sender }) => {
      if (sender !== currentUser) {
        setTypingUser(typeof name === "string" ? name : null);
        setIsTyping(true);
        setTimeout(() => setIsTyping(false), 2000); // Reset after 2 seconds
      }
    });

    return () => {
      socket.off("typing");
    };
  }, [currentUser]);

  //* Handle send message
  const handleSend = async () => {
    if (!input.trim()) return;

    const messageData = {
      roomId,
      sender: currentUser,
      text: input,
      type: "text",
      reciever: recipientUser,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [
      ...prev,
      { ...messageData, sender: "me" } as Message,
    ]);
    setInput("");
    flatListRef.current?.scrollToEnd({ animated: true });
    socket.emit("send-message", messageData);
    try {
      await axiosInstance.post("/chat/save", messageData);
    } catch (error) {
      console.error("❌ Failed to save message:", error);
    }
  };

  //* Handle pick image
  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      const fileName = uri.split("/").pop() || "image.jpg";
      const match = /\.(\w+)$/.exec(fileName);
      const type = match ? `image/${match[1]}` : `image`;

      const formData = new FormData();
      formData.append("file", {
        uri,
        name: fileName,
        type,
      } as any);

      try {
        const token = getLocalItem("userToken");
        console.log("File:", formData.get("file"));
        const response = await axiosInstance.post("/upload/file", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        const uploadRes = response.data;
        if (response.status !== 200) {
          throw new Error("Failed to upload image");
        }
        console.log("Image uploaded successfully:", uploadRes);
        const filename = (uploadRes as { filename: string }).filename;
        const messageData = {
          roomId,
          sender: currentUser,
          type: "image",
          uri: filename,
          reciever: recipientUser,
        };

        setMessages((prev) => [
          ...prev,
          { ...messageData, sender: "me" } as Message,
        ]);
        socket.emit("send-message", messageData);

        await axiosInstance.post("/chat/save", messageData);
      } catch (error) {
        console.error("Failed to upload/send image:", error);
      }
    }
  };

  //* Handle typing
  const handleTyping = () => {
    socket.emit("typing", { roomId, sender: currentUser });
  };

  // scroll to the bottom when messages change
  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  //* Handle back button to go back to the previous screen
  const handleBack = () => {
    router.back();
  };

  const handleDeleteMessage = (messageId: string) => {
    setMessages((prev) =>
      prev.filter((msg) => msg.id !== messageId && msg.id !== messageId)
    );
  };

  return (
    <View style={styles.container}>
      <Header
        image={Array.isArray(image) ? image[0] : image}
        title={Array.isArray(name) ? name.join(", ") : name || "Chat"}
        userName={Array.isArray(userName) ? userName.join(", ") : userName}
        handleBack={handleBack}
      />

      <View style={styles.chatSection}>
        <MessageList
          messages={messages}
          flatListRef={flatListRef}
          onDeleteMessage={handleDeleteMessage}
        />
        {isTyping && typingUser && <TypingIndicator />}

        <MessageInput
          input={input}
          setInput={setInput}
          handleTyping={handleTyping}
          handleSend={handleSend}
          handlePickImage={handlePickImage}
        />
      </View>
    </View>
  );
};

export default ChatScreen;

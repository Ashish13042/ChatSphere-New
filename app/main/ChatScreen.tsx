import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import { Audio } from "expo-av";
import { useLocalSearchParams } from "expo-router";
import socket from "@/services/socket";
import { useEffect } from "react";


const ChatScreen = () => {
  interface Message {
    id: string;
    text?: string;
    type: "text" | "image" | "audio";
    uri?: string;
    sender: string;
  }
  
  const { name, image } = useLocalSearchParams();
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", text: "Hey!", type: "text", sender: "other" },
    { id: "2", text: "Hello! How are you?", type: "text", sender: "me" },
    { id: "3", text: "Fine", type: "text", sender: "other" },
    { id: "4", text: "What about u?", type: "text", sender: "other" },
    { id: "5", text: "I m good", type: "text", sender: "me" },
  ]);
  const [input, setInput] = useState("");
  const [recording, setRecording] = useState<Audio.Recording | null>(null);

  const handleSend = () => {
    if (input.trim()) {
      const messageData = {
        roomId: "demoID",
        text: input,
        type: "text",
        sender: "me",
      };
  
      // Show locally
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: input,
          type: "text",
          sender: "me",
        },
      ]);
  
      // Emit via socket
      socket.emit("send-message", messageData);
      setInput("");
    }
  };
  



  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled) {
      const uri = result.assets[0].uri;
    
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          type: "image",
          uri,
          sender: "me",
        },
      ]);
    
      socket.emit("send-message", {
        roomId: name?.toString(),
        type: "image",
        uri,
        sender: "me",
      });
    }
    
  };

  const handleRecordAudio = async () => {
    try {
      if (recording) {
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        setRecording(null);

        if (uri) {
          setMessages((prev) => [
            ...prev,
            { id: Date.now().toString(), type: "audio", uri, sender: "me" },
          ]);
          
          socket.emit("send-message", {
            roomId: name?.toString(),
            type: "audio",
            uri,
            sender: "me",
          });
          
        }
      } else {
        const permission = await Audio.requestPermissionsAsync();
        if (permission.granted) {
          const { recording } = await Audio.Recording.createAsync(
            Audio.RecordingOptionsPresets.HIGH_QUALITY
          );
          setRecording(recording);
        }
      }
    } catch (error) {
      console.error("Audio error:", error);
    }
  };

  useEffect(() => {
    const roomId = name?.toString(); // use `name` as roomId or customize
  
    socket.emit("join-room", roomId);
  
    socket.on("receive-message", (data) => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          type: data.type,
          text: data.text,
          uri: data.uri,
          sender: "other",
        },
      ]);
    });
  
    return () => {
      socket.off("receive-message");
    };
  }, []);
  

  const renderMessage = ({ item }: { item: Message }) => {
    if (item.type === "image") {
      return <Image source={{ uri: item.uri }} style={styles.imageMessage} />;
    }
    if (item.type === "audio") {
      return (
        <TouchableOpacity
          onPress={async () => {
            if (item.uri) {
              const { sound } = await Audio.Sound.createAsync({ uri: item.uri });
              await sound.playAsync();
            } else {
              console.error("Audio URI is undefined");
            }
          }}
          style={styles.audioBubble}
        >
          <Ionicons name="play" size={20} color="#fff" />
          <Text style={{ color: "#fff", marginLeft: 8 }}>Play Audio</Text>
        </TouchableOpacity>
      );
    }
    return (
      <View
        style={[
          styles.messageBubble,
          item.sender === "me" ? styles.myMessage : styles.theirMessage,
        ]}
      >
        <Text style={styles.messageText}>{item.text}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{name}</Text>
      </View>
        {/* Message List */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={{ padding: 10 }}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={handlePickImage}>
          <Ionicons name="image" size={24} color="#1a1a1a" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleRecordAudio}
          style={{ marginHorizontal: 10 }}
        >
          <Ionicons
            name={recording ? "stop-circle" : "mic"}
            size={24}
            color={recording ? "red" : "#1a1a1a"}
          />
        </TouchableOpacity>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Type a message"
          style={styles.input}
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Ionicons name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    height: 60,
    backgroundColor: "#3498db",
    justifyContent: "center",
    paddingHorizontal: 16,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  messageBubble: {
    maxWidth: "70%",
    padding: 10,
    marginVertical: 5,
    borderRadius: 12,
  },
  messageList: {
    flexGrow: 1,
    padding: 10,
  },
  myMessage: {
    backgroundColor: "#3498db",
    alignSelf: "flex-end",
    borderTopRightRadius: 0,
  },
  theirMessage: {
    backgroundColor: "#ddd",
    alignSelf: "flex-start",
    borderTopLeftRadius: 0,
  },
  messageText: {
    fontSize: 16,
    color: "#000",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  input: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 20,
    marginHorizontal: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: "#007AFF",
    borderRadius: 20,
    padding: 10,
  },
  imageMessage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    alignSelf: "flex-end",
    marginVertical: 5,
  },
  audioBubble: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4caf50",
    padding: 10,
    borderRadius: 12,
    alignSelf: "flex-end",
    marginVertical: 5,
  },
});

import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useMemo, useRef, useState } from "react";
import styles from "@/styles/ChatScreenStyle";
import { Ionicons } from "@expo/vector-icons";
import { MAINURL } from "@/services/APIURL";
import ImageViewing from "react-native-image-viewing";
import BottomSheet from "@gorhom/bottom-sheet";
import axiosInstance from "@/services/GlobalApi";

const MessageList = ({ messages, flatListRef, onDeleteMessage }: any) => {
  const [isViewerVisible, setIsViewerVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["25%"], []);
  // Prepare image list in required format
  const imageMessages = messages
    .filter((m: any) => m.type === "image")
    .map((m: any) => ({ uri: `${MAINURL}/uploads/${m.uri}` }));
  const handleImagePress = React.useCallback((index: number) => {
    setCurrentImageIndex(index);
    setIsViewerVisible(true);
  }, []);

  const handleLongPress = React.useCallback((item: any) => {
    setSelectedMessage(item);
    bottomSheetRef.current?.expand();
  }, []);

  const handleDelete = async () => {
    if (!selectedMessage?._id && !selectedMessage?.id) return;
    const messageId = selectedMessage._id || selectedMessage.id;
    try {
      await axiosInstance.delete(`/chat/message/${messageId}`);
      onDeleteMessage(messageId);
    } catch (err) {
      console.error("Failed to delete message", err);
    }
    bottomSheetRef.current?.close();
    setSelectedMessage(null);
  };

  const MessageItem = React.memo(
    ({ item, onImagePress, onLongPress, imageMessages }: any) => {
      const isMyMessage = item.sender === "me";
      if (item.type === "image") {
        const imageIndex = imageMessages.findIndex((img: any) =>
          img.uri.includes(item.uri)
        );
        return (
          <TouchableOpacity
            onPress={() => onImagePress(imageIndex)}
            style={[
              styles.imageBubble,
              isMyMessage ? styles.myMessage : styles.theirMessage,
            ]}
            onLongPress={() => onLongPress(item)}
          >
            <Image
              source={{ uri: `${MAINURL}/uploads/${item.uri}` }}
              style={styles.imageMessage}
            />
          </TouchableOpacity>
        );
      }
      return (
        <TouchableOpacity onLongPress={() => onLongPress(item)}>
          <View
            style={[
              styles.messageBubble,
              isMyMessage ? styles.myMessage : styles.theirMessage,
            ]}
          >
            <Text
              style={
                isMyMessage ? styles.myMessageText : styles.theirMessageText
              }
            >
              {item.text}
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: 5,
                marginTop: 4,
              }}
            >
              <Text
                style={{
                  fontSize: 10,
                  color: isMyMessage ? "#0D47A1" : "#000",
                  alignSelf: "flex-end",
                  marginTop: 4,
                }}
              >
                {item?.timestamp
                  ? new Date(item.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : ""}
              </Text>
              {isMyMessage && (
                <Ionicons
                  name="checkmark-done"
                  size={16}
                  color="#0D47A1"
                  style={{ position: "relative", top: 2 }}
                />
              )}
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  );

  const renderMessage = React.useCallback(
    ({ item }: { item: any }) => (
      <MessageItem
        item={item}
        onImagePress={handleImagePress}
        onLongPress={handleLongPress}
        imageMessages={imageMessages}
      />
    ),
    [handleImagePress, handleLongPress, imageMessages]
  );

  return (
    <>
      <FlatList
        data={messages}
        keyExtractor={(item) =>
          item.id?.toString() ||
          item._id?.toString() ||
          item.timestamp?.toString() ||
          Math.random().toString()
        }
        renderItem={renderMessage}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.messageList}
        ref={flatListRef}
        onContentSizeChange={() =>
          flatListRef.current?.scrollToEnd({ animated: true })
        }
      />
      {/* Fullscreen Image Viewer */}
      <ImageViewing
        images={imageMessages}
        imageIndex={currentImageIndex}
        visible={isViewerVisible}
        onRequestClose={() => setIsViewerVisible(false)}
      />
    </>
  );
};

export default MessageList;

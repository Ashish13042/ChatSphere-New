import { View, Text, FlatList, Image } from "react-native";
import React from "react";
import styles from "@/styles/ChatScreenStyle";
import { Ionicons } from "@expo/vector-icons";
import { MAINURL } from "@/services/APIURL";
const MessageList = ({ messages, flatListRef }: any) => {
  const renderMessage = ({ item }: { item: any }) => {
    const isMyMessage = item.sender === "me";
    return (
      <View
        style={[
          item.type === "image" ? styles.imageBubble : styles.messageBubble,
          isMyMessage ? styles.myMessage : styles.theirMessage,
        ]}
      >
        {item.type === "image" ? (
          <Image
            source={{ uri: `${MAINURL}/uploads/${item.uri}` }}
            style={styles.imageMessage}
          />
        ) : (
          <View>
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
                  ? new Date(item?.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : new Date().toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
              </Text>
              <View>
                {isMyMessage && (
                  <Ionicons
                    name="checkmark-done"
                    size={16}
                    color="#0D47A1"
                    style={{
                      position: "relative",
                      top: 2,
                    }}
                  />
                )}
              </View>
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <FlatList
      data={messages}
      keyExtractor={(item, index) => item.id || index.toString()}
      renderItem={renderMessage}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.messageList}
      ref={flatListRef}
      onContentSizeChange={() =>
        flatListRef.current?.scrollToEnd({ animated: true })
      }
    />
  );
};


export default MessageList;
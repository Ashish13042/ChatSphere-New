import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons, FontAwesome6 } from "@expo/vector-icons";

const MessageInput = ({
  input,
  setInput,
  handleSend,
  handlePickImage,
  handleTyping,
}: any) => {
  const showSendButton = input.trim().length > 0;

  return (
    <View style={styles.inputContainer}>
      {/* Emoji Picker Icon */}
      <TouchableOpacity style={styles.iconButton}>
        <FontAwesome6 name="face-smile" size={22} color="#555" />
      </TouchableOpacity>

      {/* Attachment/Image Icon */}
      <TouchableOpacity style={styles.iconButton} onPress={handlePickImage}>
        <MaterialCommunityIcons name="paperclip" size={22} color="#555" />
      </TouchableOpacity>

      {/* Smart Text Input */}
      <TextInput
        value={input}
        onChangeText={(text) => {
          setInput(text);
          handleTyping();
        }}
        placeholder="Type a message"
        placeholderTextColor="#999"
        multiline
        style={styles.textInput}
      />

      {/* Send or Mic Button */}
      <TouchableOpacity
        style={styles.sendButton}
        onPress={showSendButton ? handleSend : () => console.log("Mic pressed")}
      >
        {showSendButton ? (
          <Ionicons name="send" size={22} color="#fff" />
        ) : (
          <MaterialCommunityIcons name="microphone" size={22} color="#fff" />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default MessageInput;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    padding: 10,
    backgroundColor: "#f8f8f8",
    borderTopWidth: 1,
    borderColor: "#e6e6e6",
  },
  iconButton: {
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  textInput: {
    flex: 1,
    maxHeight: 120,
    minHeight: Platform.OS === "ios" ? 36 : 40,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#fff",
    fontSize: 16,
    marginHorizontal: 6,
  },
  sendButton: {
    backgroundColor: "#4e6e5d",
    borderRadius: 20,
    padding: 10,
  },
});

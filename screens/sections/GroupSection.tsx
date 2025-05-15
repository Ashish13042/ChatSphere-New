import React from "react";
import { View, Text } from "react-native";

const GroupSection = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text style={{ fontSize: 18, color: "#000" }}>No groups yet.</Text>
    <Text style={{ fontSize: 14, color: "#aaa" }}>
      Your group chats will appear here.
    </Text>
  </View>
);

export default GroupSection;

import React from "react";
import { View, Text } from "react-native";

const ArchiveSection = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text style={{ fontSize: 18, color: "#000" }}>No archived chats.</Text>
    <Text style={{ fontSize: 14, color: "#aaa" }}>
      Archived chats will appear here.
    </Text>
  </View>
);

export default ArchiveSection;

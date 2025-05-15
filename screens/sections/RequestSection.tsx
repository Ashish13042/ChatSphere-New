import React from "react";
import { View, Text } from "react-native";

const RequestSection = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text style={{ fontSize: 18, color: "#000" }}>No requests yet.</Text>
    <Text style={{ fontSize: 14, color: "#aaa" }}>
      All your chat requests will appear here.
    </Text>
  </View>
);

export default RequestSection;

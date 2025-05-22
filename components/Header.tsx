import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "@/styles/ChatScreenStyle";
import { Ionicons } from "@expo/vector-icons";
import { MAINURL } from "@/services/APIURL";

const Header = ({
  title,
  image,
  handleBack,
  userName,
}: {
  title: string;
  image: string;
  handleBack: any;
  userName: string;
}) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={handleBack}>
      <Ionicons name="chevron-back" size={24} color="#fff" />
    </TouchableOpacity>
    <View style={styles.headerInfo}>
      <Image
        source={{
          uri: MAINURL + "/uploads/" + image,
        }}
        style={styles.avatar}
      />
      <View>
        <Text style={styles.headerTitle}>{title}</Text>
        <Text style={styles.statusText}>{userName}</Text>
      </View>
    </View>
    <View style={styles.headerIcons}>
      <Ionicons
        name="call-outline"
        size={22}
        color="#fff"
        style={{ marginRight: 15 }}
      />
      <Ionicons name="videocam-outline" size={22} color="#fff" />
    </View>
  </View>
);

export default Header;

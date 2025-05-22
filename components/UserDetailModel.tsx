import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { MAINURL } from "@/services/APIURL";
import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

const RenderModalContent = ({ selectedContact, setModalVisible }: any) => {
  if (!selectedContact) return null;

  const router = useRouter();
  return (
    <View style={styles.overlay}>
      <BlurView intensity={70} tint="dark" style={StyleSheet.absoluteFill} />
      <Animatable.View
        animation="zoomIn"
        duration={350}
        style={styles.modalContainer}
        useNativeDriver
      >
        <Image
          source={{
            uri: `${MAINURL}/uploads/${selectedContact.profileImage}`,
          }}
          style={styles.avatar}
        />
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{selectedContact.name}</Text>
        </View>

        <View style={styles.actionRow}>
          <ActionIcon
            icon="chat"
            label="Chat"
            IconPack={MaterialIcons}
            handleClick={() => {
              setModalVisible(false);
              router.push({
                pathname: "/chat",
                params: {
                  userName: selectedContact.userName,
                  image: selectedContact.profileImage,
                  name: selectedContact.name,
                  email: selectedContact.email,
                },
              });
            }}
          />
          <ActionIcon icon="call-outline" label="Call" IconPack={Ionicons} />
          <ActionIcon
            icon="videocam-outline"
            label="Video"
            IconPack={Ionicons}
          />
          <ActionIcon
            icon="info"
            label="Info"
            IconPack={FontAwesome5}
            color="#ccc"
          />
        </View>
      </Animatable.View>
    </View>
  );
};

const ActionIcon = ({
  icon,
  label,
  IconPack,
  color = "white",
  handleClick,
}: any) => (
  <TouchableOpacity
    style={styles.actionBtn}
    activeOpacity={0.75}
    onPress={handleClick}
  >
    <IconPack name={icon} size={18} color={color} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
  },
  modalContainer: {
    width: 250,
    backgroundColor: "#000",
    alignItems: "center",
    borderRadius: 5,
  },
  avatar: {
    width: 250,
    height: 250,
    borderRadius: 0,
    marginBottom: 16,
    backgroundColor: "#333",
  },
  nameContainer: {
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    position: "absolute",
    top: 0,
    alignItems: "center",
  },
  name: {
    color: "#f5f5f5",
    fontSize: 22,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    margin: 0,
  },
  actionBtn: {
    alignItems: "center",
    flex: 1,
    paddingBottom: 15,
  },
  actionText: {
    fontSize: 12,
    fontWeight: "600",
  },
});

export default RenderModalContent;

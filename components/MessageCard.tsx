import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import React from "react";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { router } from "expo-router";

const MessageCard = ({
  image,
  name,
  message,
  time,
  count,
  logoComponent,
  onImagePress,
  rightIcon,
  messageLefticon,
  disableNavigation = false,
  onPress,
  onLongPress,
  isStatusCard = false, // 💡 New flag to make this behave as status card
}: any) => {
  return (
    <Pressable
      style={styles.button}
      onPress={() => {
        if (onPress) return onPress();
        if (!disableNavigation && !isStatusCard) {
          router.push({
            pathname: "./components/atoms/ChatScreen",
            params: { name, message },
          });
        }
      }}
      onLongPress={onLongPress}
    >
      <View style={styles.LeftContainer}>
        {/* Profile Image + Logo */}
        <View style={{ position: "relative" }}>
          <Pressable onPress={onImagePress} hitSlop={10}>
            <Image source={image} style={styles.image} />
          </Pressable>
          {logoComponent && (
            <View style={styles.logoWrapper} pointerEvents="box-none">
              {logoComponent}
            </View>
          )}
        </View>

        {/* Name + Message */}
        <View style={styles.textContainer}>
          <Text style={styles.name}>{name}</Text>
          {!!message && (
            <View style={styles.flexRow}>
              {messageLefticon}
              <Text style={styles.message}>{message}</Text>
            </View>
          )}
        </View>
      </View>

      {/* Right Side (for Chat only) */}
      {!isStatusCard && (
        <View style={styles.rightContainer}>
          {time && <Text style={styles.time}>{time}</Text>}
          {!!count && (
            <View style={styles.messageCountConatiner}>
              <Text style={styles.messageCount}>{count}</Text>
            </View>
          )}
          {rightIcon}
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: verticalScale(15),
  },
  image: {
    height: moderateScale(60),
    width: moderateScale(60),
    borderRadius: moderateScale(53),
  },
  name: {
    fontSize: moderateScale(14),
    fontWeight: "bold",
    color: "black",
  },
  message: {
    fontSize: moderateScale(12),
    color: "#889095",
    fontWeight: "500",
  },
  time: {
    fontSize: moderateScale(12),
    color: "#998E8E",
    fontWeight: "bold",
  },
  messageCountConatiner: {
    backgroundColor: "#3498db",
    width: moderateScale(22),
    height: moderateScale(22),
    borderRadius: moderateScale(22),
    justifyContent: "center",
    alignItems: "center",
  },
  messageCount: {
    fontSize: moderateScale(12),
    color: "white",
  },
  LeftContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(10),
  },
  textContainer: {
    flexDirection: "column",
  },
  rightContainer: {
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "center",
    gap: verticalScale(5),
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(10),
  },
  logoWrapper: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
});

export default MessageCard;

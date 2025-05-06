import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

const MessageCard = ({
  image,
  name,
  message,
  time,
  count,
  logoComponent,
  onImagePress,
  rightIcon,
  messageLefticon
}: any) => {
  return (
    <>
      <TouchableOpacity style={styles.button}>
        <View style={styles.LeftContainer}>
          <View>
            <TouchableOpacity onPress={onImagePress}>
              <Image source={image} style={styles.image} />
              {logoComponent}
            </TouchableOpacity>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.name}>{name}</Text>
            <View style={styles.flexRow}>
              {messageLefticon}
            <Text style={styles.message}>{message}</Text>
            </View>
            
          </View>
        </View>

        <View style={styles.rightContainer}>
          {time && <Text style={styles.time}>{time}</Text>}
          {!!count && (
            <View style={styles.messageCountConatiner}>
              <Text style={styles.messageCount}>{count}</Text>
            </View>
          )}
          {rightIcon}
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(15),
  },
  image: {
    height: moderateScale(53),
    width: moderateScale(53),
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
  flexRow:{
    flexDirection:"row",
    alignItems:"center",
    gap:scale(10),

  }
});

export default MessageCard;

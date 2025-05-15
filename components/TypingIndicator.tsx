import { View, Text, StyleSheet, Animated } from "react-native";
import React, { useRef, useEffect } from "react";

const TypingIndicator = () => {
  const bubbleAnim1 = useRef(new Animated.Value(0)).current;
  const bubbleAnim2 = useRef(new Animated.Value(0)).current;
  const bubbleAnim3 = useRef(new Animated.Value(0)).current;

  const animate = (anim: Animated.Value, delay: number) => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(anim, {
          toValue: 1,
          duration: 300,
          delay,
          useNativeDriver: true,
        }),
        Animated.timing(anim, {
          toValue: 0.3,
          duration: 300,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  useEffect(() => {
    animate(bubbleAnim1, 0);
    animate(bubbleAnim2, 150);
    animate(bubbleAnim3, 300);
  }, []);

  return (
    <View style={styles.typingIndicator}>
      {[bubbleAnim1, bubbleAnim2, bubbleAnim3].map((anim, index) => (
        <Animated.View
          key={index}
          style={[
            styles.bubble,
            {
              opacity: anim,
              transform: [
                {
                  scale: anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.8, 1.2],
                  }),
                },
              ],
            },
          ]}
        />
      ))}
    </View>
  );
};

export default TypingIndicator;

const styles = StyleSheet.create({
  typingIndicator: {
    flexDirection: "row",
    alignSelf: "flex-start",
    backgroundColor: "transparent",
    marginLeft: 10,
    marginBottom: 5,
  },
  bubble: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#aaa",
    marginHorizontal: 3,
  },
});

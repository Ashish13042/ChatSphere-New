import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { Marquee } from "@animatereactnative/marquee";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Colors from "@/services/Colors";
import { useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_200ExtraLight,
} from "@expo-google-fonts/poppins";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "@/features/userSlice";
import { RootState } from "@/features/store";
import { AppDispatch } from "@/features/store";
SplashScreen.preventAutoHideAsync();

export default function Landing() {
  const router = useRouter();
  const [fontsLoaded, error] = useFonts({
    Poppins_700Bold,
    Poppins_200ExtraLight,
    Poppins_400Regular,
    Poppins_700Bold_Italic,
    Poppins_500Medium,
  });
  const { user, status } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const checkUser = async () => {
      await dispatch(fetchUser());
      SplashScreen.hideAsync();
    };
    if (fontsLoaded) {
      checkUser();
    }
  }, [dispatch, fontsLoaded]);

  useEffect(() => {
    if (!fontsLoaded) return;
    console.log("status", status);
    if (status == "succeeded" && user) {
      router.replace("/main");
    } else if (status === "failed") {
      router.replace("/auth/signin");
    }
  }, [status, user, router, fontsLoaded]);

  const imageList = [
    require("./../assets/images/1.1.jpg"),
    require("./../assets/images/2.1.jpg"),
    require("./../assets/images/3.1.jpg"),
    require("./../assets/images/4.1.png"),
    require("./../assets/images/5.1.jpg"),
    require("./../assets/images/6.1.png"),
  ];

  return (
    <GestureHandlerRootView>
      <View>
        <Marquee
          spacing={10}
          speed={0.7}
          style={{
            transform: [{ rotate: "-4deg" }],
          }}
        >
          <View style={styles.imageContainer}>
            {imageList.map((image, index) => (
              <Image source={image} key={index} style={styles.image} />
            ))}
          </View>
        </Marquee>
        <Marquee
          spacing={10}
          speed={0.4}
          style={{
            transform: [{ rotate: "-4deg" }],
            marginTop: 10,
          }}
        >
          <View style={styles.imageContainer}>
            {imageList.map((image, index) => (
              <Image source={image} key={index} style={styles.image} />
            ))}
          </View>
        </Marquee>
        <Marquee
          spacing={10}
          speed={0.5}
          style={{
            transform: [{ rotate: "-4deg" }],
            marginTop: 10,
          }}
        >
          <View style={styles.imageContainer}>
            {imageList.map((image, index) => (
              <Image source={image} key={index} style={styles.image} />
            ))}
          </View>
        </Marquee>
      </View>
      <View
        style={{
          backgroundColor: Colors.WHITE,
          height: "100%",
          padding: 20,
        }}
      >
        <Text
          style={{
            fontFamily: "Outfit-ExtraBold",
            fontSize: 25,
            textAlign: "center",
          }}
        >
          💬 ChatSphere | Connect, Chat & Stay Connected Anytime!
        </Text>
        <Text
          style={{
            fontFamily: "Outcook-ExtraBold",
            textAlign: "center",
            color: Colors.GRAY,
            marginBottom: 20,
          }}
        >
          💬 Instant Chats, Endless Connections! 🚀
        </Text>
        <TouchableOpacity
          onPress={() => router.push("/main")}
          style={styles.button}
        >
          <Text
            style={{
              textAlign: "center",
              color: Colors.WHITE,
              fontSize: 17,
              fontFamily: "Outfit",
            }}
          >
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
  );
}
const styles = StyleSheet.create({
  image: {
    width: 160,
    height: 160,
    borderRadius: 25,
  },
  imageContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    padding: 15,
    borderRadius: 15,
  },
});

import { router, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { deleteLocalItem, getLocalItem } from "@/services/secureStorage";
import axiosInstance from "@/services/GlobalApi";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "Outfit-ExtraBold": require("./../assets/fonts/Outfit-ExtraBold.ttf"),
  });

  useEffect(() => {
    const checkUser = async () => {
      const token = await getLocalItem("userToken");
      if (token) {
        const response = await axiosInstance({
          method: "post",
          url: "/auth/check-auth",
        });
        if (response.status === 200) {
          router.push("/main");
        } else {
          deleteLocalItem("userToken");
          router.push("/auth/signin");
        }
      }
    };
    checkUser();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={"white"}/> 
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // Optional: Set a background color
  },
});
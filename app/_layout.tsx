import { router, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { deleteLocalItem, getLocalItem } from "@/services/secureStorage";
import axiosInstance from "@/services/GlobalApi";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { Provider } from "react-redux";
import store from "@/features/store";
export default function RootLayout() {
  const [loaded, error] = useFonts({
    "Outfit-ExtraBold": require("./../assets/fonts/Outfit-ExtraBold.ttf"),
  });

  useEffect(() => {}, []);

  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={"white"} />
        <Stack screenOptions={{ headerShown: false }} />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // Optional: Set a background color
  },
});

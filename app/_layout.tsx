import { router, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { deleteLocalItem, getLocalItem } from "@/services/secureStorage";
import axiosInstance from "@/services/GlobalApi";
import { StatusBar, StyleSheet } from "react-native";
import { Provider } from "react-redux";
import store from "@/features/store";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "Outfit-ExtraBold": require("./../assets/fonts/Outfit-ExtraBold.ttf"),
  });

  useEffect(() => {}, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle="dark-content" backgroundColor={"white"} />
          <Stack screenOptions={{ headerShown: false }} />
        </SafeAreaView>
      </Provider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // Optional: Set a background color
  },
});

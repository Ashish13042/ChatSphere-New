import { HeaderBackground } from "@react-navigation/elements";
import { Slot } from "expo-router";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";

export default function ChatLayout() {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <StatusBar />
        <Slot />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // Optional: Set a background color
  },
});

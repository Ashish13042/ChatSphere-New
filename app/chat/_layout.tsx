import { HeaderBackground } from "@react-navigation/elements";
import { Slot } from "expo-router";
import { StatusBar } from "react-native";

export default function ChatLayout() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={"#1E293B"} />
      <Slot />
    </>
  );
}

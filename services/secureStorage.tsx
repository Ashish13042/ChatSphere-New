import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const OS = Platform.OS;

export async function saveLocalItem(key: string, value: object | string) {
  const stringValue = JSON.stringify(value);
  // console.log(`Saving key: ${key}, value: ${stringValue}`);
  if (OS !== "web") {
    await SecureStore.setItemAsync(key, stringValue);
  } else if (typeof localStorage !== "undefined") {
    localStorage.setItem(key, stringValue);
  }
}

export async function getLocalItem(key: string) {
  let value;
  if (OS !== "web") {
    value = await SecureStore.getItemAsync(key);
  } else if (typeof localStorage !== "undefined") {
    value = localStorage.getItem(key);
  }
  return value ? JSON.parse(value) : null;
}

export async function deleteLocalItem(key: string) {
  if (OS !== "web") {
    await SecureStore.deleteItemAsync(key);
  } else if (typeof localStorage !== "undefined") {
    localStorage.removeItem(key);
  }
}

export const saveChatLocally = async (roomId: string, messages: any[]) => {
  try {
    const chatKey = `${roomId}`;
    const chatData = JSON.stringify(messages);
    await saveLocalItem(chatKey, chatData);
  } catch (error) {
    console.error("Error saving chat locally:", error);
  }
};

export const getChatLocally = async (roomId: string) => {
  try {
    const chatKey = `${roomId}`;
    const chatData = await getLocalItem(chatKey);
    return chatData ? JSON.parse(chatData) : null;
  } catch (error) {
    console.error("Error getting chat locally:", error);
    return null;
  }
};

import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "expo-router";
import { deleteLocalItem, getLocalItem, saveLocalItem } from "@/services/secureStorage";
import { APIURL } from "@/services/APIURL";
import axiosInstance from "@/services/GlobalApi";

const SignInScreen = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const token = await getLocalItem("userToken");
      if (token) {
        const response = await axiosInstance({
          method: "post",
          url: "/auth/check-auth",
        });
        if (response.status === 200) {
          router.push("/home");
        } else {
          deleteLocalItem("userToken");
          router.push("/auth/signin");
        }
      }
    };
    checkUser();
  }, []);
  
  const handleSignIn = async () => {
    try {
      interface SignInResponse {
        token: string;
      }

      const response = await axios.post<SignInResponse>(APIURL + "/auth/signin", {
        identifier,
        password,
      });

      if (response.data.token) {
        saveLocalItem("userToken", response.data.token);
        Alert.alert("Success", "Signin successful!");
        router.replace("/main");
      } else {
        Alert.alert("Error", "Invalid response from server.");
      }
    } catch (error) {
      const err = error as any;
      Alert.alert("Error", err.response?.data?.message || "Signin failed.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

      <TextInput 
        placeholder="Email or Phone Number" 
        placeholderTextColor="#1c2833"
        style={styles.input}
        onChangeText={setIdentifier}
        keyboardType="default"
      />
      <TextInput 
        placeholder="Password" 
        placeholderTextColor="#1c2833"
        style={styles.input}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/auth/signup")}>
        <Text style={styles.link}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignInScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff", // White background
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1c2833", // Dark Blue text
    marginBottom: 30,
  },
  input: {
    width: "100%",
    height: 55,
    backgroundColor: "#f0f0f0", // Light gray input background
    borderWidth: 1,
    borderColor: "#ccc", // Light gray border
    borderRadius: 15,
    paddingHorizontal: 20,
    marginBottom: 20,
    color: "#000814", // Dark text
    fontSize: 16,
  },
  button: {
    width: "100%",
    backgroundColor: "#1c2833", // Dark blue button
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white", // White text inside button
    fontSize: 18,
    fontWeight: "bold",
  },
  link: {
    color: "#2e86c1", // Dark blue link
    marginTop: 20,
    fontSize: 14,
  },
});


import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Animated } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";
import { deleteLocalItem, getLocalItem, saveLocalItem } from "@/services/secureStorage";
import { APIURL } from "@/services/APIURL";
import axiosInstance from "@/services/GlobalApi";

const SignUpScreen = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Animation
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

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
  interface SignUpResponse {
    token?: string;
  }
  
  const handleSignUp = async () => {
      try {
        const response = await axios.post<SignUpResponse>(APIURL + "/auth/signup", {
          name,
          email,
          password
        });
  
        if (response.data?.token) {
        await SecureStore.setItemAsync("userToken", response.data.token);
        saveLocalItem("userToken", response.data.token);
        Alert.alert("Success", "Account created successfully!");
      } else {
        Alert.alert("Error", "Invalid response from server.");
      }
    } catch (error) {
      if ((error as Axios.AxiosError)?.response?.data?.message) {
        Alert.alert("Error", error.response.data.message);
      } else {
        Alert.alert("Error", "Signup failed.");
      }
    }
  };

  return (
    <View style={styles.background}>
      <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
        <Text style={styles.title}>Sign Up</Text>
        <TextInput placeholder="Name" style={styles.input} onChangeText={setName} placeholderTextColor="gray" />
        <TextInput placeholder="Email" style={styles.input} onChangeText={setEmail} keyboardType="email-address" placeholderTextColor="gray" />
        <TextInput placeholder="Password" style={styles.input} onChangeText={setPassword} secureTextEntry placeholderTextColor="gray" />
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/auth/signin")}>
          <Text style={styles.link}>Already have an account? Sign In</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",  // Same background as Home screen (dark greenish)
    width: "100%",
    height: "100%",
  },
  overlay: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1c2833",  // Neon green
    marginBottom: 25,
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
    width: "85%",
    backgroundColor: "#1c2833",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  link: {
    color: "#2e86c1",
    marginTop: 20,
    fontSize: 15,
  },
});

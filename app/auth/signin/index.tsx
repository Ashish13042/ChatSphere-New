import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { signInUser } from "@/features/userSlice";
import { RootState } from "@/features/store";
import { deleteLocalItem, getLocalItem } from "@/services/secureStorage";
import axiosInstance from "@/services/GlobalApi";

const SignInScreen = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const { status, error, user } = useSelector((state: RootState) => state.user);

  const handleSignIn = async () => {
    const res = await dispatch(signInUser({ identifier, password }) as any);
    if (res.error) {
      Alert.alert("Error", res.error.message);
    } else {
      router.replace("/main");
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
        <Text style={styles.buttonText}>
          {status === "loading" ? "Signing in..." : "Sign In"}
        </Text>
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

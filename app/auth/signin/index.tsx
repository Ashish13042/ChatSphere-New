import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { signInUser } from "@/features/userSlice";
import { RootState } from "@/features/store";

const SignInScreen = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const { status, error } = useSelector((state: RootState) => state.user);

  const handleSignIn = async () => {
    const res = await dispatch(signInUser({ identifier, password }) as any);
    if (res.error) {
      Alert.alert("Error", res.error.message);
    } else {
      router.replace("/main");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Text style={styles.heading}>Chat Sphere</Text>
      <View style={styles.card}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Please sign in to continue</Text>

        <TextInput
          placeholder="Email or Phone"
          placeholderTextColor="#666"
          style={styles.input}
          onChangeText={setIdentifier}
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#666"
          style={styles.input}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>
            {status === "loading" ? "Signing In..." : "Sign In"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/auth/signup")}>
          <Text style={styles.link}>
            Don't have an account?{" "}
            <Text style={styles.linkHighlight}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 100,
  },
  heading: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 80,
    textAlign: "center",
  },
  card: {
    width: "100%",
    borderRadius: 20,
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1C1C1E",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: "#6e6e73",
    marginBottom: 24,
  },
  input: {
    height: 50,
    backgroundColor: "#f2f2f7",
    borderRadius: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#000",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e5e5ea",
  },
  button: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: "#000",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
  link: {
    marginTop: 24,
    fontSize: 14,
    color: "#444",
    textAlign: "center",
  },
  linkHighlight: {
    color: "#007AFF",
    fontWeight: "600",
  },
});

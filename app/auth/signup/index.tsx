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
import { signUpUser } from "@/features/userSlice";
import { RootState } from "@/features/store";

const SignUpScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const { status } = useSelector((state: RootState) => state.user);

  const handleSignUp = async () => {
    const res = await dispatch(
      signUpUser({ name, email, password, userName }) as any
    );
    if (res.error) {
      Alert.alert("Error", res.error.message);
    } else {
      router.replace("/main");
      Alert.alert("Success", "Registration successful!");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Text style={styles.heading}>Chat Sphere</Text>
      <View style={styles.card}>
        <Text style={styles.title}>Create an Account</Text>
        <Text style={styles.subtitle}>Sign up to get started</Text>

        <TextInput
          placeholder="Name"
          placeholderTextColor="#666"
          style={styles.input}
          onChangeText={setName}
        />
        <TextInput
          placeholder="User Name"
          placeholderTextColor="#666"
          style={styles.input}
          onChangeText={setUserName}
        />
        <TextInput
          placeholder="Email"
          placeholderTextColor="#666"
          style={styles.input}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#666"
          style={styles.input}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>
            {status === "loading" ? "Registering..." : "Sign Up"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/auth/signin")}>
          <Text style={styles.link}>
            Already have an account?{" "}
            <Text style={styles.linkHighlight}>Sign In</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;

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

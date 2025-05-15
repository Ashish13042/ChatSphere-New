import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Animated,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "@/features/userSlice";
import { RootState } from "@/features/store"; // Adjust path if needed

const SignUpScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  // Animation
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const { status, error, user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

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
    <View style={styles.background}>
      <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
        <Text style={styles.title}>Sign Up</Text>
        <TextInput
          placeholder="Name"
          style={styles.input}
          onChangeText={setName}
          placeholderTextColor="gray"
        />
        <TextInput
          placeholder="User Name"
          style={styles.input}
          onChangeText={setUserName}
          placeholderTextColor="gray"
        />
        <TextInput
          placeholder="Email"
          style={styles.input}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholderTextColor="gray"
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="gray"
        />

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>
            {status === "loading" ? "Registering..." : "Register"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/auth/signin")}>
          <Text style={styles.link}>Already have an account? Sign In</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default SignUpScreen;

// ...styles remain unchanged...

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff", // Same background as Home screen (dark greenish)
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
    color: "#1c2833", // Neon green
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

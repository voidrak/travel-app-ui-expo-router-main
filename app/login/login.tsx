import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors"; // Adjust this path as needed

const LoginScreen = () => {
  const [inputUsername, setInputUsername] = useState("");
  const [username, setUsername] = useState("");
  const [inputError, setInputError] = useState(false);

  const [inputPassword, setInputPassword] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { currentUser } = useLocalSearchParams();

  const test = "test";

  const handleLogin = () => {
    if (inputPassword && inputUsername) {
      setUsername(inputUsername);
      setPassword(inputPassword);
      console.log("object");
      if (username) {
        router.push({ pathname: "/", params: { username } });
      }
    } else {
      setInputError(true);
    }
  };

  const handleBack = () => {
    if (username) {
      router.push({ pathname: "/", params: { username } });
    } else router.back();
  };

  const handleLogout = () => {
    setUsername("");
    setPassword("");
    router.push({ pathname: "/", params: { username } });
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: "",
          headerLeft: () => (
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color={Colors.white} />
            </TouchableOpacity>
          ),
        }}
      />
      <View style={styles.container}>
        {currentUser ? (
          <>
            <Text style={styles.heading}>Welcome {currentUser}</Text>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}
            >
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.heading}>Login</Text>
            {inputError ? (
              <Text
                style={{
                  fontSize: 20,
                  color: Colors.white,
                  backgroundColor: "#ff4300",
                  paddingVertical: 10,
                  paddingHorizontal: 3,
                  borderRadius: 5,
                }}
              >
                {" "}
                Please enter username and password{" "}
              </Text>
            ) : (
              ""
            )}

            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#aaa"
              value={inputUsername}
              onChangeText={setInputUsername}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#aaa"
              secureTextEntry
              value={inputPassword}
              onChangeText={setInputPassword}
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                router.push("/login/signUp");
              }}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: Colors.bgColor,
  },
  heading: {
    fontSize: 32,
    fontWeight: "bold",
    color: Colors.black,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 15,
    marginVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    fontSize: 16,
    color: Colors.black,
  },
  button: {
    width: "100%",
    padding: 15,
    backgroundColor: Colors.grayColor,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutButton: {
    width: "100%",
    padding: 15,
    backgroundColor: "#ff4300",
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },

  backButton: {
    marginLeft: 20,
    marginTop: 50,
    padding: 10,
    borderRadius: 50,
    backgroundColor: "#1E2330",
  },
});

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors"; // Adjust this path as needed

const SignupScreen = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputUsername, setInputUsername] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputError, setInputError] = useState(false);

  const handleSignup = () => {
    if (inputPassword && inputUsername && inputEmail) {
      setUsername(inputUsername);
      setPassword(inputPassword);
      setEmail(inputEmail);
      if (username) {
        router.push({ pathname: "/", params: { username } });
      }
    } else {
      setInputError(true);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: "",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={24} color={Colors.white} />
            </TouchableOpacity>
          ),
        }}
      />
      <View style={styles.container}>
        <Text style={styles.heading}>Sign Up</Text>
        <>
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
              Please enter the credentials{" "}
            </Text>
          ) : (
            ""
          )}
        </>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#aaa"
          value={inputUsername}
          onChangeText={setInputUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          value={inputEmail}
          onChangeText={setInputEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={inputPassword}
          onChangeText={setInputPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default SignupScreen;

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
  backButton: {
    marginLeft: 20,
    marginTop: 50,
    padding: 10,
    borderRadius: 50,
    backgroundColor: "#1E2330", // Adjust based on your theme
  },
});

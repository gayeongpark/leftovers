import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation from React Navigation
import Logo from "../../src/components/Logo";

export default function Login() {
  const navigation = useNavigation<any>(); // Initialize navigation

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Implement your login logic here using 'email' and 'password' states
    console.log("Email:", email);
    console.log("Password:", password);
  };

  const handleGoogleLogin = () => {
    // Implement your Google login logic here
    // This function will be called when the Google Login button is pressed
  };

  const handleForgotPassword = () => {
    // Implement the logic for handling forgot password
  };

  return (
    <KeyboardAvoidingView 
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={styles.container}>
      <Logo />
      <View style={styles.container2}>
        {/* <Logo style={styles.logo}/> */}
        <Text style={styles.title}>Ready to save leftovers</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleGoogleLogin}
          style={styles.googleButton}
        >
          <Text style={styles.googleButtonText}>Login with Google</Text>
        </TouchableOpacity>
        <View style={styles.bottomButtonsContainer}>
          <TouchableOpacity
            onPress={handleForgotPassword}
            style={styles.forgotPassword}
          >
            <Text style={styles.bottomButtonText}>Forgot Password</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Signup")}
            style={styles.signup}
          >
            <Text style={styles.bottomButtonText}>Signup</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fdd605",
  },
  container2: {
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    height: "75%",
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#fdd605",
    padding: 15,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff", // White text color
    fontWeight: "600",
    fontSize: 16,
  },
  googleButton: {
    borderColor: "#fdd605",
    borderWidth: 2,
    padding: 15,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  googleButtonText: {
    color: "black",
    fontWeight: "600",
    fontSize: 16,
  },
  bottomButtonsContainer: {
    flexDirection: "column", // Arrange buttons horizontally
    justifyContent: "space-between", // Space evenly between buttons
    width: "100%",
    marginTop: 10,
  },
  bottomButtonText: {
    fontWeight: "bold",
  },
  forgotPassword: {
    fontWeight: "bold",
    padding: 15,
    fontSize: 16,
  },
  signup: {
    fontWeight: "bold",
    padding: 15,
    fontSize: 16,
  },
});

// export default Login;

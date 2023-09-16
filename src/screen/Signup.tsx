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
import Logo from "../components/Logo";

export default function Signup() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState(""); // State to store the email input
  const [password, setPassword] = useState(""); // State to store the password input
  const [password2, setPassword2] = useState(""); // State to store the password input

  const handleSignup = () => {
    // Implement your login logic here using 'email' and 'password' states
    console.log("Firstname:", firstname);
    console.log("Lastname:", lastname);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Password2:", password2);
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Logo/>
      <View style={styles.container2}>
        <Text style={styles.title}>Join Us</Text>
        <TextInput
          style={styles.input}
          placeholder="Firstname"
          onChangeText={(text) => setFirstname(text)}
          value={firstname}
        />
        <TextInput
          style={styles.input}
          placeholder="Lastname"
          onChangeText={(text) => setLastname(text)}
          value={lastname}
        />
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
        <TextInput
          style={styles.input}
          placeholder="Confirme Password"
          secureTextEntry={true}
          onChangeText={(text) => setPassword2(text)}
          value={password2}
        />
        <TouchableOpacity onPress={handleSignup} style={styles.button}>
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableOpacity>
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
  },
  signup: {
    fontWeight: "bold",
    padding: 15,
  },
});

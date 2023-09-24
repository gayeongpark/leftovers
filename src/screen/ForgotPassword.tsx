import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Logo from "../../src/components/Logo";
import axios from "axios";

export default function ForgotPassword() {
  const navigation = useNavigation<any>();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleNext = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/auth/forgotPassword", // Replace with your backend URL
        { email }
      );

      if (response.status === 200) {
        // console.log("Password reset email sent successfully");
        // You can add navigation logic here to go to the next screen
        setSuccess(response.data.message);
        navigation.navigate("EmailVerificationForResetEmail");
      } else {
        setError(response.data);
        // Handle the error, display an error message, or take appropriate action
      }
    } catch (error) {
      setError("Networing error");
      // Handle the network error or other exceptions
    }
  };

  return (
    <View style={styles.container}>
      <Logo />
      <View style={styles.container2}>
        <Text style={styles.title}>Forgot password?</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          autoFocus={true}
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <TouchableOpacity onPress={handleNext} style={styles.button}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    fontSize: 29,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#000",
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
});

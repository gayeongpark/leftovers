import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Logo from "../components/Logo";

export default function Signup() {
  const navigation = useNavigation<any>();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPassword2Visible, setIsPassword2Visible] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = () => {
    // Implement your login logic here using 'email' and 'password' states
    console.log("Firstname:", firstname);
    console.log("Lastname:", lastname);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Password2:", password2);
    if (!email || !password || !password2) {
      setError("All fields are required");
      return;
    }

    if (password !== password2) {
      setError("Passwords do not match");
      return;
    }

    // Additional validation can be added here, such as checking email format, password strength, etc.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email format");
      return;
    }

    // Password validation (at least one special character and one number)
    const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d).*$/;
    if (!passwordRegex.test(password)) {
      setError(
        "Password should contain at least one special character and one number"
      );
      return;
    }
    // If all validations pass, you can proceed with signup logic here
    // For example, you can make an API request to register the user

    // Reset error state
    setError("");
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const togglePassword2Visibility = () => {
    setIsPassword2Visible(!isPassword2Visible);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="height"
      keyboardVerticalOffset={100} // Adjust this value to your needs
      enabled
    >
      <Logo />
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
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            secureTextEntry={!isPasswordVisible}
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={isPasswordVisible ? "eye-outline" : "eye-off-outline"}
              size={24}
              color="#ccc"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Confirm Password"
            secureTextEntry={!isPassword2Visible}
            onChangeText={(text) => setPassword2(text)}
            value={password2}
          />
          <TouchableOpacity
            onPress={togglePassword2Visibility}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={isPassword2Visible ? "eye-outline" : "eye-off-outline"}
              size={24}
              color="#ccc"
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("ConfirmEmail")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableOpacity>
        <Text style={styles.buttonTextForTerms}>
          By creating account, you confirm that you accept our Terms of Use and
          Privacy{" "}
        </Text>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fdd605",
    width: "100%",
    height: "100%",
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
  passwordContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#000",
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
    padding: 10,
  },
  eyeIcon: {
    paddingRight: 10,
  },
  errorText: {
    color: "red",
    // margin: 8,
  },
  buttonTextForTerms: {
    paddingTop: 15,
    fontSize: 12,
  },
});

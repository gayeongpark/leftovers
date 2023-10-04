import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Logo from "../components/Logo";
import axios from "axios";
import { showMessage } from "react-native-flash-message";
import { API_URL } from "@env";

export default function Signup() {
  const navigation = useNavigation<any>();
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isPassword2Visible, setIsPassword2Visible] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSignup = async () => {
    // console.log(`${API_URL}`);
    if (!email || !password || !password2) {
      setError("All fields are required");
      return;
    }

    if (password !== password2) {
      setError("Passwords do not match");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email format");
      return;
    }

    const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d).*$/;
    if (!passwordRegex.test(password)) {
      setError(
        "Password should contain at least one special character and one number"
      );
      return;
    }

    try {
      const response = await axios.post(
        `http://${API_URL}:8000/auth/signup`,
        {
          email,
          password,
          password2,
          firstname,
          lastname,
        },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        showMessage({
          message: response.data.message,
          // color: "white",
          // backgroundColor: "black",
          type: "success",
        });
        navigation.navigate("ConfirmEmail", { email: email });
      } else {
        // console.error("Server error:", response.data.error);
        setError(response.data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again later.");
    }
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
      keyboardVerticalOffset={250}
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
        <TouchableOpacity onPress={handleSignup} style={styles.button}>
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
    height: "80%",
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
    color: "#fff",
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

import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Logo from "../../src/components/Logo";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { showMessage } from "react-native-flash-message";
import { loginUser } from "../../state/authAction";
import DarkMode from "../components/DarkMode";

export default function Login() {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<any>();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const [error, setError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const handleLogin = async () => {
    try {
      const response = await dispatch(loginUser(email, password));

      if (response) {
        showMessage({
          message: "Login successful",
          type: "success",
        });
        navigation.navigate("MainScreen");
      } else {
        showMessage({
          message: "Login failed, Please try it again!",
          type: "danger",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred. Please try again later.");
    }
  };

  const handleGoogleLogin = () => {};

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.container}>
      <Logo />
      <View
        style={[styles.container2, isDarkMode ? styles.darkContainer2 : null]}
      >
        {/* style={[styles.container, isDarkMode ? styles.darkContainer : null]} */}
        <Text style={[styles.title, isDarkMode ? styles.darkTitle : null]}>
          Ready to save leftovers?
        </Text>
        <TextInput
          style={[styles.input, isDarkMode ? styles.darkInput : null]}
          placeholder="Email"
          placeholderTextColor={isDarkMode ? "#ccc" : "#000"}
          autoFocus={true}
          onChangeText={(text) => setEmail(text)}
          value={email}
          keyboardType="email-address"
        />
        <View
          style={[
            styles.passwordContainer,
            isDarkMode ? styles.darkPasswordContainer : null,
          ]}
        >
          <TextInput
            style={[styles.passwordInput, isDarkMode ? styles.darkPasswordInput : null]}
            placeholder="Password"
            placeholderTextColor={isDarkMode ? "#ccc" : "#000"}
            secureTextEntry={!isPasswordVisible}
            onChangeText={(text) => setPassword(text)}
            value={password}
            keyboardType="default"
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
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text
            style={[
              styles.buttonText,
              isDarkMode ? styles.darkButtonText : null,
            ]}
          >
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleGoogleLogin}
          style={styles.googleButton}
        >
          <Text
            style={[
              styles.googleButtonText,
              isDarkMode ? styles.darkGoogleButtonText : null,
            ]}
          >
            Login with Google
          </Text>
        </TouchableOpacity>
        <View style={styles.bottomButtonsContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("ForgotPassword")}
            style={styles.forgotPassword}
          >
            <Text
              style={[
                styles.bottomButtonText,
                isDarkMode ? styles.darkText : null,
              ]}
            >
              Forgot password
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Signup")}
            style={styles.signup}
          >
            <Text
              style={[
                styles.bottomButtonText,
                isDarkMode ? styles.darkText : null,
              ]}
            >
              Create account
            </Text>
          </TouchableOpacity>
          <View style={styles.darkModeToggle}>
            <DarkMode />
          </View>
        </View>
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fdd605",
    height: "100%",
    width: "100%",
  },
  darkContainer2: {
    backgroundColor: "#000", // Dark mode background color
    color: "#fff",
  },
  container2: {
    backgroundColor: "#ffff",
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
  darkTitle: {
    color: "#fff",
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
  darkInput: {
    color: "#fff",
    width: "100%",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ffff",
    marginBottom: 20,
  },
  passwordContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#000",
    // marginBottom: 20,
  },
  darkPasswordContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ffff",
  },
  passwordInput: {
    flex: 1,
    padding: 10,
  },
  darkPasswordInput: {
    flex: 1,
    padding: 10,
    color: "#fff",
    borderColor: "#ffff",
  },
  eyeIcon: {
    padding: 10,
  },
  button: {
    backgroundColor: "#fdd605",
    padding: 15,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  darkButtonText: {
    color: "#ffff",
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
  darkText: {
    color: "#ffff",
    fontWeight: "bold",
  },
  googleButtonText: {
    color: "#000",
    fontWeight: "600",
    fontSize: 16,
  },
  darkGoogleButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  bottomButtonsContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
    color: "#000",
  },
  darkBottomButtonsContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
    color: "#ffff",
  },
  bottomButtonText: {
    fontWeight: "bold",
  },
  forgotPassword: {
    fontWeight: "bold",
    padding: 15,
    fontSize: 20,
  },
  signup: {
    fontWeight: "bold",
    padding: 15,
    fontSize: 20,
  },
  darkModeToggle: {
    // display: "flex",
    justifyContent: "flex-end",
  },
  errorText: {
    color: "red",
    // margin: 8,
  },
});

import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import Logo from "../../src/components/Logo";
import axios from "axios";
import { API_URL } from "@env";

type RouteParams = {
  number: number;
};

export default function ResetPassword() {
  const navigation = useNavigation<any>();
  const [password, setPassword] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isPassword2Visible, setIsPassword2Visible] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  // const [success, setSuccess] = useState<string>("");

  const route = useRoute();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const togglePassword2Visibility = () => {
    setIsPassword2Visible(!isPassword2Visible);
  };

  const handleNext = async () => {
    const { number } = route.params as RouteParams;

    if (password !== password2) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        `http://${API_URL}:8000/auth/resetPassword/${number}`,
        {
          password,
          password2,
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

        navigation.navigate("Login");
      } else {
        setError(response.data);
      }
    } catch (error) {
      setError("Password update failed. An error occurred.");
    }
  };

  return (
    <View style={styles.container}>
      <Logo />
      <View style={styles.container2}>
        <Text style={styles.title}>Reset your password</Text>
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
        <TouchableOpacity onPress={handleNext} style={styles.button}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        {/* {success ? <Text style={styles.errorText}>{success}</Text> : null} */}
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
  errorText: {
    color: "red",
    margin: 10,
  },
});

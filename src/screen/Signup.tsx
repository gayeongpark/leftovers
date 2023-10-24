// This screen is to signup
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Logo from "../components/Logo";
import axios from "axios";
import { showMessage } from "react-native-flash-message";
import { API_URL } from "@env";

export default function Signup() {
  // useState is used for updating the previous value to the current value.
  const navigation = useNavigation<any>();
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  // I set isPasswordVisible and isPassword2Visible are initially set to false, indicating that the password input fields are initially hidden.
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isPassword2Visible, setIsPassword2Visible] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSignup = async () => {
    // console.log(`${API_URL}`);

    // Validating the form

    // When there are no input value on each field, it will throw the error message below.
    if (!email || !password || !password2) {
      setError("All fields are required");
      return;
    }

    // when password and confirmed password are not matched, it will throw the error message below.
    if (password !== password2) {
      setError("Passwords do not match");
      return;
    }

    // email string should be the email format.
    // The test() method of RegExp instances executes a search with this regular expression for a match between a regular expression and a specified string. Returns true if there is a match; false otherwise.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email format");
      return;
    }

    // password string should be the password format. It is to check if the string contains at least one of the specified special characters and one digit number.
    const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d).*$/;
    if (!passwordRegex.test(password)) {
      setError(
        "Password should contain at least one special character and one number"
      );
      return;
    }

    try {
      // Make a request with the given values (email, password, password2, firstname, lastname) to this endpoint using axios library.
      const response = await axios.post(
        `http://${API_URL}:8000/auth/signup`,
        {
          email,
          password,
          password2,
          firstname,
          lastname,
        },
        // The data sent with the request is provided in the form of an object with properties email, password, password2, firstname, and lastname.
        // The request is JSON-formatted request.
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );

      // If I could get sccussfully the respond with the 200 status, will show the success message.
      if (response.status === 200) {
        showMessage({
          message: response.data.message,
          // color: "white",
          // backgroundColor: "black",
          type: "success",
        });

        // And then I will navigate users to confirmEmail screen in order to validate the email address and then passing the email props to the component.
        navigation.navigate("ConfirmEmail", { email: email });
      } else {
        // console.error("Server error:", response.data.error);
        // If I cannot give post request to the server, It will show the error message
        setError(response.data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      // axios networking error
      setError("An error occurred. Please try again later.");
    }
  };

  // It is to make a toggle to visible or invisible of password input
  const togglePasswordVisibility = () => {
    // If user clicks the toggle btn, setIspasswordVisible will update the isPasswordVisible to be !false, making the value true.
    setIsPasswordVisible(!isPasswordVisible);
  };
  // It is to make a toggle to visible or invisible of password2 input
  const togglePassword2Visibility = () => {
    // If user clicks the toggle btn, setIspassword2Visible will update the isPassword2Visible to be !false, making the value true.
    setIsPassword2Visible(!isPassword2Visible);
  };

  return (
    <SafeAreaView
      style={styles.container}
      // behavior="height"
      // keyboardVerticalOffset={340}
      // enabled
    >
      <Logo />
      <View style={styles.container2}>
        <Text style={styles.title}>Join Us</Text>
        <TextInput
          style={styles.input}
          placeholder="Firstname"
          onChangeText={(text) => setFirstname(text)}
          value={firstname}
          keyboardType="default"
        />
        <TextInput
          style={styles.input}
          placeholder="Lastname"
          onChangeText={(text) => setLastname(text)}
          value={lastname}
          keyboardType="default"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
          keyboardType="email-address"
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
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
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Confirm Password"
            secureTextEntry={!isPassword2Visible}
            onChangeText={(text) => setPassword2(text)}
            value={password2}
            keyboardType="default"
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
        {/* if there is update error, I am showing the error message below. */}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>
    </SafeAreaView>
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

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

export default function ConfirmEmail() {
  const navigation = useNavigation<any>();
  const [error, setError] = useState("");

  const [number, setNumber] = useState("");
  const handleEmailConfirm = () => {
    if (number.length > 4) {
      setError("The number should be 4 digits");
      return;
    }
    navigation.navigate("Onboarding");
  };
  return (
    <View style={styles.container}>
      <Logo />
      <View style={styles.container2}>
        <Text style={styles.title}>Confirm your email</Text>
        <Text style={styles.text}>
          please check your email inbox to confirm your email address. If not,
          please click the resend button below.
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Email verfication number"
          autoFocus={true}
          onChangeText={(number) => setNumber(number)}
          value={number}
        />
        <TouchableOpacity onPress={handleEmailConfirm} style={styles.button}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.GoToLoginButton}>
          <Text style={styles.GoToLoginButtonText}>Resend</Text>
        </TouchableOpacity>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
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
  text: {
    flexDirection: "column",
    justifyContent: "space-around",
    width: "100%",
    padding: 10,
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
  GoToLoginButton: {
    borderColor: "#fdd605",
    borderWidth: 2,
    padding: 15,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  GoToLoginButtonText: {
    color: "black",
    fontWeight: "600",
    fontSize: 16,
  },
  input: {
    width: "100%",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#000",
    marginBottom: 20,
  },
  errorText: {
    color: "red",
    margin: 8,
  },
});

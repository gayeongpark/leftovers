import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { showMessage } from "react-native-flash-message";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../state/authAction";
import { useNavigation } from "@react-navigation/native";
import { RootState } from "../../state/store";

export default function Logout() {
  const dispatch = useDispatch<any>();
  const navigation = useNavigation<any>();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const handleLogout = async () => {
    try {
      const response = await dispatch(logoutUser());
      // console.log(response);
      if (response.data) {
        showMessage({
          message: "Logout successful",
          type: "success",
        });
        // Replace current state with a new state
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
      } else {
        showMessage({
          message: "Logout failed, Please try it again!",
          type: "danger",
        });
      }
    } catch (error) {
      // console.error("Login error:", error);
      showMessage({
        message: "Logout failed, Please try it again!",
        type: "danger",
      });
    }
  };
  return (
    <View style={[styles.container, isDarkMode ? styles.darkContainer : null]}>
      <Text style={[styles.title, isDarkMode ? styles.darkTitle : null]}>
        Are you sure to logout?
      </Text>
      <TouchableOpacity onPress={handleLogout} style={styles.button}>
        <Text
          style={[styles.buttonText, isDarkMode ? styles.darkButtonText : null]}
        >
          Next
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: "100%",
    width: "100%",
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    alignItems: "center",
    padding: 20,
  },
  darkContainer: {
    backgroundColor: "#000",
    height: "100%",
    width: "100%",
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 29,
    fontWeight: "bold",
    marginBottom: 20,
  },
  darkTitle: {
    fontSize: 29,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
  },
  button: {
    borderColor: "#fdd605",
    borderWidth: 2,
    padding: 15,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "black",
    fontWeight: "600",
    fontSize: 16,
  },
  darkButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});

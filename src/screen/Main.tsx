import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../state/authAction";

export default function Main() {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<any>();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigation.navigate("Login", { screen: "Login" });
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleLogout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
});

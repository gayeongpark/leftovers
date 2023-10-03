import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function Logo() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/healthy-food.png")}
        style={styles.logoImage}
      />
      <Image
        source={require("../../assets/leftovers.png")}
        style={styles.logoText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-start", // Align content at the top
    padding: 50, // Add top padding to create space at the top
    width: "100%",
    height: "80%",
  },
  logoContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    alignItems: "center",
    width: 50,
    height: 50,
  },
  logoText: {
    alignItems: "center",
  },
});

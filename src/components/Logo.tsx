import React from "react";
import { View, Image, StyleSheet } from "react-native";

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
    justifyContent: "flex-start",
    padding: 50,
    width: "100%",
    height: "80%",
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

import React from "react";
import { View, Image, StyleSheet } from "react-native";

export default function Splash() {
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
    justifyContent: "center",
    padding: "15%",
    width: "100%",
    height: "100%",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoImage: {
    width: 50,
    height: 50,
  },
  logoText: {},
});

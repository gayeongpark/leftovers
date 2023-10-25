import React from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../state/themeSlice";
import { RootState } from "../../state/store";

export default function Setting() {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const dispatch = useDispatch();

  const toggleThemeSwitch = () => {
    dispatch(toggleTheme());
  };

  // Define conditional styles based on the theme
  const containerStyle = isDarkMode
    ? [styles.container, styles.darkContainer]
    : styles.container;
  const titleStyle = isDarkMode ? [styles.title, styles.darkTitle] : styles.title;

  return (
    <View style={containerStyle}>
      <Text style={titleStyle}>Dark Mode</Text>
      <Switch value={isDarkMode} onValueChange={toggleThemeSwitch} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  darkContainer: {
    backgroundColor: "#000", // Change to your dark mode background color
  },
  title: {
    fontSize: 18,
  },
  darkTitle: {
    color: "#fff", // Change to your dark mode text color
  },
});

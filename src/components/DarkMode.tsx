import React from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../state/themeSlice";
import { RootState } from "../../state/store";

export default function DarkMode() {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const dispatch = useDispatch();

  const toggleThemeSwitch = () => {
    dispatch(toggleTheme());
  };
  return (
    <View>
      <Switch value={isDarkMode} onValueChange={toggleThemeSwitch} />
      {isDarkMode === true ? (
        <Text style={[styles.text, isDarkMode ? styles.darkText : null]}>
          Dark Mode
        </Text>
      ) : (
        <Text style={[styles.text, isDarkMode ? styles.darkText : null]}>
          Light mode
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#000",
  },
  darkText: {
    color: "#fff",
  },
});

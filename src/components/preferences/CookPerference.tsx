import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../state/store";

export default function CookPreference() {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [isSelecteHealthy, setIsSelectedHealthy] = useState<boolean>(false);
  const [isSelectedEasy, setIsSelectedEasy] = useState<boolean>(false);
  const [isSelectedAdventurous, setIsSelectedAdventurous] =
    useState<boolean>(false);
  const [isSelectedOthers, setIsSelectedOthers] = useState<boolean>(false);

  const navigation = useNavigation<any>();
  const dispatch = useDispatch<any>();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  const handleSelect = (value: string) => {
    const selectedValuesCopy = [...selectedValues];
    if (selectedValuesCopy.includes(value)) {
      setSelectedValues(selectedValuesCopy.filter((item) => item !== value));
    } else {
      setSelectedValues([...selectedValuesCopy, value]);
    }

    if (value === "Healthy cook") {
      setIsSelectedHealthy(!isSelecteHealthy);
    } else if (value === "Easy cook") {
      setIsSelectedEasy(!isSelectedEasy);
    } else if (value === "Adventurous cook") {
      setIsSelectedAdventurous(!isSelectedAdventurous);
    } else if (value === "Others") {
      setIsSelectedOthers(!isSelectedOthers);
    }
  };

  const handleNavigateToOthers = () => {
    navigation.navigate("CookPreferenceOthers", { selectedValues });
  };

  return (
    <View style={[styles.container, isDarkMode ? styles.darkContainer : null]}>
      <Text style={[styles.title, isDarkMode ? styles.darkTitle : null]}>
        Set your preferences
      </Text>
      <Text
        style={[styles.description, isDarkMode ? styles.darkDescription : null]}
      >
        What's the most important to you when you cook?
      </Text>
      <TouchableOpacity
        style={
          isSelecteHealthy === false ? styles.button : styles.selectedButton
        }
        onPress={() => handleSelect("Healthy cook")}
      >
        <Text
          style={
            isSelecteHealthy === false
              ? [styles.buttonText, isDarkMode && styles.darkText]
              : [styles.selectedButtonText, isDarkMode && styles.darkText]
          }
        >
          Healthy cook style
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={isSelectedEasy === false ? styles.button : styles.selectedButton}
        onPress={() => handleSelect("Easy cook")}
      >
        <Text
          style={
            isSelectedEasy === false
              ? [styles.buttonText, isDarkMode && styles.darkText]
              : [styles.selectedButtonText, isDarkMode && styles.darkText]
          }
        >
          Easy cook style
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={
          isSelectedAdventurous === false
            ? styles.button
            : styles.selectedButton
        }
        onPress={() => handleSelect("Adventurous cook")}
      >
        <Text
          style={
            isSelectedAdventurous === false
              ? [styles.buttonText, isDarkMode && styles.darkText]
              : [styles.selectedButtonText, isDarkMode && styles.darkText]
          }
        >
          Adventurous cook style
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={
          isSelectedOthers === false ? styles.button : styles.selectedButton
        }
        onPress={handleNavigateToOthers}
      >
        <Text
          style={
            isSelectedOthers === false
              ? [styles.buttonText, isDarkMode && styles.darkText]
              : [styles.selectedButtonText, isDarkMode && styles.darkText]
          }
        >
          Others
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.nextButton}
        onPress={handleNavigateToOthers}
      >
        <Text style={styles.nextText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: "100%",
    width: "100%",
    alignItems: "center",
    padding: 20,
  },
  darkContainer: {
    backgroundColor: "#000",
    height: "100%",
    width: "100%",
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
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
  },
  description: { fontSize: 20, marginBottom: 20 },
  darkDescription: {
    fontSize: 20,
    marginBottom: 20,
    alignItems: "center",
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
  othersbutton: {
    borderColor: "#fdd605",
    borderWidth: 2,
    padding: 15,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  nextButton: {
    backgroundColor: "#fdd605",
    padding: 15,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  nextText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 18,
  },
  buttonText: {
    color: "black",
    fontWeight: "600",
    fontSize: 16,
  },
  darkText: {
    color: "#fff",
  },
  selectedButton: {
    backgroundColor: "#fdd605",
    padding: 15,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  selectedButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 18,
  },
});

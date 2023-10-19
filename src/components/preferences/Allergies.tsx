import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function Allergies() {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const [isSelectedNut, setIsSelectedNut] = useState<boolean>(false);
  const [isSelectedDiary, setIsSelectedDiary] = useState<boolean>(false);
  const [isSelectedGluten, setIsSelectedGluten] = useState<boolean>(false);
  const [isSelectedFish, setIsSelectedFish] = useState<boolean>(false);
  const [isSelectedShellfish, setIsSelectedShellfish] =
    useState<boolean>(false);
  const [isSelectedSoy, setIsSelectedSoy] = useState<boolean>(false);
  const [isSelectedOthers, setIsSelectedOthers] = useState<boolean>(false);

  const navigation = useNavigation<any>();

  const handleSelect = (value: string) => {
    const selectedValuesCopy = [...selectedValues];

    if (selectedValuesCopy.includes(value)) {
      setSelectedValues(selectedValuesCopy.filter((item) => item !== value));
    } else {
      setSelectedValues([...selectedValuesCopy, value]);
    }

    if (value === "Nut") {
      setIsSelectedNut(!isSelectedNut);
    } else if (value === "Diary") {
      setIsSelectedDiary(!isSelectedDiary);
    } else if (value === "Gluten") {
      setIsSelectedGluten(!isSelectedGluten);
    } else if (value === "Fish") {
      setIsSelectedFish(!isSelectedFish);
    } else if (value === "Shellfish") {
      setIsSelectedShellfish(!isSelectedShellfish);
    } else if (value === "Soy") {
      setIsSelectedSoy(!isSelectedSoy);
    } else if (value === "Others") {
      setIsSelectedOthers(!isSelectedOthers);
    }
  };

  const handleNavigateToOthers = () => {
    navigation.navigate("AllergiesOthers", { selectedValues });
  };

  return (
    
    <View style={styles.container}>
     
      <Text style={styles.title}>Set your preferences</Text>
      <Text style={styles.description}>
        Do you have allergies? Please select the ones that apply to you.
      </Text>
      <View style={styles.rowContainer}>
        <TouchableOpacity
          style={
            isSelectedNut === false ? styles.button : styles.selectedButton
          }
          onPress={() => handleSelect("Nut")}
        >
          <Text
            style={
              isSelectedNut === false
                ? styles.buttonText
                : styles.selectedButtonText
            }
          >
            Nut
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            isSelectedDiary === false ? styles.button : styles.selectedButton
          }
          onPress={() => handleSelect("Diary")}
        >
          <Text
            style={
              isSelectedDiary === false
                ? styles.buttonText
                : styles.selectedButtonText
            }
          >
            Diary
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.rowContainer}>
        <TouchableOpacity
          style={
            isSelectedGluten === false ? styles.button : styles.selectedButton
          }
          onPress={() => handleSelect("Gluten")}
        >
          <Text
            style={
              isSelectedGluten === false
                ? styles.buttonText
                : styles.selectedButtonText
            }
          >
            Gluten
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            isSelectedFish === false ? styles.button : styles.selectedButton
          }
          onPress={() => handleSelect("Fish")}
        >
          <Text
            style={
              isSelectedFish === false
                ? styles.buttonText
                : styles.selectedButtonText
            }
          >
            Fish
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.rowContainer}>
        <TouchableOpacity
          style={
            isSelectedShellfish === false
              ? styles.button
              : styles.selectedButton
          }
          onPress={() => handleSelect("Shellfish")}
        >
          <Text
            style={
              isSelectedShellfish === false
                ? styles.buttonText
                : styles.selectedButtonText
            }
          >
            Shellfish
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            isSelectedSoy === false ? styles.button : styles.selectedButton
          }
          onPress={() => handleSelect("Soy")}
        >
          <Text
            style={
              isSelectedSoy === false
                ? styles.buttonText
                : styles.selectedButtonText
            }
          >
            Soy
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={
          isSelectedOthers === false ? styles.othersbutton : styles.selectedButton
        }
        onPress={handleNavigateToOthers}
      >
        <Text
          style={
            isSelectedOthers === false
              ? styles.buttonText
              : styles.selectedButtonText
          }
        >
          Others
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => navigation.navigate("CookPreference")}
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
  arrow: {
   display: "flex",
  },
  title: {
    fontSize: 29,
    fontWeight: "bold",
    marginBottom: 20,
    alignItems: "center",
    justifyContent:"center",
  },
  description: { fontSize: 20, marginBottom: 20, alignItems: "center", },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    borderColor: "#fdd605",
    borderWidth: 2,
    padding: 15,
    borderRadius: 5,
    width: "45%",
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
    marginTop: 10,
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
  selectedButton: {
    backgroundColor: "#fdd605",
    padding: 15,
    borderRadius: 5,
    width: "45%",
    alignItems: "center",
    marginTop: 10,
  },
  selectedButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 18,
  },
});

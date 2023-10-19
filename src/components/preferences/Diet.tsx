import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

export default function Diet() {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const [isSelectedKeto, setIsSelectedKeto] = useState<boolean>(false);
  const [isSelectedPaleo, setIsSelectedPaleo] = useState<boolean>(false);
  const [isSelectedVegan, setIsSelectedVegan] = useState<boolean>(false);
  const [isSelectedLowCarb, setIsSelectedLowCarb] = useState<boolean>(false);
  const [isSelectedGlutenFree, setIsSelectedGlutenFree] =
    useState<boolean>(false);
  const [isSelectedOthers, setIsSelectedOthers] = useState<boolean>(false);

  const navigation = useNavigation<any>();

  const handleSelect = (value: string) => {
    const selectedValuesCopy = [...selectedValues];

    if (selectedValuesCopy.includes(value)) {
      setSelectedValues(selectedValuesCopy.filter((item) => item !== value));
    } else {
      setSelectedValues([...selectedValuesCopy, value]);
    }

    if (value === "Keto") {
      setIsSelectedKeto(!isSelectedKeto);
    } else if (value === "Paleo") {
      setIsSelectedPaleo(!isSelectedPaleo);
    } else if (value === "Vegan") {
      setIsSelectedVegan(!isSelectedVegan);
    } else if (value === "LowCarb") {
      setIsSelectedLowCarb(!isSelectedLowCarb);
    } else if (value === "GlutenFree") {
      setIsSelectedGlutenFree(!isSelectedGlutenFree);
    } else if (value === "Others") {
      setIsSelectedOthers(!isSelectedOthers);
    }
  };

  const handleNavigateToOthers = () => {
    navigation.navigate("DietOthers", { selectedValues });
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
            isSelectedKeto === false ? styles.button : styles.selectedButton
          }
          onPress={() => handleSelect("Keto")}
        >
          <Text
            style={
              isSelectedKeto === false
                ? styles.buttonText
                : styles.selectedButtonText
            }
          >
            Keto
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            isSelectedPaleo === false ? styles.button : styles.selectedButton
          }
          onPress={() => handleSelect("Paleo")}
        >
          <Text
            style={
              isSelectedPaleo === false
                ? styles.buttonText
                : styles.selectedButtonText
            }
          >
            Paleo
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.rowContainer}>
        <TouchableOpacity
          style={
            isSelectedVegan === false ? styles.button : styles.selectedButton
          }
          onPress={() => handleSelect("Vegan")}
        >
          <Text
            style={
              isSelectedVegan === false
                ? styles.buttonText
                : styles.selectedButtonText
            }
          >
            Vegan
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            isSelectedLowCarb === false ? styles.button : styles.selectedButton
          }
          onPress={() => handleSelect("LowCarb")}
        >
          <Text
            style={
              isSelectedLowCarb === false
                ? styles.buttonText
                : styles.selectedButtonText
            }
          >
            Low-carb
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.rowContainer}>
        <TouchableOpacity
          style={
            isSelectedGlutenFree === false
              ? styles.button
              : styles.selectedButton
          }
          onPress={() => handleSelect("Shellfish")}
        >
          <Text
            style={
              isSelectedGlutenFree === false
                ? styles.buttonText
                : styles.selectedButtonText
            }
          >
            Gluten-free
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
                ? styles.buttonText
                : styles.selectedButtonText
            }
          >
            Others
          </Text>
        </TouchableOpacity>
      </View>
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
  title: {
    fontSize: 29,
    fontWeight: "bold",
    marginBottom: 20,
  },
  description: { fontSize: 20, marginBottom: 20 },
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

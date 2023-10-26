import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../state/store";
import { API_URL, API_URL2 } from "@env";

type RouteParams = {
  selectedValues: string[];
};

export default function CookPreferenceOthers() {
  const userData = useSelector((state: RootState) => state.auth.userData);
  const [others, setOthers] = useState<string[]>([]);
  const [combinedValues, setCombinedValues] = useState<string[]>([]);
  const route = useRoute();

  const navigation = useNavigation<any>();
  const dispatch = useDispatch<any>();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const selectedValues = (route.params as RouteParams)?.selectedValues || [];

  const handleTextInputChange = (text: string) => {
    const values = text.split(",").map((value) => value.trim());
    setOthers(values);
  };

  useEffect(() => {
    const combined = selectedValues.concat(others);
    setCombinedValues(combined);
  }, [selectedValues, others]);

  console.log(combinedValues);

  // console.log(others);
  // console.log(selectedValues);

  const handleAllergiesNext = async () => {
    try {
      let apiUrlToUse = API_URL || API_URL2;
      // console.log(userData?.email);
      // console.log(userData?.id);
      // console.log(combinedValues)
      if (API_URL2 && API_URL2.trim() !== "") {
        apiUrlToUse = API_URL2;
      }
      console.log(apiUrlToUse);
      const response = await axios.post(
        `http://${apiUrlToUse}:8000/preferences/cookPreference`,
        {
          userEmail: userData?.email,
          userId: userData?.id,
          cook: combinedValues,
        },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        navigation.navigate("Diet");
      }
    } catch (error) {
      console.error("Error sending data to server:", error);
    }
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
      <TextInput
        style={[styles.input, isDarkMode ? styles.darkInput : null]}
        onChangeText={handleTextInputChange}
        value={others.join(", ")}
        placeholder="Please input ex) Simple cook, Asian cook, Italian cook"
        placeholderTextColor={isDarkMode ? "#ccc" : "#000"}
        keyboardType="default"
      />
      <TouchableOpacity style={styles.nextButton} onPress={handleAllergiesNext}>
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
    color: "#fff",
  },
  description: { fontSize: 20, marginBottom: 20 },
  darkDescription: {
    fontSize: 20,
    marginBottom: 20,
    color: "#fff",
  },
  input: {
    width: "100%",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#000",
    marginBottom: 20,
  },
  darkInput: {
    width: "100%",
    padding: 10,
    borderBottomWidth: 1,
    color: "#fff",
    borderColor: "#fff",
    marginBottom: 20,
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
});

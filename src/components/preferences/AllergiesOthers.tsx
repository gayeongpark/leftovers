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
import { useSelector } from "react-redux";
import { RootState } from "../../../state/store";
import { API_URL, API_URL2 } from "@env";

type RouteParams = {
  selectedValues: string[];
};

export default function AllergiesOthers() {
  const userData = useSelector((state: RootState) => state.auth.userData);
  const [others, setOthers] = useState<string[]>([]);
  const [combinedValues, setCombinedValues] = useState<string[]>([]);
  const route = useRoute();

  const navigation = useNavigation<any>();

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
        `http://${apiUrlToUse}:8000/preferences/allergies`,
        {
          userEmail: userData?.email,
          userId: userData?.id,
          allergies: combinedValues,
        },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        navigation.navigate("CookPreference");
      }
    } catch (error) {
      console.error("Error sending data to server:", error);
    }
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>Set your preferences</Text>
        <Text style={styles.description}>
          Do you have allergies? Please ect the ones that apply to you.
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={handleTextInputChange}
          value={others.join(", ")}
          placeholder="Please input ex) fish, gluten"
          keyboardType="default"
        />
        <TouchableOpacity
          style={styles.nextButton}
          onPress={handleAllergiesNext}
        >
          <Text style={styles.nextText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
  input: {
    width: "100%",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#000",
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

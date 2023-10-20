import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  View,
} from "react-native";
import { showMessage } from "react-native-flash-message";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { GOOGLE_VISION_API_KEY } from "@env";
import axios from "axios";

type DetectedObject = {
  description: string;
  mid: string;
};

export default function Main() {
  const navigation = useNavigation<any>();
  const [imageUrl, setImageUrl] = useState<string>("");
  const [detectedValues, setDetectedValues] = useState<DetectedObject[]>([]);
  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        setImageUrl(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Image picking error: ", error);
    }
  };

  const analyzeImage = async () => {
    try {
      if (!imageUrl) {
        showMessage({
          message: "Please select an image at first!",
          type: "danger",
        });
        return;
      }

      const apiURL = `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_VISION_API_KEY}`;
      const base64ImageData = await FileSystem.readAsStringAsync(imageUrl, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const requestData = {
        requests: [
          {
            image: {
              content: base64ImageData,
            },
            features: [
              {
                type: "LABEL_DETECTION",
                maxResults: 100,
              },
            ],
          },
        ],
      };
      const apiResponse = await axios.post(apiURL, requestData);
      const foodDetectedValues = apiResponse.data.responses[0].labelAnnotations;
      setDetectedValues(foodDetectedValues);
      showMessage({
        message: "We successfully analyzed your image",
        type: "success",
      });
    } catch (error) {
      console.error("Analze image error: ", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Let's save leftovers!</Text>
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={{ width: 300, height: 300 }} />
      ) : (
        <View style={styles.square} />
      )}
      {detectedValues.length > 0 ? (
        <>
          <TouchableOpacity
            onPress={() => navigation.navigate("Recipes", { detectedValues })}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Generate Recipes</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity onPress={pickImage} style={styles.googleButton}>
            <Text style={styles.googleButtonText}>Chose an image</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={analyzeImage} style={styles.button}>
            <Text style={styles.buttonText}>Analyze Image</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    height: "100%",
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 29,
    fontWeight: "bold",
    marginBottom: 20,
  },
  square: {
    width: 300,
    height: 300,
    backgroundColor: "#222327",
  },
  button: {
    backgroundColor: "#fdd605",
    padding: 15,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  googleButton: {
    borderColor: "#fdd605",
    borderWidth: 2,
    padding: 15,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  googleButtonText: {
    color: "black",
    fontWeight: "600",
    fontSize: 16,
  },
  bottomButtonsContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  bottomButtonText: {
    fontWeight: "bold",
  },
});

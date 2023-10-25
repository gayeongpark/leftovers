import {
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Text,
} from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

type UserPreferences = {
  cook: string[];
  allergies: string[];
  diet: string[];
};

export default function Profile() {
  const [selectedProfileImage, setSelectedProfileImage] = useState<string>("");
  const userData = useSelector((state: RootState) => state.auth.userData);
  const [firstname, setFirstname] = useState<string | undefined>(
    userData?.firstname
  );
  const [lastname, setLastname] = useState<string | undefined>(
    userData?.lastname
  );
  const [userPreferences, setUserPreferences] = useState<UserPreferences>({
    cook: [],
    allergies: [],
    diet: [],
  });

  const handleImageSelection = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });
      // console.log(result);

      if (!result.canceled) {
        setSelectedProfileImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Image picking error: ", error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <TouchableOpacity onPress={handleImageSelection}>
          {selectedProfileImage ? (
            <>
              <Image
                style={styles.profileImage}
                source={{ uri: selectedProfileImage }}
              />
            </>
          ) : userData?.profileImage ? (
            <Image
              style={styles.profileImage}
              source={{ uri: userData.profileImage }}
            />
          ) : (
            <Image
              style={styles.profileImage}
              source={require("../../assets/user.png")}
            />
          )}
          {selectedProfileImage ? (
            <TouchableOpacity style={styles.uploadImageIcon}>
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.uploadImageIcon}>
              <AntDesign name="camera" size={24} color="black" />
            </View>
          )}
        </TouchableOpacity>
        <View style={styles.profileMain}>
          <Text style={styles.title}>Firstname</Text>
          <View style={styles.save}>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setFirstname(text)}
              value={firstname}
              editable={true}
              keyboardType="default"
            />
            {firstname !== userData?.firstname && (
              <TouchableOpacity>
                <Text style={styles.saveText}>save</Text>
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.title}>Lastname</Text>
          <View style={styles.save}>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setLastname(text)}
              value={lastname}
              editable={true}
              keyboardType="default"
            />
            {lastname !== userData?.lastname && (
              <TouchableOpacity>
                <Text style={styles.saveText}>save</Text>
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.title}>Email</Text>
          <TextInput
            style={styles.input}
            value={userData?.email}
            keyboardType="default"
          />
          <Text style={styles.title}>Preferences</Text>
          <Text style={styles.description}>I have allergies...</Text>
          <TextInput
            style={styles.input}
            value={userData?.email}
            keyboardType="default"
          />
          <Text style={styles.description}>I prefer to cook...</Text>
          <TextInput
            style={styles.input}
            value={userData?.email}
            keyboardType="default"
          />
          <Text style={styles.description}>I prefer to diet...</Text>
          <TextInput
            style={styles.input}
            value={userData?.email}
            keyboardType="default"
          />
        </View>
        <View style={styles.deleteAccount}>
          <TouchableOpacity>
            <Text style={styles.deleteAccountText}>Delete account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    height: "100%",
    width: "100%",
  },
  contentContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: {
    margin: 10,
    width: 100,
    height: 100,
    borderRadius: 75,
  },
  uploadImageIcon: {
    position: "absolute",
    bottom: 0,
    right: 10,
    zIndex: 9999,
  },
  profileMain: {
    width: "65%",
    display: "flex",
    marginTop: 10,
  },
  title: {
    fontSize: 18,
  },
  description: {
    marginTop: 10,
    fontSize: 14,
  },
  input: {
    width: "100%",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#000",
    marginBottom: 20,
  },
  save: {
    display: "flex",
    flexDirection: "row",
  },
  saveText: {
    fontSize: 20,
  },
  deleteAccount: {
    alignSelf: "flex-start", // Align to the right
    margin: 15,
  },
  deleteAccountText: {
    fontSize: 15,
    // color: "red", // Adjust the color as needed
  },
});

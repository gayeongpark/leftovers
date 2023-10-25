import { View, StyleSheet, ActivityIndicator, Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import { GiftedChat } from "react-native-gifted-chat";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { CHAT_GPT_API_KEY } from "@env";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { API_URL, API_URL2 } from "@env";

type RouteParams = {
  detectedValues: DetectedValue[];
};

type UserPreferences = {
  cook: string[];
  allergies: string[];
  diet: string[];
};

type MessageType = {
  _id: number;
  text: string;
  createdAt: Date;
  user: {
    _id: any;
    name: string | undefined;
  };
};

type DetectedValue = {
  description: string;
  mid: string;
  score: number;
  topicality: number;
};

export default function Recipes() {
  const userData = useSelector((state: RootState) => state.auth.userData);
  const route = useRoute();
  const detectedValues = (route.params as RouteParams)?.detectedValues || [];
  // console.log(detectedValues);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [userPreferences, setUserPreferences] = useState<UserPreferences>({
    cook: [],
    allergies: [],
    diet: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserPreferences = async () => {
      try {
        let apiUrlToUse = API_URL;
        // if (API_URL2 && API_URL2.trim() !== "") {
        //   apiUrlToUse = API_URL2;
        // }
        const response = await axios.get(
          `http://${apiUrlToUse}:8000/preferences/detailedPreferences/${userData?.id}`,
          {
            headers: {
              "content-type": "application/json",
            },
          }
        );
        // console.log("Preferences", response.data);

        if (response.status === 200) {
          const { cook, allergies, diet } = response.data;
          setUserPreferences({ cook, allergies, diet });
        } else {
          console.log("User not found!");
        }
      } catch (error) {
        console.error("Error fetching user preferences:", error);
      }
    };

    fetchUserPreferences();

    const apiResponse = async () => {
      try {
        const response = await axios.post(
          `https://api.openai.com/v1/chat/completions`,
          {
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content: "You are now chatting with Leftover team",
              },
              {
                role: "user",
                content: `At first, filter only food ingredients from ${detectedValues
                  .map((value) => value.description)
                  .join(
                    ", "
                  )}, and then generate a recipe with detected values: ${detectedValues
                  .map((value) => value.description)
                  .join(
                    ", "
                  )}. My preferences are: Cook style: ${userPreferences.cook.join(
                  ", "
                )}, Allergies: ${userPreferences.allergies.join(
                  ", "
                )}, Diet style: ${userPreferences.diet.join(", ")}`,
              },
            ],
            temperature: 0.3,
          },
          {
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${CHAT_GPT_API_KEY}`,
            },
          }
        );

        const botMessage = response.data.choices[0].message.content;

        setMessages([
          {
            _id: 1,
            text: `Hello ${userData?.firstname}! ` + botMessage,
            createdAt: new Date(),
            user: {
              _id: 2,
              name: "Leftover Tem",
            },
          },
        ]);
        setIsLoading(false);
      } catch (error: any) {
        setIsLoading(false);
        console.error("Chatbot API Error:", error);
        if (error.response) {
          console.error("Response Status:", error.response.status);
          console.error("Response Data:", error.response.data);
        }
      }
    };

    apiResponse();
  }, []);

  const handleUserMessage = async (newMessage: MessageType[]) => {
    if (newMessage[0].text.trim() === "") return;

    const userMessageObject: MessageType = {
      _id: messages.length + 1, // Assign a unique id
      text: newMessage[0].text, // Extract the text from the newMessage array
      createdAt: new Date(),
      user: {
        _id: userData?.id, // User ID for the current user
        name: userData?.lastname,
      },
    };

    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, [userMessageObject])
    );

    try {
      if (
        [
          "food",
          "recipe",
          "fruit",
          "diet",
          "ingredient",
          "allergy",
          "allergies",
          "cook",
          "dish",
          "replace",
          "have",
          "thank you",
          "appreciate",
          "great",
          "flavor",
        ].some((keyword) => newMessage[0].text.toLowerCase().includes(keyword))
      ) {
        const response = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          {
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content: "You are now chatting with Leftover Team",
              },
              {
                role: "user",
                content: newMessage[0].text, // Use the user's message
              },
            ],
          },
          {
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${CHAT_GPT_API_KEY}`,
            },
          }
        );

        const botMessage = response.data.choices[0].message.content;

        const botMessageObject: MessageType = {
          _id: userMessageObject._id + 1,
          text: botMessage,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "Leftover Team",
          },
        };

        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, [botMessageObject])
        );
      } else {
        const botMessageObject: MessageType = {
          _id: userMessageObject._id + 1,
          text: "I can help you find recipes or information about food. Please specify your request on food!",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "Leftover Team",
          },
        };

        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, [botMessageObject])
        );
      }
    } catch (error: any) {
      if (error.response) {
        console.error("API Error:", error.response.status, error.response.data);
      } else {
        console.error("Request failed:", error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            style={styles.loading}
            size="large"
            color="#fdd605"
          />
          <Text>
            We are now generating the recipe according to the ingredients...
          </Text>
        </View>
      ) : (
        <GiftedChat
          messages={messages}
          onSend={handleUserMessage}
          user={{
            _id: userData?.id || 1,
            name: userData?.lastname,
          }}
          placeholder="Type your message..."
          alwaysShowSend
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  sendButton: {
    marginRight: 10,
    marginBottom: 5,
    borderRadius: 20,
    backgroundColor: "blue",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  loadingContainer: {
    alignItems: "center",
  },
  loading: {
    marginBottom: 10,
  },
  sendButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  inputToolbar: {
    justifyContent: "center",
    width: "80%",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingLeft: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
});

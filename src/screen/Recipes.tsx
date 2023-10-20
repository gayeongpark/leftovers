import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { GiftedChat } from "react-native-gifted-chat";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { CHAT_GPT_API_KEY } from "@env";

type RouteParams = {
  detectedValues: DetectedValue[]; // Change the type here to DetectedValue[]
};

type MessageType = {
  _id: number;
  text: string;
  createdAt: Date;
  user: {
    _id: number;
    name: string;
  };
};

type DetectedValue = {
  description: string;
  mid: string;
  score: number;
  topicality: number;
};

export default function Recipes() {
  const route = useRoute();
  const detectedValues = (route.params as RouteParams)?.detectedValues || [];
  // console.log(detectedValues);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [userMessage, setUserMessage] = useState("");

  useEffect(() => {
    const initialMessage = `Please filter only food ingredients from ${detectedValues
      .map((value) => value.description)
      .join(", ")}. Generate recipes with detected values: ${detectedValues
      .map((value) => value.description)
      .join(", ")}`;

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
                  )} and then generate a recipe with detected values: ${detectedValues
                  .map((value) => value.description)
                  .join(", ")}`,
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
            text: botMessage,
            createdAt: new Date(),
            user: {
              _id: 2,
              name: "Recipe Bot",
            },
          },
        ]);
      } catch (error: any) {
        console.error("Chatbot API Error:", error);
        if (error.response) {
          console.error("Response Status:", error.response.status);
          console.error("Response Data:", error.response.data);
        }
      }
    };

    apiResponse();
  }, [detectedValues]);

  const handleUserMessage = async () => {
    if (userMessage.trim() === "") return; // Don't send empty messages

    const userMessageObject: MessageType = {
      _id: messages.length + 1,
      text: userMessage,
      createdAt: new Date(),
      user: {
        _id: 1,
        name: "User",
      },
    };

    // Update the state to show the user's message
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, [userMessageObject])
    );

    try {
      // Check if the user's message contains keywords related to food and recipes
      if (
        userMessage.toLowerCase().includes("food") ||
        userMessage.toLowerCase().includes("recipe") ||
        userMessage.toLowerCase().includes("fruit") ||
        userMessage.toLowerCase().includes("diet") ||
        userMessage.toLowerCase().includes("ingredient")
      ) {
        // Send the user's message to the chatbot API
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
                content: userMessage,
                detectedValues: detectedValues,
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

        // Update the state with the chatbot's response
        const botMessageObject: MessageType = {
          _id: userMessageObject._id + 1,
          text: botMessage,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "Recipe Bot",
          },
        };

        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, [botMessageObject])
        );
      } else {
        // If the user's message doesn't contain keywords, provide a default response
        const botMessageObject: MessageType = {
          _id: userMessageObject._id + 1,
          text: "I can help you find recipes or information about food. Please specify your request!",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "Recipe Bot",
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

    // Clear the user's input
    setUserMessage("");
  };

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={handleUserMessage}
        user={{
          _id: 1,
        }}
        placeholder="Type your message..."
        alwaysShowSend
        renderSend={(props) => (
          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleUserMessage}
          >
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        )}
        renderInputToolbar={(props) => (
          <View style={styles.inputSection}>
            <TextInput
              {...props}
              onChangeText={(text) => setUserMessage(text)}
              value={userMessage}
              placeholder="Type your message..."
              style={styles.inputToolbar}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  sendButton: {
    marginRight: 10,
    marginBottom: 5,
    borderRadius: 20,
    backgroundColor: "blue",
    paddingVertical: 5,
    paddingHorizontal: 10,
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
  inputSection: {

  },
});

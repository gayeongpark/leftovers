import React from "react";
// import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import FlashMessage from "react-native-flash-message";
import Login from "./src/screen/Login";
import Signup from "./src/screen/Signup";
import ForgotPassword from "./src/screen/ForgotPassword";
import ResetPassword from "./src/screen/ResetPassword";
import ConfirmEmail from "./src/screen/ConfirmEmail";
import Onboarding from "./src/screen/Onboarding";
import EmailVerificationForResetEmail from "./src/screen/EmailVerificationForResetEmail";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ConfirmEmail"
          component={ConfirmEmail}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Onboarding"
          component={Onboarding}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EmailVerificationForResetEmail"
          component={EmailVerificationForResetEmail}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
}

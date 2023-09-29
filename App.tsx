import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "../client/state/store";
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
import { getCredentials, isTokenExpired } from "../client/credentials";
import Main from "./src/screen/Main";

const Stack = createStackNavigator();

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      const storedCredentials = await getCredentials();
      if (storedCredentials && !isTokenExpired(storedCredentials.accessToken)) {
        setAuthenticated(true);
      }
    };

    checkAuthentication();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        {authenticated ? (
          <Stack.Navigator initialRouteName="Main">
            {/* Define authenticated screens */}
            <Stack.Screen
              name="Main"
              component={Main}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator initialRouteName="Login">
            {/* Define unauthenticated screens */}
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
        )}
        <FlashMessage position="top" />
      </NavigationContainer>
    </Provider>
  );
}

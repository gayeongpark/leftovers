import React from "react";
import { Image } from "react-native";
import { Provider } from "react-redux";
import { store } from "../client/state/store";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import FlashMessage from "react-native-flash-message";
import Login from "./src/screen/Login";
import Signup from "./src/screen/Signup";
import ForgotPassword from "./src/screen/ForgotPassword";
import ResetPassword from "./src/screen/ResetPassword";
import ConfirmEmail from "./src/screen/ConfirmEmail";
import EmailVerificationForResetEmail from "./src/screen/EmailVerificationForResetEmail";
import Main from "./src/screen/Main";
import Preferences from "./src/screen/Preferences";
import Profile from "./src/screen/Profile";
import Setting from "./src/screen/Setting";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="MainScreen"
            component={MainWithDrawerNavigation}
            options={{ headerShown: false }}
          />
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
            name="EmailVerificationForResetEmail"
            component={EmailVerificationForResetEmail}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
        <FlashMessage position="top" />
      </NavigationContainer>
    </Provider>
  );
}

function MainWithDrawerNavigation() {
  return (
    <Drawer.Navigator
      initialRouteName="MainScreen"
      screenOptions={{
        headerTintColor: "#fdd605",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={Main}
        options={{
          drawerIcon: () => (
            <Image
              source={require("./assets/home.png")}
              style={{ width: 24, height: 24 }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Preferences"
        component={Preferences}
        options={{
          drawerIcon: () => (
            <Image
              source={require("./assets/preferences.png")}
              style={{ width: 24, height: 24 }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Setting"
        component={Setting}
        options={{
          drawerIcon: () => (
            <Image
              source={require("./assets/settings.png")}
              style={{ width: 24, height: 24 }}
            />
          ),
        }}
      />
      {/* <Drawer.Screen
        name="Logout"
        component={LogoutScreen}
        options={{
          drawerIcon: () => (
            <Image
              source={require("./assets/logout.png")} // Provide the icon for logout
              style={{ width: 24, height: 24 }}
            />
          ),
        }}
      /> */}
    </Drawer.Navigator>
  );
}

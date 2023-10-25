import React from "react";
import { Image } from "react-native";
import { Provider, useSelector } from "react-redux";
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
import Recipes from "./src/screen/Recipes";
import Profile from "./src/screen/Profile";
import Setting from "./src/screen/Setting";
import Logout from "./src/screen/Logout";
import { RootState } from "../client/state/store";
import AllergiesOthers from "./src/components/preferences/AllergiesOthers";
import CookPerference from "./src/components/preferences/CookPerference";
import Allergies from "./src/components/preferences/Allergies";
import CookPreferenceOthers from "./src/components/preferences/CookPreferenceOthers";
import Diet from "./src/components/preferences/Diet";
import DietOthers from "./src/components/preferences/DietOthers";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const MainStack = createStackNavigator();
const PreferencesStack = createStackNavigator();

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
  const userData = useSelector((state: RootState) => state.auth.userData);
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  return (
    <Provider store={store}>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerTintColor: isDarkMode ? "#ffff" : "#fdd605",
          headerTitleStyle: {
            fontWeight: "bold",
            color: isDarkMode ? "#ffff" : "#fdd605",
          },
          headerStyle: {
            backgroundColor: isDarkMode ? "#fdd605" : "#fff",
          },
        }}
      >
        <Drawer.Screen
          name="Profile"
          component={Profile}
          options={{
            drawerIcon: () => (
              <Image
                source={require("./assets/user.png")}
                style={{ width: 24, height: 24 }}
              />
            ),
            drawerLabel: userData
              ? `Welcome ${userData.firstname}!`
              : "No verified user",
          }}
        />
        <Drawer.Screen
          name="Home"
          component={MainStackScreen}
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
          component={PreferencesStackScreen}
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
        <Drawer.Screen
          name="Logout"
          component={Logout}
          options={{
            drawerIcon: () => (
              <Image
                source={require("./assets/logout.png")}
                style={{ width: 24, height: 24 }}
              />
            ),
          }}
        />
      </Drawer.Navigator>
    </Provider>
  );
}

const MainStackScreen = () => {
  return (
    <MainStack.Navigator initialRouteName="Main">
      <MainStack.Screen
        name="Main"
        component={Main}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="Recipes"
        component={Recipes}
        options={{ headerShown: false }}
      />
    </MainStack.Navigator>
  );
};

const PreferencesStackScreen = () => {
  return (
    <PreferencesStack.Navigator initialRouteName="Allergies">
      <PreferencesStack.Screen
        name="Allergies"
        component={Allergies}
        options={{ headerShown: false }}
      />
      <PreferencesStack.Screen
        name="AllergiesOthers"
        component={AllergiesOthers}
        options={{ headerShown: false }}
      />
      <PreferencesStack.Screen
        name="CookPreference"
        component={CookPerference}
        options={{ headerShown: false }}
      />
      <PreferencesStack.Screen
        name="CookPreferenceOthers"
        component={CookPreferenceOthers}
        options={{ headerShown: false }}
      />
      <PreferencesStack.Screen
        name="Diet"
        component={Diet}
        options={{ headerShown: false }}
      />
      <PreferencesStack.Screen
        name="DietOthers"
        component={DietOthers}
        options={{ headerShown: false }}
      />
    </PreferencesStack.Navigator>
  );
};

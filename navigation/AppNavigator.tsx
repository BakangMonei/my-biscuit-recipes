import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../screens/SplashScreen";
import MainNavigator from "./MainNavigator";
import LoginScreen from "@/screens/LoginScreen";
import RegistrationScreen from "@/screens/RegistrationScreen";
import ForgotPasswordScreen from "@/screens/ForgotPasswordScreen";

const Stack = createNativeStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator initialRouteName="Splash">
    <Stack.Screen
      name="Splash"
      component={SplashScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Main"
      component={MainNavigator}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name="LoginPage"
      component={LoginScreen}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name="ForgotPassword"
      component={ForgotPasswordScreen}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name="RegistrationPage"
      component={RegistrationScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default AppNavigator;

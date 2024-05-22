import { Image, StyleSheet, Platform } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { NavigationContainer } from "@react-navigation/native";
// import MainNavigator from "./../../navigation/MainNavigator";
import AppNavigator from "@/navigation/AppNavigator";
import { AppProvider } from '@/statemanagement/AppContext';

export default function HomeScreen() {
  return (
    <AppProvider>
      <AppNavigator />
    </AppProvider>
  );
};



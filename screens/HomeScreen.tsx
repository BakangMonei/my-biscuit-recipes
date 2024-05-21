import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type RootStackParamList = {
  Home: undefined;
  RecipeList: undefined;
  Preferences: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [currentUser, setCurrentUser] = useState<{
    name: string;
    email: string;
  }>({ name: "", email: "" });

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const userString = await AsyncStorage.getItem("users");
        if (userString) {
          const user = JSON.parse(userString);
          setCurrentUser(user);
        }
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };

    fetchCurrentUser();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Main Menu</Text>
      <Text>Welcome, {currentUser.name}</Text>
      <Text>Email: {currentUser.email}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;

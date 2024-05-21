import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackNavigationProp } from "@react-navigation/stack";
import { Recipe } from "./RecipeListScreen"; // Assuming Recipe type is exported from RecipeListScreen

type RootStackParamList = {
  Home: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [currentUser, setCurrentUser] = useState<{
    name: string;
    email: string;
  }>({ name: "", email: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch recipes
        const savedRecipes = await AsyncStorage.getItem("recipes");
        if (savedRecipes) {
          setRecipes(JSON.parse(savedRecipes));
        }

        // Fetch current user
        const userString = await AsyncStorage.getItem("users");
        if (userString) {
          const user = JSON.parse(userString);
          setCurrentUser(user);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Main Menu</Text>
      <Text>Welcome, {currentUser.name}</Text>
      <Text>Email: {currentUser.email}</Text>
      <View style={styles.gridContainer}>
        {recipes.map((recipe, index) => (
          <TouchableOpacity
            key={index}
            style={styles.cardContainer}
            onPress={() => navigation.navigate("RecipeDetail", { recipe })}
          >
            {recipe.image ? (
              <Image
                source={{ uri: recipe.image }}
                style={styles.recipeImage}
              />
            ) : (
              <View style={styles.placeholderImage} />
            )}
            <Text style={styles.recipeTitle}>{recipe.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  cardContainer: {
    width: "48%",
    aspectRatio: 1,
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 2,
    padding: 10,
  },
  recipeImage: {
    width: "100%",
    height: "70%",
    borderRadius: 10,
  },
  placeholderImage: {
    width: "100%",
    height: "70%",
    backgroundColor: "#ccc",
    borderRadius: 10,
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
});

export default HomeScreen;

import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  RecipeDetail: { recipe: Recipe };
};

type RecipeDetailScreenRouteProp = RouteProp<RootStackParamList, 'RecipeDetail'>;
type RecipeDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'RecipeDetail'>;

type Recipe = {
  id: number;
  title: string;
  description: string;
};

type Props = {
  route: RecipeDetailScreenRouteProp;
  navigation: RecipeDetailScreenNavigationProp;
};

const RecipeDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { recipe } = route.params;

  const addToFavorites = async () => {
    try {
      const savedFavorites = await AsyncStorage.getItem('favorites');
      let favorites: Recipe[] = [];
      if (savedFavorites) {
        favorites = JSON.parse(savedFavorites);
      }
      // Check if recipe already exists in favorites
      const exists = favorites.some((favRecipe) => favRecipe.id === recipe.id);
      if (!exists) {
        favorites.push(recipe);
        await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
        Alert.alert('Success', 'Recipe added to favorites');
      } else {
        Alert.alert('Warning', 'Recipe already in favorites');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{recipe.title}</Text>
      <Text style={styles.description}>{recipe.description}</Text>
      <Button title="Add to Favorites" onPress={addToFavorites} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    marginVertical: 8,
  },
});

export default RecipeDetailScreen;

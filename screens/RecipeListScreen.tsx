import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  RecipeList: undefined;
  RecipeDetail: { recipe: Recipe };
  AddRecipe: undefined;
};

type RecipeListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'RecipeList'>;

type Recipe = {
  id: number;
  title: string;
  description: string;
};

type Props = {
  navigation: RecipeListScreenNavigationProp;
};

const RecipeListScreen: React.FC<Props> = ({ navigation }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const savedRecipes = await AsyncStorage.getItem('recipes');
        if (savedRecipes) {
          setRecipes(JSON.parse(savedRecipes));
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}>
            <View style={styles.recipeItem}>
              <Text>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <Button
        title="Add Recipe"
        onPress={() => navigation.navigate('AddRecipe')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  recipeItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default RecipeListScreen;

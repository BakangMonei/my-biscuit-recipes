import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  Favorites: undefined;
  RecipeDetail: { recipe: Recipe };
};

type FavoritesScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Favorites'>;

type Recipe = {
  id: number;
  title: string;
  description: string;
};

type Props = {
  navigation: FavoritesScreenNavigationProp;
};

const FavoritesScreen: React.FC<Props> = ({ navigation }) => {
  const [favorites, setFavorites] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const savedFavorites = await AsyncStorage.getItem('favorites');
        if (savedFavorites) {
          setFavorites(JSON.parse(savedFavorites));
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchFavorites();
  }, []);

  const removeFromFavorites = async (recipeId: number) => {
    try {
      const updatedFavorites = favorites.filter((recipe) => recipe.id !== recipeId);
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
      Alert.alert('Success', 'Recipe removed from favorites');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}>
            <View style={styles.recipeItem}>
              <Text>{item.title}</Text>
              <Button title="Remove" onPress={() => removeFromFavorites(item.id)} />
            </View>
          </TouchableOpacity>
        )}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default FavoritesScreen;

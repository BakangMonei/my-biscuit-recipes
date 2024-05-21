import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import RecipeListScreen from '../screens/RecipeListScreen';
import RecipeDetailScreen from '../screens/RecipeDetailScreen';
import AddRecipeScreen from '../screens/AddRecipeScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import ScalesScreen from '../screens/ScalesScreen';
import PreferencesScreen from '../screens/PreferencesScreen';
import SplashScreen from '../screens/SplashScreen'


const Stack = createNativeStackNavigator();

const MainNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Recipes" component={RecipeListScreen} />
    {/* <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} /> */}
    <Stack.Screen name="AddRecipe" component={AddRecipeScreen} />
    <Stack.Screen name="Favorites" component={FavoritesScreen} />
    <Stack.Screen name="Scales" component={ScalesScreen} />
    <Stack.Screen name="Preferences" component={PreferencesScreen} />
  </Stack.Navigator>
);

export default MainNavigator;

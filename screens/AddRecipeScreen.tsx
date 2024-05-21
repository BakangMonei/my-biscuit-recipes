import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  AddRecipe: undefined;
};

type AddRecipeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddRecipe'>;

type Recipe = {
  id: number;
  title: string;
  description: string;
  image: string;
};

type Props = {
  navigation: AddRecipeScreenNavigationProp;
};

const AddRecipeScreen: React.FC<Props> = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const saveRecipe = async () => {
    try {
      const newRecipe: Recipe = {
        id: Date.now(),
        title,
        description,
        image,
      };
      const savedRecipes = await AsyncStorage.getItem('recipes');
      const recipes = savedRecipes ? JSON.parse(savedRecipes) : [];
      recipes.push(newRecipe);
      await AsyncStorage.setItem('recipes', JSON.stringify(recipes));
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Image
            source={{ uri: 'https://example.com/avatar.png' }}
            style={styles.avatar}
          />
        )}
      </View>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, styles.descriptionInput]}
        placeholder="Description"
        multiline
        numberOfLines={4}
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Upload Image" onPress={pickImage} />
      <Button title="Save Recipe" onPress={saveRecipe} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    position: 'relative',
    overflow: 'hidden',
    marginVertical: 8,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  avatar: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginVertical: 8,padding: 8,
  },
  descriptionInput: {
    height: 120,
  },
});

export default AddRecipeScreen;
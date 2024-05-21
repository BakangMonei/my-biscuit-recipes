import React, { useState, useEffect } from 'react';
import { View, Text, Switch, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

const PreferencesScreen: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState('medium');
  const [fontType, setFontType] = useState('serif');

  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const savedPreferences = await AsyncStorage.getItem('preferences');
        if (savedPreferences) {
          const { darkMode, fontSize, fontType } = JSON.parse(savedPreferences);
          setDarkMode(darkMode);
          setFontSize(fontSize);
          setFontType(fontType);
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadPreferences();
  }, []);

  const savePreferences = async () => {
    try {
      await AsyncStorage.setItem('preferences', JSON.stringify({ darkMode, fontSize, fontType }));
      Alert.alert('Success', 'Preferences saved successfully');
    } catch (error) {
      console.error(error);
    }
  };

  const resetPreferences = async () => {
    try {
      await AsyncStorage.removeItem('preferences');
      setDarkMode(false);
      setFontSize('medium');
      setFontType('serif');
      Alert.alert('Success', 'Preferences reset to default');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.preference}>
        <Text>Dark Mode</Text>
        <Switch value={darkMode} onValueChange={setDarkMode} />
      </View>
      <View style={styles.preference}>
        <Text>Font Size</Text>
        <Picker selectedValue={fontSize} onValueChange={setFontSize}>
          <Picker.Item label="Small" value="small" />
          <Picker.Item label="Medium" value="medium" />
          <Picker.Item label="Large" value="large" />
        </Picker>
      </View>
      <View style={styles.preference}>
        <Text>Font Type</Text>
        <Picker selectedValue={fontType} onValueChange={setFontType}>
          <Picker.Item label="Serif" value="serif" />
          <Picker.Item label="Sans-Serif" value="sans-serif" />
        </Picker>
      </View>
      <View style={styles.buttonContainer}>
        <Button  title="Save Preferences" onPress={savePreferences} />
        <Button title="Reset Preferences" onPress={resetPreferences} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
  },
});

export default PreferencesScreen;

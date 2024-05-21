import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const ScalesScreen: React.FC = () => {
  const [grams, setGrams] = useState('');
  const [convertedWeight, setConvertedWeight] = useState('');

  const convertWeight = () => {
    const g = parseFloat(grams);
    const pounds = g / 453.59237;
    const ounces = (pounds - Math.floor(pounds)) * 16;
    setConvertedWeight(`${Math.floor(pounds)}lb ${ounces.toFixed(1)}oz`);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter weight in grams"
        keyboardType="numeric"
        value={grams}
        onChangeText={setGrams}
      />
      <Button title="Convert" onPress={convertWeight} />
      {convertedWeight !== '' && <Text>{convertedWeight}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginVertical: 8,
    padding: 8,
  },
});

export default ScalesScreen;

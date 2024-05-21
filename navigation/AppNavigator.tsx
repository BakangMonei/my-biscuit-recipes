import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import MainNavigator from './MainNavigator';

const Stack = createNativeStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator initialRouteName="Splash">
    <Stack.Screen 
      name="Splash" 
      component={SplashScreen} 
      options={{ headerShown: false }} 
    />
    <Stack.Screen 
      name="Main" 
      component={MainNavigator} 
      options={{ headerShown: false }} 
    />
  </Stack.Navigator>
);

export default AppNavigator;

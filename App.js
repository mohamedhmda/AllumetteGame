import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import  HomeScreen  from './components/HomeScreen'
import  GameScreen  from './components/GameScreen'

// Stack navigator to navigate between different screens using buttons
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="GameScreen" options={{ title: 'Game' }}>
          {props => (<GameScreen {...props} MatchesNumber={20} />)} 
        </Stack.Screen>
      </Stack.Navigator>
      <StatusBar></StatusBar>
    </NavigationContainer>
    
  );
}

import React from 'react';
import { View, Text } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './components/Home';
import Login from './components/Login';
import Profile from './components/Profile';
import Round from './components/Round';
import Scores from './components/Scores';
import CourseSearch from './components/CourseSearch';
import styles from './style/styles';

const Stack = createNativeStackNavigator();

export default function App() {
  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Home' component={Home}/>
        <Stack.Screen name='Login' component={Login}/>
        <Stack.Screen name='Profile' component={Profile}/>
        <Stack.Screen name='CourseSearch' component={CourseSearch}/>
        <Stack.Screen name='Round' component={Round}/>
        <Stack.Screen name='Scores' component={Scores}/>
      </Stack.Navigator>
    </NavigationContainer>

    
  );
}

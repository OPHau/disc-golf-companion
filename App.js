import React from 'react';
import { View, Text } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, FontAwesome5 } from '@expo/vector-icons';

import Profile from './components/Profile';
import CourseSearch from './components/CourseSearch';
import Round from './components/Round';
import More from './components/More'
import Home from './components/Home';
import Login from './components/Login';
import Scores from './components/Scores';
import styles from './style/styles';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator 
        screenOptions={{
          headerStyle: { backgroundColor: '#ffae00', },
          tabBarStyle: { backgroundColor: '#ffae00', },
          tabBarLabelStyle: { fontWeight:'bold', fontSize:14},
          tabBarActiveBackgroundColor: '#e69d00',
          //Text color
          tabBarActiveTintColor: '#000000',
          tabBarInactiveTintColor: '#000000a1',
      }}>

        <Tab.Screen name='Profile' component={Profile} 
        options={{tabBarIcon: () =>  <FontAwesome5 name="user-alt" size={24} color="black" />}}
        />
        <Tab.Screen name='Map' component={CourseSearch} 
        options={{tabBarIcon: () =>  <FontAwesome5 name="map-marker-alt" size={24} color="black" />}}
        />
        <Tab.Screen name='Round' component={Round} 
        options={{tabBarIcon: () =>  <Entypo name="folder-video" size={24} color="black" />}}
        />
        <Tab.Screen name='More' component={More} 
        options={{tabBarIcon: () =>  <Entypo name="menu" size={32} color="black" />}}
        />
      </Tab.Navigator>
      
    </NavigationContainer>
  );
}

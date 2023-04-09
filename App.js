import React from 'react';
import { View, Text } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Entypo, FontAwesome5 } from '@expo/vector-icons';

import Profile from './components/Profile';
import CourseSearch from './components/CourseSearch';
import CourseDetails from './components/CourseDetails';
import Round from './components/Round';
import NewRound from './components/NewRound';
import CurrentRound from './components/CurrentRound';
import PastRound from './components/PastRound';
import More from './components/More';

import Home from './components/Home';
import Login from './components/Login';
import Scores from './components/Scores';
import styles from './style/styles';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNav(){
  return (
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
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#ffae00', },
          headerShown:false
        }}
      >
        <Stack.Screen name='TabNav' component={TabNav}/>
        <Stack.Screen name='New Round' component={NewRound} 
          options={{headerShown:true}}
          />
        <Stack.Screen name='Past Rounds' component={PastRound} 
          options={{headerShown:true}}
          />
        <Stack.Screen name='Current Round' component={CurrentRound} 
        options={{headerShown:true}}
          />
        <Stack.Screen name='Course Details' component={CourseDetails} 
          options={{headerShown:true}}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

import React, {useState, useContext} from 'react';
import { View, Text } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Entypo, FontAwesome5 } from '@expo/vector-icons';

import themeContext from './style/themeContext';
import { lightTheme, darkTheme } from './style/theme';

import Profile from './components/Profile';
import CourseSearch from './components/CourseSearch';
import CourseDetails from './components/CourseDetails';
import Round from './components/Round';
import NewRound from './components/NewRound';
import CurrentRound from './components/CurrentRound';
import PastRound from './components/PastRound';
import More from './components/More';
import Rules from './components/Rules'

import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';

import Scores from './components/Scores';
import styles from './style/styles';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNav(){
  return (
      <Tab.Navigator 
        screenOptions={{
          animation: 'none',
          headerStyle: { backgroundColor: '#ffae00'},
          headerTitleStyle: { color:'#000000' },
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
  const [darkMode, setDarkMode] = useState(false);

  return (
      <themeContext.Provider value={{ darkMode, setDarkMode }}>
      <NavigationContainer
            theme={darkMode === true ? DarkTheme : DefaultTheme}
            initialRouteName='Home'
            screenOptions={{
                headerStyle: { backgroundColor: '#ffae00' },
                headerShown: false
            }}
        >
        <Stack.Navigator
        screenOptions={{
          animation: 'none',
          headerStyle: { backgroundColor: '#ffae00', },
          headerTitleStyle: { color:'#000000' },
          tabBarStyle: { backgroundColor: '#ffae00', },
          tabBarLabelStyle: { fontWeight:'bold', fontSize:14},
          tabBarActiveBackgroundColor: '#e69d00',
          headerTintColor:'#000000',
          //Text color
          tabBarActiveTintColor: '#000000',
          tabBarInactiveTintColor: '#000000a1',
      }}>
          <Stack.Screen name='TabNav' component={TabNav} options={{headerShown:false}}/>
          <Stack.Screen name='Home' component={Home} options={{headerShown:false}}/>
          <Stack.Screen name='Login' component={Login} options={{headerShown:true}}/>
          <Stack.Screen name='Register' component={Register} options={{headerShown:true}}/>
          <Stack.Screen name='New Round' component={NewRound} options={{headerShown:true}}/>
          <Stack.Screen name='Past Rounds' component={PastRound} options={{headerShown:true}}/>
          <Stack.Screen name='Current Round' component={CurrentRound} options={{headerShown:true}}/>
          <Stack.Screen name='Course Details' component={CourseDetails} options={{headerShown:true}}/>
          <Stack.Screen name='Rules' component={Rules} options={{headerShown:true}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </themeContext.Provider>
  );
}
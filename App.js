import React from 'react';
import { View, Text } from "react-native";
import { StatusBar } from 'expo-status-bar';
import Home from './components/Home';
import Login from './components/Login';
import Profile from './components/Profile';
import Round from './components/Round';
import Scores from './components/Scores';
import Search from './components/Search';
import styles from './style/styles';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Disc golf companion app</Text>
      <StatusBar style="auto" />
    </View>
  );
}

import React, { useContext, useState, useEffect } from "react";
import { View, Text, Switch, StatusBar, Pressable } from "react-native";
import { ref, onValue, update } from "firebase/database"; 
import { auth, db, USERS_REF } from '../firebase/Config';
import styles from '../style/styles';
import themeContext from "../style/themeContext";
import { lightTheme, darkTheme } from "../style/theme";

export default Profile = ({navigation}) => {
  const { darkMode, setDarkMode } = useContext(themeContext);
  const theme = darkMode ? darkTheme : lightTheme;


  return (
    <View style={[styles.container, { backgroundColor: theme.background, flex:1}]}>
      <StatusBar 
        barStyle={darkMode === true ? "light-content" : "dark-content"}
        backgroundColor={darkMode === true ? backgroundColor="#262626" : backgroundColor="#ffae00"}
      />
      <Text style={[styles.headerStyle, { color: theme.text, alignSelf:'center' }]}>Welcome</Text>
      <View style={{flexDirection:'row', padding:5}}>
        <Text style={[styles.textStyle, {color: theme.text, alignSelf:'center'}]}>Dark Theme:</Text>
        <View style={{alignSelf:'center', marginTop:5}}>
          <Switch
          value={darkMode}
          onValueChange={(value) => {
            setDarkMode(value);
          }}/>
        </View>
      </View>
    </View>
  );
};

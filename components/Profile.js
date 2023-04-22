import React, { useContext, useEffect } from "react";
import { View, Text, Switch, StatusBar } from "react-native";
import styles from '../style/styles';
import themeContext from "../style/themeContext";
import { lightTheme, darkTheme } from "../style/theme";

export default Profile = () => {
  const { darkMode, setDarkMode } = useContext(themeContext);
  const theme = darkMode ? darkTheme : lightTheme;

  return (
    
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar 
        barStyle={darkMode === true ? "light-content" : "dark-content"}
        backgroundColor={darkMode === true ? backgroundColor="#262626" : backgroundColor="#ffae00"}
      />
      <Text style={[styles.textStyle, { color: theme.text }]}>Profile</Text>
      <Switch
        value={darkMode}
        onValueChange={(value) => {
          setDarkMode(value);
        }}
      />
    </View>
  );

  
};

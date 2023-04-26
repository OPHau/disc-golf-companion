import React, { useContext } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { logout } from './Auth';
import styles from '../style/styles';
import themeContext from "../style/themeContext";
import { lightTheme, darkTheme } from "../style/theme";

export default More = ({navigation}) => {
    
    const { darkMode } = useContext(themeContext);
    const theme = darkMode ? darkTheme : lightTheme;

    const handleLogout = () => {
        navigation.replace('Home');
        logout();
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <Pressable
                style={({ pressed }) => [styles.buttonStyleTwo, {borderColor: theme.text, backgroundColor: pressed ? theme.backgroundSpecial : theme.background}]}
                onPress={() => navigation.navigate('Rules')}
                >
                <Text style={[styles.textStyle, { color: theme.text }]}>Rules</Text>
            </Pressable>
            <Pressable
                style={({ pressed }) => [styles.buttonStyleTwo, {borderColor: theme.text, backgroundColor: pressed ? theme.backgroundSpecial : theme.background}]}
                onPress={() => navigation.navigate('Account Settings')}
                >
                <Text style={[styles.textStyle, { color: theme.text }]}>Account Settings</Text>
            </Pressable>
            <Pressable
                style={({ pressed }) => [styles.buttonStyleTwo, {borderColor: theme.text, backgroundColor: pressed ? theme.backgroundSpecial : theme.background}]}
                onPress={() => handleLogout()}
                >
                <Text style={[styles.textStyle, { color: theme.text }]}>Logout</Text>
            </Pressable>
        </View>
    );
};
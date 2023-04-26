import React, {useContext} from "react";
import { View, Text, Pressable, StatusBar } from "react-native";
import styles from '../style/styles';
import themeContext from "../style/themeContext";
import { lightTheme, darkTheme } from "../style/theme";

export default Home = ({navigation}) => {
    const { darkMode } = useContext(themeContext);
    const theme = darkMode ? darkTheme : lightTheme;

    return (
        <View style={[styles.container, {backgroundColor:theme.background}]}>
            <StatusBar 
        barStyle={darkMode === true ? "light-content" : "dark-content"}
                backgroundColor={darkMode === true ? backgroundColor="#262626" : backgroundColor="#ffae00"}
            />
            <Text style={[styles.headerStyle, {color:theme.text}]}>FlowDisc</Text>
            <Text style={[styles.headerStyle, {color:theme.text}]}>Your disc golf companion app</Text>
            <Pressable
                style={({ pressed }) => [styles.buttonStyle,
                {backgroundColor: pressed ? theme.secondaryBtn : theme.primaryBtn}]}
                onPress={() => navigation.navigate('Register')}>
                <Text style={[styles.textStyle, {color: theme.text}]}>Register</Text>
            </Pressable>
            <Pressable
                style={({ pressed }) => [styles.buttonStyle,
                {backgroundColor: pressed ? theme.secondaryBtn : theme.primaryBtn}]}
                onPress={() => navigation.navigate('Login')}>
                <Text style={[styles.textStyle, {color: theme.text}]}>Login</Text>
            </Pressable>
            <Pressable
                style={({ pressed }) => [styles.buttonStyle,
                {backgroundColor: pressed ? theme.secondaryBtn : theme.primaryBtn}]}
                onPress={() => navigation.replace('TabNav')}>
                <Text style={[styles.textStyle, {color: theme.text}]}>Go to app</Text>
            </Pressable>
        </View>
    );
}
import React, {useContext} from "react";
import { View, Text, Pressable, StatusBar } from "react-native";
import styles from '../style/styles';
import themeContext from "../style/themeContext";
import { lightTheme, darkTheme } from "../style/theme";

//Only used in this component for status bar color.


export default Home = ({navigation}) => {
    const { darkMode } = useContext(themeContext);
    const theme = darkMode ? darkTheme : lightTheme;

    return (
        <View style={[styles.container, {backgroundColor:theme.background}]}>
            <StatusBar 
                barStyle="dark-content"
                backgroundColor={darkMode === true ? backgroundColor="#262626" : backgroundColor="#ffae00"}
            />
            <Text style={[styles.headerStyle, {color:theme.text}]}>FlowDisc</Text>
            <Text style={[styles.headerStyle, {color:theme.text}]}>Your disc golf companion app</Text>
            <Pressable
                style={styles.buttonStyle}
                onPress={() => navigation.navigate('Register')}>
                <Text style={styles.textStyle}>Register</Text>
            </Pressable>
            <Pressable
                style={styles.buttonStyle}
                onPress={() => navigation.navigate('Login')}>
                <Text style={styles.textStyle}>Login</Text>
            </Pressable>
            <Pressable
                style={styles.buttonStyle}
                onPress={() => navigation.navigate('TabNav')}>
                <Text style={styles.headerStyle}>Go to app</Text>
            </Pressable>
        </View>
    );
}
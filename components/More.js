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
        logout();
        navigation.navigate('Home');
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <Pressable
                style={styles.buttonStyleTwo}
                onPress={() => navigation.navigate('Rules')}
            >
                <Text style={[styles.textStyle, { color: theme.text }]}>Rules</Text>
            </Pressable>
            <Pressable
                style={styles.buttonStyleTwo}
                onPress={() => handleLogout()}
            >
                <Text style={[styles.textStyle, { color: theme.text }]}>Logout</Text>
            </Pressable>
        </View>
    );
};

    /*return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
            <Pressable
                style={styles.buttonStyleTwo}
                onPress={() => navigation.navigate('Rules')}
                >
                <Text style={styles.textStyle}>Rules</Text>
            </Pressable>
            <Pressable
                style={styles.buttonStyleTwo}
                onPress={() => handleLogout()}>
                <Text style={styles.textStyle}>Logout</Text>
            </Pressable>
        </View>
    );
}
*/
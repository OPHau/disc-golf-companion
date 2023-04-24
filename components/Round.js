import React, {useContext} from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import styles from '../style/styles';
import themeContext from "../style/themeContext";
import { lightTheme, darkTheme } from "../style/theme";

export default Round = ( {navigation} ) => {
    const { darkMode } = useContext(themeContext);
    const theme = darkMode ? darkTheme : lightTheme;

    return (
        <ScrollView contentContainerStyle={[{alignItems:'center', justifyContent:'center', flex:1},{backgroundColor:theme.background}]}>
                <Pressable 
                    onPress={() => navigation.navigate('New Round', {course: undefined})}
                    style={[styles.buttonStyle, {backgroundColor: theme.primaryBtn}]}>
                    <Text style={[styles.textStyle, {color: theme.text}]}>Start New Round</Text>
                </Pressable>
                <Pressable 
                    onPress={() => navigation.navigate('Past Rounds')}
                    style={[styles.buttonStyle, {backgroundColor: theme.primaryBtn}]}>
                    <Text style={[styles.textStyle, {color: theme.text}]}>Past Rounds</Text>
                </Pressable>
        </ScrollView>
    );
}
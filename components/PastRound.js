import React, {useContext} from "react";
import { View, Text, ScrollView } from "react-native";
import styles from '../style/styles';
import themeContext from "../style/themeContext";
import { lightTheme, darkTheme } from "../style/theme";

export default PastRound = () => {
    const { darkMode } = useContext(themeContext);
    const theme = darkMode ? darkTheme : lightTheme;
    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <Text style={[styles.textStyle, { color: theme.text }]}>Past Rounds</Text>
        </View>
    );
}
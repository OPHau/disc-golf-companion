import React, { useContext, useState } from "react";
import { View, Text, Pressable, TextInput } from "react-native";
import { changeUsername } from "../Auth";
import styles from '../../style/styles';
import themeContext from "../../style/themeContext";
import { lightTheme, darkTheme } from "../../style/theme";

export default ChangeUsername = ({navigation}) => {
    const { darkMode } = useContext(themeContext);
    const theme = darkMode ? darkTheme : lightTheme;
    const [username, setUsername] = useState('');

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <TextInput
                style={[styles.textInput, {backgroundColor:theme.textInput, color: theme.text}]}
                placeholderTextColor={theme.textFaded}
                placeholder="Username"
                autoCapitalize="none"
                value={username}
                onChangeText={(t) => setUsername(t)}
            />
            <Pressable 
                style={({ pressed }) => [styles.buttonStyle,
                {backgroundColor: pressed ? theme.secondaryBtn : theme.primaryBtn, alignSelf:'center'}]}
                onPress={() => {
                    changeUsername(username);
                    navigation.navigate('Account Settings')
                }}>
                <Text style={[styles.textStyle, {color: theme.text}]}>Change Username</Text>
            </Pressable>
        </View>
    );
};
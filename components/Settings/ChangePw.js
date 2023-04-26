import React, { useContext, useState } from "react";
import { View, Text, Pressable, Alert, TextInput } from "react-native";
import { changePassword } from '../Auth';
import styles from '../../style/styles';
import themeContext from "../../style/themeContext";
import { lightTheme, darkTheme } from "../../style/theme";

export default ChangePw = ({navigation}) => {
    const { darkMode } = useContext(themeContext);
    const theme = darkMode ? darkTheme : lightTheme;
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const pwChange = () => {
      if (!password) {
        Alert.alert('Current password is required.');
      } else if (!confirmPassword) {
        setPassword('');
        Alert.alert('You need to confirm password.');
      } else if (password !== confirmPassword) {
        Alert.alert('Passwords do not match!');
      } else {
        changePassword(password, navigation)
        navigation.navigate('Account Settings');
      }
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <TextInput
                style={[styles.textInput, {backgroundColor:theme.textInput, color: theme.text}]}
                placeholderTextColor={theme.textFaded}
                placeholder="New Password"
                secureTextEntry={true}
                autoCapitalize="none"
                value={password}
                onChangeText={(t) => setPassword(t)}
            />
            <TextInput
                style={[styles.textInput, {backgroundColor:theme.textInput, color: theme.text}]}
                placeholderTextColor={theme.textFaded}
                placeholder="Confirm Password"
                secureTextEntry={true}
                autoCapitalize="none"
                value={confirmPassword}
                onChangeText={(t) => setConfirmPassword(t)}
            />
            <Pressable 
                style={({ pressed }) => [styles.buttonStyle,
                {backgroundColor: pressed ? theme.secondaryBtn : theme.primaryBtn, alignSelf:'center'}]}
                onPress={() => {
                    pwChange();
                }}>
                <Text style={[styles.textStyle, {color: theme.text}]}>Change Password</Text>
            </Pressable>
        </View>
    );
};
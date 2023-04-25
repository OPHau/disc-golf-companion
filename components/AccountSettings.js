import React, { useContext } from "react";
import { View, Text, Pressable, Alert } from "react-native";
import { removeUser, onRemoveUser } from './Auth';
import styles from '../style/styles';
import themeContext from "../style/themeContext";
import { lightTheme, darkTheme } from "../style/theme";

export default AccountSettings = ({navigation}) => {
    
    const { darkMode } = useContext(themeContext);
    const theme = darkMode ? darkTheme : lightTheme;

    const deleteAccount = () => {
        onRemoveUser();
        return alert('Account deleted')
    }

    const confirmDelete = () => Alert.alert(
        "Account", "Delete account? This action cannot be undone", [{
            text: "Cancel",
            style: "cancel"
        },
        { 
            text: "Delete", onPress: () => {
                deleteAccount();
                removeUser();
                navigation.navigate('Home')
            }
        }],
        { cancelable: false }
    );  

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <Pressable 
                style={({ pressed }) => [styles.buttonStyle,
                {backgroundColor: pressed ? theme.secondaryBtn : theme.primaryBtn, alignSelf:'center'}]}
                onPress={() => {
                    confirmDelete();
                }}>
                <Text style={[styles.textStyle, {color: theme.text}]}>Delete Account</Text>
            </Pressable>
        </View>
    );
};
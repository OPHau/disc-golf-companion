import React, { useContext, useState } from "react";
import { View, Text, Pressable, Alert } from "react-native";
import { ref, onValue } from "firebase/database"; 
import { auth, db, USERS_REF } from '../firebase/Config';
import { deleteScoreboards } from "./Scores";
import { removeUser, onRemoveUser } from './Auth';
import styles from '../style/styles';
import themeContext from "../style/themeContext";
import { lightTheme, darkTheme } from "../style/theme";

export default AccountSettings = ({navigation}) => {
    const { darkMode } = useContext(themeContext);
    const theme = darkMode ? darkTheme : lightTheme;
    const [username, setUsername] = useState('');


    onValue(ref(db, USERS_REF + auth.currentUser.uid), (snapshot) => {
        setUsername(snapshot.val() && snapshot.val().username);
      }, {
        onlyOnce: true
      });

    //Account deletion
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
            <View style={[{width:'95%', flexDirection:'row', flexWrap: 'wrap'}]}>
                <Text style={[styles.textStyle, { color: theme.text }]}>Username: {username}</Text>
                <Pressable 
                    style={({ pressed }) => [styles.buttonStyle, {width: '14%', padding:5, margin:5, backgroundColor: pressed ? theme.secondaryBtn : theme.primaryBtn}]} 
                    onPress={() => navigation.navigate('Change Username')}>
                    <Text>Edit</Text>
                </Pressable>
            </View>
            <Pressable 
                style={({ pressed }) => [styles.buttonStyle,
                {backgroundColor: pressed ? theme.secondaryBtn : theme.primaryBtn, alignSelf:'center'}]}
                onPress={() => {
                    navigation.navigate('Change Password');
                }}>
                <Text style={[styles.textStyle, {color: theme.text}]}>Change Password</Text>
            </Pressable>
            <Pressable 
                style={({ pressed }) => [styles.buttonStyle,
                {backgroundColor: pressed ? theme.secondaryBtn : theme.primaryBtn, alignSelf:'center'}]}
                onPress={() => {
                    confirmDelete();
                }}>
                <Text style={[styles.textStyle, {color: theme.text}]}>Delete Account</Text>
            </Pressable>
            <Pressable 
                style={({ pressed }) => [styles.buttonStyle,
                {backgroundColor: pressed ? theme.secondaryBtn : theme.primaryBtn, alignSelf:'center'}]}
                onPress={() => {
                    deleteScoreboards();
                }}>
                <Text style={[styles.textStyle, {color: theme.text}]}>Delete All Scoreboards</Text>
            </Pressable>
        </View>
    );
};
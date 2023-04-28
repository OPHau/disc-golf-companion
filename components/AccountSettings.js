import React, { useContext, useState } from "react";
import { View, Text, Pressable, Alert } from "react-native";
import { ref, onValue } from "firebase/database"; 
import { auth, db, USERS_REF } from '../firebase/Config';
import { deleteScoreboards } from "./Scores";
import { removeUser, onRemoveUser } from './Auth';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
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
            <View style={[styles.container, { width:'100%', backgroundColor: theme.background }]}>
                <View style={{minWidth:'69%'}}>
                    <View style={[{justifyContent:'space-between', flexDirection:'row'}]}>
                        <Text style={[styles.textStyle, { alignSelf:'center', color: theme.text }]}>Username: {username}</Text>
                        <Pressable 
                            style={({ pressed }) => [{padding: 20 }]} 
                            onPress={() => navigation.navigate('Change Username')}>
                            {({ pressed }) => (
                            <MaterialCommunityIcons name="square-edit-outline" size={24} color={pressed ? theme.text : theme.text} />
                            )}
                        </Pressable>
                    </View>
                    <View style={[{justifyContent:'space-between', flexDirection:'row'}]}>
                        <Text style={[styles.textStyle, { alignSelf:'center', color: theme.text }]}>Password {}</Text>
                        <Pressable 
                            style={({ pressed }) => [{padding: 20 }]} 
                            onPress={() => navigation.navigate('Change Password')}>
                            {({ pressed }) => (
                            <MaterialCommunityIcons name="square-edit-outline" size={24} color={pressed ? theme.text : theme.text} />
                            )}
                        </Pressable>
                    </View>
                </View>
                <View style={[{ width:'90%', backgroundColor: theme.background }]}>
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
            </View>
        </View>
    );
};
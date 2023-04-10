import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { logout } from './Auth';
import styles from '../style/styles';

export default More = ({navigation}) => {

    const handleLogout = () => {
        logout();
        navigation.navigate('Home');
      };

    return (
        <ScrollView contentContainerStyle={{alignItems:'center', justifyContent:'center'}}>
            <Pressable
                style={styles.buttonStyleTwo}>
                <Text style={styles.textStyle}>More</Text>
            </Pressable>
            <Pressable
                style={styles.buttonStyleTwo}
                onPress={() => handleLogout()}>
                <Text style={styles.textStyle}>Logout</Text>
            </Pressable>
        </ScrollView>
    );
}
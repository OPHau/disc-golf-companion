import React from "react";
import { View, Text, ScrollView } from "react-native";
import styles from '../style/styles';

export default Profile = () => {
    return (
        <ScrollView style={styles.container} contentContainerStyle={{alignItems:'center', justifyContent:'center'}}>
            <Text>Profile</Text> 
        </ScrollView>
        
    );
}
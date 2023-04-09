import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import styles from '../style/styles';

export default CurrentRound = () => {
    return (
        <ScrollView contentContainerStyle={{alignItems:'center', justifyContent:'center', flex:1}}>
            <Text>Current Round</Text>
        </ScrollView>
    );
}
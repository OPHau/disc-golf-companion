import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import styles from '../style/styles';

export default Round = () => {
    return (
        <ScrollView style={styles.container} contentContainerStyle={{alignItems:'center', justifyContent:'center'}}>
            <Text>Round</Text>
        </ScrollView>
    );
}
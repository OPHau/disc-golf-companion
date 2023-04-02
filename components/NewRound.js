import React from "react";
import { View, Text, ScrollView } from "react-native";
import styles from '../style/styles';

export default NewRound = () => {
    return (
        <ScrollView style={styles.container} contentContainerStyle={{alignItems:'center', justifyContent:'center'}}>
            <Text>NewRound</Text>
        </ScrollView>
    );
}
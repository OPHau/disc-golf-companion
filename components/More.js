import React from "react";
import { View, Text, ScrollView } from "react-native";
import styles from '../style/styles';

export default More = () => {
    return (
        <ScrollView style={styles.container} contentContainerStyle={{alignItems:'center', justifyContent:'center'}}>
            <Text>More</Text>
        </ScrollView>
    );
}
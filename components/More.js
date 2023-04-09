import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import styles from '../style/styles';

export default More = () => {
    return (
        <ScrollView contentContainerStyle={{alignItems:'center', justifyContent:'center'}}>
            <Pressable
                style={styles.buttonStyleTwo}>
                <Text style={styles.textStyle}>More</Text>
            </Pressable>
        </ScrollView>
    );
}
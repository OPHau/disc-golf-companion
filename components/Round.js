import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import styles from '../style/styles';

export default Round = ( {navigation} ) => {
    return (
        <ScrollView style={styles.container} contentContainerStyle={{alignItems:'center', justifyContent:'center'}}>
            <Pressable onPress={() => navigation.navigate('NewRound')}>
                <Text>Round</Text>
            </Pressable>
        </ScrollView>
    );
}
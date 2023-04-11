import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import styles from '../style/styles';

export default Round = ( {navigation} ) => {
    return (
        <ScrollView contentContainerStyle={{alignItems:'center', justifyContent:'center', flex:1}}>
                <Pressable 
                    onPress={() => navigation.navigate('New Round', {course: undefined})}
                    style={styles.buttonStyle}>
                    <Text style={styles.textStyle}>Start New Round</Text>
                </Pressable>
                <Pressable 
                    onPress={() => navigation.navigate('Past Rounds')}
                    style={styles.buttonStyle}>
                    <Text style={styles.textStyle}>Past Rounds</Text>
                </Pressable>
        </ScrollView>
    );
}
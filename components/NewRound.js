import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import styles from '../style/styles';

export default NewRound = ( {navigation} ) => {
    return (
        <ScrollView contentContainerStyle={{alignItems:'center', flex:1}}>
            <Text style={styles.textStyle}>Course</Text>
            <Text style={styles.textStyle}>Fairways</Text>
            <View style={styles.containerNewRound}>
                <Text style={[styles.textStyle, {width:'50%', alignSelf:'center'}]}>Players:</Text>
                <Pressable 
                    style={[styles.buttonStyle, {width:'40%'}]}>
                    <Text style={styles.textStyle}>Add Player</Text>
                </Pressable>
            </View>

            <Pressable 
                onPress={() => navigation.navigate('Current Round')}
                style={styles.buttonStyle}>
                <Text style={styles.textStyle}>Start Round</Text>
            </Pressable>
        </ScrollView>
    );
}
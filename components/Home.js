import React from "react";
import { View, Text, Pressable } from "react-native";

export default Home = ({navigation}) => {
    return (
        <View>
            <Pressable onPress={() => navigation.navigate('Login')}>
                <Text>Login</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Profile')}>
                <Text>Profile</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Round')}>
                <Text>Round</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Scores')}>
                <Text>Scores</Text>
            </Pressable>
        </View>
    );
}
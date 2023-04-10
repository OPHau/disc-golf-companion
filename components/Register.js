import React from "react";
import { View, Text, Pressable, TextInput } from "react-native";
import styles from '../style/styles';

export default Register = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.headerStyle}>FlowDisc</Text>
            <Text style={styles.textStyle}>Create an account</Text>
            <TextInput
                style={styles.textInput}
                placeholder="Username"
            />
            <TextInput
                style={styles.textInput}
                placeholder="Email"
            />
            <TextInput
                style={styles.textInput}
                placeholder="Password"
                secureTextEntry={true}
            />
            <TextInput
                style={styles.textInput}
                placeholder="Confirm Password"
                secureTextEntry={true}
            />
            <Pressable style={styles.buttonStyle}>
                <Text style={styles.textStyle}>Register</Text>
            </Pressable>
            <Text style={styles.textStyle}>Already have an account?</Text>
            <Pressable 
                style={styles.buttonStyle}
                onPress={() => navigation.navigate('Login')}>
                <Text style={styles.textStyle}>Login</Text>
            </Pressable>
        </View>
    );
}
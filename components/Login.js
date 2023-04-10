import React from "react";
import { View, Text, Pressable, TextInput } from "react-native";
import styles from '../style/styles';

export default Login = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.headerStyle}>FlowDisc</Text>
            <Text style={styles.textStyle}>Login to your account</Text>
            <TextInput
                style={styles.textInput}
                placeholder="Email"
            />
            <TextInput
                style={styles.textInput}
                placeholder="Password"
                secureTextEntry={true}
            />
            <Pressable style={styles.buttonStyle}>
                <Text style={styles.textStyle}>Login</Text>
            </Pressable>
                <Text style={styles.infoText}>No account yet?</Text>
            <Pressable 
                style={styles.buttonStyle}
                onPress={() => navigation.navigate('Register')}>
                <Text style={styles.textStyle}>Create Account</Text>
            </Pressable>
            <Pressable style={styles.buttonStyle}>
                <Text style={styles.textStyle}>Forgot password</Text>
            </Pressable>
        </View>
    );
}
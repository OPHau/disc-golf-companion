import { React, useState } from "react";
import { View, Text, Pressable, TextInput, Alert } from "react-native";
import { signUp } from './Auth';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/Config';
import styles from '../style/styles';

export default Register = ({navigation}) => {

    const [username, setUsername] = useState('');
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = () => {
        if (!username) {
            Alert.alert('Username is required');
          }
          else if (!email) {
            Alert.alert('Email is required.');
          } else if (!password) {
            Alert.alert('Password is required.');
          } else if (!confirmPassword) {
            setPassword('');
            Alert.alert('Confirming password is required.');
          } else if (password !== confirmPassword) {
            Alert.alert('Passwords do not match!');
          } else {
            signUp(username, email, password);
            onAuthStateChanged(auth, (user) => {
              if (user) {
                navigation.navigate('TabNav', {userUid: user.uid});
              } 
            });
          }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.headerStyle}>FlowDisc</Text>
            <Text style={styles.textStyle}>Create an account</Text>
            <TextInput
                style={styles.textInput}
                placeholder="Username"
                autoCapitalize="none"
                value={username}
                onChangeText={(t) => setUsername(t)}
            />
            <TextInput
                style={styles.textInput}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={(t) => setEmail(t)}
            />
            <TextInput
                style={styles.textInput}
                placeholder="Password"
                secureTextEntry={true}
                value={password}
                onChangeText={(t) => setPassword(t)}
            />
            <TextInput
                style={styles.textInput}
                placeholder="Confirm Password"
                secureTextEntry={true}
                value={confirmPassword}
                onChangeText={(t) => setConfirmPassword(t)}
            />
            <Pressable 
                style={styles.buttonStyle}
                onPress={() => handleRegister()}>
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
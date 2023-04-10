import { React, useState } from "react";
import { View, Text, Pressable, TextInput, Alert } from "react-native";
import { signIn, resetPassword } from './Auth';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/Config';
import styles from '../style/styles';

export default Login = ({navigation}) => {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [showForgotPw, setShowForgotPw] = useState(false);
    const [emailForgotPw, setEmailForgotPw] = useState('');

    const handleLogin = () => {
        if (!email) {
            Alert.alert('Email is required.');
          }
          else if (!password) {
            Alert.alert('Password is required.');
          }
          else {
            signIn(email, password);
            onAuthStateChanged(auth, async (user) => {
              if (user) {
                navigation.navigate('TabNav', {userUid: user.uid});
              }
            });
          }
    }

    const handlePressForgotPw = () => {
        setShowForgotPw(!showForgotPw);
      }
    
      const handlePressResetPw = () => {
        if (!emailForgotPw) {
          Alert.alert('Email is required.');
        }
        else {
          resetPassword(emailForgotPw);
          setShowForgotPw(false);
        }
      }

    return (
        <View style={styles.container}>
            <Text style={styles.headerStyle}>FlowDisc</Text>
            { !showForgotPw &&
            <>
                <Text style={styles.textStyle}>Login to your account</Text>
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
                <Pressable 
                    style={styles.buttonStyle}
                    onPress={() => handleLogin()}>
                    <Text style={styles.textStyle}>Login</Text>
                </Pressable>
                    <Text style={styles.textStyle}>No account yet?</Text>
                <Pressable 
                    style={styles.buttonStyle}
                    onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.textStyle}>Create Account</Text>
                </Pressable>
                <Pressable 
                    style={styles.buttonStyle}
                    onPress={() => handlePressForgotPw()}>
                    <Text style={styles.textStyle}>Forgot password</Text>
                </Pressable>
                </>
            }

            { showForgotPw &&
                <>
                <Pressable 
                    style={[styles.buttonStyle, {marginBottom:10}]}
                    onPress={() => handlePressForgotPw()}>
                    <Text style={styles.textStyle}>Return to Login</Text>
                </Pressable>
                <Text style={styles.textStyle}>Enter email to reset password:</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Email"
                    value={emailForgotPw}
                    onChangeText={(emailForgotPw) => setEmailForgotPw(emailForgotPw)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <Pressable 
                    style={styles.buttonStyle}
                    onPress={() => handlePressResetPw()}>
                    <Text style={styles.textStyle}>Reset password</Text>
                </Pressable>
                </>
            }
        </View>
    );
}
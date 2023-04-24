import { React, useState, useContext } from "react";
import { View, Text, Pressable, TextInput, Alert } from "react-native";
import { signUp } from './Auth';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/Config';
import styles from '../style/styles';
import themeContext from "../style/themeContext";
import { lightTheme, darkTheme } from "../style/theme";

export default Register = ({navigation}) => {
  const { darkMode } = useContext(themeContext);
  const theme = darkMode ? darkTheme : lightTheme;

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
      <View style={[styles.container, {backgroundColor:theme.background}]}>
          <Text style={[styles.headerStyle, {color:theme.text}]}>FlowDisc</Text>
          <Text style={[styles.textStyle, {color:theme.text}]}>Create an account</Text>
          <TextInput
              style={[styles.textInput, {backgroundColor:theme.textInput, color: theme.text}]}
              placeholderTextColor={theme.textFaded}
              placeholder="Username"
              autoCapitalize="none"
              value={username}
              onChangeText={(t) => setUsername(t)}
          />
          <TextInput
              style={[styles.textInput, {backgroundColor:theme.textInput, color: theme.text}]}
              placeholderTextColor={theme.textFaded}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={(t) => setEmail(t)}
          />
          <TextInput
              style={[styles.textInput, {backgroundColor:theme.textInput, color: theme.text}]}
              placeholderTextColor={theme.textFaded}
              placeholder="Password"
              secureTextEntry={true}
              value={password}
              onChangeText={(t) => setPassword(t)}
          />
          <TextInput
              style={[styles.textInput, {backgroundColor:theme.textInput, color: theme.text}]}
              placeholderTextColor={theme.textFaded}
              placeholder="Confirm Password"
              secureTextEntry={true}
              value={confirmPassword}
              onChangeText={(t) => setConfirmPassword(t)}
          />
          <Pressable 
              style={[styles.buttonStyle, {backgroundColor: theme.primaryBtn}]}
              onPress={() => handleRegister()}>
              <Text style={[styles.textStyle, {color: theme.text}]}>Register</Text>
          </Pressable>
          <Text style={[styles.textStyle, {color:theme.text}]}>Already have an account?</Text>
          <Pressable 
              style={[styles.buttonStyle, {backgroundColor: theme.primaryBtn}]}
              onPress={() => navigation.navigate('Login')}>
              <Text style={[styles.textStyle, {color: theme.text}]}>Login</Text>
          </Pressable>
      </View>
  );
}
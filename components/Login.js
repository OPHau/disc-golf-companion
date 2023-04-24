import { React, useState, useContext } from "react";
import { View, Text, Pressable, TextInput, Alert } from "react-native";
import { signIn, resetPassword } from './Auth';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/Config';
import styles from '../style/styles';
import themeContext from "../style/themeContext";
import { lightTheme, darkTheme } from "../style/theme";

export default Login = ({navigation}) => {
  const { darkMode } = useContext(themeContext);
  const theme = darkMode ? darkTheme : lightTheme;

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
      <View style={[styles.container, {backgroundColor:theme.background}]}>
          <Text style={[styles.headerStyle, {color:theme.text}]}>FlowDisc</Text>
          { !showForgotPw &&
          <>
              <Text style={[styles.textStyle, {color:theme.text}]}>Login to your account</Text>
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
              <Pressable 
                  style={({ pressed }) => [styles.buttonStyle,
                  {backgroundColor: pressed ? theme.secondaryBtn : theme.primaryBtn}]}
                  onPress={() => handleLogin()}>
                  <Text style={[styles.textStyle, {color: theme.text}]}>Login</Text>
              </Pressable>
                  <Text style={[styles.textStyle, {color:theme.text}]}>No account yet?</Text>
              <Pressable 
                  style={({ pressed }) => [styles.buttonStyle,
                  {backgroundColor: pressed ? theme.secondaryBtn : theme.primaryBtn}]}
                  onPress={() => navigation.navigate('Register')}>
                  <Text style={[styles.textStyle, {color: theme.text}]}>Create Account</Text>
              </Pressable>
              <Pressable 
                  style={({ pressed }) => [styles.buttonStyle,
                  {backgroundColor: pressed ? theme.secondaryBtn : theme.primaryBtn}]}
                  onPress={() => handlePressForgotPw()}>
                  <Text style={[styles.textStyle, {color: theme.text}]}>Forgot password</Text>
              </Pressable>
              </>
          }

          { showForgotPw &&
              <>
              <Pressable 
                  style={({ pressed }) => [styles.buttonStyle,
                  {marginBottom: 10, backgroundColor: pressed ? theme.secondaryBtn : theme.primaryBtn}]}
                  onPress={() => handlePressForgotPw()}>
                  <Text style={[styles.textStyle, {color: theme.text}]}>Return to Login</Text>
              </Pressable>
              <Text style={[styles.textStyle, {color: theme.text}]}>Enter email to reset password:</Text>
              <TextInput
                  style={[styles.textInput, {backgroundColor:theme.textInput, color: theme.text}]}
                  placeholder="Email"
                  placeholderTextColor={theme.textFaded}
                  value={emailForgotPw}
                  onChangeText={(emailForgotPw) => setEmailForgotPw(emailForgotPw)}
                  keyboardType="email-address"
                  autoCapitalize="none"
              />
              <Pressable 
                  style={({ pressed }) => [styles.buttonStyle,
                  {backgroundColor: pressed ? theme.secondaryBtn : theme.primaryBtn}]}
                  onPress={() => handlePressResetPw()}>
                  <Text style={[styles.textStyle, {color: theme.text}]}>Reset password</Text>
              </Pressable>
              </>
          }
      </View>
  );
}
import { Alert } from "react-native";
import { ref, set, update } from 'firebase/database';
import {
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signOut,
    updatePassword,
    sendPasswordResetEmail,
    deleteUser } from 'firebase/auth';
import { auth, db, USERS_REF } from '../firebase/Config';

export const signUp = async (username, email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      set(ref(db, USERS_REF + userCredential.user.uid), {
        username: username,
        email: userCredential.user.email,
        favoriteCourses: ''
      });
    })
  }
  catch (error) {
    console.log("Registration failed. ", error.message);
    Alert.alert("Registration failed. ", error.message);
  }
}

export const signIn = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  }
  catch(error) {
    console.log("Login failed. ", error.message);
    Alert.alert("Login failed. ", error.message);
  };
}

export const logout = async () => { 
  try {
    await signOut(auth);
  }
  catch(error) {
    console.log("Logout error. ", error.message);
    Alert.alert("Logout error. ", error.message);
  };
}

export const changePassword = async (password) => { 
  try {
    await updatePassword(auth.currentUser, password)
    .then(() => {
      Alert.alert("Password changed successfully.");
    })
    .catch((error) => {
      console.log("Password change error. ", error.message);
      Alert.alert("Password change error. ", error.message);
    })
  }
  catch(error) {
    console.log("Password change error. ", error.message);
    Alert.alert("Password change error. ", error.message);
  };
}

export const resetPassword = async (email) => { 
  try {
    await sendPasswordResetEmail(auth, email)
    .then(() => {
      console.log("Password reset email sent.");
    })
    .catch((error) => {
      console.log("Password reset error. ", error.message);
      Alert.alert("Password reset error. ", error.message);
    })
  }
  catch(error) {
    console.log("Password reset error. ", error.message);
    Alert.alert("Password reset error. ", error.message);
  };
}

export const removeUser = async () => {
  try {
    onRemoveUser();
    deleteUser(auth.currentUser)
    .then(() => {
      console.log("User was removed.");
    }).catch((error) => {
      console.log("User delete error. ", error.message);
      Alert.alert("User delete error. ", error.message);
    });
  }
  catch(error) {
    console.log("User delete error. ", error.message);
    Alert.alert("User delete error. ", error.message);
  };
}

export const onRemoveUser = () => {
  const removes = {};
  removes[USERS_REF + auth.currentUser.uid] = null;
  return update(ref(db), removes);
};

  export const changeUsername = async (username) => {
    try {
      await update(ref(db, USERS_REF + auth.currentUser.uid), {
        username: username
      });
      alert('Username changed');
    } catch (e) {
      alert(e);
      throw e;
    }
  };

import React from "react";
import { View, Text, Alert } from "react-native";
import { ref, onValue, update } from "firebase/database"; 
import { auth, db, USERS_REF } from '../firebase/Config';

export const deleteScoreboards = () => Alert.alert(
    "Scoreboards", "Remove all scoreboards from Past Rounds? This action cannot be undone", [{
        text: "Cancel",
        style: "cancel"
    },
    { 
        text: "Delete", onPress: () => {
            const removes = {};
            removes[USERS_REF + auth.currentUser.uid + '/pastScores/'] = null;
            return (
                update(ref(db), removes),
                alert('All Scoreboards deleted')
            );
        }
    }],
    { cancelable: false }
); 

export const getScoreColor = (p, t) => {
    let clr = "#dcdcdc";
    let dif = t - p;
    if(t == 1) clr = "#00ffff";
    else if(t > 0) {
        if(dif <= -2) clr = "#00ffff";
        else if(dif == -1) clr = "#90ee90";
        else if(dif == 1) clr = "#ffb6c1";
        else if(dif >= 2) clr = "#da90d6";
    }
    return clr;
}
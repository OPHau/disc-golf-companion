import React, {useContext, useState, useEffect} from "react";
import { View, Text, FlatList } from "react-native";
import { ref, onValue } from "firebase/database"; 
import { auth, db, USERS_REF } from '../firebase/Config';
import styles from '../style/styles';
import themeContext from "../style/themeContext";
import { lightTheme, darkTheme } from "../style/theme";

export default PastRound = () => {
    const { darkMode } = useContext(themeContext);
    const theme = darkMode ? darkTheme : lightTheme;

    const [scores, setScores] = useState([]);

    useEffect(() => {
      fetchScores();
    }, []);
  
    const fetchScores = () => {
        const dbRef = ref(db, USERS_REF + auth.currentUser.uid + '/pastScores');
        onValue(dbRef, (snapshot) => {
            const scoresData = snapshot.val();
            const scoresList = Object.keys(scoresData).map((key) => ({
                ...scoresData[key],
            }));
        setScores(scoresList);
      });
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <Text style={[styles.textStyle, { color: theme.text }]}>Your previous scores:</Text>
            <View style={[styles.container, {marginLeft: 5, marginRight: 5}]}>
            <FlatList
                data={scores}
                renderItem={({ item }) => (
                    <View style={{flex:1}}>
                        <View style={{flexDirection:'row', flexWrap: 'wrap'}}>
                            <Text style={[{ color: theme.text }]}>{item.date} | {item.course}</Text>
                        </View>
                        <View>
                            <Text style={[{ color: theme.text }]}>{item.player.join(", ")}</Text>
                            <Text style={[{ color: theme.text }]}>{item.score.join(",          ")}</Text>
                            <Text></Text>
                        </View>
                    </View>
                )}
                />
            </View>
        </View>
    );
}
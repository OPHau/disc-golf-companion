import React, {useContext, useState, useEffect} from "react";
import { View, Text, FlatList, Pressable, ScrollView, Alert } from "react-native";
import { ref, onValue, update } from "firebase/database"; 
import { auth, db, USERS_REF } from '../firebase/Config';
import { scoresRef, getScoreColor } from "./Scores";
import styles from '../style/styles';
import themeContext from "../style/themeContext";
import { lightTheme, darkTheme } from "../style/theme";

export default PastRound = () => {
    const { darkMode } = useContext(themeContext);
    const theme = darkMode ? darkTheme : lightTheme;

    const [empty, setEmpty] = useState(false)
    const [itemId, setItemId] = useState('');
    const [scores, setScores] = useState('');
    const [courseName, setCourseName] = useState('');
    const [showScoreboard, setShowScoreboard] = useState(false);
    const [players, setPlayers] = useState('');
    const [score, setScore] = useState('');
    const [pars, setPars] = useState('');
    const [throws, setThrows] = useState('');
    const [fairways, setFairways] = useState('');

    useEffect(() => {
      fetchScores();
    }, []);
  
    const fetchScores = () => {
        const scoresRef = ref(db, USERS_REF + auth.currentUser.uid + '/pastScores');
        onValue(scoresRef, (snapshot) => {
            const scoresData = snapshot.val();
            if (scoresData === null) {
                return setEmpty(true);
            } else {
            setEmpty(false)
            const scoresList = Object.keys(scoresData).map((key) => ({
                id: key,
                ...scoresData[key],
            }));
        setScores(scoresList);
      }});
    };

    const scoreTables = [];
    for(let i = 0; i < players.length; i++) {
        let playerTable = [];
        let fw = 0;
        let r = 0;
        scoreTables.push(
            <View key={"playerscoreitem" + i}>
                <Text style={[styles.subheading, {color: theme.text}]}>{players[i]}: {score[i]}</Text>
            </View>
        );
        while(fw < fairways) {
            let playerRow = [];
            for(let j = 0; fw < fairways && j < 9; j++, fw++) {
                playerRow.push(
                    <View style={[styles.tableColumn]} key={"scorecol" + i + fw}>
                        <Text style={styles.tableHeadingItem}>{fw + 1}</Text>
                        <Text style={[styles.tableSubheadingItem]}>{pars[fw]}</Text>
                        <Text style={[styles.tableItem, {backgroundColor:getScoreColor(pars[fw], throws[i][fw])}]}>{throws[i][fw] > 0 ? throws[i][fw] : " "}</Text>
                    </View>
                );
            }
            playerTable.push(
                <View style={styles.tableRow} key={"playertableitem" + i + r}>
                    {playerRow}
                </View>
            );
            r++;
        }

        scoreTables.push(playerTable);
    }

    const Scoreview = () => {
        return (
                <View>
                    {scoreTables}
                </View>
    )}

    const handleShowScoreboard = () => {
        setShowScoreboard(!showScoreboard);
    }

      
    const deleteScoreboard = () => {
        const removes = {};
        removes[USERS_REF + auth.currentUser.uid + '/pastScores/' + itemId] = null;
        return (
            update(ref(db), removes),
            alert('Scoreboard deleted')
        );
    }

    const confirmDelete = () => Alert.alert(
    "Scoreboard", "Remove all items? This action cannot be undone", [{
        text: "Cancel",
        style: "cancel"
    },
    { 
        text: "Delete", onPress: () => {
            deleteScoreboard();
            setShowScoreboard(false);
        }
    }],
    { cancelable: false }
    );  

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            { !showScoreboard &&
            <>
                <View style={[styles.container, {marginLeft: 5, marginRight: 5}]}>
                {empty === false ? (
                    <FlatList
                    data={scores}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View style={{flex:1, width:'100%'}}>
                        <View style={{flexDirection:'row', flexWrap: 'wrap'}}>
                            <Text style={[styles.textStyle, { color: theme.text }]}>{item.date} | {item.course}</Text>
                        </View>
                        <Pressable 
                            style={({ pressed }) => [styles.buttonStyle,
                            {backgroundColor: pressed ? theme.secondaryBtn : theme.primaryBtn, alignSelf:'center', width:'100%'}]}
                            onPress={() => {
                            setCourseName(item.course)
                            setPlayers(item.player);
                            setScore(item.score);
                            setPars(item.pars);
                            setThrows(item.throws);
                            setFairways(item.fairways);
                            setItemId(item.id);
                            handleShowScoreboard();
                            }}>
                            <Text style={[styles.textStyle, {color: theme.text}]}>View Scoreboard</Text>
                        </Pressable>
                        </View>
                    )}
                    />
                ) : (
                    <Text style={[styles.textStyle, {color: theme.text }]}>No scoreboards available</Text>
                )}
                </View>
            </>
            }
            { showScoreboard && (
            <>
                <ScrollView contentContainerStyle={{alignItems:'center', flexGrow:1, width:'100%'}} style={[{ backgroundColor: theme.background }]}>
                    <Text style={[styles.textStyle, { color: theme.text }]}>{courseName}</Text>
                    <Scoreview />
                    <Pressable 
                        style={({ pressed }) => [styles.buttonStyle,
                        {backgroundColor: pressed ? theme.secondaryBtn : theme.primaryBtn, alignSelf:'center'}]}
                        onPress={() => {
                            setShowScoreboard(false);
                        }}>
                        <Text style={[styles.textStyle, {color: theme.text}]}>Hide Scoreboard</Text>
                    </Pressable>
                    <Pressable 
                        style={({ pressed }) => [styles.buttonStyle,
                        {backgroundColor: pressed ? theme.secondaryBtn : theme.primaryBtn, alignSelf:'center'}]}
                        onPress={() => {
                            confirmDelete();
                        }}>
                        <Text style={[styles.textStyle, {color: theme.text}]}>Delete Scoreboard</Text>
                    </Pressable>
                </ScrollView>
            </>
            )}
        </View>
    );
}

    
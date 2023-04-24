import React, { useEffect, useState, useContext } from "react";
import { View, Text, ScrollView, Pressable, SafeAreaView, FlatList } from "react-native";
import { ref, update, push, child, onValue } from "firebase/database"; 
import { auth, db, USERS_REF } from '../firebase/Config';
import styles from '../style/styles';
import { Icon } from "@rneui/themed";
import themeContext from "../style/themeContext";
import { lightTheme, darkTheme } from "../style/theme";

export default CurrentRound = ({ navigation, route }) => {
    const { darkMode } = useContext(themeContext);
    const theme = darkMode ? darkTheme : lightTheme;

    const { course, courseName, fairways, players } = route.params;
    const [showScores, setShowScores] = useState(false);
    const [currentFairway, setCurrentFairway] = useState(0);
    const [pars, setPars] = useState(Array(fairways).fill(3));
    const [fairwayLengths, setFairwayLengths] = useState(Array(fairways).fill(""));
    const [throws, setThrows] = useState(Array(players.length).fill(null).map(() => Array(fairways).fill(0)));
    
    useEffect(() => {
        if(course != undefined) {
            if(course.baskets != undefined) {
                let initPars = Array(fairways).fill(3);
                let baskets = course.baskets.map((basket) => basket);
                let lengths = Array();
                for(let i = 0; i < fairways && i < baskets.length; i++) {
                    if(baskets[i].Par != undefined) initPars[i] = Number(baskets[i].Par);
                    if(baskets[i].Length != undefined) {
                        let length = "";
                        length = length + baskets[i].Length;
                        if(baskets[i].Unit != undefined) length = length + baskets[i].Unit;
                        lengths.push(length);
                    }
                }
                setPars(initPars);
                setFairwayLengths(lengths);
            }
        }
    }, []);

    const ParDisplay = () => {
            return (
                <View style={{flexDirection:'row'}}>
                    <Text style={[styles.textStyle, {color: theme.text}]}>Par:</Text>
                    <Pressable onPress={() => changePar(currentFairway, -1)}>
                        <Icon name="circle-with-minus" type="entypo" size={30} color={theme.primaryBtn} />
                    </Pressable>
                    <Text style={[styles.textStyle, {color: theme.text}]}>{pars[currentFairway]}</Text>
                    <Pressable onPress={() => changePar(currentFairway, 1)}>
                        <Icon name="circle-with-plus" type="entypo" size={30} color={theme.primaryBtn} />
                    </Pressable>
                </View>
            );
    }

    const changeFairway = (f, shows = false) => {
        setShowScores(shows);
        setCurrentFairway(f);
    }

    const roundNav = [];
    for(let i = Math.max(0, currentFairway - 1), j = 0; i < Math.min(fairways, currentFairway + 2); i++, j++) {
        roundNav.push(
            <Pressable
                key={"roundnav" + i}
                onPress={() => changeFairway(i)}
                style={styles.footerButton}>
                {j == 0 && i != currentFairway && <Icon name="chevron-thin-left" type="entypo" size={50} color={theme.navBarIcon} />}
                <Text style={[styles.footerText, i == currentFairway && {textDecorationLine:'underline', fontWeight:'bold'}, {color:theme.text}]}>{i + 1}</Text>
                {i < fairways && (j == 2 || (i == fairways || currentFairway == 0) && j == 1) && <Icon name="chevron-thin-right" type="entypo" size={50} color={theme.navBarIcon} />}
            </Pressable>
        );
    }

    const RoundNav = () => {
        return (
            <View style={[styles.footerContainer, {backgroundColor:theme.primary}]}>
                {roundNav}
                <Pressable
                    onPress={() => {
                        changeFairway(currentFairway, true);
                        getCurrentDate();
                        setScore(scoreSimple);
                        setCourseName(courseName);
                    }}
                    style={styles.footerButton}>
                    <Icon name="list-ol" type="font-awesome" size={50} color={theme.navBarIcon} />
                </Pressable>
            </View>
        );
    }

    const addThrow = (p, f, add) => {
        const newArray = [...throws];
        newArray[p][f] = Math.max(0, newArray[p][f] + add);
        setThrows(newArray);
    }

    const changePar = (f, add) => {
        const newArray = [...pars];
        newArray[f] = Math.max(1, newArray[f] + add);
        setPars(newArray);
    }

    const playerlist = [];
    for (let i = 0; i < players.length; i++) {
        playerlist.push(
            <View style={[styles.containerNewRound, {backgroundColor: theme.backgroundOne}]} key={"playerlistitem" + i}>
                <Text style={[styles.textStyle, {width:'50%', alignSelf:'center', color: theme.text}]}>{players[i]}</Text>
                <Pressable onPress={() => addThrow(i, currentFairway, -1)}>
                    <Icon name="circle-with-minus" type="entypo" size={30} color={theme.secondaryBtn} />
                </Pressable>
                <Text style={[styles.textStyle, {color: theme.text}]}>{throws[i][currentFairway]}</Text>
                <Pressable onPress={() => addThrow(i, currentFairway, 1)}>
                    <Icon name="circle-with-plus" type="entypo" size={30} color={theme.secondaryBtn} />
                </Pressable>
            </View>
        );
    }

    const getScoreColor = (p, t) => {
        let clr = "#dcdcdc";
        let dif = t - p;
        if(t > 0) {
            if(dif <= -2) clr = "#00ffff";
            else if(dif == -1) clr = "#90ee90";
            else if(dif == 1) clr = "#ffb6c1";
            else if(dif >= 2) clr = "#da90d6";
        }
        return clr;
    }

    const getTotalScore = (p) => {
        let playerThrows = [...throws[p]];
        let fairwayPar = [...pars];
        return playerThrows.reduce((acc, cv) => acc + cv, 0) - fairwayPar.reduce((acc, cv) => acc + cv, 0);
    }

    const scoreTables = [];
    for(let i = 0; i < players.length; i++) {
        let playerTable = [];
        let fw = 0;
        let r = 0;
        scoreTables.push(
            <View key={"playerscoreitem" + i}>
                <Text style={[styles.subheading, {color: theme.text}]}>{players[i]}: {getTotalScore(i)}</Text>
            </View>
        );
        while(fw < fairways) {
            let playerRow = [];
            for(let j = 0; fw < fairways && j < 9; j++, fw++) {
                playerRow.push(
                    <View style={styles.tableColumn} key={"scorecol" + i + fw}>
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
            <ScrollView contentContainerStyle={{alignItems:'center', flexGrow:1}}>
                <Text style={[styles.headerStyle, {color: theme.text}]}>Scores</Text>
                <View contentContainerStyle={{alignItems:'center', width:'80%'}}>
                    {scoreTables}
                </View>
                <Pressable style={[styles.buttonStyle, {marginTop:20, backgroundColor: theme.primaryBtn}]}
                onPress={() => updateScores()}>
                    <Text style={styles.textStyle}>Save Score</Text>
                </Pressable>
                <Pressable style={[styles.buttonStyle, {backgroundColor: theme.primaryBtn}]}
                onPress={() => navigation.navigate('Past Rounds')}>
                    <Text style={styles.textStyle}>Past Scores</Text>
                </Pressable>
            </ScrollView>
        );
    }

    const FairwayView = () => {
        return (
            <ScrollView contentContainerStyle={{alignItems:'center', flex:1}}>
                <Text style={[styles.headerStyle, {color: theme.text}]}>Fairway {currentFairway + 1}</Text>
                {fairwayLengths[currentFairway] != null && fairwayLengths[currentFairway] != "" && <Text style={[styles.textStyle, { color: theme.text }]}>Length: {fairwayLengths[currentFairway]}</Text>}
                <ParDisplay />
                {playerlist}
            </ScrollView>
        );
    }

    //Code below is for writing to database:
    const [thing, setScore] = useState(''); 
    const [date, setDate] = useState('');
    const [coursename, setCourseName] = useState('');

    //Calculated to get a simple string value overall score.
    const scoreSimple = [];
    for(let i = 0; i < players.length; i++) {
        let playerScore = 0;
        for(let j = 0; j < fairways; j++) {
            playerScore += throws[i][j] - pars[j];
        }
        const playerScoreString = `${playerScore}`;
        scoreSimple.push(playerScoreString);
    }

    async function updateScores() { 
        const newScoreItem = {
            date: date,
            course: coursename,
            score: thing,
            player: players,
        }
        const newScoreKey = push(child(ref(db), USERS_REF + auth.currentUser.uid)).key;
        const updates = {};
        updates[USERS_REF + auth.currentUser.uid + '/pastScores/' + newScoreKey] = newScoreItem;
        try {
            await update(ref(db), updates);
            alert('Update successful');
        } catch (error) {
            alert('Error updating scores: ' + error.message);
        }
    }

    const getCurrentDate=()=>{
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        return setDate(date + '.' + month + '.' + year);
  }

    return (
        <SafeAreaView style={[{flex: 1}, {backgroundColor:theme.background}]}>
            <View style={{flex:1}}>
                <View style={styles.containerLeft}>
                    <Text style={[styles.textStyle, {color: theme.text}]}>{courseName}</Text>
                </View>
                {showScores ? <Scoreview /> : <FairwayView /> }
                <RoundNav/>
            </View>
        </SafeAreaView>
    );
}
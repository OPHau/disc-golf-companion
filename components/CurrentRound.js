import React, { useEffect, useState, useContext } from "react";
import { View, Text, ScrollView, Pressable, SafeAreaView, FlatList, TextInput, Picker } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { ref, update, push, child, onValue } from "firebase/database"; 
import { auth, db, USERS_REF } from '../firebase/Config';
import { getScoreColor } from "./Scores";
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
                <View style={{flexDirection:'row', marginBottom:10}}>
                    <Text style={[styles.textStyle, {color: theme.text}]}>Par:</Text>
                    <Pressable onPress={() => changePar(currentFairway, -1)}>
                    {({ pressed }) => (
                        <Icon name="circle-with-minus" type="entypo" size={40} color={pressed ? theme.secondaryBtn : theme.primaryBtn} />
                    )}
                    </Pressable>
                    <Text style={[styles.textStyle, {color: theme.text}]}>{pars[currentFairway]}</Text>
                    <Pressable onPress={() => changePar(currentFairway, 1)}>
                    {({ pressed }) => (
                        <Icon name="circle-with-plus" type="entypo" size={40} color={pressed ? theme.secondaryBtn : theme.primaryBtn} />
                    )}
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
                style={({pressed}) => [styles.footerButton, 
                {backgroundColor: pressed ? theme.secondaryBtn : theme.backgroundSpecialTwo}]}>
                    
                    {j == 0 && i != currentFairway && 
                    <Icon name="chevron-thin-left" type="entypo" size={50} color={theme.navBarIcon} />}
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
                    onPress={() => changeFairway(currentFairway, true)}
                    style={({ pressed }) => [styles.footerButton, {padding: 15, backgroundColor: pressed ? theme.secondaryBtn : theme.backgroundSpecialTwo}]}>
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

    const addThrowInput = (p, f) => {
        const newArray = [...throws];
        newArray[p][f] =  Math.max(0, newArray[p][f].addValue);
        setThrows(newArray);
        console.log(throws[i][currentFairway])
    }

    const playerlist = [];
    for (let i = 0; i < players.length; i++) {
        playerlist.push(
            <View style={[styles.containerRound, {backgroundColor: theme.backgroundSpecial, justifyContent:'center', marginTop:10}]} key={"playerlistitem" + i}>
                <Text style={[styles.textStyle, {width:'50%', fontSize:25,alignSelf:'center', color: theme.text}]}>{players[i]}</Text>
                <Pressable 
                    style={{alignSelf:'center'}}
                    onPress={() => addThrow(i, currentFairway, -1)}>
                    {({ pressed }) => (
                    <Icon name="circle-with-minus" type="entypo" size={40} color={pressed ? theme.secondaryBtnTwo : theme.primaryBtnTwo} />
                    )}
                </Pressable>
                <SelectDropdown
                    data={Array.from({ length: 20 }, (v, i) => (i + 1))}
                    defaultValue={throws[i][currentFairway]}
                    defaultButtonText="0"
                    buttonStyle={[{width:'18%', height:'80%', margin:4, borderWidth:1, borderColor: theme.textStyle, backgroundColor: getScoreColor(pars[currentFairway], throws[i][currentFairway])/*backgroundColor: theme.background*/}]}
                    buttonTextStyle={[styles.dropdownText, {color: 'black'}]}
                    onSelect={(value) => {
                        const newArray = [...throws];
                        newArray[i][currentFairway] = value;
                        setThrows(newArray);
                    }}
                    />
                <Pressable 
                    style={{alignSelf:'center'}}
                    onPress={() => addThrow(i, currentFairway, 1)}>
                    {({ pressed }) => (
                    <Icon name="circle-with-plus" type="entypo" size={40} color={pressed ? theme.secondaryBtnTwo: theme.primaryBtnTwo} />
                    )}
                </Pressable>
            </View>
        );
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
                
                <Pressable style={({ pressed }) => [styles.buttonStyle, {marginTop:20, backgroundColor: pressed ? theme.secondaryBtn : theme.primaryBtn}]}
                onPress={() => {
                    updateScores();
                    navigation.pop(1);
                    navigation.replace('Past Rounds')}}>
                    <Text style={[styles.textStyle, {color: theme.text}]}>Save Score</Text>
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

    const getSimpleScoresString = () => {
        let scoreSimple = [];
        for(let i = 0; i < players.length; i++) {
            let playerScore = getTotalScore(i);
            // for(let j = 0; j < fairways; j++) {
            //     playerScore += throws[i][j] - pars[j];
            // }
            const playerScoreString = `${playerScore}`;
            scoreSimple.push(playerScoreString);
        }
        return scoreSimple;
    }

    async function updateScores() { 
        const newScoreItem = {
            date: getCurrentDate(),
            course: courseName,
            score: getSimpleScoresString(),
            player: players,
            throws: throws,
            pars: pars,
            fairways: fairways
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

    const getCurrentDate = () => {
        let today = new Date().getFullYear() + '-' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '-' + ("0" + new Date().getDate()).slice(-2);
        return today;
        // var date = new Date().getDate();
        // var month = new Date().getMonth() + 1;
        // var year = new Date().getFullYear();
        // return year + '-' + month + '-' + day;
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
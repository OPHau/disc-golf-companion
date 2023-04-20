import React, { useEffect, useState, useContext } from "react";
import { View, Text, ScrollView, Pressable, SafeAreaView } from "react-native";
import styles from '../style/styles';
import { Icon } from "@rneui/themed";
import themeContext from "../style/themeContext";
import { lightTheme, darkTheme } from "../style/theme";

export default CurrentRound = ({ navigation, route }) => {
    const { darkMode } = useContext(themeContext);
    const theme = darkMode ? darkTheme : lightTheme;

    const {course} = route.params;
    const {courseName} = route.params;
    const {fairways} = route.params;
    const {players} = route.params;
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
                    <Text style={styles.textStyle}>Par:</Text>
                    <Pressable onPress={() => changePar(currentFairway, -1)}>
                        <Icon name="circle-with-minus" type="entypo" size={30} color="#ffae00" />
                    </Pressable>
                    <Text style={styles.textStyle}>{pars[currentFairway]}</Text>
                    <Pressable onPress={() => changePar(currentFairway, 1)}>
                        <Icon name="circle-with-plus" type="entypo" size={30} color="#ffae00" />
                    </Pressable>
                </View>
            );
    };

    const changeFairway = (f, shows = false) => {
        setShowScores(shows);
        setCurrentFairway(f);
    };

    const roundNav = [];
    for(let i = Math.max(0, currentFairway - 1), j = 0; i < Math.min(fairways, currentFairway + 2); i++, j++) {
        roundNav.push(
            <Pressable
                key={"roundnav" + i}
                onPress={() => changeFairway(i)}
                style={styles.footerButton}>
                {j == 0 && i != currentFairway && <Icon name="chevron-thin-left" type="entypo" size={50} color="#000000" />}
                <Text style={[styles.footerText, i == currentFairway && {textDecorationLine:'underline', fontWeight:'bold'}]}>{i + 1}</Text>
                {i < fairways && (j == 2 || (i == fairways || currentFairway == 0) && j == 1) && <Icon name="chevron-thin-right" type="entypo" size={50} color="#000000" />}
            </Pressable>
        );
    };

    const RoundNav = () => {
        return (
            <View style={styles.footerContainer}>
                {roundNav}
                <Pressable
                    onPress={() => changeFairway(currentFairway, true)}
                    style={styles.footerButton}>
                    <Icon name="list-ol" type="font-awesome" size={50} color="#000000" />
                </Pressable>
            </View>
        );
    };

    const addThrow = (p, f, add) => {
        const newArray = [...throws];
        newArray[p][f] = Math.max(0, newArray[p][f] + add);
        setThrows(newArray);
    };

    const changePar = (f, add) => {
        const newArray = [...pars];
        newArray[f] = Math.max(1, newArray[f] + add);
        setPars(newArray);
    }

    const playerlist = [];
    for (let i = 0; i < players.length; i++) {
        playerlist.push(
            <View style={styles.containerNewRound} key={"playerlistitem" + i}>
                <Text style={[styles.textStyle, {width:'50%', alignSelf:'center'}]}>{players[i]}</Text>
                <Pressable onPress={() => addThrow(i, currentFairway, -1)}>
                    <Icon name="circle-with-minus" type="entypo" size={30} color="#ffae00" />
                </Pressable>
                <Text style={styles.textStyle}>{throws[i][currentFairway]}</Text>
                <Pressable onPress={() => addThrow(i, currentFairway, 1)}>
                    <Icon name="circle-with-plus" type="entypo" size={30} color="#ffae00" />
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
    };

    const getTotalScore = (p) => {
        let playerThrows = [...throws[p]];
        let fairwayPar = [...pars];
        return playerThrows.reduce((acc, cv) => acc + cv, 0) - fairwayPar.reduce((acc, cv) => acc + cv, 0);
    };

    const scoreTables = [];
    for(let i = 0; i < players.length; i++) {
        let playerTable = [];
        let fw = 0;
        let r = 0;
        scoreTables.push(
            <View key={"playerscoreitem" + i}>
                <Text style={styles.subheading}>{players[i]}: {getTotalScore(i)}</Text>
            </View>
        );
        while(fw < fairways) {
            let playerRow = [];
            for(let j = 0; fw < fairways && j < 9; j++, fw++) {
                playerRow.push(
                    <View style={styles.tableColumn} key={"scorecol" + i + fw}>
                        <Text style={styles.tableHeadingItem}>{fw + 1}</Text>
                        <Text style={styles.tableSubheadingItem}>{pars[fw]}</Text>
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
                <Text style={styles.headerStyle}>Scores</Text>
                <View contentContainerStyle={{alignItems:'center', width:'80%'}}>
                    {scoreTables}
                </View>
            </ScrollView>
        );
    };

    const FairwayView = () => {
        return (
            <ScrollView contentContainerStyle={{alignItems:'center', flex:1}}>
                <Text style={styles.headerStyle}>Fairway {currentFairway + 1}</Text>
                {fairwayLengths[currentFairway] != null && fairwayLengths[currentFairway] != "" && <Text style={styles.textStyle}>Length: {fairwayLengths[currentFairway]}</Text>}
                <ParDisplay />
                {playerlist}
            </ScrollView>
        );
    };

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex:1}}>
                <View style={styles.containerLeft}>
                    <Text style={styles.textStyle}>{courseName}</Text>
                </View>
                {showScores ? <Scoreview /> : <FairwayView /> }
                <RoundNav/>
            </View>
        </SafeAreaView>
    );
}
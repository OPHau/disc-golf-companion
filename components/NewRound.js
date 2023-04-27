import React, { useEffect, useState, useContext } from "react";
import { View, Text, ScrollView, Pressable, TextInput } from "react-native";
import styles from '../style/styles';
import { decode } from "html-entities";
import { Icon } from "@rneui/themed";
import themeContext from "../style/themeContext";
import { lightTheme, darkTheme } from "../style/theme";
import { SocialIcon } from "@rneui/base";
import { KeyboardAvoidingView } from "react-native";

export default NewRound = ( {navigation, route} ) => {
    const { darkMode } = useContext(themeContext);
    const theme = darkMode ? darkTheme : lightTheme;

    const [courseName, setCourseName] = useState("Course");
    const [fairwayCount, setFairwayCount] = useState(18);
    const [players, setPlayers] = useState(["Player 1"]);
    const {course} = route.params;
    const [playerIncrement, setPlayerIncrement] = useState(1);

    const addPlayer = () => {
        let i = playerIncrement + 1;
        let newPlayer = "Player " + i;
        setPlayerIncrement(playerIncrement + 1);
        setPlayers(players => ([...players, newPlayer]));
    }

    const removePlayer = () => {
        let newArray = [...players];
        setPlayerIncrement(playerIncrement - 1);
        newArray.pop();
        setPlayers(newArray);
    }

    const changePlayerName = (text, i) => {
        const names = [...players];
        names[i] = text;
        setPlayers(names);
    }

    useEffect(() => {
        if(route.params) {
            let name = "Course";
            let fairways = 18;
            if(course != undefined) {
                if(course.baskets != undefined) fairways = course.baskets.map((basket) => basket).length;
                if(course.course.Fullname != undefined) name = decode(course.course.Fullname);
            }
            setCourseName(name);
            setFairwayCount(fairways);
        }
    }, [players]);

    const playerlist = [];
    for (let i = 0; i < players.length; i++) {
        playerlist.push(
            <View style={[styles.containerNewRound, {backgroundColor: theme.backgroundSpecial}]} key={"playerlistitem" + i}>
                <TextInput
                style={[styles.textInput, {width:'80%', alignSelf:'center', backgroundColor: theme.textInput, color: theme.text}]}
                value={players[i]}
                onChangeText={text => changePlayerName(text, i)}
                />
            </View>
        );
    }

    return (
        <KeyboardAvoidingView
            style={{flex:1, backgroundColor:theme.background}}
            behavior="height">
        <ScrollView style={{flex: 1}} contentContainerStyle={{alignItems:'center', backgroundColor:theme.background}}>
                <View style={{flexDirection: "row"}}>
                    <Text style={[styles.headerStyle, {color:theme.text}]}>Course:</Text>
                    <Pressable style={({ pressed }) => [styles.buttonStyle, {width: '14%', padding:5, backgroundColor: pressed ? theme.secondaryBtn : theme.primaryBtn}]} onPress={() => navigation.navigate('Map')}>
                        <Icon name="magnifying-glass" type="entypo" size={35} color={theme.text} />
                    </Pressable>
                </View>

                <TextInput 
                    style={[styles.textInput, {backgroundColor: theme.textInput, color: theme.text}]}
                    value={courseName}
                    onChangeText={setCourseName}
                    />
                <Text style={[styles.textStyle, {color:theme.text}]}>Fairways: {fairwayCount}</Text>
                <Text style={[styles.headerStyle, {color:theme.text}]}>Players:</Text>
                {playerlist}
                <View style={{flexDirection:'row'}}>
                    {players.length < 4 &&
                        <Pressable 
                                style={({ pressed }) => [styles.buttonStyle,
                                {width: '40%', backgroundColor: pressed ? theme.secondaryBtn : theme.primaryBtn}]} 
                                onPress={() => addPlayer()}>
                            <Text style={[styles.textStyle, {color: theme.text}]}>Add Player</Text>
                        </Pressable>
                    }
                    {players.length > 1 &&
                        <Pressable 
                                style={({ pressed }) => [styles.buttonStyle,
                                {width: '40%', backgroundColor: pressed ? theme.secondaryBtn : theme.primaryBtn}]} 
                                onPress={() => removePlayer()}>
                            <Text style={[styles.textStyle, {color: theme.text}]}>Remove</Text>
                        </Pressable>
                    }
                </View>
                <Pressable 
                        onPress={() => navigation.navigate('Current Round', {course: course, courseName: courseName, fairways: fairwayCount, players: players})}
                        style={({ pressed }) => [styles.buttonStyle,
                        {backgroundColor: pressed ? theme.secondaryBtn : theme.primaryBtn}]}>
                    <Text style={[styles.textStyle, {color: theme.text}]}>Start Round</Text>
                </Pressable>
        </ScrollView>
        </KeyboardAvoidingView>
    );
}
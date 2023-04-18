import React, { useEffect, useState, useContext } from "react";
import { View, Text, ScrollView, Pressable, TextInput } from "react-native";
import styles from '../style/styles';
import { decode } from "html-entities";
import { Icon } from "@rneui/themed";
import themeContext from "../style/themeContext";
import { lightTheme, darkTheme } from "../style/theme";

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
            <View style={styles.containerNewRound} key={"playerlistitem" + i}>
                <Text style={[styles.textStyle, {width:'50%', alignSelf:'center'}]}>{players[i]}</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={{alignItems:'center', flex:1}}>
            <Text style={styles.headerStyle}>Course:</Text>
            <View style={{flexDirection: "row"}}>
                <TextInput 
                    style={[styles.textInput, {backgroundColor: theme.backgroundLight, color: theme.text}]}
                    value={courseName}
                    onChangeText={setCourseName}
                    />
                <Pressable style={[styles.buttonStyle, {width: '10%'}]} onPress={() => navigation.navigate('Map')}>
                    <Icon name="magnifying-glass" type="entypo" size={35} color="#000000" />
                </Pressable>
            </View>
            <Text style={styles.textStyle}>Fairways: {fairwayCount}</Text>
            {playerlist}
            <View style={{flexDirection:'row'}}>
                {players.length < 4 &&
                    <Pressable style={[styles.buttonStyle, {width:'40%'}]} onPress={() => addPlayer()}>
                        <Text style={styles.textStyle}>Add Player</Text>
                    </Pressable>
                }
                {players.length > 1 &&
                    <Pressable style={[styles.buttonStyle, {width:'40%'}]} onPress={() => removePlayer()}>
                        <Text style={styles.textStyle}>Remove</Text>
                    </Pressable>
                }
            </View>
            <Pressable 
            onPress={() => navigation.navigate('Current Round', {course: course, courseName: courseName, fairways: fairwayCount, players: players})}
            style={styles.buttonStyle}>
                <Text style={styles.textStyle}>Start Round</Text>
            </Pressable>
        </ScrollView>
    );
}
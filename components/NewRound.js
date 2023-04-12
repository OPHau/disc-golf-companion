import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Pressable, TextInput } from "react-native";
import styles from '../style/styles';
import { decode } from "html-entities";

export default NewRound = ( {navigation, route} ) => {
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

    const removePlayer = (p) => {
        setPlayers(prev => {
            return prev.filter(player => player !== p)
        });
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
                {players.length > 1 &&
                    <Pressable style={[styles.buttonStyle, {width:'40%'}]} onPress={() => removePlayer(players[i])}>
                        <Text style={styles.textStyle}>Remove</Text>
                    </Pressable>
                }
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={{alignItems:'center', flex:1}}>
            <TextInput 
                style={[styles.textInput, {width:'80%'}]}
                value={courseName}
                onChangeText={setCourseName}
                />
            <Text style={styles.textStyle}>Fairways: {fairwayCount}</Text>
            {playerlist}
            {players.length < 4 &&
                <Pressable style={[styles.buttonStyle, {width:'40%'}]} onPress={() => addPlayer()}>
                    <Text style={styles.textStyle}>Add Player</Text>
                </Pressable>
            }
            <Pressable 
            onPress={() => navigation.navigate('Current Round')}
            style={styles.buttonStyle}>
                <Text style={styles.textStyle}>Start Round</Text>
            </Pressable>
        </ScrollView>
    );
}
import React, { useEffect, useState, useContext } from "react";
import { View, Text, ScrollView, Pressable, TextInput } from "react-native";
import styles from '../style/styles';
import { decode } from "html-entities";
import { Icon } from "@rneui/themed";
import themeContext from "../style/themeContext";
import { lightTheme, darkTheme } from "../style/theme";
import { KeyboardAvoidingView } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { onValue, ref } from "firebase/database";
import { USERS_REF, auth, db } from "../firebase/Config";

export default NewRound = ( {navigation, route} ) => {
    const { darkMode } = useContext(themeContext);
    const theme = darkMode ? darkTheme : lightTheme;

    const [courseName, setCourseName] = useState("Course");
    const [fairwayCount, setFairwayCount] = useState(18);
    const [players, setPlayers] = useState(["Player 1"]);
    const {course} = route.params;
    const [playerIncrement, setPlayerIncrement] = useState(1);
    const playerlist = [];
    const fairwayValues = [...Array(31).keys()].splice(1);

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
        onValue(ref(db, USERS_REF + auth.currentUser.uid), (snapshot) => {
            if(snapshot.val()) {
                let p1 = [];
                p1.push(snapshot.val().username);
                setPlayers(p1);    
            }
        }, {
            onlyOnce: true
        });

        if(route.params) {
            // onValue(ref(db, USERS_REF + auth.currentUser.uid), (snapshot) => {
            //     setUsername(snapshot.val() && snapshot.val().username);
            //   }, {
            //     onlyOnce: true
            //   });

            let name = "Course";
            let fairways = 18;
            if(course != undefined) {
                if(course.baskets != undefined) fairways = course.baskets.map((basket) => basket).length;
                if(course.course.Fullname != undefined) name = decode(course.course.Fullname);
            }

            setCourseName(name);
            setFairwayCount(fairways);
        }
    }, []);

    for (let i = 0; i < players.length; i++) {
        playerlist.push(
            <View style={[styles.containerNewRound, {backgroundColor: theme.backgroundSpecial}]} key={"playerlistitem" + i}>
                <TextInput
                style={[styles.textInput, {width:'80%', alignSelf:'center', backgroundColor: theme.textInput, color: theme.text, borderColor: theme.textFaded}]}
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
            <View style={{flexDirection: "row", margin:5, marginTop:10, justifyContent:'center'}}>
                <Text style={[styles.headerStyle, {color:theme.text}]}>Course:</Text>
                <Pressable 
                    style={({ pressed }) => [{ padding:5, borderRadius:4, borderWidth:1, backgroundColor: pressed ? theme.secondaryBtn : theme.primaryBtn}]} 
                    onPress={() => navigation.navigate('Map')}>
                    <Icon name="magnifying-glass" type="entypo" size={35} color={theme.text} />
                </Pressable>
            </View>

            <TextInput 
                style={[styles.textInput, {backgroundColor: theme.textInput, color: theme.text}]}
                value={courseName}
                onChangeText={setCourseName}
                />
            <View style={{flexDirection:'row'}}>
                <Text style={[styles.textStyle, {fontSize:23, color:theme.text}]}>Fairways: </Text>
                <SelectDropdown data={fairwayValues}
                    defaultValue={fairwayCount}
                    onSelect={(selectedItem, index) => {setFairwayCount(selectedItem)}}
                    buttonStyle={[styles.dropdown, {backgroundColor: theme.primaryBtn}]}
                    buttonTextStyle={[styles.dropdownText, {color: theme.text}]}
                    buttonTextAfterSelection={(selectedItem, index) => { return selectedItem}}
                    rowTextForSelection={(item, index) => { return item}}
                    dropdownIconPosition="right"
                    renderDropdownIcon={isOpened => 
                        { return <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} type='font-awesome' color={theme.text} size={15}/>}} />
                </View>
                    <Text style={[styles.headerStyle, {color:theme.text}]}>Players:</Text>
                        {playerlist}
                    <View style={{flexDirection:'row', justifyContent:'space-between', width:'80%'}}>
                    {players.length < 4 && (
                        <Pressable
                        style={({ pressed }) => [styles.buttonStyle,      {width: '40%', backgroundColor: pressed ? theme.secondaryBtn : theme.primaryBtn}]} 
                        onPress={() => addPlayer()}>
                        <Text style={[styles.textStyle, {color: theme.text}]}>Add Player</Text>
                        </Pressable>
                    )}
                    {players.length >= 4 && (
                        <View style={{width: '40%'}}/>
                    )}
                    {players.length > 1 && (
                        <Pressable 
                        style={({ pressed }) => [styles.buttonStyle,      {width: '40%', backgroundColor: pressed ? theme.secondaryBtn : theme.primaryBtn}]} 
                        onPress={() => removePlayer()}>
                        <Text style={[styles.textStyle, {color: theme.text}]}>Remove</Text>
                        </Pressable>
                    )}
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
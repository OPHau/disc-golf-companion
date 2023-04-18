import React, { useEffect, useState } from "react";
import { Pressable, SafeAreaView, Text, View } from "react-native";
import styles from '../style/styles'
import axios from "axios";
import { decode } from "html-entities";
import themeContext from "../style/themeContext";
import { lightTheme, darkTheme } from "../style/theme";

export default CourseDetails = ({route, navigation}) => {
    const { darkMode, setDarkMode } = useContext(themeContext);
    const theme = darkMode ? darkTheme : lightTheme;
    
    const [details, setDetails] = useState([]);
    const {courseID} = route.params;

    const getURL = () => {
        const baseUrl = 'https://discgolfmetrix.com/api.php?content=course&id=';
        const URL = baseUrl + courseID + '&code=XXX';
        return URL;
    }

    const getDetails = async () => {
        const URL = getURL();
        const response = await axios.get(URL);
        setDetails(response.data);
        // Data fields: (example)
        // "course": {
        //     "ID": "14800",
        //     "ParentID": "14799",
        //     "Name": "18 korvi",
        //     "Fullname": "Kurna DiscGolfPark &rarr; 18 korvi",
        //     "Type": "2",
        //     "CountryCode": "EE",
        //     "Area": "Harju Maakond",
        //     "City": "Rae",
        //     "Location": null,
        //     "Lat": "59.338635189294735",
        //     "Lng": "24.843376287954044",
        //     "Enddate": "2021-08-24",
        //     "RatingValue1": "847.75",
        //     "RatingResult1": "56.36",
        //     "RatingValue2": "1000",
        //     "RatingResult2": "43.67"
        //   },
        // "baskets": [
        //     {
        //       "Number": "1",
        //       "NumberAlt": null,
        //       "Par": "3",
        //       "Length": "97",
        //       "Unit": "m",
        //       "TeeLat": "59.338603552693",
        //       "TeeLng": "24.843424893915",
        //       "BasketLat": "59.337779254973",
        //       "BasketLng": "24.843958318233"
        //     }, etc.

    };

    useEffect(() => {
        if(courseID) {
            getDetails();
        }
    }, []);

    return (
        <View>
            <SafeAreaView>
                <Text>{decode(details.course?.Fullname)}</Text>
                <Text>{details.course?.Area}, {details.course?.City}</Text>
            </SafeAreaView>
            <Pressable 
                onPress={() => navigation.navigate('New Round', { course: details})}
                style={styles.buttonStyle}>
                <Text style={styles.textStyle}>Play a round</Text>
            </Pressable>
        </View>
    );
}
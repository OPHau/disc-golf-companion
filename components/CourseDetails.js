import React, { useContext, useEffect, useState } from "react";
import { Dimensions, Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";
import styles from '../style/styles'
import axios from "axios";
import { decode } from "html-entities";
import themeContext from "../style/themeContext";
import { lightTheme, darkTheme } from "../style/theme";
import MapView, {Marker} from "react-native-maps";

const INITIAL_LATITUDE = 65.0800;
const INITIAL_LONGITUDE = 25.4800;
const INITIAL_LATITUDE_DELTA = 0.0922;
const INITIAL_LONGITUDE_DELTA = 0.0421;

export default CourseDetails = ({route, navigation}) => {
    const { darkMode, setDarkMode } = useContext(themeContext);
    const theme = darkMode ? darkTheme : lightTheme;
    
    const {courseID} = route.params;
    const [fetched, setFetched] = useState(false);
    const [details, setDetails] = useState([]);
    const [totalLength, setTotalLength] = useState(0);
    const [lengthUnit, setLengthUnit] = useState("");
    const [pars, setPars] = useState([]);
    const [coursePar, setCoursePar] = useState(0);
    const [basketCount, setBasketCount] = useState(0);
    const [latitude, setLatitude] = useState(INITIAL_LATITUDE);
    const [longitude, setLongitude] = useState(INITIAL_LONGITUDE);

    const getURL = () => {
        const baseUrl = 'https://discgolfmetrix.com/api.php?content=course&id=';
        const URL = baseUrl + courseID + '&code=XXX';
        return URL;
    }

    const getDetails = async () => {
        const URL = getURL();
        const response = await axios.get(URL);
        let data = response.data;
        setDetails(data);

        if(data.course.Lat != undefined) setLatitude(Number(data.course.Lat));
        if(data.course.Lng != undefined) setLongitude(Number(data.course.Lng));

        if(data.baskets != undefined) {
            let baskets = data.baskets.map((basket) => basket);
            let initPars = new Array(baskets.length).fill(3);
            let lengths = [];
            for(let i = 0; i < baskets.length; i++) {
                if(baskets[i].Par != undefined) initPars[i] = Number(baskets[i].Par);
                if(baskets[i].Length != undefined) {
                    lengths.push(Number(baskets[i].Length));
                }
            }
            setBasketCount(baskets.length);
            if(baskets[0].Unit != undefined) setLengthUnit(baskets[0].Unit);
            setPars(initPars);
            setCoursePar(initPars.reduce((prev, cur) => prev + cur, 0));
            setTotalLength(1500);
            setFetched(true);
        }

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
        if(courseID && !fetched) {
            getDetails();
        }
    }, [latitude]);

    const parTables = [];
    let b = 0;
    let r = 0;
    
    while(b < basketCount) {
        let basketRow = [];
        r++;
        for(let i = 0; i < 9 && b < basketCount; b++, i++) {
            basketRow.push(
                <View style={styles.tableColumn} key={"coursecol" + i + b}>
                    <Text style={styles.tableHeadingItem}>{b + 1}</Text>
                    <Text style={styles.tableSubheadingItem}>{pars[b]}</Text>
                </View>
            );
        }
        parTables.push(
            <View style={styles.tableRow} key={"courserow" + r}>
                {basketRow}
            </View>);
    }

    return (
        <View style={[{flex:1, backgroundColor:theme.background}]}>
            {fetched && <MapView
                style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height / 2.5}}
                initialRegion= {{
                  latitude: latitude,
                  longitude: longitude,
                  latitudeDelta: INITIAL_LATITUDE_DELTA,
                  longitudeDelta: INITIAL_LONGITUDE_DELTA,
                }}>
                <Marker title={details.course?.Name} coordinate={{latitude: latitude, longitude: longitude}}/>
            </MapView>}
            <ScrollView contentContainerStyle={{alignItems:'center'}}>
                <View style={styles.containerLeft}>
                    <Text style={[styles.subheading, {color:theme.text}]}>{decode(details.course?.Fullname)}</Text>
                    <Text style={[styles.textStyle, {color:theme.text}]}>{details.course?.Area}, {details.course?.City}</Text>
                    {basketCount > 0 && <Text style={[styles.textStyle, {color:theme.text}]}>Fairways: {basketCount}</Text>}
                    {coursePar > 0 && <Text style={[styles.textStyle, {color:theme.text}]}>Par: {coursePar}</Text>}
                    {totalLength > 0 && <Text style={[styles.textStyle, {color:theme.text}]}>Total length: {totalLength}{lengthUnit}</Text>}
                </View>
                <View contentContainerStyle={{alignItems:'center', width:'80%'}}>
                    {parTables}
                </View>
            </ScrollView>
            <Pressable 
                onPress={() => navigation.navigate('New Round', { course: details})}
                style={[styles.buttonStyle, {alignSelf:'center', backgroundColor: theme.primaryBtn}]}>
                <Text style={[styles.textStyle, {color: theme.text}]}>Play a round</Text>
            </Pressable>
        </View>
    );
}
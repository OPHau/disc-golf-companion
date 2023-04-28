import { SearchBar, Tab, TabView } from "@rneui/themed";
import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { FlatList, SafeAreaView, Text, View } from "react-native";
import * as Location from 'expo-location';
import styles from '../style/styles';
import { decode } from "html-entities";
import themeContext from "../style/themeContext";
import { lightTheme, darkTheme } from "../style/theme";
import { getDistance } from "geolib";

const INITIAL_LATITUDE = 65.0800;
const INITIAL_LONGITUDE = 25.4800;

export default CourseSearch = ({navigation}) => {
    const { darkMode, setDarkMode } = useContext(themeContext);
    const theme = darkMode ? darkTheme : lightTheme;

    const [tabIndex, setTabIndex] = useState(1);
    const [requestLocPerm, setRequestLocPerm] = useState(false);
    const [locRequested, setLocRequested] = useState(false);
    const [latitude, setLatitude] = useState(INITIAL_LATITUDE);
    const [longitude, setLongitude] = useState(INITIAL_LONGITUDE);
    const [fetchCourses, setFetchCourses] = useState(true);

    const [search, setSearch] = useState('');
    const [filtered, setFiltered] = useState([]);
    const [courses, setCourses] = useState([]);
    const [nearby, setNearby] = useState([]);

    const getCourses = async () => {
        const URL = 'https://discgolfmetrix.com/api.php?content=courses_list&country_code=FI';
        let included = [];
        let today = new Date(new Date().getFullYear() + '-' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '-' + ("0" + new Date().getDate()).slice(-2));

        // Data fields:
        // 1. ID
        // 2. ParentID
        // 3. Name
        // 4. Fullname - same with name if no layouts are used.
        // 5. Type - possible values 1 - Parent course, always consists layouts of couse, 2 - layour or course without layout.
        // 6. CountryCode 
        // 7. Area
        // 8. City
        // 9. Location
        // 10. X - latitude
        // 12. Y - longitude  
        // 13. Enddate - if the course/layout does not exist any more, then the enddate is filled with date

        try {
            const response = await axios.get(URL);

            response.data.courses.forEach(course => {      
                if(course.Enddate != undefined && course.Enddate != 'null') {
                    let ed = new Date(course.Enddate);
                    if(ed > today) included.push(course)
                }
                else included.push(course);
            });    

        } catch(err) {
            console.log("Unable to fetch course list.", e);
            alert("Unable to fetch course list: " + e);
        }

        included.forEach(course => {
            course.in_use = false;
            if(course.Enddate != undefined && course.Enddate != 'null') {
                let ed = new Date(course.Enddate);
                if(ed > today) course.in_use = true;
            }
            else course.in_use = true;

            //Removing possible frontal spaces some course names seem to have
            while(course.Fullname.charAt(0) === ' ') {
                course.Fullname = course.Fullname.substring(1);
            }
        });

        included.sort((a, b) => {
            const nameA = a.Fullname.toUpperCase();
            const nameB = b.Fullname.toUpperCase();
            if(nameA < nameB) return -1;
            else if(nameA > nameB) return 1;
            else return 0;
        });

        setCourses(included);
        setFiltered(included);
        setFetchCourses(false);
    }

    useEffect(() => {
        if(fetchCourses) getCourses();
        if(requestLocPerm) {
            (async () => {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if(status !== 'granted') {
                    alert('Geolocation failed.');
                    return;
                }
                else {
                    try {
                        let location = await Location.getCurrentPositionAsync({});
                        setLatitude(location.coords.latitude);
                        setLongitude(location.coords.longitude);
                    }
                    catch(e) {
                        console.log('Error while trying to access location: ', e);
                    }
                    listNearbyCourses();
                    setRequestLocPerm(false);
                    setLocRequested(true);
                }
            })();
        }
    }, [requestLocPerm]);

    const switchTab = (e) => {
        setTabIndex(e);
        if(e == 2 && !locRequested) setRequestLocPerm(true);
    }

    const listNearbyCourses = () => {
        // alert(latitude +" " +longitude);
        const near = courses.filter(function (item) {
            return item.X && item.Y && getDistance( { latitude: latitude, longitude: longitude}, { latitude: item.X, longitude: item.Y}) <= 25000;
        });
        setNearby(near);
    }

    const filterSearch = (text) => {
        if(text) {
            const newData = courses.filter(function (item) {
                const fname = item.Fullname ? item.Fullname.toUpperCase() : ''.toUpperCase();
                const aname = item.Area ? item.Area.toUpperCase() : ''.toUpperCase();
                const cname = item.City ? item.City.toUpperCase() : ''.toUpperCase();
                const search = text.toUpperCase();
                return fname.indexOf(search) > -1 || aname.indexOf(search) > -1 || cname.indexOf(search) > -1;
            });
            setFiltered(newData);
            setSearch(text);
        } else {
            setFiltered(courses);
            setSearch(text);
        }
    };

    const ItemView = ({item}) => {
        return (
            <Text
            style={[styles.courseListItem, {color: theme.text}]}
            onPress={() => navigation.navigate('Course Details', {courseID: item.ID})}>
                {decode(item.Fullname)}
            </Text>
        );
    };

    const ItemSeparatorView = () => {
        return (
            <View
            style={{
                height: 0.5,
                width: '100%',
                backgroundColor: '#C8C8C8',
              }}
            />
        );
    };

    return (
        <SafeAreaView style={{flex: 1}}>
            <Tab
                value={tabIndex}
                onChange={(e) => switchTab(e)}
                containerStyle={{backgroundColor: theme.background}}
                titleStyle={{color: theme.text, fontSize: 12}}
                indicatorStyle={{backgroundColor: theme.navBarIcon, height: 3}}
                variant="default">
                <Tab.Item
                    title="Favorites"
                    icon={{ name: 'star', type: 'entypo', color: theme.navBarIcon}}/>
                <Tab.Item
                    title="Search"
                    icon={{ name: 'magnifying-glass', type: 'entypo', color: theme.navBarIcon}}/>
                <Tab.Item
                    title="Nearby"
                    icon={{ name: 'google-nearby', type: 'material-community', color: theme.navBarIcon}}/>
            </Tab>
            <TabView value={tabIndex} onChange={(e) => switchTab(e)} animationType='spring'>
                <TabView.Item style={{ backgroundColor: theme.background, width: '100%' }}>
                    <Text style={[styles.textStyle, {color: theme.text}]}>You have no favorites yet.</Text>
                </TabView.Item>
                <TabView.Item style={{ backgroundColor: theme.background, width: '100%' }}>
                    <View style={[styles.courseList]}>
                        <FlatList
                        contentContainerStyle={{flexGrow: 1, alignItems: "stretch"}}
                        data={filtered}
                        initialNumToRender={7}
                        windowSize={7}
                        keyExtractor={(item, index) => index.toString()}
                        stickyHeaderIndices={[0]}
                        ItemSeparatorComponent={ItemSeparatorView}
                        renderItem={ItemView}
                        ListHeaderComponent= {
                            <SearchBar
                            containerStyle={{backgroundColor: theme.backgroundLight}}
                            inputContainerStyle={{backgroundColor: theme.backgroundSpecial}}
                            searchIcon={{size: 24, color: theme.navBarIcon}}
                            style={{color: theme.text}}
                            round
                            lightTheme
                            onChangeText={(text) => filterSearch(text)}
                            onClear={(text) => filterSearch('')}
                            placeholder="Type here..."
                            value={search}
                            />
                        }
                        />
                    </View>
                </TabView.Item>
                <TabView.Item style={{ backgroundColor: 'white', width: '100%' }}>
                    <View style={[styles.courseList, {backgroundColor: theme.background}]}>
                        <FlatList 
                        contentContainerStyle={{flexGrow: 1, alignItems: "stretch"}}
                        data={nearby}
                        initialNumToRender={7}
                        keyExtractor={(item, index) => index.toString()}
                        ItemSeparatorComponent={ItemSeparatorView}
                        renderItem={ItemView}
                        />
                    </View>
                </TabView.Item>
           </TabView>
        </SafeAreaView>
    );
}
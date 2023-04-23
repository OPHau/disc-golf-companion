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
        const response = await axios.get(URL);
        setFiltered(response.data.courses);
        setCourses(response.data.courses);
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
                const itemData = item.Fullname ? item.Fullname.toUpperCase() : ''.toUpperCase();
                const courseData = text.toUpperCase();
                return itemData.indexOf(courseData) > -1;
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
            style={[styles.courseListItem, {color:theme.text}]}
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
                indicatorStyle={{backgroundColor: '#ffae00', height: 3}}
                variant="default">
                <Tab.Item
                    title="Favorites"
                    titleStyle={{color:"#000", fontSize: 12}}
                    icon={{ name: 'star', type: 'entypo', color: '#000'}}/>
                <Tab.Item
                    title="Search"
                    titleStyle={{color:"#000", fontSize: 12}}
                    icon={{ name: 'magnifying-glass', type: 'entypo', color: '#000'}}/>
                <Tab.Item
                    title="Nearby"
                    titleStyle={{color:"#000", fontSize: 12}}
                    icon={{ name: 'google-nearby', type: 'material-community', color: '#000'}}/>
            </Tab>
            <TabView value={tabIndex} onChange={() => switchTab(tabIndex)} animationType='spring'>
                <TabView.Item style={{ backgroundColor: 'white', width: '100%' }}>
                    <Text style={styles.textStyle}>You have no favorites yet.</Text>
                </TabView.Item>
                <TabView.Item style={{ backgroundColor: 'white', width: '100%' }}>
                    <View style={styles.courseList}>
                        <FlatList
                        contentContainerStyle={{flexGrow: 1, alignItems: "stretch"}}
                        data={filtered}
                        initialNumToRender={7}
                        keyExtractor={(item, index) => index.toString()}
                        ItemSeparatorComponent={ItemSeparatorView}
                        renderItem={ItemView}
                        ListHeaderComponent= {
                            <SearchBar
                            round
                            lightTheme
                            searchIcon={{size: 24}}
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
                    <View style={styles.courseList}>
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
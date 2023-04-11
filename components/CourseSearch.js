import { SearchBar } from "@rneui/themed";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, Text, View } from "react-native";
import styles from '../style/styles';

export default CourseSearch = ({navigation}) => {
    const [search, setSearch] = useState('');
    const [filtered, setFiltered] = useState([]);
    const [courses, setCourses] = useState([]);

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
    }

    useEffect(() => {
        getCourses();
    }, []);

    const filterSearch = (text) => {
        if(text) {
            const newData = courses.filter(function (item) {
                const itemData = item.Name ? item.Name.toUpperCase() : ''.toUpperCase();
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
            style={styles.courseListItem}
            onPress={() => navigation.navigate('Course Details', {courseID: item.ID})}>
                {item.Name}
                {' '}
                {item.City}
                {' '}
                {item.ID}
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
        </SafeAreaView>
    );
}
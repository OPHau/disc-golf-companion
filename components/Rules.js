import React, { useContext } from "react";
import { View, Text, ScrollView, Pressable, Linking } from "react-native";
import styles from '../style/styles';
import themeContext from "../style/themeContext";
import { lightTheme, darkTheme } from "../style/theme";

export default Rules = ({navigation}) => {
    const { darkMode, setDarkMode } = useContext(themeContext);
    const theme = darkMode ? darkTheme : lightTheme;

    return (
        <ScrollView contentContainerStyle={{justifyContent:'center'}}>
            <View style={{marginBottom:5}}>
                <Text style={styles.headerStyle}>Links:</Text>
                <Text 
                    style={[styles.textStyle, {color: 'blue'}]}
                    onPress={() => Linking.openURL('https://www.pdga.com/rules/official-rules-disc-golf')}>
                    PDGA Official Rules of Disc Golf
                </Text>
                <Text 
                    style={[styles.textStyle, {color: 'blue'}]}
                    onPress={() => Linking.openURL('https://www.pdga.com/rules/')}>
                    PDGA Official Rules & Regulations of Disc Golf
                </Text>
            </View>

            <Text style={styles.headerStyle}>Simple rules:</Text>
            <Text style={styles.textStyle}>
                The object of the game of disc golf is to complete a course in the fewest throws of the disc. 
            </Text>
            <Text style={styles.textStyle}>
                A course typically consists of nine or eighteen holes, each of which is a separate unit for scoring. 
            </Text>
            
            <Text style={styles.textStyle}>
                After the player has thrown from the tee, each successive throw is made from where the previous throw came to rest. 
            </Text>
            <Text style={styles.textStyle}>
                On completing a hole, the player proceeds to the teeing area of the next hole, 
                until all holes have been played. 
            </Text>
            <Text style={styles.textStyle}>
                Disc golf courses are normally laid out in and around wooded areas with diverse terrain to provide natural obstacles to the flight of the disc. 
                </Text>
            <Text style={styles.textStyle}>
                The course must not be altered by the player in any way to decrease the difficulty of a hole. 
            </Text>
            <Text style={styles.textStyle}>
                Players must play the course as they find it and play the disc where it lies 
                unless otherwise allowed by these rules.
            </Text>
        </ScrollView>
    );
}
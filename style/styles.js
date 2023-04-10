import { StyleSheet } from 'react-native';

//Primary color: #ffae00
//Secondary color: #e69d00

export default StyleSheet.create({
    //Containers
    container: {
        flex: 1,
        alignItems:'center', 
        justifyContent:'center',
    },
    containerNewRound: {
        flexDirection:'row',
        width:'95%',
        backgroundColor: '#fff',
    },
    //Lists
    courseList: {
        flex: 1,
        alignItems: 'stretch',
    },
    courseListItem: {
        padding: 10,
    },
    courseListSeparator: {
        height: 0.5,
        width: 100,
        backgroundColor: '#C8C8C8',
    },
    //Text
    textStyle: {
        fontSize:20,
        margin:5
    },
    headerStyle: {
        fontSize:25,
        margin:7
    },
    //Text Input
    textInput: {
        borderWidth: 1,
        borderRadius: 4,
        padding:5,
        margin:5,
        fontSize: 18,
        width: '75%'
      },
    //Buttons
    buttonStyle: {
        borderRadius:4,
        borderWidth:1,
        margin:10,
        width:"75%",
        alignItems:'center',
        backgroundColor:'#ffae00'
    },
    buttonStyleTwo: {
        borderRadius:4,
        borderWidth:1,
        padding:5,
        margin:10,
        width:"95%",
        alignItems:'center',
    }

});
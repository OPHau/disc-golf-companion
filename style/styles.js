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
    containerLeft: {
        alignSelf:'flex-start',
        flexDirection:'row',
        justifyContent:'space-between',
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
    //Tables
    tableRow: {
        flexDirection:'row',
        backgroundColor:'#000',
    },
    tableColumn: {
        flex:1,
        alignItems:'center',
    },
    tableHeaderItem: {
        fontStyle:'italic',
        color:'#fff',
        backgroundColor:'#000'
    },
    tableItem: {
        fontWeight:'bold',
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
    footerContainer: {
        backgroundColor: '#ffae00',
        height:90,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
    },
    footerText: {
        fontSize:35,
    },
    footerButton: {
        flex: 1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        padding:5,
        margin:5,
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
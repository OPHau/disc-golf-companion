import { DarkTheme, DefaultTheme } from '@react-navigation/native';

export const lightTheme = {
  //Nav & tab bars
  primary: '#ffae00',
  secondary: '#e69d00',
  //Buttons
  primaryBtn: '#ffae00',
  secondaryBtn: '#d89300',
  primaryBtnTwo: '#f5a700', /* Only used in CurrentRound | Player score colors */
  secondaryBtnTwo: '#d89300', /* Only used in CurrentRound | Player score colors */
  //Background
  background: '#FFFFFF',
  backgroundTwo: '#FFFFFF',
  backgroundLight: '#FFFFFF', /* Only used in CourseSearch | Searchbar colors */
  backgroundSpecial: '#dfdfdf', /* Only used in CurrentRound & NewRound | Player score colors */
  backgroundSpecialTwo: '#ffae00', /* Only used in CurrentRound | Scoreboard colors */
  //Other
  textInput: '#FFFFFF',
  navBarIcon: '#000000',
  text: '#000000',
  textLink: 'blue',
  textLinkFaded: '#000000',
};

export const darkTheme = {
  //Nav & tab bars
  primary: '#262626',
  secondary: '#1c1c1c',
  //Buttons
  primaryBtn: '#575757',
  secondaryBtn: '#414141',
  primaryBtnTwo: '#585858', /* Only used in CurrentRound | Player score colors */
  secondaryBtnTwo: '#464646', /* Only used in CurrentRound | Player score colors */
  //Background
  background: '#121212',
  backgroundTwo: '#262626',
  backgroundLight: '#575757', /* Only used in CourseSearch | Searchbar colors */
  backgroundSpecial: '#262626', /* Only used in CurrentRound & NewRound | Player score colors */
  backgroundSpecialTwo: '#262626', /* Only used in CurrentRound | Scoreboard colors */
  //Other
  textInput: '#262626',
  navBarIcon: '#3b3b3b',
  text: '#e9e9e9',
  textFaded: '#aaaaaa',
  textLink: '#1f66ff',
  textLinkFaded: '#5c5c5c',
};
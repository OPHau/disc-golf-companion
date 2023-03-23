import { StatusBar } from 'expo-status-bar';
import Home from './components';
import Login from './components';
import Profile from './components';
import Round from './components';
import Scores from './components';
import Search from './components';
import styles from './style/styles';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Disc golf companion app</Text>
      <StatusBar style="auto" />
    </View>
  );
}

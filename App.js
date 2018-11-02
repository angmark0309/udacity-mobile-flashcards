import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { createMaterialTopTabNavigator, createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import  DeckList from './components/DeckList';
import { white } from './utils/colors';
import { Constants } from 'expo'
import IndividualDeck from './components/IndividualDeck';
import  Quiz  from './components/Quiz';
import Results from './components/Results';
import NewCard from './components/NewCard';
import NewDeck from './components/NewDeck';

function UdaciStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = createBottomTabNavigator({
  Decks: {
    screen: DeckList,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Ionicons name="ios-bookmarks" size={30} color={tintColor} />
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: "New Deck",
      tabBarIcon: ({ tintColor }) => <FontAwesome name="plus-square" size={30} color={tintColor} />
    }
  }
  })

const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
    header: null
    } 
  },
  IndividualDeck: {
    screen: IndividualDeck,
  },
  Quiz: {
    screen: Quiz
  },
  Results: {
    screen: Results
  },
  NewCard: {
    screen: NewCard
  }
  }
)

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <UdaciStatusBar backgroundColor={white}/>
        <MainNavigator/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

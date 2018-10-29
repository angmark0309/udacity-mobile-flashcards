import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class Results extends Component {

    render() {
        const { totalQuestions, numberCorrect, state } = this.props.navigation.state.params;
        const { deckTitle } = state;
        const percentage = Math.floor(numberCorrect / totalQuestions * 100)
        return (
            <View>
                <Text>{`${percentage}% correct`}</Text>
                <TouchableOpacity 
                onPress={() => this.props.navigation.navigate('Quiz', { state : state })}>
                    <Text>Restart Quiz</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={() => this.props.navigation.navigate('IndividualDeck', { title: deckTitle, cards: totalQuestions })}>
                    <Text>Back to Deck</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
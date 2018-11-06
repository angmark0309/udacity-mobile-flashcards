import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { white, red, black } from '../utils/colors'

export default class Results extends Component {

    render() {
        const { totalQuestions, numberCorrect, state } = this.props.navigation.state.params;
        const { deckTitle } = state;
        const percentage = Math.floor(numberCorrect / totalQuestions * 100)
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{`${percentage}% correct`}</Text>
                <TouchableOpacity 
                style={styles.restartBtn}
                onPress={() => this.props.navigation.navigate('Quiz', { state : state })}>
                    <Text style={{fontSize: 16}}>Restart Quiz</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                style={styles.deckBtn}
                onPress={() => this.props.navigation.navigate('IndividualDeck', { title: deckTitle, cards: totalQuestions })}>
                    <Text style={{fontSize: 16, color: white}}>Back to Deck</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 100
    },
    title: {
        fontSize: 30,
        textAlign: 'center',
        paddingBottom: 100
    },

    correctness: {
        textAlign: 'center',
        color : white,
        fontSize: 16
    },
    total: {
        fontSize: 16
    },
    toggleAnswer: {
        paddingTop: 10,
        paddingBottom : 80,
        color: red,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    restartBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 2,
        paddingTop: 15,
        paddingBottom: 15
    },
    deckBtn: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: black,
        backgroundColor: black,
        borderStyle: 'solid',
        borderRadius: 2,
        paddingTop: 15,
        paddingBottom: 15
    }
});
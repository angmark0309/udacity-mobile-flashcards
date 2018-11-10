import React, { Component } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import DeckItem from './DeckItem';
import { black, white } from '../utils/colors';
import { clearLocalNotification, setLocalNotification } from '../utils/notification';

export default class IndividualDeck extends Component {

    startQuiz = (title) => {
        this.props.navigation.navigate('Quiz', {id:title})
        clearLocalNotification()
        .then(setLocalNotification())
    }

    render() {
        const { title, cards } = this.props.navigation.state.params 
        return (
            <View style={styles.container}>
                <View style={{paddingBottom: 80}}>
                    <DeckItem title={title} cards={cards} />
                </View>
            <TouchableOpacity style={styles.addBtn} onPress={() => this.props.navigation.navigate('NewCard', { id: title})}>
                    <Text style={{fontSize: 16}}>Add Card</Text>
            </TouchableOpacity>
                <TouchableOpacity style={styles.startBtn} disabled={!cards} onPress={()=>{this.startQuiz(title)}}>
                <Text style={{color: white, fontSize: 16}}>Start Quiz</Text>
            </TouchableOpacity>
            </View>    
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        marginTop: 100,
    },
    addBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: black,
        borderStyle: 'solid',
        borderRadius: 2,
        paddingTop: 15,
        paddingBottom: 15
    },
    startBtn: {
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
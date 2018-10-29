import React, { Component } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import DeckItem from './DeckItem';

export default class IndividualDeck extends Component {
    render() {
        const { title, cards } = this.props.navigation.state.params 
        return (
            <View>
            <DeckItem title={title} cards={cards} />
                <TouchableOpacity onPress={() => this.props.navigation.navigate('NewCard', { id: title})}>
                    <Text>Add Card</Text>
            </TouchableOpacity>
                <TouchableOpacity disabled={!cards} onPress={() => this.props.navigation.navigate('Quiz', {id:title})}>
                    <Text>Start Quiz</Text>
                </TouchableOpacity>
            </View>    
        )
    }
}
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    KeyboardAvoidingView,
    TouchableOpacity,
    TextInput
} from 'react-native';
import { saveNewDeck } from '../utils/api';

export default class NewDeck extends Component {

    state = {
        deckTitle: ''
    }

    handleAddNewDeck = () => {
        const { deckTitle } = this.state;
        saveNewDeck(deckTitle)
            .then((deck) => {
                const {title, questions} = deck
                this.props.navigation.navigate('IndividualDeck', {title, cards: questions.length })
                this.setState({deckTitle: ''})
            })
    }

    render() {
        const { deckTitle } = this.state;
        return (
            <KeyboardAvoidingView behavior='padding'>
                <Text>What is the title of your new deck?</Text>
                <TextInput
                    value={deckTitle}
                    onChangeText={deckTitle => this.setState({ deckTitle })}
                    placeholder="Deck Title"
                />
                <TouchableOpacity
                    disabled={!deckTitle} 
                    onPress={this.handleAddNewDeck}>
                    <Text>Submit</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
}
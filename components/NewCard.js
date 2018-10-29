import React, { Component } from 'react';
import { 
    StyleSheet, 
    Text, 
    KeyboardAvoidingView, 
    TouchableOpacity,
    TextInput 
} from 'react-native';
import { saveCardToDeck } from '../utils/api';

export default class NewCard extends Component {
    
    state = {
        questionInput: '',
        answerInput: ''
    }

    handleAddToDeck = () => {
        const { questionInput, answerInput } = this.state;
        const { id } = this.props.navigation.state.params;
        saveCardToDeck(id, questionInput, answerInput)
        .then((deck) => {
            const {title, questions} = deck;
            const cards = questions.length;
            this.props.navigation.navigate('IndividualDeck', { title, cards })
        })
    }
    render() {
        const {questionInput, answerInput} = this.state;
        return (
            <KeyboardAvoidingView behavior='padding'>
                <TextInput
                    value={questionInput}
                    onChangeText={questionInput => this.setState({ questionInput })}
                    placeholder="Question" 
                />
                <TextInput
                    value={answerInput}
                    onChangeText={answerInput => this.setState({ answerInput })}
                    placeholder="Answer" 
                />
                <TouchableOpacity 
                    disabled={!questionInput || !answerInput} 
                    onPress={this.handleAddToDeck}>
                    <Text>Add to Deck</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
}
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    KeyboardAvoidingView,
    TouchableOpacity,
    TextInput
} from 'react-native';
import { saveNewDeck } from '../utils/api';
import { gray, white, purple } from '../utils/colors'

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
            <KeyboardAvoidingView style={styles.container} behavior='padding'>
                <Text style={styles.question}>What is the title of your new deck?</Text>
                <TextInput
                    style={styles.input}
                    value={deckTitle}
                    underlineColorAndroid = "transparent"
                    onChangeText={deckTitle => this.setState({ deckTitle })}
                    placeholder="Deck Title"
                />
                <TouchableOpacity
                    style={styles.submit}
                    disabled={!deckTitle} 
                    onPress={this.handleAddNewDeck}>
                    <Text style={{fontSize: 16, color: white}}>Submit</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    question: {
        textAlign: 'center',
        fontSize: 30
    },
    submit: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: purple,
        backgroundColor: purple,
        borderStyle: 'solid',
        borderRadius: 2,
        paddingTop: 15,
        paddingBottom: 15,
        margin: 15
    },
    input: {
        margin: 15,
        height: 40,
        borderColor: gray,
        borderWidth: 1,
        textAlign: 'center'
     }
});
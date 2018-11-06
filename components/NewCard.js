import React, { Component } from 'react';
import { 
    StyleSheet, 
    Text, 
    KeyboardAvoidingView, 
    TouchableOpacity,
    TextInput 
} from 'react-native';
import { saveCardToDeck } from '../utils/api';
import { purple, gray, white } from '../utils/colors'

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
                <KeyboardAvoidingView style={styles.container} behavior='padding'>
                    <TextInput
                        style={styles.input}
                        underlineColorAndroid = "transparent"
                        value={questionInput}
                        onChangeText={questionInput => this.setState({ questionInput })}
                        placeholder="Question" 
                    />
                    <TextInput
                        style={styles.input}
                        underlineColorAndroid = "transparent"
                        value={answerInput}
                        onChangeText={answerInput => this.setState({ answerInput })}
                        placeholder="Answer" 
                    />
                    <TouchableOpacity 
                        style={styles.addBtn}
                        disabled={!questionInput || !answerInput} 
                        onPress={this.handleAddToDeck}>
                        <Text style={{fontSize: 16, color: white}}>Add to Deck</Text>
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
    addBtn: {
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
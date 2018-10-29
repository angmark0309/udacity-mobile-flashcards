import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { getDecks } from '../utils/api'
import  DeckItem  from './DeckItem'

export default class DeckList extends Component {
    
    state = {
        decks: null
    }

    static getDerivedStateFromProps(props, state) {
        if (state.decks !== null)
        {
            let newDeck = props.navigation.state.params.decks;
            if(newDeck !== state.decks) {
                return { decks: newDeck }
            }
        }
        return null   
    }
    
    componentDidMount() {
        this.didFocusListener = this.props.navigation.addListener(
            'didFocus',
            () => { this.updateDeckList() },
        );
        this.updateDeckList()
    }

    componentWillUnmount() {
        this.didFocusListener.remove();
    }

    updateDeckList = () => {
        getDecks()
            .then((results) => {
                console.log(results)
                this.setState({ decks: results })
            })
    }

    render() {
        const { decks } = this.state
        return (
            <View>
                {decks && Object.keys(decks).map((key)=>{
                    const {title, questions} = decks[key];
                    const questionsCount = questions.length;
                     return (
                         <TouchableOpacity key={key} onPress={() => this.props.navigation.navigate('IndividualDeck', {title, cards:questionsCount})}>
                             <DeckItem style={styles.container} title={title} cards={questionsCount} />
                         </TouchableOpacity>
                     )
                })}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {

    }
})
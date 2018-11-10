import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { getDecks } from '../utils/api';
import  DeckItem  from './DeckItem';
import {white} from '../utils/colors';

export default class DeckList extends Component {
    
    state = {
        decks: null,
        bounceValue: new Animated.Value(1)
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

    handleDeckPress = (title, questionsCount) => {
        const { bounceValue } = this.state
        Animated.sequence([
            Animated.timing(bounceValue, { duration: 200, toValue: 1.04 }),
            Animated.spring(bounceValue, { toValue: 1, friction: 4})
        ]).start(() => this.props.navigation.navigate('IndividualDeck', {title, cards: questionsCount}))
    }

    render() {
        const { decks, bounceValue } = this.state
        return (
            <ScrollView>
                {decks && Object.keys(decks).map((key)=>{
                    const {title, questions} = decks[key];
                    const questionsCount = questions.length;
                     return (
                         <TouchableOpacity key={key} onPress={() => this.handleDeckPress(title,questionsCount)}>
                            <Animated.View style={[styles.container, {transform: [{scale: bounceValue}]}]}>
                                 <DeckItem title={title} cards={questionsCount} />
                            </Animated.View>
                         </TouchableOpacity>
                     )
                })}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: white,
        borderRadius: 2,
        padding: 20,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 17,
        justifyContent: 'center',
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
            width: 0,
            height: 3
        }
    }
});
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { gray, white } from '../utils/colors';

export default class DeckItem extends Component {
    render() {
        const { title, cards } = this.props 
        return(
            <View>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.cards}>{cards} {cards > 1 ? "cards" : "card"}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        textAlign: 'center'
    },
    cards: {
        paddingTop: 10,
        paddingBottom : 20,
        color: gray,
        textAlign: 'center'

    }
})
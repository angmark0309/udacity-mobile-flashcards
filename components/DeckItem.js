import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { gray } from '../utils/colors';

export default class DeckItem extends Component {
    render() {
        const { title, cards } = this.props 
        return(
            <View style={styles.container}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.cards}>{cards} {cards > 1 ? "cards" : "card"}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '85%',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 2
    },
    title: {
        fontSize: 30,
        textAlign: 'center',
    },
    cards: {
        paddingTop: 10,
        paddingBottom : 20,
        color: gray

    }
})
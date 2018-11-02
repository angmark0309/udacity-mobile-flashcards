import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { gray, white } from '../utils/colors';

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
        // backgroundColor: white,
        // borderRadius: 2,
        // padding: 20,
        // marginLeft: 10,
        // marginRight: 10,
        // marginTop: 17,
        // justifyContent: 'center',
        // shadowRadius: 3,
        // shadowOpacity: 0.8,
        // shadowColor: 'rgba(0, 0, 0, 0.24)',
        // shadowOffset: {
        //     width: 0,
        //     height: 3
        // }
    },
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
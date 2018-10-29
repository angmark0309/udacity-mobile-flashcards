import { AsyncStorage } from 'react-native'
import { DECK } from './_DECK'

const DECK_STORAGE_KEY = 'DECK:key'

setDummyData = () => {
    AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(DECK))
    return DECK
}

export function getDecks() {
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then((results)=>{
            return (results) ? JSON.parse(results) : setDummyData()
        })
}

export function getDeck(id) {
    return getDecks()
            .then((result)=>{
                return result[id]
            })
}

export function saveCardToDeck(deckId, question, answer) {
    return getDecks()
        .then((result)=>{
            let decks = result;
            decks[deckId].questions.push({question, answer})
            AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(decks))
            return decks[deckId];
        })
}

export function saveNewDeck(title) {
    let newDeck  = {
        [title] :{title, questions:[]}
    };
    return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify(newDeck)).then(()=>{
        return newDeck[title]
    })
}
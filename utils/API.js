import { AsyncStorage } from "react-native";

const DATA_KEY = "MobileFlashcards:state";

export function saveDeck(deck) {
  return AsyncStorage.getItem(DATA_KEY)
    .then(JSON.parse)
    .then(result => {
      const decks = result || {};
      decks[deck.id] = deck;
      return AsyncStorage.setItem(DATA_KEY, JSON.stringify(decks));
    });
}

export function getDecks() {
  return AsyncStorage.getItem(DATA_KEY).then(JSON.parse);
}

export function saveCard(deckId, card) {
  return AsyncStorage.getItem(DATA_KEY)
    .then(JSON.parse)
    .then(result => {
      const decks = result;
      decks[deckId].cards = (decks[deckId].cards || []).concat([card]);
      return AsyncStorage.setItem(DATA_KEY, JSON.stringify(decks));
    });
}
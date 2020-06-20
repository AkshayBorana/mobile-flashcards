export const ADD_DECK = 'ADD_DECK';
export const ADD_CARD = "ADD_CARD";
export const RECEIVE_DECKS = "RECEIVE_DECKS";
import { saveDeck, saveCard, getDecks } from "../utils/API";

export function addDeck(deck) {
  return {
    type: ADD_DECK,
    deck
  };
}

export function addCardToDeck(deckId, card) {
  return {
    type: ADD_CARD,
    deckId,
    card
  };
}

export function receiveDeck(decks) {
  return {
    type: RECEIVE_DECKS,
    decks
  }
}

export function handleAddDeck(name) {
  return dispatch => {
    const deck = {
      name,
      id: Date.now(),
      cards: []
    };
    saveDeck(deck).then(() => {
      dispatch(addDeck(deck));
    });
  };
}

export function handleAddCardToDeck(deckId, card) {
  return dispatch => {
    const newCard = {
      ...card,
      id: Date.now()
    };
    saveCard(deckId, card)
     .then(() => dispatch(addCardToDeck(deckId, newCard)));
  };
}

export function handleInitialData() {
  return dispatch => {
    getDecks().then(decks => {
      dispatch(receiveDeck(decks || []));
    });
  }
}
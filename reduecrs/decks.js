import { ADD_DECK, RECEIVE_DECKS, ADD_CARD } from "../actions/decks";

export default function decks(state = [], action) {
  switch (action.type) {
    case ADD_DECK: {
      return [
            ...state,
            {
                title: action.title,
                id: Date.now(),
                cards: []
            }
        ];
    }
    case RECEIVE_DECKS: {
      return action.decks;
    }
    case ADD_CARD:
    const { deckId, card } = action;
      return {
        ...state,
        [deckId]: {
          ...state[deckId],
          cards: state[deckID].cards.concat([card])
        }
      }
    default:
      return state;
  }
}
import * as CardUtil from '../util/card_util';

export const RECEIVE_CARD = 'RECEIVE_CARD';
export const REMOVE_CARD = 'REMOVE_CARD';

const receiveCard = card => ({
    type: RECEIVE_CARD,
    card
});

const removeCard = cardId => ({
    type: REMOVE_CARD,
    cardId
});

export const fetchCard = cardId => dispatch => (
    CardUtil.fetchCard(cardId)
        .then( res => dispatch(receiveCard(res)))
); 

export const createCard = (card) => dispatch => (
    CardUtil.createCard(card)
        .then(res => dispatch(receiveCard(res)))
);

export const updateCard = card => dispatch => (
    CardUtil.updateCard(card)
        .then(res => dispatch(receiveCard(res)))
);

export const deleteCard = cardId => dispatch => (
    CardUtil.deleteCard(cardId)
        .then( ()=> dispatch(removeCard(cardId)))
); 



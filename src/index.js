import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';
import './index.css';
import App from './App';

const HAND_TYPE = ["rock", "scissors", "paper"];
const JUDGE = ["Draw", "Win", "Lose"];

let state_value = {
    src: HAND_TYPE[0],
    opsrc: HAND_TYPE[0],
    judge: JUDGE[0],
}

function hand(state = state_value, action) {
    let opsrc = HAND_TYPE[Math.floor(Math.random() * 3)];
    let result = judge(action.type, opsrc);

    if (action.type !== HAND_TYPE[0] && action.type !== HAND_TYPE[1] && action.type !== HAND_TYPE[2]) return state;

    return {
        src: action.type,
        opsrc: opsrc,
        judge: result
    }
}

function judge(myHand, opponentHand) {
    if (myHand === opponentHand) {
        return JUDGE[0];
    }
    if ((myHand === HAND_TYPE[0] && opponentHand === HAND_TYPE[1]) ||
        (myHand === HAND_TYPE[1] && opponentHand === HAND_TYPE[2]) ||
        (myHand === HAND_TYPE[2] && opponentHand === HAND_TYPE[0])) {
        return JUDGE[1];
    }
    return JUDGE[2];
}

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, hand)

let store = createStore(persistedReducer)
let pstore = persistStore(store)

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={<p>loading...loading</p>} persistor={pstore}>
            <App />
        </PersistGate>
    </Provider>,
    document.getElementById('root')
);

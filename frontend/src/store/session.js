// frontend/src/store/session.js

import { csrfFetch } from './csrf'

const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';

const setUser = (user) => ({
    type: SET_USER,
    payload: user
});

const removeUser = () => ({
    type: REMOVE_USER
});

const initialState = {
    user: null
};

// Login
export const login = ({ credential, password })  => async dispatch => {
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({ 
            credential, 
            password 
        }),
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(setUser(data.user));
        return data.user;
    }
};

// Restore User
export const restoreUser = () => async dispatch => {
    const response = await csrfFetch('/api/session');

    if (response.ok) {
        const data = await response.json();
        dispatch(setUser(data.user));
        return data.user;   
    }
};

// Sign Up
export const signUp = (user) => async dispatch => {
    const { username, firstName, lastName, email, password } = user;
    const response = await csrfFetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({
            username,
            firstName,
            lastName,
            email,
            password
        })
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(setUser(data.user));
        return data.user;
    }
};

// REDUCER
const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.payload
            };
        case REMOVE_USER:
            return {
                ...state,
                user: null
            };
        default:
            return state;
    }
};

export default sessionReducer
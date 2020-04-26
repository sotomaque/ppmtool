import { SET_CURRENT_USER } from '../actions/types';

const initial_state = {
    user: {},
    validToken: false
}

const booleanActionPayload = (payload) => {
    if (payload) return true;
    else return false;
}

export default function(state = initial_state, action) {
    switch (action.type) {

        case SET_CURRENT_USER:
            return {
                ...state,
                validToken: booleanActionPayload(action.payload),
                user: action.payload
            }

        default:
            return state;
    }
}
import {
    ADD_MSG,
    MSG_ERROR,
    GET_MESSAGES
} from '../controlers/types'

const initialState = {
    messages: [],
    message: null,
    loading: true,
    error: {}
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {

        case ADD_MSG:
            return {
                ...state,
                message: payload,
                loading: false
            }
        case GET_MESSAGES:
            return {
                ...state,
                messages: payload,
                loading: false
            }
        case MSG_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        default:
            return state;
    }
}
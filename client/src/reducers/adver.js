import {
    ADD_ADVER,
    ADVER_ERROR,
    GET_ADVERS
} from '../controlers/types'

const initialState = {
    advertisings: [],
    advertising: null,
    loading: true,
    error: {}
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {

        case ADD_ADVER:
            return {
                ...state,
                advertising: payload,
                loading: false
            }
        case GET_ADVERS:
            return {
                ...state,
                advertisings: payload,
                loading: false
            }
        case ADVER_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        default:
            return state;
    }
}
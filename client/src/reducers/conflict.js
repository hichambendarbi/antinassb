import {
    ADD_CONFLICT,
    CONFLICT_ERROR,
    GET_CONFLICTS
} from '../controlers/types'

const initialState = {
    conflicts: [],
    conflict: null,
    loading: true,
    error: {}
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case ADD_CONFLICT:
            return {
                ...state,
                conflict: payload,
                loading: false
            }
        case GET_CONFLICTS:
            return {
                ...state,
                conflicts: payload,
                loading: false
            }
        case CONFLICT_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        default:
            return state;
    }
}
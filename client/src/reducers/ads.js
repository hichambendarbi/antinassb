import {
    ADD_ADS,
    ADS_ERROR,
    UPDATE_ADS,
    GET_ADS,
    GET_All_ADS
} from '../controlers/types'

const initialState = {
    allads: [],
    ads: null,
    loading: true,
    error: {}
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {

        case GET_ADS:
            return {
                ...state,
                allads: payload,
                loading: false
            }
            
        case GET_All_ADS:
            return {
                ...state,
                ads: payload,
                loading: false
            }

        case ADD_ADS:
            return {
                ...state,
                allads: [payload, ...state.allads],
                loading: false
            }

        case ADS_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }

        case UPDATE_ADS:
            return {
                ...state,
                ads: {...state.ads, ads: payload},
                loading: false
            }

        default:
            return state;
    }
}
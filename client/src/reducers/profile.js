import { GET_PROFILE, UPDATE_PROFILE, PROFILE_ERROR, CLEAR_PROFILE } from '../controlers/types'
const initialState = {
    profile: null,
    profiles: [],
    loading: true,
    error: {}
}

export default function(state = initialState, action) {
    const { type, payload }  = action;
    switch(type) {
       case GET_PROFILE:
        case UPDATE_PROFILE:
           return {
               ...state,
               profile: payload,
               loading: false
           }
           case PROFILE_ERROR:
               return {
                   ...state,
                   error: payload,
                   loading: false
               }
            case CLEAR_PROFILE:
                return {
                    ...state,
                    profile: null,
                    loading: false
                }
            default:
            return state
    }
}
import axios from 'axios'
import { setAlert } from './alert'
import {
    ADD_CONFLICT,
    CONFLICT_ERROR,
    GET_CONFLICTS
} from './types'

// Add new post
export const addNewConflict = formData => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post(`/api/conflict`, formData, config);

        dispatch({
            type: ADD_CONFLICT,
            payload: res.data
        });

        dispatch(setAlert('شكرا لكم ! سيتم التواصل معكم قريبا', 'success'));
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        } 

        dispatch({
            type: CONFLICT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}


// Get all Messages
export const getConflicts = () => async dispatch => {
    try {
        const res = await axios.get('/api/conflict');
        dispatch({
            type: GET_CONFLICTS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: CONFLICT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}



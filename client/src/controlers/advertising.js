import axios from 'axios'
import { setAlert } from './alert'
import {
    ADD_ADVER,
    ADVER_ERROR,
    GET_ADVERS
} from './types'

// Add new post
export const addNewADV = formData => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post(`/api/advertising`, formData, config);

        dispatch({
            type: ADD_ADVER,
            payload: res.data
        });

        dispatch(setAlert('شكرا لكم ! سيتم التواصل معكم قريبا', 'success'));
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        } 

        dispatch({
            type: ADVER_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}


// Get all Messages
export const getAdvertisings = () => async dispatch => {
    try {
        const res = await axios.get('/api/advertising');
        dispatch({
            type: GET_ADVERS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: ADVER_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}



import axios from 'axios'
import { setAlert } from './alert'
import {
    ADD_MSG,
    MSG_ERROR,
    GET_MESSAGES
} from './types'

// Add new post
export const addNewMSG = formData => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post(`/api/message`, formData, config);

        dispatch({
            type: ADD_MSG,
            payload: res.data
        });

        dispatch(setAlert('شكرا لكم ! سيتم التواصل معكم قريبا', 'success'));
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        } 

        dispatch({
            type: MSG_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}


// Get all Messages
export const getMessages = () => async dispatch => {
    try {
        const res = await axios.get('/api/message');
        dispatch({
            type: GET_MESSAGES,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: MSG_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}



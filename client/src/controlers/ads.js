import axios from 'axios' 
import { setAlert } from './alert'

import { 
    ADD_ADS,
    ADS_ERROR,
    UPDATE_ADS,
    GET_ADS,
    GET_All_ADS
} from './types'


// Create a new ads
export const createAds = ( formData ) => async dispatch => {
    try {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post('/api/ads', formData, config);
        dispatch({
            type: ADD_ADS,
            payload: res.data
        });

        dispatch (setAlert('تم الإنشاء بنجاح' , 'success'))

    } catch (err) {
        const errors = err.response.data.errors;
        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
                                                                             
        dispatch({
            type: ADS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}


// Update ADS (make online change with a nother ads)
export const updateAds = (formData, idAds) => async dispatch => {
    try {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.put(`/api/ads/${idAds}`, formData, config);
        dispatch({
            type: UPDATE_ADS,
            payload: res.data
        });

        dispatch (setAlert('تمت تعديل الخدمة بنجاح', 'success'));
            
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
                                                                             
        dispatch({
            type: ADS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Get ads single by id
export const getAds = id => async dispatch => {
    try {
        const res = await axios.get(`/api/ads/${id}`);

        dispatch({
            type: GET_ADS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: ADS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Get all ads
export const getAllAds = () => async dispatch => {
    try {
        const res = await axios.get('/api/ads');

        dispatch({
            type: GET_All_ADS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: ADS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}


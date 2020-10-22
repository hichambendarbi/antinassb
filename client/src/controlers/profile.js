import axios from 'axios' 
import { setAlert } from './alert'

import { 
    GET_PROFILE,
    UPDATE_PROFILE,
    CLEAR_PROFILE,
    ACCOUNT_DELETED,
    PROFILE_ERROR
} from './types'



// Get current users profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me');
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
        
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Get profile by ID
export const getProfileById = userId => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/${userId}`);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
        
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Create or update profile
export const createProfile = (formData, history, edit = false) => async dispatch => {
    try {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post('/api/profile', formData, config);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

        dispatch (setAlert(edit ? 'تم التعديل بنجاح' : 'تم الإنشاء بنجاح', 'success'))
            history.push('/dashboard');
    } catch (err) {
        const errors = err.response.data;
        console.log(errors)
        if(errors) {
            errors.forEach(error => dispatch(setAlert(error, 'danger')));
        }
                                                                             
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Add service or activity
export const addActivity = (formData) => async dispatch => {
    try {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.put('/api/profile/activity', formData, config);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch (setAlert('تمت إضافة الخدمة بنجاح', 'success'));
            
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
                                                                             
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Delete Activity or service
export const deleteActivity = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/activity/${id}`);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
        dispatch(setAlert('تمت حذف الخدمة بنجاح', 'success'))
    } catch (err) {
         dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Update service or activity
export const updateActivity = (formData, idAct) => async dispatch => {
    try {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.put(`/api/profile/activity/${idAct}`, formData, config);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch (setAlert('تمت تعديل الخدمة بنجاح', 'success'));
            
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
                                                                             
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// DELETE account && profile
export const deleteAccount = () => async dispatch => {
    if(window.confirm('هل أنت متأكد ؟')) {
        try {
            
            await axios.delete(`/api/profile`);

            dispatch({
                type: CLEAR_PROFILE
            });
            dispatch({
                type: ACCOUNT_DELETED
            });
            dispatch(setAlert('تم مسح الملف الشخصي بنجاح'))
        } catch (err) {
             dispatch({
                type: PROFILE_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            });
        }
    }
}
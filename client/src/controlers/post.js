import axios from 'axios'
import { setAlert } from './alert'
import {
    GET_POSTS,
    POST_ERROR,
    UPDATE_LIKES,
    DELETE_POST,
    ADD_POST,
    GET_POST,
    ADD_COMMENT,
    REMOVE_COMMENT,
    UPDATE_POST,
    GET_USER_POSTS,
    VISIBILITY_POST

} from './types'

// Get all posts by status
export const getPostsByStatus = () => async dispatch => {
    try {
        const res = await axios.get('/api/post');
        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Get all posts 
export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('/api/post/all-posts');
        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}


// Get all posts
export const getUserPosts = () => async dispatch => {
    try {
        const res = await axios.get('/api/post/post-user/test');
        dispatch({
            type: GET_USER_POSTS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Add like
export const addLike = id => async dispatch => {
    try {
        const res = await axios.post(`/api/post/like/${id}`);

        console.log(res)

        dispatch({
            type: UPDATE_LIKES,
            payload: { id, likes: res.data }
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Remove like
export const removeLike = id => async dispatch => {
    try {
    const res = await axios.post(`/api/post/unlike/${id}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: { id, likes: res.data }
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Delete post
export const deletePost = id => async dispatch => {
    try {
        await axios.put(`/api/post/${id}`);
        dispatch({
            type: DELETE_POST,
            payload: id
        });

        dispatch(setAlert('تم الحذف بنجاح', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}


// Add new post
export const addNewPost = formData => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        console.log("hello")
        const res = await axios.post('/api/post', formData, config);

        dispatch({
            type: ADD_POST,
            payload: res.data
        });
        

        dispatch(setAlert('سيتم فحص منشورك من قِبل فريق العمل', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Get post single
export const getPost = id => async dispatch => {
    try {
        const res = await axios.get(`/api/post/${id}`);

        dispatch({
            type: GET_POST,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Add new comment from users
export const addComment = (postId, formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post(`/api/post/comment/${postId}`, formData, config);

        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        });

        dispatch(setAlert('تم التعليق بنجاح', 'success'));
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Comment delete
export const deleteComment = (postId, commentId) => async dispatch => {
    try {
        await axios.delete(`/api/post/comment/${postId}/${commentId}`);
        dispatch({
            type: REMOVE_COMMENT,
            payload: commentId
        });
        dispatch(setAlert('تم التعليق بنجاح', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })}
    }

    
// Update post from Admins
export const updatePost = (id, formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post(`/api/post/update/${id}`, formData, config);
        dispatch({
            type: UPDATE_POST,
            payload: res.data
        });

        dispatch(setAlert('تم التعديل بنجاح', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}  


// Update post visiblity from user
export const visibility = (id, formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post(`/api/post/update-delete/${id}`, formData, config);
        dispatch({
            type: VISIBILITY_POST,
            payload: res.data
        });

        dispatch(setAlert('تم الحذف بنجاح', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}  
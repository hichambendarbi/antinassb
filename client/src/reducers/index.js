import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import post from './post';
import ads from './ads';
import msg from './msg';
import adver from './adver';
import conflict from './conflict';

export default combineReducers({
    alert,
    auth,
    profile,
    post,
    ads,
    msg,
    adver,
    conflict 
});
import {API} from "../api/API";
import {stopSubmit} from "redux-form";

const initialState = {
    isAuth: !!JSON.parse(localStorage.getItem('user')),
    user: JSON.parse(localStorage.getItem('user'))
};

export const SET_USER = 'SET_USER';
export const LOG_OUT = 'LOG_OUT';
export const CHANGE_AUTH_STATUS = 'CHANGE_AUTH_STATUS';


const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_OUT:
            localStorage.removeItem('user');
            return {...state, user: null, isAuth: false};
        case SET_USER:
            return {...state, user: action.user, isAuth: true};
        default:
            return state;
    }
};

export let setUser = (user) => ({type: SET_USER, user});
export let logOut = () => ({type: LOG_OUT});

export let onLoginThunkCreator = (formData) => async (dispatch) => {
    let arr = [];
    let res = await API.usersChecking();
    res.data.forEach((u) => {
        if (u.login === formData.login && u.password.toString() === formData.password) {
            dispatch(setUser(u));
            if(formData.rememberMe){
                let user = JSON.stringify(u);
                localStorage.setItem('user', user)
            }
        } else {
            arr.push('1')
        }
    });
    if (arr.length === res.data.length) {
        dispatch(stopSubmit('login', {_error: 'Login or password is wrong'}))
    }
};
export default authReducer;
import {API} from "../api/API";

const initialState = {
    isAuth: false,
    user: null
};

export const SET_USER = 'SET_USER';
export const LOG_OUT = 'LOG_OUT';


const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_OUT:
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
    let res = await API.usersChecking();
    res.data.forEach((u) => {
        if(u.login === formData.login && u.password === +(formData.password)){
            dispatch(setUser(u))
        }
    })
};
export default authReducer;
import { applyMiddleware, combineReducers, createStore} from "redux";
import todoReducer from "./todoReducer";
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from 'redux-form'
import authReducer from "./authReducer";

let reducers = combineReducers({
    todo: todoReducer,
    auth: authReducer,
    form: formReducer
});

export const store = createStore(reducers, applyMiddleware(thunkMiddleware));
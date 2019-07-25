import {API} from "../api/API";

const initialState = {
    tasks: [],
    editTask: [],
    tagTitle: '',
    view: 'inline',
    priorityTitle: '',
    sortByDateTitle: 'new'
};

export const GET_TASKS = 'GET_TASKS';
export const ADD_TASK = 'ADD_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const SET_EDIT_TASK = 'SET_EDIT_TASK';
export const EDIT_TASK = 'EDIT_TASK';
export const ADD_TAG_TITLE = 'ADD_TAG_TITLE';
export const CHANGE_VIEW = 'CHANGE_VIEW';
export const CHANGE_PRIORITY = 'CHANGE_PRIORITY';
export const SORT_BY_DATE = 'SORT_BY_DATE';


const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TASKS:
            return {...state, tasks: action.tasks};
        case ADD_TASK:
            return {...state, tasks: [...state.tasks, action.task]};
        case DELETE_TASK:
            return {...state, tasks: state.tasks.filter(t => t.id !== action.taskId)};
        case SET_EDIT_TASK:
            return {...state, editTask: action.task};
        case EDIT_TASK:
            return {
                ...state, tasks: state.tasks.map(t => {
                    if (t.id === action.taskId) {
                        return {...action.res}
                    }
                    else {
                        return t
                    }
                })
            };
        case ADD_TAG_TITLE:
            return {...state, tagTitle: action.tagTitle};
        case CHANGE_VIEW:
            return {...state, view: action.status};
        case CHANGE_PRIORITY:
            return {...state, priorityTitle: action.priority};
        case SORT_BY_DATE:
                return {...state, sortByDateTitle: action.value};
        default:
            return state;
    }
};

export let getTasks = (tasks) => ({type: GET_TASKS, tasks});
export let addTask = (task) => ({type: ADD_TASK, task});
export let deleteTask = (taskId) => ({type: DELETE_TASK, taskId});
export let setEditTask = (task) => ({type: SET_EDIT_TASK, task});
export let editTask = (res, taskId) => ({type: EDIT_TASK, res, taskId});
export let addTagTitle = (tagTitle) => ({type: ADD_TAG_TITLE, tagTitle});
export let changeView = (status) => ({type: CHANGE_VIEW, status});
export let changePriority = (priority) => ({type: CHANGE_PRIORITY, priority});
export let sortByDate = (value) => ({type: SORT_BY_DATE, value});

export let getTaskThunkCreator = () => async (dispatch) => {
    let response = await API.getTasks();
    dispatch(getTasks(response.data));
};
export let setEditTaskThunkCreator = (taskId) => async (dispatch) => {
    let response = await API.setEditTasks(taskId);
    dispatch(setEditTask(response.data))
};
export let addTaskThunkCreator = (title, text, tags, date, status, color, priority) => {
    return async (dispatch) => {
        let response = await API.addTask(title, text, tags, date, status, color, priority);
        dispatch(addTask(response.data));
    };
};
export let deleteTaskThunkCreator = (taskId) => {
    return async (dispatch) => {
        const res = await API.deleteTask(taskId);
        if (res.status === 200) {
            dispatch(deleteTask(taskId))
        }

    }
};
export const editTaskThunkCreator = (title, text, taskId, tags, date, status, color, priority) => {
    return async (dispatch) => {
        const res = await API.editTask(title, text, taskId, tags, date, status, color, priority);
        if (res.status === 200) {
            dispatch(editTask(res.data, taskId))
        }
    }
};
export const dndThunkCreator = (status, taskId) => async (dispatch) => {
    API.dnd(status, taskId);
};


export default todoReducer;
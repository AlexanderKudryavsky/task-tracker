import {createSelector} from 'reselect';

export const getTasks = (state) => {
    return state.todo.tasks
};
export const getTagTitle = (state) => {
    return state.todo.tagTitle
};
export const getView = (state) => {
    return state.todo.view
};
export const getPriorityTitle = (state) => {
    return state.todo.priorityTitle
};
export const getSortByDateTitle = (state) => {
    return state.todo.sortByDateTitle
};
export const getIsAuth = (state) => {
    return state.auth.isAuth
};


// export const getSortByDateTitleReselect = createSelector(
//     getSortByDateTitle,
//     getTasks,
//     (total, tasks) => { if(total === 'new'){
//         debugger
//         let newSort = tasks.sort((a, b) => {
//             debugger
//             if (a.date > b.date) {
//                 debugger
//                 return 1
//             }
//             if (a.date < b.date) {
//                 return -1
//             }
//             else {
//                 return 0
//             }
//         })
//         return newSort;
//         }
//         if(total === 'old'){
//             let newSort1 = tasks.sort((a, b) => {
//                 if (a.date < b.date) {
//                     return 1
//                 }
//                 if (a.date > b.date) {
//                     return -1
//                 }
//                 else {
//                     return 0
//                 }
//             })
//             return newSort1;
//         }
//
//     }
// );


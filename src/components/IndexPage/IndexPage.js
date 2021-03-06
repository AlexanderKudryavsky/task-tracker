import React from 'react';
import './IndexPage.scss';
import IndexPageSearch from "./IndexPageSearch/IndexPageSearch";
import {
    addTagTitle,
    addTaskThunkCreator,
    deleteTaskThunkCreator,
    editTaskThunkCreator,
    getTaskThunkCreator
} from "./../../redux/todoReducer";
import {connect} from 'react-redux';
import IndexPageTask from "./IndexPageTasks/IndexPageTask";
import {dndThunkCreator} from "../../redux/todoReducer";
import IndexPageTasksBlock from "./IndexPageTasksBlock/IndexPageTasksBlock";
import Navbar from "../Navbar/Navbar";
import {
    getIsAuth,
    getPriorityTitle,
    getSortByDateTitle,
    getTagTitle,
    getTasks,
    getView
} from "../../selectors/selectors";

class IndexPage extends React.Component {

    componentDidMount() {
        this.props.getTaskThunkCreator();
    }

    onAddTask = (title, tags) => {
        this.props.addTaskThunkCreator(title, tags)
    };
    onDeleteTask = (taskId) => {
        this.props.deleteTaskThunkCreator(taskId)
    };
    onEditTask = (title, taskId) => {
        this.props.editTaskThunkCreator(title, taskId)
    };


    render() {
        return (
            <div>
                <Navbar/>
                <div className='todoList'>
                    <IndexPageSearch addTask={this.onAddTask} tagTitle={this.props.tagTitle}/>
                    {this.props.view === 'inline' &&
                    <IndexPageTask {...this.props} deleteTask={this.onDeleteTask} editTask={this.onEditTask}/>}
                    {this.props.view === 'block' &&
                    <IndexPageTasksBlock {...this.props} deleteTask={this.onDeleteTask} editTask={this.onEditTask}/>}
                </div>
            </div>
        )
    }
}

let mapStateToProps = (state) => ({
    tasks: getTasks(state),
    tagTitle: getTagTitle(state),
    view: getView(state),
    priorityTitle: getPriorityTitle(state),
    sortByDateTitle: getSortByDateTitle(state),
    isAuth: getIsAuth(state)
});


export default connect(mapStateToProps, {
    addTagTitle, addTaskThunkCreator, getTaskThunkCreator,
    deleteTaskThunkCreator, editTaskThunkCreator, dndThunkCreator
})(IndexPage);

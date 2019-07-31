import React from 'react';
import './NewPage.scss'
import {addTaskThunkCreator} from "../../redux/todoReducer";
import {connect} from 'react-redux';
import {Link, Redirect} from "react-router-dom";
import Navbar from "../Navbar/Navbar";

class NewPage extends React.Component {

    state = {
        title: '',
        text: '',
        completedStatus: 'notCompleted',
        priority: 'medium'
    };
    getRandomColor = () => {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };
    onTitleChange = (e) => {
        this.setState({title: e.currentTarget.value})
    };
    onTextChange = (e) => {
        this.setState({text: e.currentTarget.value})
    };
    onAddTask = () => {
        if (this.state.text.length && this.state.title.length !== 0) {
            let reg = this.state.text.match(/#[0-9A-Za-zА-Яа-яё]+/g);
            this.props.addTaskThunkCreator(this.state.title, this.state.text, reg, new Date().toLocaleString(),
                this.state.completedStatus, this.getRandomColor(), this.state.priority);
        }
    };
    changeCompletedStatus = (e) => {
        this.setState({completedStatus: e.target.value})
    };
    changePriority = (e) => {
        this.setState({priority: e.target.value})
    };

    render() {
        {if(!this.props.isAuth){return <Redirect to={'/login'}/>}}

        return (
            <div>
                <Navbar/>
                <div className="note-form">
                    <h1>New Note</h1>
                    <div className="note-form-field">
                        <label>Title</label>
                        <input
                            type="text"
                            name="title"
                            required="required"
                            onChange={this.onTitleChange}
                        />
                    </div>
                    <div className="note-form-field note-form-field-text">
                        <label>Text</label>
                        <textarea
                            name="text"
                            onChange={this.onTextChange}
                        />
                    </div>
                    <div>
                        <span>Completed </span>
                        <select onChange={(e) => {
                            this.changeCompletedStatus(e)
                        }}>
                            <option value='notCompleted'>Not completed</option>
                            <option value='completed'>Completed</option>
                        </select>
                    </div>
                    <div>
                        <span>Priority </span>
                        <select onChange={(e) => {
                            this.changePriority(e)
                        }}>
                            <option value='medium'>Medium</option>
                            <option value='high'>High</option>
                            <option value='low'>Low</option>
                        </select>
                    </div>
                    <div className="note-form-buttons">
                        <Link to="/">
                            <button onClick={this.onAddTask} className="btn">Save</button>
                            <button className={'btn'}>Cancel</button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

let mapStateToProps = (state) => ({
    tasks: state.todo.tasks,
    isAuth: state.auth.isAuth
});

export default connect(mapStateToProps, {addTaskThunkCreator})(NewPage)


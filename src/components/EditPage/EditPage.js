import React from 'react';
import {editTaskThunkCreator, setEditTaskThunkCreator} from "../../redux/todoReducer";
import {connect} from 'react-redux';
import {Link} from "react-router-dom";

class EditPage extends React.Component {
    componentDidMount() {
        this.props.setEditTaskThunkCreator(this.props.match.params.id)
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.setState({title: this.props.tasks.title, text: this.props.tasks.text})
        }
    }

    state = {
        title: '',
        text: '',
        completedStatus: this.props.tasks.status,
        priority: this.props.tasks.priority
    };
    onTitleChange = (e) => {
        this.setState({title: e.currentTarget.value})
    };
    onTextChange = (e) => {
        this.setState({text: e.currentTarget.value})
    };
    onSaveClick = () => {
        let reg = this.state.text.match(/#[0-9A-Za-zА-Яа-яё]+/g);
        this.props.editTaskThunkCreator(this.state.title, this.state.text, this.props.tasks.id, reg, new Date().toLocaleString(),
            this.state.completedStatus, this.props.tasks.color, this.state.priority)
    };
    changeCompletedStatus = (e) => {
        debugger
        this.setState({completedStatus: e.target.value})
    };
    changePriority = (e) => {
        this.setState({priority: e.target.value})
    };

    render() {
        return (
            <div>
                <div className="note-form">
                    <h1>Edit Note:</h1>
                    <form onSubmit={this.onSaveClick}>
                        <div className="note-form-field">
                            <label>Title</label>
                            <input
                                type="text"
                                name="title"
                                required="required"
                                onChange={this.onTitleChange} value={this.state.title}
                            />
                        </div>
                        <div className="note-form-field note-form-field-text">
                            <label>Text</label>
                            <textarea
                                name="text"
                                onChange={this.onTextChange} value={this.state.text}
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
                                <button className="btn" onClick={this.onSaveClick}>Save</button>
                                <button className={'btn'}>Cancel</button>
                            </Link>
                        </div>
                    </form>

                </div>
            </div>
        )
    }
}

let mapStateToProps = (state) => ({
    tasks: state.todo.editTask
});

export default connect(mapStateToProps, {
    setEditTaskThunkCreator, editTaskThunkCreator
})(EditPage)



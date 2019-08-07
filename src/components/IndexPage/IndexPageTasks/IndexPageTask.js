import React from 'react';
import {Link} from 'react-router-dom'
import './IndexPageTasks.scss';

class IndexPageTask extends React.Component {

    state = {
        tasks: this.props.tasks,
        currentId: null
    };

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     if(this.props.tasks !== prevProps.tasks){
    //         this.setState({tasks: this.props.tasks})
    //     }
    // }

    componentDidUpdate(prevProps){
        if (prevProps !== this.props) {
            if (this.props.sortByDateTitle === 'new') {
                this.setState({
                    tasks: this.props.tasks.sort((a, b) => {
                        if (a.date > b.date) {return 1}
                        if (a.date < b.date) {return -1}
                        else {return 0}
                    })
                });
            }
            if (this.props.sortByDateTitle === 'old') {
                this.setState({tasks: this.props.tasks.sort((a, b) => {
                        if (a.date < b.date) {return 1}
                        if (a.date > b.date) {return -1}
                        else {return 0}
                    })
                });
            }
        }
    }


    onDeleteTask = (id) => {
        this.props.deleteTask(id)
    };

    onDragStart = (e, id) => {
        e.dataTransfer.setData('id', id);
        this.setState({currentId: id});
    };
    onDrop = (e, cat, taskId) => {
        let id = e.dataTransfer.getData('id');

        let tasks = this.state.tasks.filter((t) => {
            if (t.id === +(id)) {
                t.status = cat
            }
            return t
        });
        this.setState({...this.state, tasks});
        this.props.dndThunkCreator(cat, taskId)
    };

    onDragOver = (e) => {
        e.preventDefault()
    };

    render() {
        let task = {
            notCompleted: [],
            completed: []
        };
        this.state.tasks.forEach((t) => {
            task[t.status].push(<div key={t.id} priority={t.priority} className='note-list' draggable
                                     onDragStart={(e) => this.onDragStart(e, t.id)}>
                <div className='note-list-round'
                     style={{backgroundColor: t.color}}>{t.title.charAt(0).toUpperCase()}</div>
                {t.priority === 'high' && <div className='note-list-priority'>High Priority</div>}
                {t.priority === 'low' && <div className='note-list-priority'>Low Priority</div>}
                <div className='note-list-wrap'>
                    <div className="note-list-descr">
                        <h2>{t.title}</h2>
                        <p>{t.date}</p>
                    </div>
                    <div className="note-list-content">
                        <div>{t.text}</div>
                        <p className="note-list-tags"><span>{t.tags && t.tags.join(' ')}</span></p>
                    </div>
                    {this.props.isAuth === true &&
                    <div className="note-list-btn">
                        <Link to={`/edit/${t.id}`}>
                            <button className="btn btn-edit">Edit</button>
                        </Link>
                        <button onClick={() => this.onDeleteTask(t.id)} className="btn btn-delete">Delete</button>
                    </div>}
                </div>
            </div>)
        });
        return (
            <div className='note-list-todoTask'>
                <div className='note-list-up' onDragOver={(e) => this.onDragOver(e)}
                     onDrop={(e) => this.onDrop(e, 'notCompleted', this.state.currentId)}>
                    <h2>To Do({task.notCompleted.length})</h2>
                    {task.notCompleted.length > 0 ? task.notCompleted.map(t => {
                        if (t.props.priority.indexOf(this.props.priorityTitle) === -1) {
                            return null
                        }
                        else {
                            return t
                        }
                    }) : 'Drag here...'}
                </div>
                <div className='note-list-down' onDragOver={(e) => this.onDragOver(e)}
                     onDrop={(e) => this.onDrop(e, 'completed', this.state.currentId)}>
                    <h2>Completed({task.completed.length})</h2>
                    {task.completed.length > 0 ? task.completed.map(t => {
                        if (t.props.priority.indexOf(this.props.priorityTitle) === -1) {
                            return null
                        }
                        else {
                            return t
                        }
                    }) : 'Drag here...'}
                </div>
            </div>
        )
    }
}


export default IndexPageTask;
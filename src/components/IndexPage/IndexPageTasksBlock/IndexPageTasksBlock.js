import React from 'react';
import {Link} from "react-router-dom";
import './IndexPageTasksBlock.scss'

class IndexPageTasksBlock extends React.Component{

    state = {
        tasks: this.props.tasks,
        currentId: null
    };


    componentDidUpdate(prevProps) {
        if(prevProps !== this.props){
            if(this.props.sortByDateTitle === 'new'){
                this.setState({tasks: this.props.tasks.sort((a, b) => {
                        if(a.date > b.date){return 1}
                        if(a.date < b.date){return -1}
                        else return 0
                    })
                });
            }
            if(this.props.sortByDateTitle === 'old'){
                this.setState({tasks: this.props.tasks.sort((a, b) => {
                        if(a.date < b.date){return 1}
                        if(a.date > b.date){return -1}
                        else return 0
                    })
                });
            }
        }
    }


    onDeleteTask = (id) => {

        this.props.deleteTask(id)
    };

    onDragStart = (e, id) => {
        console.log('dragStart:', id);
        e.dataTransfer.setData('id', id)
        this.setState({currentId: id})
    };
    onDrop = (e, cat, taskId) => {
        let id = e.dataTransfer.getData('id');

        let tasks = this.state.tasks.filter((t) => {
            if(t.id === +(id)) {
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

    render () {
        let task = {
            notCompleted: [],
            completed: []
        };
        this.state.tasks.forEach((t) => {
            task[t.status].push(<div key={t.id} priority={t.priority} className='note-block clear' draggable onDragStart={(e) => this.onDragStart(e, t.id)}>
                <div className='note-block-round' style={{ backgroundColor: t.color}}>{t.title.charAt(0).toUpperCase()}</div>
                {t.priority === 'high' && <div className='note-list-priority'>High Priority</div>}
                {t.priority === 'low' && <div className='note-list-priority'>Low Priority</div>}
                <div className='note-block-wrap'>
                    <div className="note-block-descr">
                        <h2>{t.title}</h2>
                    </div>
                    <div className="note-block-content">
                        <div>{t.text}</div>
                        <p>{t.date}</p>
                        <div className="note-block-tags">{t.tags}</div>
                    </div>
                    <div className="note-block-btn">
                        <Link to={`/edit/${t.id}`}>
                            <button className="btn btn-edit">Edit</button>
                        </Link>
                        <button onClick={()=>this.onDeleteTask(t.id)} className="btn btn-delete">Delete</button>
                    </div>
                </div>
            </div>)
        });
        return (
            <div className='note-block-todoTask'>
                <div className='note-block-up' onDragOver={(e) => this.onDragOver(e)} onDrop={(e) => this.onDrop(e, 'notCompleted', this.state.currentId)}>
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
                <div className='note-block-down' onDragOver={(e) => this.onDragOver(e)} onDrop={(e) => this.onDrop(e, 'completed', this.state.currentId)}>
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
export default IndexPageTasksBlock;
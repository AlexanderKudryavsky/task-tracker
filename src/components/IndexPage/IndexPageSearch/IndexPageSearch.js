import React from 'react';
import {addTagTitle, changePriority, changeView, sortByDate} from "../../../redux/todoReducer";
import {connect} from 'react-redux';
import {getView} from "../../../selectors/selectors";

class IndexPageSearch extends React.Component {

    changeToBlock = () => {
        this.props.changeView('block')
    };
    changeToInline = () => {
        this.props.changeView('inline')
    };
    onChangePriority = (e) => {
        this.props.changePriority(e.target.value)
    };
    onSortByDate = (e) => {
        this.props.sortByDate(e.target.value)
    };

    render() {
        return (
            <div className='todoHeader'>
                    <span>Filter by priority</span>
                    <select onChange={(e) => {this.onChangePriority(e)}}>
                        <option value=''>All</option>
                        <option value='high'>High</option>
                        <option value='medium'>Medium</option>
                        <option value='low'>Low</option>
                    </select>
                    <span >Sort by date</span>
                    <select onChange={(e) => this.onSortByDate(e)}>
                        <option value='new'>old to new</option>
                        <option value='old'>new to old</option>
                    </select>
                <div className='view-nav'>
                    <button onClick={this.changeToBlock}><img src={require("./../../../img/block-view.png")} alt='blockView'/></button>
                    <button onClick={this.changeToInline}><img src={require("./../../../img/inline-view.png")} alt='inlineView'/></button>
                </div>
            </div>
        )
    }
}

let mapStateToProps = (state) => ({
    view: getView(state)
});

export default connect(mapStateToProps, {addTagTitle, changeView, changePriority, sortByDate})(IndexPageSearch)


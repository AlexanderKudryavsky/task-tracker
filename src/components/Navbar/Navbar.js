import React from 'react';
import {Link} from "react-router-dom";
import './Navbar.scss'
import {connect} from 'react-redux';
import {logOut} from "../../redux/authReducer";

const Navbar = (props) => {
    let onLogOut = () => {
        props.logOut()
    };
    return(
        <nav className="navbar">
            <h1>Task Tracker</h1>
            <div className="navbar-buttons">
                {props.isAuth ? <div><span className={'navbar-username'}>{props.user.login}</span><span className={'navbar-logout'} onClick={onLogOut}>Log out</span></div> : <div><Link to={'/login'}>Log in</Link></div>}
                <Link className="btn" to="/add">Add Note</Link>
            </div>
        </nav>
    )
};

let mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    user: state.auth.user
});
export default connect(mapStateToProps, {logOut})(Navbar);
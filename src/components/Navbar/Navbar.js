import React from 'react';
import {Link} from "react-router-dom";
import './Navbar.scss'

const Navbar = () => {
    return(
        <nav className="navbar">
            <h1>Task Tracker</h1>
            <div className="navbar-buttons">
                <Link className="btn" to="/add">Add Note</Link>
            </div>
        </nav>
    )
};

export default Navbar;
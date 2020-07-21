import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class Navbar extends Component {

    logout=()=>{
        console.log("logout")
        this.props.logout()
    }

    render() {
        const loggedOutLink=(
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/" className="nav-link">Home</Link>
                </li>
            </ul>
        )

        const loggedInLinks=(
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/profile" className="nav-link">Profile</Link>
                </li>

                <li className="navbar-nav">
                    <button type="button" className="btn btn-link" onClick={this.logout}>Log out</button>
                </li>
            </ul>
        )
        console.log("navbar auth")
        console.log(this.props.isAuthenticated)
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded">
                {this.props.isAuthenticated ? loggedInLinks : loggedOutLink}
            </nav>
        );
    }
}

export default Navbar;

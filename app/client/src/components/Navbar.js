import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import {get_login_status} from './ApiFunctions'

class Welcome extends Component {

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded">
                <button>
                    <span className="navbar-toggler-icon" />
                </button>
            </nav>
        );
    }
}

export default withRouter(Welcome);

import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from 'axios'

class Welcome extends Component {
    constructor(){
        super();
        this.state={
            logged_in:false
        }
    }

    checkAuth(){
        axios.get('api/login/status',{withCredentials:true}).then(res=>{
            console.log(res)
            if(res.data.logged_in && !this.state.logged_in){
                this.setState({
                    logged_in:true
                })
            }
            else if(!res.data.logged_in && this.state.logged_in){
                this.setState({
                    logged_in:false
                })
            }
        }).catch(err=>{
            console.log(err)
        })
    }

    componentDidMount(){
        this.checkAuth()
    }

    logout=(e)=>{
        console.log("logout clicked")
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
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded">
                {this.state.logged_in ? loggedInLinks : loggedOutLink}
            </nav>
        );
    }
}

export default withRouter(Welcome);
